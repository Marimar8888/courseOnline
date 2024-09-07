import React from 'react';
import ProfessorCreateContainer from '../professors/professor-create-container';
import ProfessorEditContainer from '../professors/professor-edit-container';

const Professor = ({ professorData, updateProfessorData, userId, showProfessorContainer}) => {

  const updateDashboarProfessorData =(professorId) =>{
    updateProfessorData(professorId)
  }
  
  return professorData && professorData.professor ? (
    <ProfessorEditContainer professorData={professorData} updateDashboarProfessorData={updateDashboarProfessorData}  />
  ) : (
    <ProfessorCreateContainer userId={userId} showProfessorContainer={showProfessorContainer}/>
  );
};

export default Professor;


// import React from 'react';
// import ProfessorEditContainer from '../professors/professor-edit-container';


// const Professor = (props) =>{

//   const updateDashboarProfessorData =(professorId) => {
//     props.updateProfessorData(professorId)
//   }

//   return(

//       <ProfessorEditContainer professorData={props.professorData} updateDashboarProfessorData={updateDashboarProfessorData}/>
  
//   )
// }

// export default Professor;

