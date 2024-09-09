import React from "react";

const CartShopping = ({ isOpen }) => {
  if (!isOpen) return null; 

  return (
    <div className="cart-shopping-container">
      <div className="cart-header">
        <h2>Your Cart</h2>
      </div>
      <div className="cart-items">
        {/* Aquí  renderizar los artículos del carrito */}
        <p>No items in the cart</p>
      </div>
    </div>
  );
};

export default CartShopping;

