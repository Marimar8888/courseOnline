import React, { Component } from 'react'
import { withRouter } from 'react-router-dom';

 class DashboardContainer extends Component {
  render() {
    return (
      <div>
        <h1>Dashboard</h1>
      </div>
    )
  }
}
export default withRouter(DashboardContainer);