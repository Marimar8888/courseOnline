import React from 'react';

const DashboardBills = ({ enrollments }) => {

  const getTotal = () => {
    return enrollments
        .reduce((sum, enrollment) => {
            const price = parseFloat(enrollment.enrollments_price) || 0;
            return sum + price;
        }, 0)
        .toFixed(2);
};

  return (
    <table className="enrollments-table">
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Nº Factura</th>
          <th>Importe </th>
          <th>Finalizado</th>
        </tr>
      </thead>
      <tbody>
        <tr >
          <td data-label="Nº Fact"></td>
          <td data-label="Fecha"></td>
          <td data-label="Importe"></td>
          <td data-label="Finalizado"></td>
        </tr>
        {enrollments.length === 0 ? (
                    <tr>
                        <td colSpan="5">No hay facturas disponibles</td>
                    </tr>
                ) : (
                    enrollments.map((enrollment) => (
                        <tr key={enrollment.enrollments_id}>
                            <td className='dashboard-bills-number'>{enrollment.enrollments_code}</td>
                            <td className='dashboard-bills-date'>{enrollment.enrollments_start_date}</td>
                            <td className='dashboard-bills-total'>{getTotal()} €</td>
                            <td className='dashboard-bils-finished'>{enrollment.enrollments_finalized ? "Sí" : "No"}</td>
                        </tr>
                    ))
                )}
      </tbody>
    </table>
  );
};

export default DashboardBills;
