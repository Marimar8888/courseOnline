import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { withRouter, NavLink } from "react-router-dom";

import CartShopping from '../cart-shopping/cart-shopping';

const NavBarContainer = (props) => {

  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartCourses, removeFromCart } = props;

  if (typeof props.openModal !== 'function') {
    console.error('openModal is not defined or not a function');
    return null;
  }

  useEffect(() => {
    props.checkTokenValidity();
  }, [props.location]);

  useEffect(() => {
    if (props.location.pathname === '/cart') {
      setIsCartOpen(false);
    }
  }, [props.location.pathname]);

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

  const handleToggleCart = () => {
    setIsCartOpen(!isCartOpen);
  }

  const userName = localStorage.getItem('user_name');

  return (

    <div className="nav-wrapper">

      <div className="left-side">
        <div className="nav-link-wrapper">
          <NavLink exact to="/" activeClassName="nav-link-active">INICIO</NavLink>
        </div>
        <div className="nav-link-wrapper">
          <NavLink exact to="/store" activeClassName="nav-link-active">TIENDA</NavLink>
        </div>
        <div className="nav-link-wrapper">
          <NavLink to="/teach" activeClassName="nav-link-active">ENSEÑA CON NOSOTROS</NavLink>
        </div>
        <div className="nav-link-wrapper">
          <NavLink to="/contact" activeClassName="nav-link-active">CONTACTO</NavLink>
        </div>
        {props.loggedInStatus === "LOGGED_IN" ? (dynamicLink("/dashboard", "Panel de control")) : null}
      </div>

      <div className="right-side">
        <div className="cart-icon-wrapper"> 
          {userName ? userName : ""}
          <a className="nav-icon" onClick={handleToggleCart}>
            <FontAwesomeIcon icon="cart-shopping" className='cart-icon' />
            {cartCourses.length > 0 && (
              <span className="cart-item-count">
                {cartCourses.length}
              </span>
            )}
          </a>
        </div>
        <div>
        {props.loggedInStatus === "LOGGED_IN" ? (
            <a onClick={handleSignOut}>
              <FontAwesomeIcon icon="sign-out-alt"  className='sing-icon'/>
            </a>) : (
            <a onClick={props.openModal} className="nav-icon">
              <FontAwesomeIcon icon="door-open" className='sing-icon'/>
            </a>
          )}
        </div>
      </div>
      {isCartOpen && <CartShopping isOpen={isCartOpen} cartCourses={cartCourses} removeFromCart={removeFromCart} />}
    </div>

  );
}
export default withRouter(NavBarContainer);