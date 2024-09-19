import React, { Component } from 'react';
import axios from "axios";
import { API_URL } from '../utils/constant';
import { withRouter } from 'react-router-dom';

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
    if (this.props.centerToEdit) {
      console.log("componentDidMount center edit:", this.props.centerToEdit);
      this.setState({
        ...this.props.centerToEdit,
        editMod: true
      })
      console.log("componentDidMount center edit:", this.props.centerToEdit);
    }
  }

  handleBack(event) {

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
    console.log("handleSubmit editMod:", this.state.editMod);

    if (this.state.editMod) {
      this.setState({
        urlAPI: this.state.urlAPI,
        methodAPI: this.state.methodAPI
      }, () => {
        console.log("handleSubmit center url:", this.state.urlAPI);
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
      <form onSubmit={this.handleSubmit} className="dashboard-dates">
        <div className="dashboard-dates-header">
          <h2>Datos</h2>
          <div className='dashboard-dates-header-button'>
          <button
            className={`btn-save ${this.state.isButtonEnabled ? 'btn' : ''}`}
            disabled={!this.state.isButtonEnabled}
          >
            GUARDAR
          </button>
          <button  type="button"  onClick={this.props.handleBack} className="btn-save" >
            VOLVER
          </button>
          </div>
        </div>
        <div>
          <h3>Nombre, apellidos y dni</h3>
        </div>
        <div className='dashboard-form-group-name'>
          <div className="form-group">
            <input
              type="text"
              name="studyCenters_name"
              placeholder="Nombre del centro"
              value={this.state.studyCenters_name || ""}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="studyCenters_cif"
              placeholder="CIF"
              value={this.state.studyCenters_cif || ""}
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
              name="studyCenters_address"
              placeholder="Dirección"
              value={this.state.studyCenters_address || ""}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="studyCenters_city"
              placeholder="Ciudad"
              value={this.state.studyCenters_city || ""}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="studyCenters_postal"
              placeholder="Código Postal"
              value={this.state.studyCenters_postal || ""}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="email"
              name="studyCenters_email"
              placeholder="Email"
              value={this.state.studyCenters_email || ""}
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
              name="studyCenters_number_card"
              placeholder="Número de tarjeta"
              value={this.state.studyCenters_number_card || ""}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="studyCenters_exp_date"
              placeholder="Fecha de caducidad (MM/AA)"
              value={this.state.studyCenters_exp_date || ""}
              onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="studyCenters_cvc"
              placeholder="CVC"
              value={this.state.studyCenters_cvc || ""}
              onChange={this.handleChange}
            />
          </div>
        </div>
      </form>
    );
  }
}
export default withRouter(CenterEditCreateContainer);
