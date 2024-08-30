import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import DashboardBills from './dashboard-bills';

class ProfessorContainer extends Component {
  constructor(props) {
    super(props);

    this.handleCoursesClick = this.handleCoursesClick.bind(this);
    this.handleStudentsClick = this.handleStudentsClick.bind(this);
    this.handleCentersClick = this.handleCentersClick.bind(this);
    
  }

    handleCoursesClick = (type) => {
      this.props.history.push(`/courses/${type}`);
    }

    handleStudentsClick = (type) => {
      this.props.history.push(`/students/${type}`);
    }

    handleCentersClick = (type) => {
      this.props.history.push(`/centers/${type}`);
    }

  render() {

    const { professorData } = this.props;

    if (!professorData) {
      console.log("Professor Data:", professorData);
      return <p>Cargando datos del profesor...</p>
    }

    const { 
      professors_first_name, 
      professors_last_name, 
      professors_email, 
      professors_dni, 
      professors_address, 
      professors_city, 
      professors_postal, 
      professors_number_card,
      professors_exp_date, 
      professors_cvc, 
      courses 
    } = professorData;

    const totalCourses = courses ? courses.length : 0;
  
    return (
      <div className="dashboard-dates">
        <div className="dashboard-dates-title">
          <h3>Datos</h3>
        </div>
        <div>
          <h3>Nombre, apellidos y dni</h3>
        </div>
        <div className='dashboard-form-group-name'>
          <div className="form-group">
            <input
              type="text"
              name="name"
              placeholder="Nombre"
              value={professors_first_name || ""}
            // onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="surname"
              placeholder="Apellidos"
              value={professors_last_name || ""}
            // onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="DNI"
              placeholder="DNI"
              value={professors_dni || ""}
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
              value={professors_address || ""}
            // onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="city"
              placeholder="Ciudad"
              value={professors_city || ""}
            // onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              name="postal"
              placeholder="Código Postal"
              value={professors_postal || ""}
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
              type="number"
              name="card"
              placeholder="Nº tarjeta"
              value={professors_number_card || ""}
            // onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="date"
              placeholder="Vencimiento"
              value={professors_exp_date || ""}
            // onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              name="CVC"
              placeholder="CVC"
              value={professors_cvc || ""}
            // onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="dashboard-courses">
          <div className="dashboard-dates-title">
            <h3>Cursos</h3>
          </div>
          <div className="dashboard-courses-content">
            <div className='dashboard-course-process' onClick={() => this.handleCoursesClick(1)}>En curso...</div>
            <div className='dashboard-course-completed' onClick={() => this.handleCoursesClick(2)} >Finalizados...</div>
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
            <div className='dashboard-course-completed'  onClick={() => this.handleStudentsClick(2)}>Finalizados...</div>
            <div className='dashboard-course-favorites'  onClick={() => this.handleStudentsClick(3)}>Todos...</div>
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
      </div>
    );
  }
}

export default withRouter(ProfessorContainer);