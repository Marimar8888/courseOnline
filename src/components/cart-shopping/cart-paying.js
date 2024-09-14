import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../utils/constant';
import { useHistory } from 'react-router-dom';

import { getUserIdFromAPI, getUserRolsFromAPI, getStudentByIdFromAPI, getProfessorByIdFromAPI } from '../services/user';
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
        console.log("useEffect", cartCourses);
    }, [cartCourses]);

     useEffect(() => {
        const token = localStorage.getItem("token");
        if(token){
            getUserIdFromAPI(token)
            .then(id => {
                if (id) {
                    setUserId(id); 
                }
            });
        }
    }, []);

    useEffect(() => {
        if (userId !== null) {
            const token = localStorage.getItem("token");
            if (token) {
                getUserRolsFromAPI(userId, token)
                    .then(({ rols, studentRole, professorRole }) => {
                        setUserRols(rols);
                        console.log("getUserRols:", rols);

                        if (studentRole) {
                            getStudentByIdFromAPI(userId, token)
                                .then(student => {
                                    console.log("getStudentByIdFromAPI", student);
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
                                        console.log("getStudent dates student", student);
                                    }
                                });
                        } else if (professorRole) {
                            getProfessorByIdFromAPI(userId, token)
                                .then(professor => {
                                    if (professor) {
                                        setStudentsFirstName(professor.professors_first_name);
                                        setStudentsLastName(professor.professors_last_name);
                                        setStudentsDni(professor.professors__dni);
                                        setStudentsAddress(professor.professors_address);
                                        setStudentsCity(professor.professors_city);
                                        setStudentsPostal(professor.professors_postal);
                                        setStudentsEmail(professor.professors_email);
                                        setStudentsNumberCard(formatCardNumber(professor.professors_number_card));
                                        setStudentsExpDate(professor.professors_exp_date);
                                        setStudentsCvc(professor.professors_s_cvc);
                                        console.log("getStudent dates profeesor:", professor);
                                    }
                                });
                        }
                    });
            }
        }
    }, [userId]);

    const handlePaymentSuccess = () => {
        const token = localStorage.getItem('token');
        const courseIds = cartCourses.map(course => course.courses_id);

        if (studentId) {
            addEnrollment(studentId, courseIds, token);
        } else {
            addStudent((newStudentId) => {
                if (newStudentId) {
                    addEnrollment(newStudentId, courseIds, token);
                }
            });
        }
    
        clearCart();
        history.push(`/`);
    };

    const addStudent = async () => {
        const formData = buildForm();
        try {
            const response = await axios.post(`${API_URL}/student`, formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            history.push(`/`);
        } catch (error) {
            console.log("Error handleSubmit:", error);
        }
    }

    const buildForm = () => {
        let studentFormData = new FormData();
        studentFormData.append("students_user_id", userId);
        studentFormData.append("students_first_name", studentsFirstName);
        studentFormData.append("students_last_name", studentsLastName);
        studentFormData.append("students_dni", studentsDni);
        studentFormData.append("students_address", studentsAddress);
        studentFormData.append("students_city", studentsCity);
        studentFormData.append("students_postal", studentsPostal);
        studentFormData.append("students_email", studentsEmail);
        studentFormData.append("students_number_card", studentsNumberCard.replace(/\s+/g, ''));
        studentFormData.append("students_exp_date", studentsExpDate);
        studentFormData.append("students_cvc", studentsCvc);

        console.log("Form Data:", studentFormData.get("students_number_card"));

        return studentFormData;

    }
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
                                <h3>Total</h3>
                            </div>
                            <div className='resumen-price-number'>
                                <span>400,00 €</span>
                                <span>-200,00 €</span>
                                <span>200,00 €</span>
                            </div>
                        </div>
                        <div>
                            <button onClick={handlePaymentSuccess} className='btn-save'>Completar pago</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

}
export default CartPaying;