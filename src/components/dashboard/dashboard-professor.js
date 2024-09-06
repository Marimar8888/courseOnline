import React from 'react';
import ProfessorEditContainer from '../professors/professor-edit-container';
import ProfessorCreateContainer from '../professors/professor-create-container';

const Professor = ({ professorData, updateProfessorData }) => {

  const updateDashboarProfessorData =(professorId) =>{
    updateProfessorData(professorId)
  }
  
  return professorData && professorData.professor ? (
    <ProfessorEditContainer professorData={professorData} updateDashboarProfessorData={updateDashboarProfessorData}  />
  ) : (
    <ProfessorCreateContainer />
  );
};

export default Professor;
