import React from "react";

const CartShopping = ({ isOpen, cartCourses = [] }) => {
  if (!isOpen) return null;

  const getTotal = () => {
    return cartCourses
      .reduce((sum, course) => {
        const price = parseFloat(course.courses_price) || 0; 
        return sum + price;
      }, 0)
      .toFixed(2); 
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
                <img src={course.courses_image} alt={course.courses_title} className="cart-item-image" />
                <div className="cart-item-info">
                  <p className="cart-item-title">{course.courses_title}</p>
                  <p className="cart-item-price">{price.toFixed(2)} €</p>
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
