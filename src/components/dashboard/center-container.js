import React from 'react';

import DashboardBills from './dashboard-bills';


const CenterContainer = ({ centersData }) => {
  if(!CenterContainer) {
    console.log("Center Data:", centersData);
    return <p>Cargando datos del profesor...</p>
  }
  const totalCenters = centersData ? centersData.length : 0;
  console.log("totalCenters", totalCenters);
  return (
    <div className="dashboard-dates">
      <div className="dashboard-courses">
        <div className="dashboard-dates-title">
          <h3>Centros de Estudio</h3>
        </div>
        <div className="dashboard-courses-content">
          <div className='dashboard-course-process'>En activo</div>
          <div className='dashboard-course-completed'>De baja</div>
          <div className='dashboard-course-favorites'>
            <p>Nº total:</p>
            <p>{totalCenters}</p>
          </div>
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
      <div className="dashboard-courses">
        <div className="dashboard-dates-title">
          <h3>Profesores</h3>
        </div>
        <div className="dashboard-courses-content">
          <div className='dashboard-course-process'>En curso...</div>
          <div className='dashboard-course-completed'>Finalizados...</div>
          <div className='dashboard-course-favorites'>Favoritos...</div>
        </div>
      </div>
      <div className="dashboard-courses">
        <div className="dashboard-dates-title">
          <h3>Estudiantes</h3>
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

export default CenterContainer;