import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route, withRouter } from "react-router-dom";
import { API_URL } from './utils/constant';
import axios from 'axios';

import NavBarContainer from './navigation/navbar-container';
import Home from "./pages/home";
import Teach from "./pages/teach";
import Contact from "./pages/contact";
import Icons from "./helpers/icons";
import NoMatch from "./pages/no-match";
import LoginModal from "./modals/login-modal";
import RegisterModal from "./modals/register-modal";
import Footer from './footer/footer';
import StoreContainer from './store/store-container';
import Dashboard from './pages/dashboard';
import Courses from './dashboard/pages/courses';
import CourseDetails from './course/course-details';
import Centers from "./dashboard/pages/centers";
import Students from "./dashboard/pages/students";
import Professors from './dashboard/pages/professors';
import Store from './pages/store';
import CartDetails from './cart-shopping/cart-details';
import CartPaying from './cart-shopping/cart-paying';
import StudentContainer from './student/student-container';
import ChangePassword from './auth/change-password';


class App extends Component {
  constructor(props) {
    super(props);
    Icons();
    const storedCart = localStorage.getItem("cartCourses");
    const initialCartCourses = storedCart ? JSON.parse(storedCart) : [];
    this.state = {
      loggedInStatus: "NOT_LOGGED_IN",
      isRegisterModalOpen: false,
      isPasswordModalOpen: false,
      cartCourses: initialCartCourses
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

  componentDidMount() {
    this.checkLoginStatus();

    const storedCart = localStorage.getItem("cartCourses");
    if (storedCart) {
      this.setState({ cartCourses: JSON.parse(storedCart) });
    }

    const screenWidth = window.innerWidth;
    const screenHeight = window.innerHeight;

    console.log('Ancho de la pantalla:', screenWidth);
    console.log('Alto de la pantalla:', screenHeight);
  }

  componentDidUpdate(prevState) {
    if (prevState.cartCourses !== this.state.cartCourses) {
      localStorage.setItem("cartCourses", JSON.stringify(this.state.cartCourses));
    }
  }

  addToCart = (course) => {
    try {
      this.setState(prevState => {
        const updatedCart = [...prevState.cartCourses, course];
        localStorage.setItem("cartCourses", JSON.stringify(updatedCart));
        return { cartCourses: updatedCart };
      });
    } catch (error) {
      console.error("Error adding course to cart:", error);
    }
  };

  removeFromCart = (courseId) => {
    this.setState(prevState => {
      const updatedCart = prevState.cartCourses.filter(course => course.courses_id !== courseId);
      localStorage.setItem("cartCourses", JSON.stringify(updatedCart));
      return { cartCourses: updatedCart };
    });
  };

  clearCart = () => {
    this.setState({ cartCourses: [] });
    localStorage.removeItem("cartCourses");
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
              cartCourses={this.state.cartCourses}
              removeFromCart={this.removeFromCart}
            />
            <Switch>
              <Route exact path="/" component={Home} />
              <Route
                path="/store/:slug"
                render={props => (
                  <StoreContainer
                    {...props}
                    loggedInStatus={this.state.loggedInStatus}
                    addToCart={this.addToCart}
                    cartCourses={this.state.cartCourses}
                  />
                )}
              />
              <Route
                path="/store"
                render={props => (
                  <Store
                    {...props}
                    loggedInStatus={this.state.loggedInStatus}
                    addToCart={this.addToCart}
                    cartCourses={this.state.cartCourses}
                  />
                )}
              />
              <Route path="/teach" component={Teach} />
              <Route path="/contact" component={Contact} />
              <Route
                path="/courses/p/:slug"
                render={props => (
                  <Courses
                    editingPermission = "true"
                    loggedInStatus={this.state.loggedInStatus} />
                )}
              />
              <Route
                path="/courses/s/:slug"
                render={props => (
                  <Courses
                    {...props}
                    editingPermission = "false"
                    loggedInStatus={this.state.loggedInStatus} />
                )}
              />
              <Route
                path="/courses/:slug"
                render={props => (
                  <Courses 
                    {...props}
                    loggedInStatus={this.state.loggedInStatus}
                  />
                )}
              />
              <Route 
                path="/c/:slug" 
                render={props => (
                <CourseDetails {...props}/>
                )}  
              />
              <Route
                path="/students/:slug"
                render={props => (
                  <StudentContainer
                    {...props}
                    loggedInStatus={this.state.loggedInStatus} />
                )}
              />
              <Route path="/centers/:slug" component={Centers} />
              <Route path="/professors/:slug" component={Professors} />
              <Route path="/cart" render={() => (
                <CartDetails
                  cartCourses={this.state.cartCourses}
                  removeFromCart={this.removeFromCart}
                  openRegisterModal={this.openRegisterModal}
                />
              )} />
              <Route path="/cart-pay" render={() => (
                <CartPaying
                  cartCourses={this.state.cartCourses}
                  clearCart={this.clearCart}
                />
              )} />
              <Route path="/reset-password" component={ChangePassword} />

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