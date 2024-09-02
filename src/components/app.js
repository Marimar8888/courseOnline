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
import Courses from './pages/courses';
import Professors from './pages/professors';
import Centers from "./pages/centers";
import Students from "./pages/students";



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
   
    if (token) {
      axios.get(`${API_URL}/get_verify_token`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then(response => {
        if (response.status === 200) {
          this.setState({ loggedInStatus: "LOGGED_IN" });
        } else {
          localStorage.removeItem("token");
          localStorage.removeItem("user_name");

          this.setState({ loggedInStatus: "NOT_LOGGED_IN" });
          this.openLoginModal();
        }
      })
      .catch(error => {
        localStorage.removeItem("token");
        localStorage.removeItem("user_name");
        this.setState({ loggedInStatus: "NOT_LOGGED_IN" });
        this.openLoginModal();
      });
    } else {
      this.setState({ loggedInStatus: "NOT_LOGGED_IN" });
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
      <Route key="dashboard" path="/dashboard" component={Dashboard} 
      />,
      <Route key="courses" path="/courses/:slug" render={props => (
        <Courses {...props} />
      )} />,
      <Route key="students" path="/students/:slug" render={props => (
        <Students {...props} />
      )} />,
      <Route key="centers" path="/centers/:slug" render={props => (
        <Centers {...props} />
      )} />,
      <Route key="professors" path="/professors/:slug" render={props => (
        <Professors {...props} />
      )} />
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
              <Route path="/courses/:slug" component={Courses} />
              <Route path="/students/:slug" component={Students} />
              <Route path="/centers/:slug" component={Centers} />
              <Route path="/professors/:slug" component={Professors} />
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