import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import CartDetailsFormFields from '../forms/cart-details-form-fields';

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
            if (token) {
                history.push('/cart-pay');
            }
        } else {
            history.push('/cart-pay');
        }
    }

    return (
        <div className='content-page-wrapper'>
            <CartDetailsFormFields
                cartCourses={cartCourses}
                handleDeleteClick={handleDeleteClick}
                handleToPay={handleToPay}
                getDescounted={getDescounted}
            />
        </div>
    );
}

export default CartDetails;
