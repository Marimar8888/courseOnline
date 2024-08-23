import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter } from "react-router";
import { NavLink } from "react-router-dom";

const NavBarComponent  = (props) => {
 
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
    </div>
    <div className="right-side">
      <a  className="nav-icon">
        <FontAwesomeIcon icon="sign-out-alt" />
        </a>
    </div>
  </div>
  );
}
export default withRouter(NavBarComponent)