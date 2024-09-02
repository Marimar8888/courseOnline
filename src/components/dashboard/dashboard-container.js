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
      courses: null
    };
    this.getUserId = this.getUserId.bind(this);
    this.updateProfessorData = this.updateProfessorData.bind(this);
    this.updateStudentData = this.updateStudentData.bind(this);

  }
  
  componentDidMount() {
    this.getUserId();
  }

  updateProfessorData(professorId){
    this.fechProfessorData(professorId);
  }

  updateStudentData(studentId){
    this.fechStudentData(studentId);
  }

  fechStudentData(studentId) {
    const token = localStorage.getItem("token");
    axios
      .get(
        `${API_URL}/courses/student/${studentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      .then(response => {
        this.setState({
          studentData: response.data
        })
      })
      .catch(error => {
        console.log("error fechStudentData", error)
      })
  }

  fechProfessorData(professorId) {
    const token = localStorage.getItem("token");
    axios
      .get(
        `${API_URL}/all_dates/professor/${professorId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      .then(response => {
        this.setState({
          professorData: response.data
        })
      })
      .catch(error => {
        console.log("error fechProfessorData", error)
      })

  }

  getCenters(userId) {
    const token = localStorage.getItem("token");
    axios
      .get(
        `${API_URL}/studycenter/user_id/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      .then(response => {
        this.setState({ centersData: response.data });
      })
      .catch(error => {
        console.log("error getCenters", error);
      })
  }

  getProfessorId(userId) {
    const token = localStorage.getItem("token");
    axios
      .get(
        `${API_URL}/professor/user_id/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      .then(response => {
        const professorId = response.data.professors_id;
        this.fechProfessorData(professorId);
      })
      .catch(error => {
        console.log("error getProfessorId", error)
      })
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
        console.log("error getStudentId", error)
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
          this.getProfessorId(this.state.userId);
          this.getCenters(this.state.userId);
        } else {
          console.log("No Authorization");
        }
      })
      .catch(error => {
        console.log("error in getUserId:", error);
      })
  }


  render() {
    const { userRols } = this.state;
    const rolesIds = userRols.map(role => role.rols_id);

    const { studentData } = this.state;
    const { professorData } = this.state;
    const { centersData } = this.state;

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
                // render={() => <StudentContainer studentData={studentData} />}
                render={(props) => {
                  const { computedMatch, ...restProps } = props;
                  return <StudentContainer {...restProps} studentData={studentData} updateStudentData={this.updateStudentData}/>
                }}
              />
            )}
            {hasRole3 && (
              <Route
                exact path="/dashboard/professor"
                // render={() => <ProfessorContainer professorData={professorData} />}
                render={(props) => {
                  const { computedMatch, ...restProps } = props;
                  return <ProfessorContainer {...restProps} professorData={professorData} updateProfessorData={this.updateProfessorData}/>
                }}
              />
            )}
            {hasRole4 && (
              <Route
                exact path="/dashboard/center"
                // render={() => <CenterContainer centersData={centersData} />} />
                render={(props) => {
                  const { computedMatch, ...restProps } = props;
                  return <CenterContainer {...restProps} centersData={centersData} />
                }}
              />
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