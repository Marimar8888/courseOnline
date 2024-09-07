import React from 'react';
import ProfessorCreateContainer from '../professors/professor-create-container';
import ProfessorEditContainer from '../professors/professor-edit-container';

const Professor = ({ professorData, updateProfessorData, userId, showProfessorContainer, handleProfessorCreated}) => {

  const updateDashboarProfessorData =(professorId) =>{
    updateProfessorData(professorId)
  }
  
  return professorData && professorData.professor ? (
    <ProfessorEditContainer professorData={professorData} updateDashboarProfessorData={updateDashboarProfessorData}  />
  ) : (
    <ProfessorCreateContainer userId={userId} showProfessorContainer={showProfessorContainer} handleProfessorCreated={handleProfessorCreated}/>
  );
};

export default Professor;
