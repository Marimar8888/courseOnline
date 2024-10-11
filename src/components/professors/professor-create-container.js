import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import ProfessorFormFields from '../forms/professor-form-fields';
import { addProfessor } from '../services/professor';

class ProfessorCreateContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
      professors_active: true,
      isButtonEnabled: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      isButtonEnabled: true,
    });
  };

  handleSubmit(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const professorData = {
      professors_id: this.state.professors_id,
      professors_user_id: this.state.professors_user_id,
      professors_first_name: this.state.professors_first_name,
      professors_last_name: this.state.professors_last_name,
      professors_email: this.state.professors_email,
      professors_dni: this.state.professors_dni,
      professors_address: this.state.professors_address,
      professors_city: this.state.professors_city,
      professors_postal: this.state.professors_postal,
      professors_number_card: this.state.professors_number_card,
      professors_exp_date: this.state.professors_exp_date,
      professors_cvc: this.state.professors_cvc,
    };

    addProfessor(this.state, professorData, token)
      .then(response => {
        this.props.handleProfessorCreated();
        this.props.history.push(`/dashboard/professor`);
      })
  }

  render() {
    return (
      <div className="dashboard-content-all-dates">
        <ProfessorFormFields
          handleChange={this.handleChange}
          handleSubmit={this.handleSubmit}
          state={this.state}
        />
      </div>

    );
  }
}

export default withRouter(ProfessorCreateContainer);
