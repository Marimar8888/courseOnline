import React, { useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CartShopping = ({ isOpen, cartCourses = [] , removeFromCart}) => {
  if (!isOpen) return null;

  useEffect(() => {
    localStorage.setItem("cartCourses", JSON.stringify(cartCourses));
  }, [cartCourses]);

  const getTotal = () => {
    return cartCourses
      .reduce((sum, course) => {
        const price = parseFloat(course.courses_price) || 0;
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

  return (
    <div className="cart-shopping-container">
      <div className="cart-items">
        {cartCourses.length === 0 ? (
          <p>No items in the cart</p>
        ) : (
          cartCourses.map((course) => {
            const price = Number(course.courses_price);
            return (
              <div key={course.courses_id} className="cart-item">
                <div className="cart-item-image" >
                  <img src={course.courses_image} alt={course.courses_title} />
                </div>
                <div className="cart-item-info">
                  <p className="cart-item-title">{course.courses_title}</p>
                  <p className="cart-item-price">{price.toFixed(2)} €</p>
                </div>
                <div className='cart-item-icons'>
                  <a className="icon-trash" onClick={() => handleDeleteClick(course.courses_id)}>
                    <FontAwesomeIcon icon="trash" />
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>
      {cartCourses.length > 0 && (
        <div className="cart-total">
          <p>Total: <span>{getTotal()} €</span></p>
        </div>
      )}
      <button className="cart-checkout-button">Ir a la cesta</button>
    </div>
  );
};

export default CartShopping;
