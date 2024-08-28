import React from 'react';

import DashboardBills from './dashboard-bills';

const StudentContainer = ({ data, courses }) => {
  return (
    <div className="dashboard-dates">
      <div className="dashboard-dates-title">
        <h3>Datos</h3>
      </div>
      <div className='dashboard-form-group-name'>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Nombre"
          // value={this.state.name}
          // onChange={this.handleChange}
          />
        </div>
      <div className="form-group">
        <input
          type="text"
          name="surname"
          placeholder="Apellidos"
        // value={this.state.name}
        // onChange={this.handleChange}
        />
      </div>
      <div className="form-group">
        <input
          type="text"
          name="DNI"
          placeholder="DNI"
        // value={this.state.name}
        // onChange={this.handleChange}
        />
      </div>
    </div>
    <div className='dashboard-form-group-address'>
      <div className="form-group">
            <input
              type="text"
              name="address"
              placeholder="Dirección"
            // value={this.state.email}
            // onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="text"
              name="city"
              placeholder="Ciudad"
            // value={this.state.email}
            // onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              name="postal"
              placeholder="Código Postal"
            // value={this.state.email}
            // onChange={this.handleChange}
            />
          </div>
        </div>
        <div className='dashboard-form-group-card'>
          <div className="form-group">
            <input
              type="number"
              name="card"
              placeholder="Nº tarjeta"
            // value={this.state.email}
            // onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="date"
              name="date"
              placeholder="Vencimiento"
            // value={this.state.email}
            // onChange={this.handleChange}
            />
          </div>
          <div className="form-group">
            <input
              type="number"
              name="CVC"
              placeholder="CVC"
            // value={this.state.email}
            // onChange={this.handleChange}
            />
          </div>
        </div>
        <div className="dashboard-courses">
          <div className="dashboard-dates-title">
            <h3>Cursos</h3>
          </div>
          <div className="dashboard-courses-content">
            <div className='dashboard-course-process'>En curso...</div>
            <div className='dashboard-course-completed'>Finalizados...</div>
            <div className='dashboard-course-favorites'>Favoritos...</div>
          </div>
        </div>
        <div className="dashboard-bills">
          <h3>Facturas</h3>
          <DashboardBills/>

        </div>
      </div>
      );
};

      export default StudentContainer;