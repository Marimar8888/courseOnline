import React, { Component } from 'react';
import axios from "axios";
import { API_URL } from '../utils/constant';
import { withRouter } from 'react-router-dom';

import DashboardBills from '../dashboard/dashboard-bills';

class ProfessorEditContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      professors_id: "",
      professors_first_name: "",
      professors_last_name: "",
      professors_email: "",
      professors_user_id: this.props.userId || "",
      professors_dni: "",
      professors_address: "",
      professors_city: "",
      professors_postal: "",
      professors_number_card: "",
      professors_exp_date: "",
      professors_cvc: "",
      courses: [],
      students: [],
      apiUrl: `${API_URL}/professor`,
      apiAction: "post",
      isButtonEnabled: false,
      createMode: true
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

    if (professorData) {
      this.setState({
        professors_id: professorData.professor.professors_id,
        professors_first_name: professorData.professor.professors_first_name,
        professors_last_name: professorData.professor.professors_last_name,
        professors_email: professorData.professor.professors_email,
        professors_user_id: professorData.professor.professors_user_id,
        professors_dni: professorData.professor.professors_dni,
        professors_address: professorData.professor.professors_address,
        professors_city: professorData.professor.professors_city,
        professors_postal: professorData.professor.professors_postal,
        professors_number_card: professorData.professor.professors_number_card,
        professors_exp_date: professorData.professor.professors_exp_date,
        professors_cvc: professorData.professor.professors_cvc,
        courses: professorData.courses || [],
        students: professorData.students || [],
        apiUrl: `${API_URL}/professor/${this.state.professors_id}`,
        apiAction: "patch",
        isButtonEnabled: false,
        createMode: false
      });
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.professorData !== prevProps.professorData) {
      const { professorData } = this.props;

      if (professorData.professor) {
        this.setState({
          professors_id: professorData.professor.professors_id,
          professors_first_name: professorData.professor.professors_first_name,
          professors_last_name: professorData.professor.professors_last_name,
          professors_email: professorData.professor.professors_email,
          professors_user_id: professorData.professor.professors_user_id || this.props.userId,
          professors_dni: professorData.professor.professors_dni,
          professors_address: professorData.professor.professors_address,
          professors_city: professorData.professor.professors_city,
          professors_postal: professorData.professor.professors_postal,
          professors_number_card: professorData.professor.professors_number_card,
          professors_exp_date: professorData.professor.professors_exp_date,
          professors_cvc: professorData.professor.professors_cvc,
          courses: professorData.courses || [],
          students: professorData.students || [],
          apiUrl: `${API_URL}/professor/${professorData.professor.professors_id}`,
          apiAction: "patch",
          isButtonEnabled: false,
          createMode: false
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
        filteredCourses = this.getAllCourses(courses);
        break;
      case 5:
        filteredCourses = this.filterCoursesByEnrollmentStatus(courses, true);
        break;
      case 6:
        filteredCourses = this.filterCoursesByEnrollmentStatus(courses, false);
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

  handleStudentsClick = (type) => {
    this.props.history.push(`/students/${type}`);
  }

  handleCentersClick = (type) => {
    this.props.history.push(`/centers/${type}`);
  }

  handleSubmit(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");

    axios
      ({
        method: this.state.apiAction,
        url: this.state.apiUrl,
        data: this.buildForm(),
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        console.log("handleSubmit response", response.data);
        const isNewProfessor = this.state.createMode;
        console.log("handleSubmit isNewProfessor:", isNewProfessor);

        this.setState({
          professors_first_name: response.data.professors_first_name,
          professors_last_name: response.data.professors_last_name,
          professors_email: response.data.professors_email,
          professors_user_id: response.data.professors_user_id,
          professors_dni: response.data.professors_dni,
          professors_address: response.data.professors_address,
          professors_city: response.data.professors_city,
          professors_postal: response.data.professors_postal,
          professors_number_card: response.data.professors_number_card,
          professors_exp_date: response.data.professors_exp_date,
          professors_cvc: response.data.professors_cvc,
          createMode: false,
          isButtonEnabled: false,
        });

        this.initialState = { ...this.state };
        console.log("handleSubmit response professors_id", this.state.professors_id);
        //this.props.updateProfessorData(this.state.professors_id);
        this.setState({
          professors_id: response.data.professors_id,
          apiUrl: `${API_URL}/professor/${response.data.professors_id}`,
          apiAction: "patch",
          createMode: false,
          isButtonEnabled: false,
        });

<<<<<<< HEAD:src/components/dashboard/professor-container.js
        if (isNewProfessor) {
          this.props.history.push(`/dashboard/professor`);
          this.props.getUserRols(this.props.userId)
=======
        if (this.props.updateDashboarProfessorData) {
          this.props.updateDashboarProfessorData(this.state.professors_id);
>>>>>>> temp:src/components/professors/professor-edit-container.js
        }
      })
      .catch(error => {
        console.log("error handleSubmit", error);
      })
    console.log("handleSubmit createMode", this.state.createMode);
    console.log("handleSubmit url", this.state.apiUrl);
    console.log("handleSubmit method", this.state.apiAction);
    console.log("handleSubmit professorId", this.state.professors_id);

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
      "professors_user_id",
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
      if (this.state.createMode) {
        if (this.state[field]) {
          professorFormData.append(field, this.state[field]);
        }
      } else {
        if (this.state[field] !== this.initialState[field]) {
          professorFormData.append(field, this.state[field]);
        }
      }
    });

    for (let pair of professorFormData.entries()) {
      console.log(pair[0] + ': ' + pair[1]);
    }

    return professorFormData;
  }

  render() {
    const { professorData } = this.props;
    const { courses } = this.state;
    const totalCourses = courses ? courses.length : 0;
    const coursesActive = courses ? (courses.filter(course => course.courses_active === true)).length : 0;
    const coursesInactive = courses ? (courses.filter(course => course.courses_active === false)).length : 0;

<<<<<<< HEAD:src/components/dashboard/professor-container.js
    if (!professorData) {
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
          <input
            type="hidden"
            name="professors_user_id"
            value={this.state.professors_user_id || ""}
          />
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
                type="number"
                name="professors_postal"
                placeholder="Cod Postal"
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
            <h3>Datos bancarios</h3>
          </div>
          <div className='dashboard-form-group-card'>
            <div className="form-group">
              <input
                type="number"
                name="professors_number_card"
                placeholder="Nº tarjeta"
                value={this.state.professors_number_card || ""}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="professors_exp_date"
                placeholder="Vencimiento"
                value={this.state.professors_exp_date || ""}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="number"
                name="professors_cvc"
                placeholder="CVC"
                value={this.state.professors_cvc || ""}
                onChange={this.handleChange}
              />
            </div>
          </div>
        </form>
      );

    } else {

      return (

        <form onSubmit={this.handleSubmit} className="dashboard-dates" >
          <div className="dashboard-dates-header">
            <h2>Datos</h2>
            <button
              className={`btn-save ${this.state.isButtonEnabled ? 'btn' : ''}`}
              disabled={!this.state.isButtonEnabled}
            >
              GUARDAR
            </button>
          </div>
          <input
            type="hidden"
            name="professors_user_id"
            value={this.props.professors_user_id || ""}
          />
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
                type="number"
                name="professors_postal"
                placeholder="Cod Postal"
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
            <h3>Datos bancarios</h3>
          </div>
          <div className='dashboard-form-group-card'>
            <div className="form-group">
              <input
                type="number"
                name="professors_number_card"
                placeholder="Nº tarjeta"
                value={this.state.professors_number_card || ""}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="text"
                name="professors_exp_date"
                placeholder="Vencimiento"
                value={this.state.professors_exp_date || ""}
                onChange={this.handleChange}
              />
            </div>
            <div className="form-group">
              <input
                type="number"
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
                <p>Activos</p>
                <p>{coursesActive}</p>
              </div>
              <div className='dashboard-course-completed' onClick={() => this.handleCoursesClick(6)} >
                <p>Inactivos</p>
                <p>{coursesInactive}</p>
              </div>
              <div className='dashboard-course-all' onClick={() => this.handleCoursesClick(3)}>
                <p>Nº Total</p>
                <p>{totalCourses}</p>
              </div>
            </div>
          </div>
          <div className="dashboard-courses">
            <div className="dashboard-dates-title">
              <h3>Estudiantes</h3>
            </div>
            <div className="dashboard-courses-content">
              <div className='dashboard-course-process' onClick={() => this.handleStudentsClick(1)}>En curso...</div>
              <div className='dashboard-course-completed' onClick={() => this.handleStudentsClick(2)}>Finalizados...</div>
              <div className='dashboard-course-favorites' onClick={() => this.handleStudentsClick(3)}>Todos...</div>
            </div>
          </div>
          <div className="dashboard-courses">
            <div className="dashboard-dates-title">
              <h3>Centros</h3>
            </div>
            <div className="dashboard-courses-content">
              <div className='dashboard-course-process' onClick={() => this.handleCentersClick(1)}>En curso...</div>
              <div className='dashboard-course-completed' onClick={() => this.handleCentersClick(2)}>Finalizados...</div>
              <div className='dashboard-course-all' onClick={() => this.handleCentersClick(3)}>Todos...</div>
            </div>
          </div>
          <div className="dashboard-bills">
            <h3>Facturas</h3>
            <DashboardBills />
          </div>
        </form>
      );
    }

=======
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
        <div className="dashboard-address">
          <h3>Dirección</h3>
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
        </div>
        <div className="dashboard-payment">
          <h3>Datos de pago</h3>
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
              <p>Activos</p>
              <p>{coursesActive}</p>
            </div>
            <div className='dashboard-course-completed' onClick={() => this.handleCoursesClick(6)}>
              <p>Inactivos</p>
              <p>{coursesInactive}</p>
            </div>
            <div className='dashboard-course-all' onClick={() => this.handleCoursesClick(3)}>
              <p>Nº Total</p>
              <p>{totalCourses}</p>
            </div>
          </div>
        </div>
        <div className="dashboard-courses">
          <div className="dashboard-dates-title">
            <h3>Estudiantes</h3>
          </div>
          <div className="dashboard-courses-content">
            <div className='dashboard-course-process' onClick={() => this.handleStudentsClick(1)}>En curso...</div>
            <div className='dashboard-course-completed' onClick={() => this.handleStudentsClick(2)}>Finalizados...</div>
            <div className='dashboard-course-favorites' onClick={() => this.handleStudentsClick(3)}>Todos...</div>
          </div>
        </div>
        <div className="dashboard-courses">
          <div className="dashboard-dates-title">
            <h3>Centros</h3>
          </div>
          <div className="dashboard-courses-content">
            <div className='dashboard-course-process' onClick={() => this.handleCentersClick(1)}>En curso...</div>
            <div className='dashboard-course-completed' onClick={() => this.handleCentersClick(2)}>Finalizados...</div>
            <div className='dashboard-course-all' onClick={() => this.handleCentersClick(3)}>Todos...</div>
          </div>
        </div>
        <div className="dashboard-bills">
          <h3>Facturas</h3>
          <DashboardBills />
        </div>
      </form>
    );
>>>>>>> temp:src/components/professors/professor-edit-container.js
  }
}

export default withRouter(ProfessorEditContainer);
