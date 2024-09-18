import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, NavLink, Route } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../utils/constant';

import DashboardStudent from './dashboard-student';
import DashboardProfessor from './dashboard-professor';
import DashboardCenter from './dashboard-center';
import CentersContainer from '../centers/centers-container';

class DashboardContainer extends Component {
  constructor() {
    super();

    this.state = {
      userId: "",
      userRols: [],
      studentData: null,
      professorData: null,
      centersData: null,
      courses: null,
      showProfessorContainer: false,
      showCenterContainer: false,
      currentPage: 1,
      totalCount: 0,
      totalPages: 0,
      limit: 10
    };

    this.getUserId = this.getUserId.bind(this);
    this.getUserRols = this.getUserRols.bind(this);
    this.updateProfessorData = this.updateProfessorData.bind(this);
    this.updateStudentData = this.updateStudentData.bind(this);
    this.handleCreateProfessor = this.handleCreateProfessor.bind(this);
    this.handleProfessorCreated = this.handleProfessorCreated.bind(this);
    this.updateCentersData = this.updateCentersData.bind(this);
    this.handleCreateCenter = this.handleCreateCenter.bind(this);
    this.handleCenterCreated = this.handleCenterCreated.bind(this);

  }

  componentDidMount() {
    this.getUserId();
  }

  updateCentersData(centerId) {
    this.fechCenterData(centerId);
  }

  handleCenterCreated = () => {
    this.setState({
      showCenterContainer: false
    }, () => {
      this.getUserRols(this.state.userId);
    });
  };

  handleCreateCenter() {
    this.setState((prevState) => ({showCenterContainer: !prevState.showCenterContainer }))
  }

  handleProfessorCreated = () => {
    this.setState({
      showProfessorContainer: false
    }, () => {
      this.getUserRols(this.state.userId);
    });
  };

  handleCreateProfessor() {
    this.setState({
      showProfessorContainer: true
    });
  }

  updateProfessorData(professorId) {
    this.fechProfessorData(professorId);
  }

  updateStudentData(studentId) {
    this.fechStudentData(studentId);
  }

