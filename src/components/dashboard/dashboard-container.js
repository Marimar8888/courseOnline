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
      userRols: [],
      studentData: null,
      professorData: null,
      centersData: null,
    };
    this.getUserId = this.getUserId.bind(this);

  }

  componentDidMount() {
    this.getUserId();
  }

  fechStudentData(studentId) {
    const token = localStorage.getItem("token");
    axios
      .get(
        `${API_URL}/student/${studentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      .then(response => {
        console.log("response fechStudentData", response.data);
        this.setState({
          studentData: response.data
        })
        console.log("studentData:", this.state.studentData);
      })
      .catch(error => {
        console.log("error fechStudentData", error)
      })

  }

  fechProfessorData(professorId) {
    const token = localStorage.getItem("token");
    // axios
    //   .get(
    //     `${API_URL}/student/${professorId}`,
    //     {
    //       headers: {
    //         Authorization: `Bearer ${token}`
    //       }
    //     })
    //     .then(response => {
    //       console.log("response fechProfessorData", response.data)
    //     }) 
  }

  fechaCentersData(UserId) {
    const token = localStorage.getItem("token");

  }

  getStudentId(userId) {
    const token = localStorage.getItem("token");
    axios
      .get(
        `${API_URL}/student/user_id/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      .then(response => {
        const studentId = response.data.students_id;
        this.fechStudentData(studentId);
      })
      .catch(error => {
        console.log("error fechStudentData", error)
      })
  }

  getUserRols() {
    const token = localStorage.getItem("token");
    axios
      .get(
        `${API_URL}/user/${this.state.userId}`,
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

  getUserId() {
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
          this.getStudentId(this.state.userId);
          this.fechProfessorData(this.state.userId);
          this.fechaCentersData(this.state.userId);
        } else {
          console.log("No Authorization");
        }
      })
      .catch(error => {
        console.log("error in UserRols:", error);
      })
  }


  render() {
    const { userRols } = this.state;
    const rolesIds = userRols.map(role => role.rols_id);

    const { studentData } = this.state;

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
              <Route 
                exact path="/dashboard" 
                render={() => <StudentContainer studentData={studentData} />} 
              />
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