import React from 'react';

import DashboardBills from './dashboard-bills';

const StudentContainer = ({ studentData }) => {

  if (!studentData) {
    return <p>Cargando datos del estudiante...</p>
  }
  const { students_first_name, students_last_name, students_dni, students_address, students_city, students_postal, students_number_card,
    students_exp_date, students_cvc, courses } = studentData;
  return (
    <div className="dashboard-dates">
      <div className="dashboard-dates-title">
        <h2>Datos</h2>
        <h3>Nombre, apellidos y dni</h3>
      </div>
      <div className='dashboard-form-group-name'>
        <div className="form-group">
          <input
            type="text"
            name="name"
            placeholder="Nombre"
            value={students_first_name || ""}
          // onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="surname"
            placeholder="Apellidos"
            value={students_last_name || ""}
          // onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="DNI"
            placeholder="DNI"
            value={students_dni || ""}
          // onChange={this.handleChange}
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
            name="address"
            placeholder="Dirección"
            value={students_address || ""}
          // onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="city"
            placeholder="Ciudad"
            value={students_city || ""}
          // onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            name="postal"
            placeholder="Código Postal"
            value={students_postal || ""}
          // onChange={this.handleChange}
          />
        </div>
      </div>
      <div>
        <h3>Datos bancarios</h3>
      </div>
      <div className='dashboard-form-group-card'>
        <div className="form-group">        
          <input
            type="text"
            name="card"
            placeholder="Nº tarjeta"
            value={students_number_card || ""}
          // onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="text"
            name="date"
            placeholder="Vencimiento"
            value={students_exp_date || ""}
          // onChange={this.handleChange}
          />
        </div>
        <div className="form-group">
          <input
            type="number"
            name="CVC"
            placeholder="CVC"
            value={students_cvc || ""}
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
        <DashboardBills />
      </div>
    </div>
  );
};

export default StudentContainer;