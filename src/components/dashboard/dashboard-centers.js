import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import DashboardBills from './dashboard-bills';

class DashboardCenters extends Component {
  constructor(props) {
    super(props);

    this.handleCoursesClick = this.handleCoursesClick.bind(this);
    this.handleStudentsClick = this.handleStudentsClick.bind(this);
    this.handleCentersClick = this.handleCentersClick.bind(this);
    this.handleProfessorsClick = this.handleProfessorsClick.bind(this);
  }

  handleCentersClick = (type) => {
    const { courses } = this.props.centersData;
    this.props.history.push({
      pathname: `/courses/${type}`,
      state: {courses}
    });
  }

  handleCoursesClick = (type) => {
    this.props.history.push(`/courses/${type}`);
  }

  handleStudentsClick = (type) => {
    this.props.history.push(`/students/${type}`);
  }

  handleProfessorsClick = (type) => {
    this.props.history.push(`/professors/${type}`);
  }

  render() {

    const { centersData } = this.props;

    if (!centersData) {
      return <p>Cargando datos del centros...</p>
    }

    const totalCenters = centersData ? centersData.length : 0;

    return (
      <div className="dashboard-dates" >
        <div className="dashboard-courses">
          <div className="dashboard-dates-title">
            <h3>Centros de Estudio</h3>
          </div>
          <div className="dashboard-courses-content">
            <div className='dashboard-course-process' onClick={() => this.handleCentersClick(1)}>
              <p>En activo:</p>
              <p>{totalCenters}</p>  
            </div>
            <div className='dashboard-course-completed'  onClick={() => this.handleCentersClick(2)}>
              <p>De baja:</p>
              <p>{totalCenters}</p>
            </div>
            <div className='dashboard-course-favorites' onClick={() => this.handleCentersClick(3)}>
              <p>Total:</p>
              <p>{totalCenters}</p>
            </div>
          </div>
        </div>
        <div className="dashboard-courses">
          <div className="dashboard-dates-title">
            <h3>Cursos</h3>
          </div>
          <div className="dashboard-courses-content">
            <div className='dashboard-course-process'onClick={() => this.handleCoursesClick(1)}>En curso...</div>
            <div className='dashboard-course-completed' onClick={() => this.handleCoursesClick(2)}>Finalizados...</div>
            <div className='dashboard-course-all' onClick={() => this.handleCoursesClick(3)}>Todos...</div>
          </div>
        </div>
        <div className="dashboard-courses">
          <div className="dashboard-dates-title">
            <h3>Profesores</h3>
          </div>
          <div className="dashboard-courses-content">
            <div className='dashboard-course-process' onClick={() => this.handleProfessorsClick(1)}>En curso...</div>
            <div className='dashboard-course-completed' onClick={() => this.handleProfessorsClick(2)}>Finalizados...</div>
            <div className='dashboard-course-all' onClick={() => this.handleProfessorsClick(3)}>Todos...</div>
          </div>
        </div>
        <div className="dashboard-courses">
          <div className="dashboard-dates-title">
            <h3>Estudiantes</h3>
          </div>
          <div className="dashboard-courses-content">
            <div className='dashboard-course-process' onClick={() => this.handleStudentsClick(1)}>En curso...</div>
            <div className='dashboard-course-completed' onClick={() => this.handleStudentsClick(2)}>Finalizados...</div>
            <div className='dashboard-course-all' onClick={() => this.handleStudentsClick(3)}>Todos...</div>
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
export default withRouter(DashboardCenters);