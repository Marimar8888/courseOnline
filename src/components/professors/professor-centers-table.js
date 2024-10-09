import React from 'react';

const ProfessorCentersTable = ({ centers }) => {
  return (
    <table className="centers-table">
      <thead>
        <tr >
          <th className='professor-centers-table-headers'>Nombre</th>
          <th className='professor-centers-table-headers'>Email</th>
          <th className='professor-centers-table-headers'>Ciudad</th>
        </tr>
      </thead>
      <tbody>
        {centers.length === 0 ? (
          <tr>
            <td colSpan="5">No hay centros disponibles</td>
          </tr>
        ) : (
          centers.map((center) => (
            <tr key={center.studyCenters_id}>
              <td data-label="Nombre" className="dashboard-professor-center-name">{center.studyCenters_name}</td>
              <td data-label="Email" className="dashboard-professor-center-email">{center.studyCenters_email}</td>
              <td data-label="Ciudad" className="dashboard-professor-center-city">{center.studyCenters_city}</td>
             </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default ProfessorCentersTable;
