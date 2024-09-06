import React from 'react';
import ProfessorEditContainer from '../professors/professor-edit-container';
import ProfessorCreateContainer from '../professors/professor-create-container';

const Professor = ({ professorData, updateProfessorData, userId }) => {

  const updateDashboarProfessorData =(professorId) =>{
    updateProfessorData(professorId)
  }
  
  return professorData && professorData.professor ? (
    <ProfessorEditContainer professorData={professorData} updateDashboarProfessorData={updateDashboarProfessorData}  />
  ) : (
    <ProfessorCreateContainer userId={userId}/>
  );
};

export default Professor;

