import React, { Component } from 'react';
import axios from "axios";
import { API_URL } from '../utils/constant';
import { withRouter } from 'react-router-dom';

import DashboardBills from './dashboard-bills';

class StudentContainer extends Component {

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
      courses: [],
      isButtonEnabled: false,
    };

    this.initialState = { ...this.state };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCoursesClick = this.handleCoursesClick.bind(this);
    this.filterCoursesByEnrollmentStatus = this.filterCoursesByEnrollmentStatus.bind(this);
    this.getAllCourses = this.getAllCourses.bind(this);
  }

  componentDidMount() {

    const { studentData } = this.props;
    if (studentData && studentData.student) {
      this.setState({
        students_id: studentData.student.students_id,
        students_first_name: studentData.student.students_first_name,
        students_last_name: studentData.student.students_last_name,
        students_email: studentData.student.students_email,
        students_dni: studentData.student.students_dni,
        students_address: studentData.student.students_address,
        students_city: studentData.student.students_city,
        students_postal: studentData.student.students_postal,
        students_number_card: studentData.student.students_number_card,
        students_exp_date: studentData.student.students_exp_date,
        students_cvc: studentData.student.students_cvc,
        courses: studentData.courses || [],
        isButtonEnabled: false,
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.studentData !== prevProps.studentData) {
      const { studentData } = this.props;
      if (studentData && studentData.student) {
        this.setState({
          students_id: studentData.student.students_id,
          students_first_name: studentData.student.students_first_name,
          students_last_name: studentData.student.students_last_name,
          students_email: studentData.student.students_email,
          students_dni: studentData.student.students_dni,
          students_address: studentData.student.students_address,
          students_city: studentData.student.students_city,
          students_postal: studentData.student.students_postal,
          students_number_card: studentData.student.students_number_card,
          students_exp_date: studentData.student.students_exp_date,
          students_cvc: studentData.student.students_cvc,
          courses: studentData.courses || [],
        });
      }
    }
  }

  filterCoursesByEnrollmentStatus = (courses, status) => {
    return courses.filter(course => course.enrollments_finalized === status);
  };

  getAllCourses = (courses) => {
    return courses;
  };

  handleCoursesClick = (type) => {
    const { courses } = this.props.studentData;

    let filteredCourses = [];
    switch (type) {
      case 1:
        filteredCourses = this.filterCoursesByEnrollmentStatus(courses, false);
        break;
      case 2:
        filteredCourses = this.filterCoursesByEnrollmentStatus(courses, true);
        break;
      case 4:
        filteredCourses = this.getAllCourses(courses);
        break;
      default:
        filteredCourses = [];
        break;
    }

    this.setState({ courses: filteredCourses }, () => {
      this.props.history.push({
        pathname: `/courses/${type}`,
        state: { courses: this.state.courses }
      });
    });
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
          students_first_name: response.data.students_first_name,
          students_last_name: response.data.students_last_name,
          students_email: response.data.students_email,
          students_dni: response.data.students_dni,
          students_address: response.data.students_address,
          students_city: response.data.students_city,
          students_postal: response.data.students_postal,
          students_number_card: response.data.students_number_card,
          students_exp_date: response.data.students_exp_date,
          students_cvc: response.data.students_cvc,
          isButtonEnabled: false,
        });
        if (this.props.updateStudentData) {
          this.props.updateStudentData(this.state.students_id);
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

    const coursesFinalized = courses ? (courses.filter(course => course.enrollments_finalized === true)).length : 0;
    const unfinishedCourses = courses ? (courses.filter(course => course.enrollments_finalized === false)).length : 0;
    const totalCourses = courses ? courses.length : 0;

    return (
        <form onSubmit={this.handleSubmit} className="dashboard-dates">
          <div className="dashboard-dates-header">
            <h2>Datos</h2>
            <button
              className={`btn-save ${this.state.isButtonEnabled ? 'btn' : ''}`}
              disabled={!this.state.isButtonEnabled}
            >
              GUARDAR
            </button>
          </div>
          <div>
            <h3>Nombre, apellidos y dni</h3>
          </div>
          <div className='dashboard-form-group-name'>
            <div className="form-group">
              <input
                type="text"
                name="students_first_name"
                placeholder="Nombre"
                value={this.state.students_first_name || ""}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="students_last_name"
                placeholder="Apellidos"
                value={this.state.students_last_name || ""}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="students_dni"
                placeholder="DNI"
                value={this.state.students_dni || ""}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div>
            <h3>Domicilio</h3>
          </div>
          <div className='dashboard-form-group-address'>
            <div className="form-group">
              <input
                type="text"
                name="students_address"
                placeholder="Dirección"
                value={this.state.students_address || ""}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="students_city"
                placeholder="Ciudad"
                value={this.state.students_city || ""}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                name="students_postal"
                placeholder="Cod Postal"
                value={this.state.students_postal || ""}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="email"
                name="students_email"
                placeholder="Email"
                value={this.state.students_email || ""}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div>
            <h3>Datos bancarios</h3>
          </div>
          <div className='dashboard-form-group-card'>
            <div className="form-group">
              <input
                type="text"
                name="students_number_card"
                placeholder="Nº tarjeta"
                value={this.state.students_number_card || ""}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="students_exp_date"
                placeholder="Vencimiento"
                value={this.state.students_exp_date || ""}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                name="students_cvc"
                placeholder="CVC"
                value={this.state.students_cvc || ""}
                onChange={this.handleChange}
              />
            </div>
          </div>
          <div className="dashboard-courses">
            <div className="dashboard-dates-title">
              <h3>Cursos</h3>
            </div>
            <div className="dashboard-courses-content">
              <div className='dashboard-course-process' onClick={() => this.handleCoursesClick(1)}>
                <p>En curso</p>
                <p>{unfinishedCourses}</p>
              </div>
              <div className='dashboard-course-completed' onClick={() => this.handleCoursesClick(2)} >
                <p>Finalizados</p>
                <p>{coursesFinalized}</p>
              </div>
              <div className='dashboard-course-favorites' onClick={() => this.handleCoursesClick(4)}>
                <p>Favoritos</p>
                <p>{totalCourses}</p>
              </div>
            </div>
          </div>
          <div className="dashboard-bills">
            <h3>Facturas</h3>
            <DashboardBills />
          </div>
        </form>
    );
  }
}

export default withRouter(StudentContainer);