import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

import { getUserIdFromAPI, getUserRolsFromAPI } from '../services/user';
import { getStudentByIdFromAPI, addStudent } from '../services/student';
import { getProfessorByIdFromAPI } from '../services/professor';
import { addEnrollment } from '../services/enrollment';
import CartPayingFormFields from '../forms/cart-paying-form-fields';

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
          <CartPayingFormFields
            toggleDatesgDetails={toggleDatesgDetails}
            showDatesDetails={showDatesDetails}
            toggleAddressDetails={toggleAddressDetails}
            showAddressDetails={showAddressDetails}
            toggleCardDetails={toggleCardDetails}
            showCardDetails={showCardDetails}
            studentsFirstName={studentsFirstName}
            setStudentsFirstName={setStudentsFirstName}
            studentsLastName={studentsLastName}
            setStudentsLastName={setStudentsLastName}
            studentsDni={studentsDni}
            setStudentsDni={setStudentsDni}
            studentsAddress={studentsAddress}
            setStudentsAddress={setStudentsAddress}
            studentsCity={studentsCity}
            setStudentsCity={setStudentsCity}
            studentsPostal={studentsPostal}
            setStudentsPostal={setStudentsPostal}
            studentsEmail={studentsEmail}
            setStudentsEmail={setStudentsEmail}
            studentsNumberCard={studentsNumberCard}
            setStudentsNumberCard={setStudentsNumberCard}
            studentsExpDate={studentsExpDate}
            setStudentsExpDate={setStudentsExpDate}
            studentsCvc={studentsCvc}
            setStudentsCvc={setStudentsCvc}
            getTotal={getTotal}
            getTotalDiscount={getTotalDiscount}
            cartCourses={cartCourses}
            handlePaymentSuccess={handlePaymentSuccess}
        />
        </div>
    );

}
export default CartPaying;