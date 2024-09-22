import React from 'react';

const StudentsTable = ({ studentsData, totalCount }) => {
  return (
    <table className="table-container">
      <thead>
        <tr>
          <th>Nombre</th>
          <th>Apellidos</th>
          <th>Email</th>
          <th>Ciudad</th>
        </tr>
      </thead>
      <tbody>
        {studentsData.length === 0 ? (
          <tr>
            <td colSpan="5">No hay studiantes disponibles</td>
          </tr>
        ) : (
            studentsData.map((student) => (
            <tr key={student.students_id}>
              <td data-label="Nombre" className="entity-name">{student.students_first_name}</td>
              <td data-label="Apellidos" className="entity-name">{student.students_last_name}</td>
              <td data-label="Email" className="entity-email">{student.students_email}</td>
              <td data-label="Ciudad" className="entity-city">{student.students_city}</td>          
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
};

export default StudentsTable;
