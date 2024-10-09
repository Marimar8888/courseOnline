import React, { Component } from 'react';
import axios from "axios";
import { API_URL } from '../utils/constant';
import { withRouter } from 'react-router-dom';

import CenterFormFields from '../forms/center-form.fields';

class CenterEditCreateContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      studyCenters_id: "",
      studyCenters_name: "",
      studyCenters_email: "",
      studyCenters_user_id: "",
      studyCenters_cif: "",
      studyCenters_address: "",
      studyCenters_city: "",
      studyCenters_postal: "",
      studyCenters_number_card: "",
      studyCenters_exp_date: "",
      studyCenters_cvc: "",
      studyCenters_active: true,
      methodAPI: "post",
      urlAPI: `${API_URL}/studycenter`,
      editMod: false,
      isButtonEnabled: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    if (this.props.centerToEdit) {
      this.setState({
        ...this.props.centerToEdit,
        editMod: true
      })
    }
  }

  handleChange = (event) => {
    const studyCenterId = this.state.studyCenters_id;
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      editMod: true,
      methodAPI: "patch",
      urlAPI: studyCenterId ? `${API_URL}/studycenter/${studyCenterId}` : this.state.urlAPI,
      isButtonEnabled: true,
    });
  };

  handleSubmit(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const formData = this.buildForm();
    const studyCenterId = this.state.stydyCenters_id

    if (this.state.editMod) {
      this.setState({
        urlAPI: this.state.urlAPI,
        methodAPI: this.state.methodAPI
      });
    }
    axios
      ({
        method: this.state.methodAPI,
        url: this.state.urlAPI,
        data: formData,
        headers: {
          'Authorization': `Bearer ${token}`
        }
      })
      .then(response => {
        this.setState({
          studyCenters_id: "",
          studyCenters_name: "",
          studyCenters_email: "",
          studyCenters_user_id: this.props.userId || "",
          studyCenters_cif: "",
          studyCenters_address: "",
          studyCenters_city: "",
          studyCenters_postal: "",
          studyCenters_number_card: "",
          studyCenters_exp_date: "",
          studyCenters_cvc: "",
          studyCenters_active: true,
          methodAPI: "post",
          urlAPI: `${API_URL}/studycenter`,
          editMod: false,
          isButtonEnabled: false,
        });
        if (this.state.editMod) {
          this.props.updateStudentData(this.state.studyCenters_id);
        } else {
          this.props.handleCenterCreated();
        }
        this.setState({
          methodAPI: "post",
          urlAPI: `${API_URL}/studycenter`,
          editMod: false
        });
        this.props.history.push('/dashboard/center');
      })
      .catch(error => {
        console.log("error handleSubmit", error);
      })
  }

  buildForm() {
    let centerFormData = new FormData();

    const fields = [
      "studyCenters_name",
      "studyCenters_email",
      "studyCenters_cif",
      "studyCenters_address",
      "studyCenters_city",
      "studyCenters_postal",
      "studyCenters_number_card",
      "studyCenters_exp_date",
      "studyCenters_cvc"
    ];
    centerFormData.append("studyCenters_user_id", this.state.studyCenters_user_id);

    fields.forEach(field => {
      centerFormData.append(field, this.state[field]);
    });
    return centerFormData
  }

  render() {
    return (
      <div className="dashboard-content-all-dates">
        <CenterFormFields
          handleSubmit = {this.handleSubmit}
          handleBack = {this.props.handleBack}
          handleChange = {this.handleChange}
          state = {this.state}
        />
      </div>
    );
  }
}
export default withRouter(CenterEditCreateContainer);
