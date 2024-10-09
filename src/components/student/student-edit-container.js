import React, { Component } from 'react';
import axios from "axios";
import { API_URL } from '../utils/constant';
import { withRouter } from 'react-router-dom';

import DashboardBills from '../dashboard/dashboard-bills';
import StudentFormFields from '../forms/student-form-fields';
import DashboardDatesStudentForm from '../forms/dahsboard-dates-student-form';
import { getEnrollmentsByStudentId } from '../services/enrollment';
import { getFavoritesByUserId, getCoursesFavoritesByUserId } from '../services/favorites';

class StudentEditContainer extends Component {

    constructor(props) {
        super(props);

        this.state = {
            students_id: "",
            students_first_name: "",
            students_last_name: "",
            students_email: "",
            students_dni: "",
            students_address: "",
            students_city: "",
            students_postal: "",
            students_number_card: "",
            students_exp_date: "",
            students_cvc: "",
            students_user_id: "",
            courses: [],
            favorites: [],
            isButtonEnabled: false,
            enrollments: []
        };

        this.initialState = { ...this.state };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleCoursesClick = this.handleCoursesClick.bind(this);
        this.filterCoursesByEnrollmentStatus = this.filterCoursesByEnrollmentStatus.bind(this);
        this.setStateAndRedirect = this.setStateAndRedirect.bind(this);
    }

    componentDidMount() {
        const token = localStorage.getItem("token");
        const { studentData } = this.props;
        if (studentData && studentData.student) {
            this.setState({
                ...studentData.student,
                courses: studentData.courses || [],
                isButtonEnabled: false,
            });
            if(studentData.student.students_id) {
                getEnrollmentsByStudentId(studentData.student.students_id, token)
                    .then ( enrollments  => {
                        this.setState({ enrollments });
                    })
                    .catch(error => {
                        console.log("error getEnrollmentsByStudentId", error);
                    })
            }
            if(studentData.student.students_user_id) {
                const userId = studentData.student.students_user_id;
                getFavoritesByUserId(userId, token)
                .then ( favorites  => {
                    this.setState({ favorites });
                })
                .catch(error => {
                    console.log("error getFavoritesByUserId", error);
                })
            }
        }
    }

    componentDidUpdate(prevProps) {
        if (this.props.studentData !== prevProps.studentData) {
            const { studentData } = this.props;
            if (studentData && studentData.student) {
                this.setState({
                    ...studentData.student,
                    courses: studentData.courses || [],
                });
            }
        }
    }

    setStateAndRedirect(type, filteredCourses) {
        this.setState({ courses: filteredCourses }, () => {
            this.props.history.push({
                pathname: `/courses/s/${type}`,
                state: { courses: this.state.courses }
            });
        });
    }

    filterCoursesByEnrollmentStatus = (courses, status) => {
        return courses.filter(course => course.enrollments_finalized === status);
    };

    handleCoursesClick = (type) => {
        const { courses } = this.props.studentData;
        const token = localStorage.getItem("token");
        const userId = this.state.students_user_id;
        let filteredCourses = [];
        switch (type) {
            case 1:
                filteredCourses = this.filterCoursesByEnrollmentStatus(courses, false);
                this.setStateAndRedirect(type, filteredCourses);
                break;
            case 2:
                filteredCourses = this.filterCoursesByEnrollmentStatus(courses, true);
                this.setStateAndRedirect(type, filteredCourses);
                break;
            case 4:
                getCoursesFavoritesByUserId(userId, token)
                    .then(favoriteCourses => {
                        this.setStateAndRedirect(type, favoriteCourses);
                    })
                    .catch(error => {
                        console.error("Error al obtener cursos favoritos:", error);
                    });
                break;
            default:
                filteredCourses = [];
                this.setStateAndRedirect(type, filteredCourses);
                break;
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        const token = localStorage.getItem("token");
        const studentId = this.state.students_id;
        const formData = this.buildForm();

        if (!studentId) {
            console.error('Student ID is missing');
            return;
        }
        axios
            ({
                method: "patch",
                url: `${API_URL}/student/${studentId}`,
                data: formData,
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            })
            .then(response => {
                this.setState({
                    ...response.data,
                    isButtonEnabled: false,
                });
                this.initialState = { ...this.state };

                if (this.props.updateDashboarStudentData) {
                    this.props.updateDashboarStudentData(this.state.students_id);
                }
            })
            .catch(error => {
                console.log("error handleSubmit", error);
            })
    }

    handleChange = (event) => {
        const { name, value } = event.target;
        this.setState({
            [name]: value,
            isButtonEnabled: true,
        });
    };

    buildForm() {
        let studentFormData = new FormData();

        const fields = [
            "students_first_name",
            "students_last_name",
            "students_email",
            "students_dni",
            "students_address",
            "students_city",
            "students_postal",
            "students_number_card",
            "students_exp_date",
            "students_cvc",
            "students_user_id"
        ];
        fields.forEach(field => {
            if (this.state[field] !== this.initialState[field]) {
                studentFormData.append(field, this.state[field]);
            }
        });
        return studentFormData;
    }

    render() {
        const { studentData } = this.props;
        if (!studentData) {
            return <p>Cargando datos del estudiante...</p>
        }
        const { courses } = this.state;
        const { favorites } = this.state;

        const coursesFinalized = courses ? (courses.filter(course => course.enrollments_finalized === true)).length : 0;
        const unfinishedCourses = courses ? (courses.filter(course => course.enrollments_finalized === false)).length : 0;
        const totalFavorites = favorites ? favorites.length : 0;

        return (
            <div className="dashboard-content-all-dates">
                    <StudentFormFields
                        handleSubmit={this.handleSubmit}
                        handleChange = {this.handleChange}
                        state = {this.state}
                    />
                    <DashboardDatesStudentForm
                        handleCoursesClick={this.handleCoursesClick}
                        unfinishedCourses = {unfinishedCourses}
                        coursesFinalized = {coursesFinalized}
                        totalFavorites = {totalFavorites}
                    />
               
                <div className="dashboard-entity-tables-wrapper">
                    <div className="dashboard-table-dates-title">
                        <h3>Facturas</h3>
                        <DashboardBills enrollments={this.state.enrollments} />
                    </div>
                </div>
            </div>
        );
    }
}

export default withRouter(StudentEditContainer);