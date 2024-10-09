import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import CentersTable from './centers-table';

class CentersContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studyCenters_id: "",
      studyCenters_name: "",
      studyCenters_email: "",
      studyCenters_cif: "",
      studyCenters_address: "",
      studyCenters_city: "",
      studyCenters_postal: "",
      studyCenters_number_card: "",
      studyCenters_exp_date: "",
      studyCenters_cvc: "",
      studyCenters_active: true,
      isButtonEnabled: false,
    };

    this.handleCoursesClick = this.handleCoursesClick.bind(this);
    this.handleStudentsClick = this.handleStudentsClick.bind(this);
    this.handleCentersClick = this.handleCentersClick.bind(this);
    this.handleProfessorsClick = this.handleProfessorsClick.bind(this);
  }

  componentDidMount(){
    const {centersData} = this.props;
    if (centersData) {
       this.setState({
         ...centersData
       });
    }
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

    return (
      <div className="dashboard-content-entity-form" >
          <CentersTable 
            centersData={this.props.centersData}
            handleEditCenter={this.props.handleEditCenter} 
            updateStudentData={this.props.updateStudentData}
            handleChangeStatusCenter={this.props.handleChangeStatusCenter}
            />
      </div>
    );
  }
}
export default withRouter(CentersContainer);