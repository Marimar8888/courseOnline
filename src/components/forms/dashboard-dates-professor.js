import React from 'react';

const DashboardDatesProfessor = ({
    handleCoursesClick, handleStudentsClick, coursesActive, coursesInactive, totalCourses, activeStudentsNumber, inactiveStudentsNumber, totalStudents
}) => {
    return (
        <div>
            <div className="dashboard-courses">
                <div className="dashboard-dates-title">
                    <h3>Cursos</h3>
                </div>
                <div className="dashboard-courses-content">
                    <div className='dashboard-course-process' onClick={() => handleCoursesClick(5)}>
                        <p className='dashboard-course-title'>Activos</p>
                        <p className='dashboard-course-number'>({coursesActive})</p>
                    </div>
                    <div className='dashboard-course-completed' onClick={() => handleCoursesClick(6)}>
                        <p className='dashboard-course-title'>Inactivos</p>
                        <p className='dashboard-course-number'>({coursesInactive})</p>
                    </div>
                    <div className='dashboard-course-all' onClick={() => handleCoursesClick(3)}>
                        <p className='dashboard-course-title'>Nº Total</p>
                        <p className='dashboard-course-number'>({totalCourses})</p>
                    </div>
                </div>
            </div>
            <div className="dashboard-courses">
                <div className="dashboard-dates-title">
                    <h3>Estudiantes</h3>
                </div>
                <div className="dashboard-courses-content">
                    <div className='dashboard-course-process' onClick={() => handleStudentsClick(1)}>
                        <p className='dashboard-course-title'>Activos</p>
                        <p className='dashboard-course-number'>({activeStudentsNumber})</p>
                    </div>
                    <div className='dashboard-course-completed' onClick={() => handleStudentsClick(2)}>
                        <p className='dashboard-course-title'>Baja</p>
                        <p className='dashboard-course-number'>({inactiveStudentsNumber})</p>
                    </div>
                    <div className='dashboard-course-favorites' onClick={() => handleStudentsClick(3)}>
                        <p className='dashboard-course-title'>Total</p>
                        <p className='dashboard-course-number'>({totalStudents})</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DashboardDatesProfessor;