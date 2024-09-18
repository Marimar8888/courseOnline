import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import CentersTable from './centers-table';

class CentersContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      centers_id: "",
      centers_first_name: "",
      centers_last_name: "",
      centers_email: "",
      centers_dni: "",
      centers_address: "",
      centers_city: "",
      centers_postal: "",
      centers_number_card: "",
      centers_exp_date: "",
      centers_cvc: ""
    };

    this.handleCoursesClick = this.handleCoursesClick.bind(this);
    this.handleStudentsClick = this.handleStudentsClick.bind(this);
    this.handleCentersClick = this.handleCentersClick.bind(this);
    this.handleProfessorsClick = this.handleProfessorsClick.bind(this);
  }

  componentDidMount(){
    const centerData = this.props;
    console.log("componentDidMount centerData:", centerData) 
}



  handleCentersClick = (type) => {
    const { courses } = this.props.centersData;
    this.props.history.push({
      pathname: `/courses/${type}`,
      state: { courses }
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
        <div className="dashboard-headers">
          <h3>Centers</h3>
          <CentersTable centersData={this.props.centersData}/>
        </div>
        <div className="dashboard-courses">
          <div className="dashboard-dates-title">
            <h3>Cursos</h3>
          </div>
          <div className="dashboard-courses-content">
            <div className='dashboard-course-process' onClick={() => this.handleCoursesClick(1)}>En curso...</div>
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
      </div>
    );
  }
}
export default withRouter(CentersContainer);