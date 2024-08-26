import React, { Component } from 'react'
import { NavLink, Switch, Route } from 'react-router-dom'; 

import StudentContainer from './student-container';
import ProfessorContainer from './professor-container';
import CenterContainer from './center-container';


class DashboardContainer extends Component {
  render() {

    return (
      <div id="dashboard-container" className="dashboard-container">
        <div className="dashboard-menu">
            <NavLink exact to="/dashboard" activeClassName="active-link">Estudiante</NavLink>
            <NavLink to="/dashboard/professor" activeClassName="active-link">Profesor</NavLink>
            <NavLink to="/dashboard/center" activeClassName="active-link">Centro de Estudios</NavLink>
        </div>
        <div className="dashboard-content">
          <Switch>
            <Route exact path="/dashboard" component={StudentContainer} />
            <Route exact path="/dashboard/professor" component={ProfessorContainer} />
            <Route exact path="/dashboard/center" component={CenterContainer} />
          </Switch>
        </div>
      </div>
    )
  }
}
export default DashboardContainer;