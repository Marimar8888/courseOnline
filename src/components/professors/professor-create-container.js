import React, { Component } from 'react';
import axios from "axios";
import { API_URL } from '../utils/constant';
import { withRouter } from 'react-router-dom';

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

    return professorFormData;
  }

  render() {
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
              type="text"
              name="professors_postal"
              placeholder="Código Postal"
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
          <h3>Datos de pago</h3>
        </div>
        <div className='dashboard-form-group-card'>
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
      </form>
    );
  }
}

export default withRouter(ProfessorCreateContainer);
