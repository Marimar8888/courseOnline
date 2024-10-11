import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const CartShoppingFormFields = ({ isOpen, cartCourses, handleDeleteClick, handleGoToCart, getTotal }) => {
    if (!isOpen) return null;

    return (
        <div className="cart-shopping-container">
            <div className="cart-items">
                {cartCourses.length === 0 ? (
                    <p>No items in the cart</p>
                ) : (
                    cartCourses.map((course) => {
                        const discountedPrice = parseFloat(course.courses_discounted_price);
                        const price = Number(course.courses_price);
                        return (
                            <div key={course.courses_id} className="cart-item">
                                <div className="cart-item-image" >
                                    <img src={course.courses_image} alt={course.courses_title} />
                                </div>
                                <div className="cart-item-info">
                                    <p className="cart-item-title">{course.courses_title}</p>
                                    {discountedPrice ? (
                                        <p className="cart-item-price">{discountedPrice.toFixed(2)} €</p>
                                    ) : (
                                        <p className="cart-item-price">{price.toFixed(2)} €</p>
                                    )}
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
            <button className="cart-checkout-button" onClick={handleGoToCart}>Ir a la cesta</button>
        </div>
    );
};

export default CartShoppingFormFields;
