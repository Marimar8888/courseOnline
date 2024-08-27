import React, { Component } from 'react'
import { NavLink, Switch, Route, Redirect  } from 'react-router-dom';
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

    return (
      <div id="dashboard-container" className="dashboard-container">
        <div className="dashboard-menu">
          {rolesIds.includes(2) && (
            <NavLink exact to="/dashboard" activeClassName="active-link">Estudiante</NavLink>
          )}
          {rolesIds.includes(3) && (
            <NavLink to="/dashboard/professor" activeClassName="active-link">Profesor</NavLink>
          )}
          {rolesIds.includes(4) && (
            <NavLink to="/dashboard/center" activeClassName="active-link">Centro de Estudios</NavLink>
          )}
        </div>
        <div className="dashboard-content">
          <Switch>
            {rolesIds.includes(2) && (
              <Route exact path="/dashboard" component={StudentContainer} />
            )}
            {rolesIds.includes(3) && (
              <Route exact path="/dashboard/professor" component={ProfessorContainer} />
            )}
            {rolesIds.includes(4) && (
              <Route exact path="/dashboard/center" component={CenterContainer} />
            )}
            {rolesIds.includes(2) ? (
              <Redirect exact from="/dashboard" to="/dashboard" />
            ) : rolesIds.includes(3) ? (
              <Redirect exact from="/dashboard" to="/dashboard/professor" />
            ) : rolesIds.includes(4) ? (
              <Redirect exact from="/dashboard" to="/dashboard/center" />
            ) : null}
          </Switch>
        </div>
      </div>
    )
  }
}
export default DashboardContainer;