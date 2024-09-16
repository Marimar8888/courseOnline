import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { getUserIdFromAPI, getUserRolsFromAPI } from '../services/user';
import { getStudentByIdFromAPI, addStudent } from '../services/student';
import { getProfessorByIdFromAPI } from '../services/professor';
import { addEnrollment } from '../services/enrollment';

const CartPaying = ({ cartCourses = [], clearCart }) => {
    const [userId, setUserId] = useState(null);
    const [studentId, setStudentId] = useState(null);
    const [userRols, setUserRols] = useState([]);

    //Campos del formulario
    const [studentsFirstName, setStudentsFirstName] = useState("");
    const [studentsLastName, setStudentsLastName] = useState("");
    const [studentsDni, setStudentsDni] = useState("");
    const [studentsAddress, setStudentsAddress] = useState("");
    const [studentsCity, setStudentsCity] = useState("");
    const [studentsPostal, setStudentsPostal] = useState("");
    const [studentsEmail, setStudentsEmail] = useState("");
    const [studentsNumberCard, setStudentsNumberCard] = useState("");
    const [studentsExpDate, setStudentsExpDate] = useState("");
    const [studentsCvc, setStudentsCvc] = useState("");
    const history = useHistory();

    //toogles
    const toggleDatesgDetails = () => setShowDatesDetails(!showDatesDetails);
    const toggleAddressDetails = () => setShowAddressDetails(!showAddressDetails);
    const toggleCardDetails = () => setShowCardDetails(!showCardDetails);
    const [showDatesDetails, setShowDatesDetails] = useState(false);
    const [showAddressDetails, setShowAddressDetails] = useState(false);
    const [showCardDetails, setShowCardDetails] = useState(false);


    useEffect(() => {
        localStorage.setItem("cartCourses", JSON.stringify(cartCourses));
    }, [cartCourses]);

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            getUserIdFromAPI(token)
                .then(id => {
                    if (id) {
                        setUserId(id);
                    }
                });
        }
    }, []);


    useEffect(() => {
        if (userId !== null && userId !== undefined) {
            const token = localStorage.getItem("token");
            if (token) {
                getUserRolsFromAPI(userId, token)
                    .then(({ rols, studentRole, professorRole }) => {
                        setUserRols(rols);
                        if (studentRole) {
                            getStudentByIdFromAPI(userId, token)
                                .then(student => {
                                    if (student) {
                                        setStudentId(student.students_id);
                                        setStudentsFirstName(student.students_first_name);
                                        setStudentsLastName(student.students_last_name);
                                        setStudentsDni(student.students_dni);
                                        setStudentsAddress(student.students_address);
                                        setStudentsCity(student.students_city);
                                        setStudentsPostal(student.students_postal);
                                        setStudentsEmail(student.students_email);
                                        setStudentsNumberCard(formatCardNumber(student.students_number_card));
                                        setStudentsExpDate(student.students_exp_date);
                                        setStudentsCvc(student.students_cvc);
                                    }
                                });
                        } else if (professorRole) {
                            getProfessorByIdFromAPI(userId, token)
                                .then(professor => {
                                    if (professor) {
                                        setStudentsFirstName(professor.professors_first_name);
                                        setStudentsLastName(professor.professors_last_name);
                                        setStudentsDni(professor.professors_dni);
                                        setStudentsAddress(professor.professors_address);
                                        setStudentsCity(professor.professors_city);
                                        setStudentsPostal(professor.professors_postal);
                                        setStudentsEmail(professor.professors_email);
                                        setStudentsNumberCard(formatCardNumber(professor.professors_number_card));
                                        setStudentsExpDate(professor.professors_exp_date);
                                        setStudentsCvc(professor.professors_cvc);
                                    }
                                });
                        }
                    });

            }
        }

    }, [userId]);

    const getTotal = () => {
        return cartCourses
            .reduce((sum, course) => {
                const price = parseFloat(course.courses_price) || 0;
                return sum + price;
            }, 0)
            .toFixed(2);
    };


    const getTotalDiscount = () => {
        return cartCourses
            .reduce((totalDiscount, course) => {
                if (course.courses_discounted_price) {
                    const originalPrice = parseFloat(course.courses_price) || 0;
                    const discountedPrice = parseFloat(course.courses_discounted_price) || 0;
                    const discountAmount = originalPrice - discountedPrice;

                    return totalDiscount + (isNaN(discountAmount) ? 0 : discountAmount);
                }
                return totalDiscount;
            }, 0)
            .toFixed(2);
    };

    const handlePaymentSuccess = () => {
        const token = localStorage.getItem('token');
        const courseDetails = cartCourses.map(course => ({
            id: course.courses_id,
            price: course.courses_discounted_price || course.courses_price
        }));
        const studentData = {
            studentId: studentId,
            firstName: studentsFirstName,
            lastName: studentsLastName,
            dni: studentsDni,
            address: studentsAddress,
            city: studentsCity,
            postal: studentsPostal,
            email: studentsEmail,
            numberCard: studentsNumberCard,
            expDate: studentsExpDate,
            cvc: studentsCvc
        };

        if (studentId) {
            addEnrollment(studentId, courseDetails, token)
                .then(() => {
                    clearCart();
                    history.push(`/`);
                })
                .catch(error => {
                    console.error("Error al agregar inscripción:", error);
                });
        } else {
            addStudent(userId, studentData, token)
                .then(newStudent => {
                    const newStudentId = newStudent.students_id;
                    if (newStudent) {
                        setStudentId(newStudent.students_id);
                        setStudentsFirstName(newStudent.students_first_name);
                        setStudentsLastName(newStudent.students_last_name);
                        setStudentsDni(newStudent.students_dni);
                        setStudentsAddress(newStudent.students_address);
                        setStudentsCity(newStudent.students_city);
                        setStudentsPostal(newStudent.students_postal);
                        setStudentsEmail(newStudent.students_email);
                        setStudentsNumberCard(formatCardNumber(newStudent.students_number_card));
                        setStudentsExpDate(newStudent.students_exp_date);
                        setStudentsCvc(newStudent.students_cvc);

                        addEnrollment(newStudentId, courseDetails, token)
                            .then(() => {
                                clearCart();
                                history.push(`/`);
                            })
                            .catch(error => {
                                console.error("Error al agregar inscripción:", error);
                            });
                    }
                })
                .catch(error => {
                    console.error("Error al crear el estudiante:", error);
                });

        }
    };

    const formatCardNumber = (value) => {
        const digits = value.replace(/[^\d]/g, '');
        return digits.replace(/(.{4})/g, '$1 ').trim();
    };

    const handleCardNumberChange = (e) => {
        const formattedValue = formatCardNumber(e.target.value);
        console.log("Formatted Card Number:", formattedValue);
        setStudentsNumberCard(formattedValue);
    };

    return (
        <div className='cart-paying-content-wrapper'>
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
        </div>
    );

}
export default CartPaying;