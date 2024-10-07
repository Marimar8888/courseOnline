import React from 'react';

const CentersTable = ({ centersData, handleEditCenter, handleChangeStatusCenter }) => {
  return (
    <table className="centers-table">
      <thead>
        <tr>
          <th>Nombre</th>
          <th className="email">Email</th>
          <th className="city">Ciudad</th>
          <th>Editar</th>
          <th>Activar</th>
        </tr>
      </thead>
      <tbody>
        {centersData.length === 0 ? (
          <tr>
            <td colSpan="5">No hay centros disponibles</td>
          </tr>
        ) : (
          centersData.map((center) => (
            <tr key={center.studyCenters_id}>
              <td data-label="Nombre" className="dashboard-center-name">{center.studyCenters_name}</td>
              <td data-label="Email" className="dashboard-center-email">{center.studyCenters_email}</td>
              <td data-label="Ciudad" className="dashboard-center-city">{center.studyCenters_city}</td>
              <td data-label="Editar">
                <button onClick={() => handleEditCenter(center)} className='btn-edit'>Editar</button>
              </td>
              <td data-label="Activar">
                <button
                  onClick={() => handleChangeStatusCenter(center)}
                  className={`btn ${center.studyCenters_active ? 'btn-active' : 'btn-disabled'}`}
                >
                  {center.studyCenters_active ? 'Desactivar' : 'Activar'}
                </button>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default CentersTable;
