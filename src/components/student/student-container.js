import React, { Component } from 'react';

import StudentsTable from './students-table';
import { getStudentsByStatusAndByProfessorId } from '../services/student';


class StudentContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            studentsData: [],
            typeId: this.props.match.params.slug,
            professorId: this.props.location.professors_id,
            professorUserId: this.props.location.professors_user_id,
            currentPage: 1,
            totalCount: 0,
            totalPages: 0,
            limit: 30,
            isLoading: true 
        }
        this.hasUnmounted = false;
    }

    componentDidMount() {
        const token = localStorage.getItem("token");
        const { professorId, typeId, currentPage, limit } = this.state;

        if (token) {
            getStudentsByStatusAndByProfessorId(professorId, token, typeId, currentPage, limit)
                .then(data => {
                    const newStudents = Array.isArray(data.students) ? data.students : [];
                    this.setState(prevState => ({
                        studentsData:newStudents,
                        currentPage: prevState.currentPage + 1,
                        totalCount: data.total_students,
                        totalPages: data.total_pages,
                        isLoading: false
                    }));
                })
                .catch(error => {
                    console.error("Error getStudentsByProfessorId students:", error);
                    this.setState({ isLoading: false });
                });
        } else {
            this.props.history.push(`/`);
            return null;
        }
    }

    render() {
        const { typeId, studentsData, isLoading, totalCount  } = this.state;

        if (isLoading) {
            return <div>Cargando...</div>;
        }   
        if (studentsData.length === 0) {
            return <div className='student-nobody-container'>No hay datos para mostrar.</div>;
        }
        return (
            <div className='student-container'>
                {typeId == 1 ? (
                    <div className='student-active-container'>
                        <div className='student-active-header'>
                            <h3>Alunmos con cursos sin terminar</h3>
                            <StudentsTable studentsData={studentsData} totalCount={totalCount} />
                        </div>
                    </div>
                ) : typeId == 2 ? (
                    <div className='student-inactive-container'>
                        <div className='student-inactive-header'>
                            <h3>Alunmos con cursos acabados</h3>
                            <StudentsTable studentsData={studentsData} totalCount={totalCount} />
                        </div>
                    </div>
                ) : null}
            </div>
        )
    }
}

export default StudentContainer;