import React from 'react';
import StudentEditContainer from '../student/student-edit-container';

const DashboardStudent = ({ studentData, updateStudentData, userId, showStudentContainer}) => {

  const updateDashboarStudentData =(studentId) =>{
    updateStudentData(studentId)
  }
  
  return studentData && studentData.student ? (
    <StudentEditContainer studentData={studentData} updateDashboarStudentData={updateDashboarStudentData}  />
  ) : (
    <div>Create Student...</div>
   // <ProfessorCreateContainer userId={userId} showProfessorContainer={showProfessorContainer} handleProfessorCreated={handleProfessorCreated}/>
  );
    
};

export default DashboardStudent;