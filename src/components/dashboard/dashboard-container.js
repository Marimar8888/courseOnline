import React, { Component } from 'react'
import { NavLink, Switch, Route, Redirect } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../utils/constant';

import StudentContainer from './student-container';
import ProfessorContainer from './professor-container';
import CenterContainer from './center-container';


class DashboardContainer extends Component {
  constructor() {
    super();
    this.state = {
      userId: "",
      userRols: []
    };
    this.UserRols = this.UserRols.bind(this);
    this.getUserRols = this.getUserRols.bind(this);
  }

  componentDidMount() {
    this.UserRols();
  }


  UserRols() {
    const token = localStorage.getItem("token");
    axios
      .get(
        `${API_URL}/get_user_id`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      .then(response => {
        if (response.status === 200) {
          this.setState({
            userId: response.data.users_id
          })
          this.getUserRols(this.state.userId);
        } else {
          console.log("No Authorization");
        }
      })
      .catch(error => {
        console.log("error in UserRols:", error);
      })
  }

  getUserRols(userId) {
    const token = localStorage.getItem("token");
    axios
      .get(
        `${API_URL}/user/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      .then(response => {
        this.setState({
          userRols: response.data.rols
        })
      })
      .catch(error => {
        console.log("error in getUserRols:", error);
      })
  }

  render() {
    const { userRols } = this.state;
    const rolesIds = userRols.map(role => role.rols_id);

    const hasRole2 = rolesIds.includes(2);
    const hasRole3 = rolesIds.includes(3);
    const hasRole4 = rolesIds.includes(4);

    return (
      <div id="dashboard-container" className="dashboard-container">
        <div className="dashboard-menu">
          {hasRole2 && (
            <NavLink exact to="/dashboard" activeClassName="active-link">Estudiante</NavLink>
          )}
          {hasRole3 && (
            <NavLink to="/dashboard/professor" activeClassName="active-link">Profesor</NavLink>
          )}
          {hasRole4 && (
            <NavLink to="/dashboard/center" activeClassName="active-link">Centro de Estudios</NavLink>
          )}
          {!hasRole3 && (
            <div className='btn-create-professor'>
              <button className="btn">Crear Nuevo Profesor</button>
            </div>
          )}
        </div>
        <div className="dashboard-content">
          <Switch>
            {hasRole2 && (
              <Route exact path="/dashboard" component={StudentContainer} />
            )}
            {hasRole3 && (
              <Route exact path="/dashboard/professor" component={ProfessorContainer} />
            )}
            {hasRole4 && (
              <Route exact path="/dashboard/center" component={CenterContainer} />
            )}
            {(!hasRole2 && !hasRole3 && !hasRole4) && (
              <div className="no-roles-message">
                <p>1º.- Si deseas publicar tus cursos, primero debes darte de alta como profesor.</p>
                <p>2º.- Si lo que quieres impartir el curso a través de un centro de estudios, una vez crees el profesor tienes dos opciones:</p>
                <ul>
                  <li>
                    A través de un centro de estudios ya registrado en la plataforma. Deberás ponerte en contacto con el centro para que te acepten como profesor. Una vez ambas partes estáis de acuerdo, deberás darte de alta como profesor de dicho centro. El centro deberá aceptar dicha solicitud a través de la plataforma. </li>
                  <li>
                    A través de un centro de estudios propio, deberás crear el centro de estudios.
                  </li>
                </ul>
              </div>
            )}
          </Switch>
        </div>
      </div>
    )
  }
}
export default DashboardContainer;