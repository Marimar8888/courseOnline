import React from 'react';

const DashboardBills = ({ invoices }) => {
  return (
    <table className="invoice-table">
      <thead>
        <tr>
          <th>Fecha</th>
          <th>Nº Factura</th>
          <th>Curso</th>
          <th>Importe </th>
          <th>Pagado</th>
        </tr>
      </thead>
      <tbody>
        <tr >
            <td data-label="Fecha"></td>
            <td data-label="Importe"></td>
            <td data-label="Curso"></td>
            <td data-label="Importe"></td>
            <td data-label="Pagado"></td>
        </tr>
        {/* {invoices.map((invoice, index) => (
          <tr key={index}>
            <td data-label="Fecha">{invoice.date}</td>
            <td data-label="Importe">{invoice.amount}</td>
            <td data-label="Curso">{invoice.course}</td>
            <td data-label="Importe">{invoice.paidAmount}</td>
            <td data-label="Pagado">{invoice.paid}</td>
          </tr>
        ))} */}
      </tbody>
    </table>
  );
};

export default DashboardBills;
