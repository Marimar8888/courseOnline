import React, { useEffect } from 'react';

const CartPaying = ({ cartCourses = [], removeFromCart }) => {

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
        <div className='cart-paying-wrapper'>
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
                                const price = Number(course.courses_price).toFixed(2); // Formatear el precio
                                return (
                                    <div key={course.courses_id} className='cart-paying-product-resumen'>
                                        <div className='cart-paying-image'>
                                            <img src={course.courses_image} alt={course.courses_title} /> {/* Agrega la URL de la imagen y el texto alternativo */}
                                        </div>
                                        <div className='cart-paying-title'>
                                            {course.courses_title} {/* Usa el título del curso */}
                                        </div>
                                        <div className='cart-paying-price'>
                                            {price} € {/* Usa el precio del curso */}
                                        </div>
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
                            {getTotal()} € {/* Usa el total calculado */}
                        </div>
                        <div className='cart-paying-total-pay-button'>
                            <button className='btn-save'>Pagar</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CartPaying;
