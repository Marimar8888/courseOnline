import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter  } from "react-router-dom";
import { API_URL } from './utils/constant';
import axios from 'axios';

import NavBarContainer from './navigation/navbar-container';
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Icons from "./helpers/icons";
import NoMatch from "./pages/no-match";
import LoginModal from "./modals/login-modal";
import RegisterModal from "./modals/register-modal";
import Footer from './footer/footer';
import StoreContainer from './store/store-container';
import Dashboard from './pages/dashboard';


class App extends Component {
  constructor(props) {
    super(props);
    Icons();
    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      isRegisterModalOpen: false,
      isModalOpen: false
    };

    this.handleSuccessfulLogin = this.handleSuccessfulLogin.bind(this);
    this.handleUnsuccessfulLogin = this.handleUnsuccessfulLogin.bind(this);
    this.handleSuccessfulLogout = this.handleSuccessfulLogout.bind(this);
    this.handleSuccessfulRegister = this.handleSuccessfulRegister.bind(this);
    this.openModal = this.openModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.openRegisterModal = this.openRegisterModal.bind(this);
    this.closeRegisterModal = this.closeRegisterModal.bind(this);
    this.openLoginModal = this.openLoginModal.bind(this);
  }

  openLoginModal() {
    this.setState({
      isRegisterModalOpen: false,
      isModalOpen: true
    });
  }

  openRegisterModal() {
    this.setState({
      isModalOpen: false,
      isRegisterModalOpen: true
    });
  }

  closeRegisterModal() {
    this.setState({ isRegisterModalOpen: false });
  }

  openModal() {
    this.setState({ isModalOpen: true });
  }

  closeModal() {
    this.setState({ isModalOpen: false });
  }


  handleSuccessfulRegister() {
    this.openLoginModal();
  }

  handleSuccessfulLogin() {
    this.setState({
      loggedInStatus: "LOGGED_IN"
    }, () => {
      console.log("Logged in status:", this.state.loggedInStatus);
      this.checkLoginStatus();
      this.closeModal();
    });
  }

  handleUnsuccessfulLogin() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    });
  }

  handleSuccessfulLogout() {
    this.setState({
      loggedInStatus: "NOT_LOGGED_IN"
    });
  }

  checkTokenValidity() {
    const token = localStorage.getItem("token");
    console.log("token en  checkTokenValidity():",token)
   
    if (token) {
      axios.get(`${API_URL}/get_verify_token`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        if (response.status === 200) {
          console.log("respuesta 200 verificación", response);
          this.setState({ loggedInStatus: "LOGGED_IN" });
        } else {
          console.log("respuesta 401 verificación", response);
          localStorage.removeItem("token");
          this.setState({ loggedInStatus: "NOT_LOGGED_IN" });
          this.openLoginModal();
        }
      })
      .catch(error => {
        console.log("error al verificar el token", error);
        localStorage.removeItem("token");
        this.setState({ loggedInStatus: "NOT_LOGGED_IN" });
        this.openLoginModal();
      });
    } else {
      console.log("no existe el token");
      this.setState({ loggedInStatus: "NOT_LOGGED_IN" });
      this.openLoginModal();
    }
  }

  checkLoginStatus() {
    const token = localStorage.getItem("token");
    const loggedInStatus = this.state.loggedInStatus;
    if (token && loggedInStatus === "NOT_LOGGED_IN") {
      this.setState({
        loggedInStatus: "LOGGED_IN"
      });
    } else if (!token && loggedInStatus === "LOGGED_IN") {
      this.setState({
        loggedInStatus: "NOT_LOGGED_IN"
      });
    }
  }

  componentDidMount() {
    this.checkLoginStatus();
  }

  authorizedPages() {
    return [
      <Route key="dashboard" path="/dashboard" component={Dashboard} />,

    ];
  }

  render() {
    return (
      <div className="container">
        <Router>
          <div>
            <NavBarContainer
              loggedInStatus={this.state.loggedInStatus}
              handleSuccessfulLogout={this.handleSuccessfulLogout}
              openModal={this.openModal}
              checkTokenValidity={this.checkTokenValidity.bind(this)}
            />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route
                path="/store/:slug"
                render={props => (
                  <StoreContainer {...props} loggedInStatus={this.state.loggedInStatus} />
                )}
              />
              <Route
                path="/store"
                render={props => (
                  <StoreContainer {...props} loggedInStatus={this.state.loggedInStatus} />
                )}
              />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
              <Route path="/dashboard" component={Dashboard} />
              {this.state.loggedInStatus === "LOGGED_IN" ? (this.authorizedPages()) : null}
              <Route component={NoMatch} />
            </Switch>
            <LoginModal
              isOpen={this.state.isModalOpen}
              onClose={this.closeModal}
              handleSuccessfulLogin={this.handleSuccessfulLogin}
              handleUnsuccessfulLogin={this.handleUnsuccessfulLogin}
              openRegisterModal={this.openRegisterModal}
            />
            <RegisterModal
              isOpen={this.state.isRegisterModalOpen}
              onClose={this.closeRegisterModal}
              openLoginModal={this.openLoginModal}
              handleSuccessfulRegister={this.handleSuccessfulRegister}
            />
            <Footer />
          </div>
        </Router>
      </div>
    );
  }
}
export default withRouter(App);