import React, { Component } from 'react';
import { API_URL } from '../utils/constant';
import { withRouter } from 'react-router-dom';

import CenterFormFields from '../forms/center-form.fields';
import { updateCreateCenter } from '../services/center';

class CenterEditCreateContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
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
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    const { centerToEdit } = this.props;
    if (centerToEdit) {
      this.setState({
        ...centerToEdit,
        editMod: true,
        methodAPI: "patch",
        urlAPI: `${API_URL}/studycenter/${centerToEdit.studyCenters_id}`,
      });
    }
  }

  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      isButtonEnabled: true
    });
  };

  handleSubmit(event) {
    event.preventDefault();
    const token = localStorage.getItem("token");
    const studyCenterId = this.state.studyCenters_id;
    const { methodAPI, urlAPI, studyCenters_user_id } = this.state;
    if (this.state.editMod) {
      this.setState({
        urlAPI: this.state.urlAPI,
        methodAPI: this.state.methodAPI
      });
    }
    updateCreateCenter({
      methodAPI, 
      urlAPI, 
      token,  
      state: this.state, 
      studyCenterUserId: studyCenters_user_id
    })
      .then(response => {
        if (this.state.editMod) {
          this.setState({
            editMod: false
          });
          this.props.updateCenterData(studyCenterId);
        } else {
          this.props.handleCenterCreated();
        }
        this.props.history.push('/dashboard/center');
      });
    }

  render() {
    return (
      <div className="dashboard-content-all-dates">
        <CenterFormFields
          handleSubmit={this.handleSubmit}
          handleBack={this.props.handleBack}
          handleChange={this.handleChange}
          state={this.state}
        />
      </div>
    );
  }
}
export default withRouter(CenterEditCreateContainer);
