import React from 'react';

const CartPayingFormFields = ({
    toggleDatesgDetails,
    showDatesDetails,
    toggleAddressDetails,
    showAddressDetails,
    toggleCardDetails,
    showCardDetails,
    studentsFirstName,
    setStudentsFirstName,
    studentsLastName,
    setStudentsLastName,
    studentsDni,
    setStudentsDni,
    studentsAddress,
    setStudentsAddress,
    studentsCity,
    setStudentsCity,
    studentsPostal,
    setStudentsPostal,
    studentsEmail,
    setStudentsEmail,
    studentsNumberCard,
    setStudentsNumberCard,
    studentsExpDate,
    setStudentsExpDate,
    studentsCvc,
    setStudentsCvc,
    getTotal,
    getTotalDiscount,
    cartCourses,
    handlePaymentSuccess,
    handleCardNumberChange
}) => {

    return (
        <div className='cart-paying-content'>
            <div className='column-left-wrapper'>
                <div className='column-left'>
                    <div className='column-left-header'>
                        <h2>Pagar</h2>
                    </div>

                    <div className='column-left-billing-title' >
                        <h3>Dirección de facturación</h3>
                    </div>

                    <div className='column-left-dates' >
                        <div className='column-left-dates-title' onClick={toggleDatesgDetails}>
                            <h3 > Nombre, apellidos y dni</h3>
                        </div>
                        {showDatesDetails && (
                            <div className='cart-paying-form-group-dates'>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="students_first_name"
                                        placeholder="Nombre"
                                        value={studentsFirstName}
                                        onChange={(e) => setStudentsFirstName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="students_last_name"
                                        placeholder="Apellidos"
                                        value={studentsLastName}
                                        onChange={(e) => setStudentsLastName(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="students_dni"
                                        placeholder="DNI"
                                        value={studentsDni}
                                        onChange={(e) => setStudentsDni(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}
                    </div>

                    <div className='column-left-direction'>
                        <div className='column-left-direction-title' onClick={toggleAddressDetails}>
                            <h3>Domicilio</h3>
                        </div>
                        {showAddressDetails && (
                            <div className='cart-paying-form-group-address'>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="students_address"
                                        placeholder="Dirección"
                                        value={studentsAddress}
                                        onChange={(e) => setStudentsAddress(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="students_city"
                                        placeholder="Ciudad"
                                        value={studentsCity}
                                        onChange={(e) => setStudentsCity(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="number"
                                        name="students_postal"
                                        placeholder="Cod Postal"
                                        value={studentsPostal}
                                        onChange={(e) => setStudentsPostal(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="email"
                                        name="students_email"
                                        placeholder="Email"
                                        value={studentsEmail}
                                        onChange={(e) => setStudentsEmail(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                    <div className='column-left-pay-method'>
                        <div className='column-left-direction-title' onClick={toggleCardDetails}>
                            <h3>Datos bancarios</h3>
                        </div>
                        {showCardDetails && (
                            <div className='cart-paying-form-group-card'>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="students_number_card"
                                        placeholder="Nº tarjeta 1234 5678 9012 3456"
                                        maxLength={19}
                                        value={studentsNumberCard}
                                        onChange={handleCardNumberChange}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="text"
                                        name="students_exp_date"
                                        placeholder="Vencimiento MM/AA"
                                        value={studentsExpDate}
                                        onChange={(e) => setStudentsExpDate(e.target.value)}
                                    />
                                </div>
                                <div className="form-group">
                                    <input
                                        type="number"
                                        name="students_cvc"
                                        placeholder="CVC"
                                        value={studentsCvc}
                                        onChange={(e) => setStudentsCvc(e.target.value)}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className='column-right-wrapper'>
                <div className='column-right'>
                    <div className='column-right-header'>
                        <h2>Resumen</h2>
                    </div>
                    <div className='resume-price-wrapper'>
                        <div className='resumen-price-text'>
                            <span>Precio</span>
                            <span>Descuento</span>
                            <span className='resumen-price-text-total'>Total</span>
                        </div>
                        <div className='resumen-price-number'>
                            <span>{getTotal()} €</span>
                            <span className='resumen-price-disconunted'>-{getTotalDiscount()} €</span>
                            <span className='resumen-price-total'>{getTotal() - getTotalDiscount()} €</span>
                        </div>
                    </div>
                    <div>
                        <button onClick={handlePaymentSuccess} className='btn-save'>Completar pago</button>
                    </div>

                    <div className='resume-products'>
                        <div className='resume-products-title'>
                            <h2>Detalle del pedido</h2>
                        </div>
                        {cartCourses.length === 0 ? (
                            <p>No items in the cart</p>
                        ) : (
                            cartCourses.map((course) => {
                                const discountedPrice = parseFloat(course.courses_discounted_price);
                                const price = Number(course.courses_price).toFixed(2);
                                return (
                                    <div key={course.courses_id} className='resume-product-detail'>
                                        <div className='product-paying-image'>
                                            <img src={course.courses_image} alt={course.courses_title} />
                                        </div>
                                        <div className='product-paying-title'>
                                            <span className='product-title'>{course.courses_title}</span>
                                            <span className='product-professor'>Nombre profesor</span>
                                        </div>
                                        {discountedPrice ? (
                                            <div className='product-paying-price'>
                                                <div className='product-paying-discounted-price'>
                                                    {discountedPrice} €
                                                </div>
                                                <div className='product-paying-price-through'>
                                                    {price} €
                                                </div>
                                            </div>
                                        ) : (
                                            <div className='product-paying-price'>
                                                {price} €
                                            </div>
                                        )}

                                    </div>
                                );
                            })
                        )}


                    </div>
                </div>
            </div>
        </div>
    );
};
export default CartPayingFormFields;
