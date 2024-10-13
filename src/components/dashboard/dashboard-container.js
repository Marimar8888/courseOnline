import React, { Component } from 'react'
import { BrowserRouter as Router, Switch, NavLink, Route } from 'react-router-dom';
import { withRouter } from 'react-router-dom';

import DashboardStudent from './dashboard-student';
import DashboardProfessor from './dashboard-professor';
import DashboardCenter from './dashboard-center';
import { fechStudentDataFromAPI, getStudentIdByUserIdFromAPI } from '../services/student';
import { fechProfessorDataFromApi, getProfessorIdByUserIdFromAPI } from '../services/professor';
import { getUserIdFromAPI, getUserRolsFromAPI } from '../services/user';
import { studyCentersByUserIdFromAPI, handleChangeStatusCenterFromApi, AddCenterWorkClicFromApi } from '../services/center';

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
      centerToEdit: null,
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
    this.updateCenterData = this.updateCenterData.bind(this);
    this.handleCreateCenter = this.handleCreateCenter.bind(this);
    this.handleCenterCreated = this.handleCenterCreated.bind(this);
    this.handleEditCenter = this.handleEditCenter.bind(this);
    this.handleAddCenterWorkClick = this.handleAddCenterWorkClick.bind(this);
    this.handleBack = this.handleBack.bind(this);
    this.handleChangeStatusCenter = this.handleChangeStatusCenter.bind(this);
    this.handleUserRols = this.handleUserRols.bind(this);

  }

  componentDidMount() {
    this.getUserId();
  }

  handleAddCenterWorkClick(center) {
    const token =localStorage.getItem("token");
    const professorId = this.state.professorData.professor.professors_id;
    const studycenterId = center.studyCenters_id;
    AddCenterWorkClicFromApi(professorId, studycenterId, token)
      .then(response => {
        if (response.status === 201) {
          if (this.state.userId) {
            this.updateProfessorData(professorId)
          } else {
            console.log('Error al añadir la relación', response);
          }
        }
      })
  }

  handleChangeStatusCenter(center) {
    const token = localStorage.getItem("token");
    const statusCenter = center.studyCenters_active ? false : true;
    handleChangeStatusCenterFromApi(center, token, statusCenter)
      .then(response => {
        if (response.status === 200) {
          this.setState(prevState => ({
            centersData: prevState.centersData.map(c =>
              c.studyCenters_id === center.studyCenters_id
                ? { ...c, studyCenters_active: statusCenter }
                : c
            )
          }));
        } else {
          console.log(`Unexpected status code: ${response.status}`);
        }
      })
  }

  handleBack() {
    this.setState({
      showCenterContainer: false,
      centerToEdit: null
    })
  }

  handleEditCenter(center) {
    this.setState({
      showCenterContainer: true,
      centerToEdit: center
    })
  }

  updateCenterData(userId) {
    this.getCenters(userId);
    this.setState({ showCenterContainer: false, centerToEdit: null });
  }

  handleCenterCreated = () => {
    this.setState({
      showCenterContainer: false
    }, () => {
      this.getUserRols(this.state.userId);
    });
  };

  handleCreateCenter() {
    this.setState((prevState) => ({ showCenterContainer: !prevState.showCenterContainer }));
    const currentPath = this.props.location.pathname;
    if (currentPath === "/dashboard" || currentPath === "/dashboard/student" || currentPath === "/dashboard/professor") {
      this.props.history.push("/dashboard/center");
    }
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
    fechStudentDataFromAPI(studentId, token)
      .then(response => {
        this.setState({
          studentData: response.data
        });
      })
  }

  fechProfessorData(professorId) {
    const token = localStorage.getItem("token");
    fechProfessorDataFromApi(this.state.currentPage, this.state.limit, professorId, token)
      .then(response => {
        console.log("fechProfessorDataFromApi", response.data);
        this.setState({
          professorData: response.data
        });
      })
  }

  getCenters(userId) {
    const token = localStorage.getItem("token");
    studyCentersByUserIdFromAPI(userId, token)
      .then(response => {
        console.log("getCenters by userId:", response)
        this.setState({
          centersData: response
        });
      })
  }

  getProfessorId(userId) {
    const token = localStorage.getItem("token");
    getProfessorIdByUserIdFromAPI(userId, token)
      .then(response => {
        const professorId = response.professors_id;
        this.fechProfessorData(professorId);
      })
  }

  getStudentId(userId) {
    const token = localStorage.getItem("token");
    getStudentIdByUserIdFromAPI(userId, token)
      .then(response => {
        const studentId = response.students_id;
        this.fechStudentData(studentId);
      })
  }

  getUserRols(userId) {
    const token = localStorage.getItem("token");

    getUserRolsFromAPI(userId, token)
      .then(({ rols }) => {
        this.setState({ userRols: rols }, () => {
          this.handleUserRols(rols, userId);
        });
      })
      .catch(error => {
        console.log("Error in getUserRols:", error);
      });
  }

  getUserId() {
    const token = localStorage.getItem("token");
    getUserIdFromAPI(token)
      .then(response => {
        this.setState({
          userId: response
        });
        this.getUserRols(this.state.userId);
      })
  }

  handleUserRols(userRols, userId) {
    if (userRols.length > 0) {
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
  }


  render() {
    const { userRols, studentData, professorData, centersData, userId, centerToEdit, showProfessorContainer, showCenterContainer } = this.state;
    const rolesIds = userRols.map(role => role.rols_id);

    const hasRole2 = rolesIds.includes(2); // Estudiante
    const hasRole3 = rolesIds.includes(3); // Profesor
    const hasRole4 = rolesIds.includes(4); // Centro de estudios

    return (
      <div id="dashboard-container" className="dashboard-container" >
        <div className="dashboard-menu">
          {hasRole2 && (
            <NavLink exact to="/dashboard" activeClassName="active-link">Estudiante</NavLink>
          )}
          {hasRole3 && (
            <NavLink to="/dashboard/professor" activeClassName="active-link">Profesor</NavLink>
          )}
          {hasRole4 && (
            <NavLink to="/dashboard/center" activeClassName="active-link">Centro en propiedad</NavLink>
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
            {!hasRole2 && showProfessorContainer && (
              <Route path="/dashboard" exact render={() => (
                <DashboardProfessor
                  userId={userId}
                  handleProfessorCreated={this.handleProfessorCreated} />
              )} />
            )}
            {hasRole2 && !showProfessorContainer && (
              <Route path={["/dashboard", "/dashboard/student"]} exact render={() => (
                <DashboardStudent
                  studentData={studentData}
                  updateStudentData={this.updateStudentData} />
              )} />
            )}

            {hasRole2 && showProfessorContainer && (
              <Route path={["/dashboard", "/dashboard/student"]} exact render={() => (
                <DashboardProfessor
                  userId={userId}
                  handleProfessorCreated={this.handleProfessorCreated} />
              )} />
            )}
            {hasRole3 && !showProfessorContainer && (
              <Route path={["/dashboard", "/dashboard/professor"]} exact render={() => (
                <DashboardProfessor
                  professorData={professorData}
                  updateProfessorData={this.updateProfessorData}
                />
              )} />
            )}
            {hasRole3 && !hasRole4 && showCenterContainer && (
              <Route path={["/dashboard", "/dashboard/professor"]} render={() => (
                <DashboardCenter
                  userId={userId}
                  showCenterContainer={showCenterContainer}
                  handleCenterCreated={this.handleCenterCreated}
                  handleBack={this.handleBack} />
              )} />
            )}
            {hasRole4 && !showCenterContainer && centersData && (
              <Route path="/dashboard/center" exact render={() => (
                <DashboardCenter
                  centersData={centersData}
                  updateCenterData={this.updateCenterData}
                  handleEditCenter={this.handleEditCenter}
                  handleChangeStatusCenter={this.handleChangeStatusCenter}
                  handleAddCenterWorkClick={this.handleAddCenterWorkClick}
                />
              )} />
            )}
            {hasRole4 && showCenterContainer && centerToEdit && (
              <Route path="/dashboard/center" exact render={() => (
                <DashboardCenter
                  userId={userId}
                  showCenterContainer={showCenterContainer}
                  handleCenterCreated={this.handleCenterCreated}
                  updateCenterData={this.updateCenterData}
                  handleEditCenter={this.handleEditCenter}
                  centersData={centersData}
                  centerToEdit={centerToEdit}
                  handleBack={this.handleBack} />
              )} />
            )}
            {hasRole4 && showCenterContainer && !centerToEdit && (
              <Route path="/dashboard/center" exact render={() => (
                <DashboardCenter
                  userId={userId}
                  showCenterContainer={showCenterContainer}
                  handleCenterCreated={this.handleCenterCreated}
                  handleBack={this.handleBack} />
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

export default withRouter(DashboardContainer);