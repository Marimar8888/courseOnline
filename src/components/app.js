import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import NavBarContainer from './navigation/navbar-container';
import Home from "./pages/home";
import About from "./pages/about";
import Contact from "./pages/contact";
import Icons from "./helpers/icons";
import Store from "./pages/store";
import NoMatch from "./pages/no-match";
import LoginModal from "./modals/login-modal";
import RegisterModal from "./modals/register-modal";


export default class App extends Component {
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
  render() {
    return (
      <div className="container">
        <Router>
          <div>
            <NavBarContainer
              loggedInStatus={this.state.loggedInStatus}
              handleSuccessfulLogout={this.handleSuccessfulLogout}
              openModal={this.openModal}
            />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/store" component={Store} />
              <Route path="/about" component={About} />
              <Route path="/contact" component={Contact} />
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
          </div>


        </Router>

      </div>
    );
  }
}
