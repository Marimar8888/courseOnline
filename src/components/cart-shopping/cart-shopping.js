import React, { useEffect } from "react";
import { useHistory } from 'react-router-dom';
import CartShoppingFormFields from "../forms/cart-shopping-form-fields";

const CartShopping = ({ isOpen, cartCourses = [] , removeFromCart}) => {
  const history = useHistory();
  if (!isOpen) return null;

  useEffect(() => {
    localStorage.setItem("cartCourses", JSON.stringify(cartCourses));
  }, [cartCourses]);

  const getTotal = () => {
    return cartCourses
      .reduce((sum, course) => {
        const price = parseFloat(course.courses_discounted_price) || parseFloat(course.courses_price) || 0;
        return sum + price;
      }, 0)
      .toFixed(2);
  };

  const handleDeleteClick = (courseId) => {
    if (typeof removeFromCart === 'function') {
      removeFromCart(courseId);
    } else {
      console.error("removeFromCart is not a function");
    }
  };

  const handleGoToCart = () => {
    history.push('/cart'); 
  };

  return (
 
      <CartShoppingFormFields
        handleDeleteClick={handleDeleteClick}
        handleGoToCart ={handleGoToCart}
        cartCourses = {cartCourses}
        getTotal={getTotal}
        isOpen= {isOpen}
      />
  );
};

export default CartShopping;
