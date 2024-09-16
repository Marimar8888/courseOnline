import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

const CartDetails = ({ cartCourses = [], removeFromCart, openRegisterModal }) => {
    const history = useHistory();


    useEffect(() => {
        localStorage.setItem("cartCourses", JSON.stringify(cartCourses));
    }, [cartCourses]);


    const getDescounted = () => {
        return cartCourses
        .reduce((sum, course) => {
            const price = course.courses_discounted_price 
                ? parseFloat(course.courses_discounted_price) 
                : parseFloat(course.courses_price);

            return sum + (isNaN(price) ? 0 : price);
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

    const handleToPay = () => {
        const token = localStorage.getItem("token");
        if (!token) {
            openRegisterModal();
            if(token){
                history.push('/cart-pay');
            }
        } else { 
            history.push('/cart-pay'); 
        }
    }
   
   
    return (
        <div className='content-page-wrapper'>
            <div className='cart-paying-content-wrapper'>
                <div className='cart-paying-header'>
                    <h2>Cesta</h2>
                </div>
                <div className='cart-paying-details-wrapper'>
                    <div className='cart-paying-products'>
                        <div className='cart-paying-products-title'>
                            <p>{cartCourses.length} cursos en total</p>
                        </div>
                        {cartCourses.length === 0 ? (
                            <p>No items in the cart</p>
                        ) : (
                            cartCourses.map((course) => {
                                const discountedPrice = parseFloat(course.courses_discounted_price);
                                const price = Number(course.courses_price).toFixed(2);
                                return (
                                    <div key={course.courses_id} className='cart-paying-product-resumen'>
                                        <div className='cart-paying-image'>
                                            <img src={course.courses_image} alt={course.courses_title} />
                                        </div>
                                        <div className='cart-paying-title'>
                                            <span className='course-title'>{course.courses_title}</span>
                                            <span className='course-professor'>Nombre profesor</span>
                                        </div>
                                        {discountedPrice ? (
                                            <div>
                                        <div className='cart-paying-discounted-price'>
                                            {discountedPrice} €
                                            
                                        </div>
                                        <div className='cart-paying-price-through'>
                                            {price} €
                                        </div>
                                        </div>
                                        ) : (
                                        <div className='cart-paying-price'>
                                            {price} €
                                        </div>
                                        )}
                                        <div className='cart-paying-delete'>
                                            <span
                                                className='cart-paying-delete-text'
                                                onClick={() => handleDeleteClick(course.courses_id)}
                                            >
                                                Eliminar
                                            </span>
                                        </div>
                                    </div>
                                );
                            })
                        )}
                    </div>
                    <div className='cart-paying-total-pay'>
                        <div className='cart-paying-total-pay-header'>
                            Total:
                        </div>
                        <div className='cart-paying-total-pay-total'>
                            {getDescounted()} €
                        </div>
                        <div className='cart-paying-total-pay-button'>
                            <button className='btn-save' onClick={handleToPay}>Pagar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartDetails;
