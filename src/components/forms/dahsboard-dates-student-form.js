import React from 'react';

const DashboardDatesStudentForm = ({handleCoursesClick, unfinishedCourses, coursesFinalized, totalFavorites}) => {
    return (
        <div className="dashboard-content-entity-resum">
            <div className="dashboard-courses">
                <div className="dashboard-dates-title">
                    <h3>Cursos</h3>
                </div>
                <div className="dashboard-courses-content">
                    <div className='dashboard-course-process' onClick={() => handleCoursesClick(1)}>
                        <p className='dashboard-course-title'>En curso...</p>
                        <p className='dashboard-course-number'>({unfinishedCourses})</p>
                    </div>
                    <div className='dashboard-course-completed' onClick={() => handleCoursesClick(2)} >
                        <p className='dashboard-course-title'>Finalizados</p>
                        <p className='dashboard-course-number'>({coursesFinalized})</p>
                    </div>
                    <div className='dashboard-course-favorites' onClick={() => handleCoursesClick(4)}>
                        <p className='dashboard-course-title'>Favoritos</p>
                        <p className='dashboard-course-number'>({totalFavorites})</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default DashboardDatesStudentForm;