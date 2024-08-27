import React, { useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter, NavLink } from "react-router-dom";

const NavBarContainer = (props) => {
  if (typeof props.openModal !== 'function') {
    console.error('openModal is not defined or not a function');
    return null;
  }
  useEffect(() => {
    props.checkTokenValidity();
  }, [props.location]);

  const dynamicLink = (route, linkText) => {
    return (
      <div className="nav-link-wrapper">
        <NavLink to={route} activeClassName="nav-link-active">{linkText}</NavLink>
      </div>
    );
  };

  const handleSignOut = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user_name');
    props.history.push("/");
    props.handleSuccessfulLogout();
  };

  const userName = localStorage.getItem('user_name');

  return (

    <div className="nav-wrapper">

      <div className="left-side">
          <div className="nav-link-wrapper">
            <NavLink exact to="/" activeClassName="nav-link-active">Home</NavLink>
          </div>
          <div className="nav-link-wrapper">
            <NavLink exact to="/store" activeClassName="nav-link-active">Store</NavLink>
          </div>
          <div className="nav-link-wrapper">
            <NavLink to="/about" activeClassName="nav-link-active">About</NavLink>
          </div>
          <div className="nav-link-wrapper">
            <NavLink to="/contact" activeClassName="nav-link-active">Contact</NavLink>
          </div>
          {props.loggedInStatus === "LOGGED_IN" ? (dynamicLink("/dashboard", "Dashboard")) : null}
      </div>
      <div className="right-side">
        {userName ? userName : ""}
        {props.loggedInStatus === "LOGGED_IN" ? (
          <a onClick={handleSignOut}>
            <FontAwesomeIcon icon="sign-out-alt" />
          </a>) : (
          <a onClick={props.openModal} className="nav-icon">
            <FontAwesomeIcon icon="door-open" />
          </a>
        )}
      </div>

    </div>

  );
}
export default withRouter(NavBarContainer);