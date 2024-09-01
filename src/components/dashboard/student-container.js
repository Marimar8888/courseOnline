import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import DashboardBills from './dashboard-bills';

class StudentContainer extends Component {

  constructor(props) {
    super(props);
    this.state = {
      courses: this.props.courses || []
    };

    this.handleCoursesClick = this.handleCoursesClick.bind(this);
    this.filterCoursesByEnrollmentStatus = this.filterCoursesByEnrollmentStatus.bind(this);
    this.getAllCourses = this.getAllCourses.bind(this);
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
    switch(type) {
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


  render() {

    const { studentData } = this.props;
    if (!studentData) {
      return <p>Cargando datos del estudiante...</p>
    }

    const { 
      student: {
        students_first_name, 
        students_last_name, 
        students_email,
        students_dni, 
        students_address, 
        students_city, 
        students_postal, 
        students_number_card,
        students_exp_date, 
        students_cvc 
      }, 
      courses 
    } = studentData;

    const coursesFinalized = courses ? (courses.filter(course => course.enrollments_finalized === true)).length : 0;
    const unfinishedCourses = courses ? (courses.filter(course => course.enrollments_finalized === false)).length : 0;
    const totalCourses = courses ? courses.length : 0;

    return (
      <div className="dashboard-dates">
        <div className="dashboard-dates-title">
          <h2>Datos</h2>
          <h3>Nombre, apellidos y dni</h3>
        </div>
        <div className='dashboard-form-group-name'>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              value={students_first_name || ""}
            // onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="surname"
              placeholder="Apellidos"
              value={students_last_name || ""}
            // onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="DNI"
              placeholder="DNI"
              value={students_dni || ""}
            // onChange={this.handleChange}
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
              name="address"
              placeholder="Dirección"
              value={students_address || ""}
            // onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="city"
              placeholder="Ciudad"
              value={students_city || ""}
            // onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              name="postal"
              placeholder="Cod Postal"
              value={students_postal || ""}
            // onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={students_email || ""}
            // onChange={this.handleChange}
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
              name="card"
              placeholder="Nº tarjeta"
              value={students_number_card || ""}
            // onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="date"
              placeholder="Vencimiento"
              value={students_exp_date || ""}
            // onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              name="CVC"
              placeholder="CVC"
              value={students_cvc || ""}
            // onChange={this.handleChange}
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
      </div>
    );
  }
}

export default withRouter(StudentContainer);