  fechStudentData(studentId) {
    const token = localStorage.getItem("token");
    axios
      .get(
        `${API_URL}/student/courses/${studentId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      .then(response => {
        console.log("response fechStudentData:", response.data);
        this.setState({
          studentData: response.data  
        });

      })
      .catch(error => {
        console.log("error fechStudentData", error)
      })
  }

  fechProfessorData(professorId) {
    const token = localStorage.getItem("token");
    axios
      .get(
        `${API_URL}/professor/all_dates/${professorId}?page=${this.state.currentPage}&limit=${this.state.limit}`,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })
      .then(response => {
        console.log("fechProfessorData:", response.data);
        this.setState({
          professorData: response.data
        });
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
        this.setState({
          centersData: response.data
        });
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
        }, () => {
          const { userRols } = this.state;
          if (userRols.length > 1) {
            userRols.forEach(rol => {
              switch (rol.rols_id) {
                case 2:
                  this.getStudentId(userId);
                  break;
                case 3:
                  this.getProfessorId(userId);
                  break;
                case 4:
                  this.getCenters(userId);
                  break;
                default:
                  break;
              }
            });
          } else {
            console.log("User has no roles");
          }
        });
      })
      .catch(error => {
        console.log("error in getUserRols:", error);
      });
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
        } else {
          console.log("No Authorization");
        }
      })
      .catch(error => {
        if (error.response) {
          console.log(`Error: ${error.response.status} - ${error.response.statusText}`);
        } else {
          console.log("Network or other error:", error.message);
        }
      })
  }

  render() {
    const { userRols, studentData, professorData, centersData, userId } = this.state;
    const rolesIds = userRols.map(role => role.rols_id);

    const hasRole2 = rolesIds.includes(2); // Estudiante
    const hasRole3 = rolesIds.includes(3); // Profesor
    const hasRole4 = rolesIds.includes(4); // Centro de estudios

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
              <button className="btn" onClick={this.handleCreateProfessor}>Crear Nuevo Profesor</button>
            </div>
          )}
          {hasRole3 && (
            <div className='btn-create-professor'>
              <button className="btn" onClick={this.handleCreateCenter}>Crear Nuevo Centro</button>
            </div>
          )}
        </div>

        <div className="dashboard-content">
          <Switch>
            {hasRole2 && !this.state.showProfessorContainer && (
              <Route path="/dashboard" exact render={() => (
                <DashboardStudent
                  studentData={studentData}
                  updateStudentData={this.updateStudentData} />
              )} />
            )}
            {!hasRole2 && hasRole3 && !this.state.showProfessorContainer && (
              <Route path="/dashboard" exact render={() => (
                <DashboardProfessor
                  professorData={professorData}
                  updateProfessorData={this.updateProfessorData}
                />
              )} />
            )}
            {hasRole3 && (
              <Route path="/dashboard/professor" exact render={() => (
                <DashboardProfessor
                  professorData={professorData}
                  updateProfessorData={this.updateProfessorData} />
              )} />
            )}
            {!hasRole3 && this.state.showProfessorContainer && (
              <Route path="/dashboard" exact render={() => (
                <DashboardProfessor
                  userId={userId}
                  showProfessorContainer={this.state.showProfessorContainer}
                  handleProfessorCreated={this.handleProfessorCreated} />
              )} />
            )}
            {hasRole4 && !this.state.showCenterContainer && (
              <Route path="/dashboard/center" exact render={() => (
                <CentersContainer
                  centersData={centersData}
                  updateCenterData={this.updateCenterData} />
              )} />
            )}
            {this.state.showCenterContainer && (
              <Route path="/dashboard" exact render={() => (
                <DashboardCenter
                  userId={userId}
                  showCenterContainer={this.state.showCenterContainer}
                  handleCenterCreated={this.handleCenterCreated} 
                  updateCenterData={this.updateCenterData}
                  centersData={centersData}/>
              )} />
            )}
            {this.state.showCenterContainer && (
              <Route path="/dashboard/center" exact render={() => (
                <DashboardCenter
                  userId={userId}
                  showCenterContainer={this.state.showCenterContainer}
                  handleCenterCreated={this.handleCenterCreated} 
                  updateCenterData={this.updateCenterData}
                  centersData={centersData}/>
              )} />
            )}
            {this.state.showCenterContainer && (
              <Route path="/dashboard/professor" exact render={() => (
                <DashboardCenter
                  userId={userId}
                  showCenterContainer={this.state.showCenterContainer}
                  handleCenterCreated={this.handleCenterCreated} 
                  updateCenterData={this.updateCenterData}
                  centersData={centersData}/>
              )} />
            )}
            {!hasRole2 && !hasRole3 && !hasRole4 && !this.state.showProfessorContainer && !this.state.showCenterContainer && (
              <Route path="*" render={() => (
                <div className="no-roles-message">
                  <p>1º.- Si deseas publicar tus cursos, primero debes darte de alta como profesor.</p>
                  <p>2º.- Si lo que quieres es impartir el curso a través de un centro de estudios, una vez crees el profesor tienes dos opciones:</p>
                  <ul>
                    <li>A través de un centro de estudios ya registrado en la plataforma. Deberás ponerte en contacto con el centro para que te acepten como profesor. Una vez ambas partes estén de acuerdo, deberás darte de alta como profesor de dicho centro. El centro deberá aceptar dicha solicitud a través de la plataforma.</li>
                    <li>A través de un centro de estudios propio, deberás crear el centro de estudios.</li>
                  </ul>
                </div>
              )} />
            )}
          </Switch>
        </div>
      </div >
    );
  }
}

export default DashboardContainer;
