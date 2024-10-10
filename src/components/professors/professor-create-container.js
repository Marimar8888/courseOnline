import React, { Component } from 'react';
import axios from "axios";
import { API_URL } from '../utils/constant';
import { withRouter } from 'react-router-dom';

import ProfessorFormFields from '../forms/professor-form-fields';

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
    const formData = this.buildForm();

    axios
      ({
        method: "post",
        url: `${API_URL}/professor`,
        data: formData,
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      })
      .then(response => {
        this.setState({
          professors_first_name: "",
          professors_last_name: "",
          professors_email: "",
          professors_user_id: "",
          professors_dni: "",
          professors_address: "",
          professors_city: "",
          professors_postal: "",
          professors_number_card: "",
          professors_exp_date: "",
          professors_cvc: "",
          isButtonEnabled: false,
        });
        this.props.handleProfessorCreated();
        this.props.history.push(`/dashboard/professor`);
      })
      .catch(error => {
        console.log("error handleSubmit", error);
      })
  }

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

    professorFormData.append( "professors_user_id", this.state.professors_user_id);

    fields.forEach(field => {
      professorFormData.append(field, this.state[field]);
    });
    console.log([...professorFormData]);
    return professorFormData;
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
