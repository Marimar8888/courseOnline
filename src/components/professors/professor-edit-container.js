import React, { Component } from 'react';
import axios from "axios";
import { API_URL } from '../utils/constant';
import { withRouter } from 'react-router-dom';

import DashboardBills from '../dashboard/dashboard-bills';
import { getEnrollmentsByProfessorId } from "../services/enrollment";
import { ActiveStudents, InactiveStudents } from "../services/student"; 

class ProfessorEditContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      professors_id: "",
      professors_first_name: "",
      professors_last_name: "",
      professors_email: "",
      professors_dni: "",
      professors_address: "",
      professors_city: "",
      professors_postal: "",
      professors_number_card: "",
      professors_exp_date: "",
      professors_cvc: "",
      courses: [],
      students: [],
      enrollments: [],
      activeStudents: [],
      inactiveStudents: [],
      isButtonEnabled: false
    };
    this.initialState = { ...this.state };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCoursesClick = this.handleCoursesClick.bind(this);
    this.handleStudentsClick = this.handleStudentsClick.bind(this);
    this.handleCentersClick = this.handleCentersClick.bind(this);
    this.filterCoursesByEnrollmentStatus = this.filterCoursesByEnrollmentStatus.bind(this);
    this.getAllCourses = this.getAllCourses.bind(this);
  }

  componentDidMount() {
    const { professorData } = this.props;
    const token = localStorage.getItem("token");

    if (professorData) {
      this.setState({
        ...professorData.professor,
        courses: professorData.courses.items || [],
        students: professorData.students || [],
        isButtonEnabled: false,
      });

      if(professorData.professor.professors_id) {
        getEnrollmentsByProfessorId(professorData.professor.professors_id, token)
          .then (enrollments => {
              this.setState({ enrollments });

              const activeStudents = ActiveStudents(enrollments);
              const inactiveStudents = InactiveStudents(enrollments);
             
              this.setState({ activeStudents, inactiveStudents });
          })
          .catch(error => {
            console.log("error getEnrollmentsByCourseId", error);
          })
      }
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.professorData !== prevProps.professorData) {
      const { professorData } = this.props;
      if (professorData && professorData.professor) {
        this.setState({
          ...professorData.professor,
          courses: professorData.courses.items || [],
          students: professorData.students || [],
        });
      }
    }
  }

  filterCoursesByEnrollmentStatus = (courses, status) => {
    return courses.filter(course => course.courses_active === status);
  };

  getAllCourses = (courses) => {
    return courses;
  };

  handleCoursesClick = (type) => {
    const { courses } = this.props.professorData;

    let filteredCourses = [];
    switch (type) {
      case 3:
        filteredCourses = courses.items || [];
        break;
      case 5:
        filteredCourses = this.filterCoursesByEnrollmentStatus(courses.items || [], true);
        break;
      case 6:
        filteredCourses = this.filterCoursesByEnrollmentStatus(courses.items || [], false);
        break;
      default:
        filteredCourses = [];
        break;
    }

    this.setState({ courses: filteredCourses }, () => {
      this.props.history.push({
        pathname: `/courses/${type}`,
        state: { courses: this.state.courses,
          }
      });
    });
  }

  handleStudentsClick = (type) => {
    this.props.history.push(`/students/${type}`);
  }

  handleCentersClick = (type) => {
    this.props.history.push(`/centers/${type}`);
  }

  handleSubmit(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const professorId = this.state.professors_id;
    const formData = this.buildForm();

    if (!professorId) {
      console.error('Professor ID is missing');
      return;
    }

    axios
      ({
        method: "patch",
        url: `${API_URL}/professor/${professorId}`,
        data: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        this.setState({
          ...response.data,
          isButtonEnabled: false,
        });

        this.initialState = { ...this.state };

        if (this.props.updateDashboarProfessorData) {
          this.props.updateDashboarProfessorData(this.state.professors_id);
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
    let professorFormData = new FormData();

    const fields = [
      "professors_first_name",
      "professors_last_name",
      "professors_email",
      "professors_dni",
      "professors_address",
      "professors_city",
      "professors_postal",
      "professors_number_card",
      "professors_exp_date",
      "professors_cvc"
    ];

    fields.forEach(field => {
      if (this.state[field] !== this.initialState[field]) {
        professorFormData.append(field, this.state[field]);
      }
    });

    return professorFormData;
  }

  render() {
    const { professorData } = this.props;
    if (!professorData) {
      return <p>Cargando datos del profesor...</p>
    }
    const coursesList = professorData.courses.items || []; 
    const totalCourses = professorData.courses.total;
    const coursesInactive = coursesList.filter(course => course.courses_active === false).length;
    const coursesActive = totalCourses - coursesInactive; 
    const activeStudentsNumber = this.state.activeStudents ? this.state.activeStudents.length : 0;
    const inactiveStudentsNumber = this.state.inactiveStudents ? this.state.inactiveStudents.length : 0;
    const totalStudents = activeStudentsNumber + inactiveStudentsNumber || 0;

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
              name="professors_first_name"
              placeholder="Nombre"
              value={this.state.professors_first_name || ""}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="professors_last_name"
              placeholder="Apellidos"
              value={this.state.professors_last_name || ""}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="professors_dni"
              placeholder="DNI"
              value={this.state.professors_dni || ""}
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
              name="professors_address"
              placeholder="Dirección"
              value={this.state.professors_address || ""}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="professors_city"
              placeholder="Ciudad"
              value={this.state.professors_city || ""}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="professors_postal"
              placeholder="Código Postal"
              value={this.state.professors_postal || ""}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="professors_email"
              placeholder="Email"
              value={this.state.professors_email || ""}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div>
          <h3>Datos de pago</h3>
        </div>
        <div className='dashboard-form-group-card'>
          <div className="form-group">
          <input
              type="text"
              name="professors_number_card"
              placeholder="Número de tarjeta"
              value={this.state.professors_number_card || ""}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="professors_exp_date"
              placeholder="Fecha de caducidad (MM/AA)"
              value={this.state.professors_exp_date || ""}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="professors_cvc"
              placeholder="CVC"
              value={this.state.professors_cvc || ""}
              onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="dashboard-courses">
          <div className="dashboard-dates-title">
            <h3>Cursos</h3>
          </div>
          <div className="dashboard-courses-content">
            <div className='dashboard-course-process' onClick={() => this.handleCoursesClick(5)}>
              <p className='dashboard-course-title'>Activos</p>
              <p className='dashboard-course-number'>({coursesActive})</p>
            </div>
            <div className='dashboard-course-completed' onClick={() => this.handleCoursesClick(6)}>
              <p className='dashboard-course-title'>Inactivos</p>
              <p className='dashboard-course-number'>({coursesInactive})</p>
            </div>
            <div className='dashboard-course-all' onClick={() => this.handleCoursesClick(3)}>
              <p className='dashboard-course-title'>Nº Total</p>
              <p className='dashboard-course-number'>({totalCourses})</p>
            </div>
          </div>
        </div>
        <div className="dashboard-courses">
          <div className="dashboard-dates-title">
            <h3>Estudiantes</h3>
          </div>
          <div className="dashboard-courses-content">
            <div className='dashboard-course-process' onClick={() => this.handleStudentsClick(1)}>
            <p className='dashboard-course-title'>Activos</p>
            <p className='dashboard-course-number'>({activeStudentsNumber})</p>
            </div>
            <div className='dashboard-course-completed' onClick={() => this.handleStudentsClick(2)}>
              <p className='dashboard-course-title'>Baja</p>
              <p className='dashboard-course-number'>({inactiveStudentsNumber})</p>
              </div>
            <div className='dashboard-course-favorites' onClick={() => this.handleStudentsClick(3)}>
              <p className='dashboard-course-title'>Total</p>
              <p className='dashboard-course-number'>({totalStudents})</p>
              </div>
          </div>
        </div>
        <div className="dashboard-bills">
          <h3>Facturas</h3>
          <DashboardBills  enrollments={this.state.enrollments}/>
        </div>
      </form>
    );
  }
}

export default withRouter(ProfessorEditContainer);
