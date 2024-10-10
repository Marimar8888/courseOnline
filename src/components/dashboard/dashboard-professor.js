import React from 'react';

import ProfessorCreateContainer from '../professors/professor-create-container';
import ProfessorEditContainer from '../professors/professor-edit-container';

const DashboardProfessor = ({ 
  professorData, updateProfessorData, userId, showProfessorContainer, handleProfessorCreated,  showCenterContainer, handleCenterCreated, handleEditCenter, centerToEdit, handleBack
}) => {

  const updateDashboarProfessorData =(professorId) =>{
    updateProfessorData(professorId)
  }
  
  return professorData && professorData.professor ? (
    <ProfessorEditContainer 
      userId={userId} 
      professorData={professorData} 
      updateDashboarProfessorData={updateDashboarProfessorData} 
      showCenterContainer={showCenterContainer} 
      handleCenterCreated={handleCenterCreated}
      handleEditCenter={handleEditCenter}
      centerToEdit={centerToEdit}
      handleBack = {handleBack}
      />
  ) : (
    <ProfessorCreateContainer userId={userId} showProfessorContainer={showProfessorContainer} handleProfessorCreated={handleProfessorCreated}/>
  );
};

export default DashboardProfessor;
