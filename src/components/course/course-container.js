import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CourseItem from './course-item';
import { getUserIdFromAPI } from '../services/user';
import { getProfessorIdByUserIdFromAPI } from '../services/professor';
import { getCoursesByProfessorIdPagined, getCoursesByStudentIdPagined } from '../services/course';
import { getStudentIdByUserIdFromAPI } from '../services/student';

class CourseContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            courses: [],
            professorId: "",
            studentId: "",
            typeId: this.props.match.params.slug,
            currentPage: 1,
            totalCount: 0,
            totalPages: 0,
            isLoading: true,
            limit: 10,
            courseModalIsOpen: false
        }
        this.hasUnmounted = false;
        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleNewCourseClick = this.handleNewCourseClick.bind(this);
        this.onScroll = this.onScroll.bind(this);
        window.addEventListener("scroll", this.onScroll, false);
    }

    componentDidMount() {
        const token = localStorage.getItem("token");
        if (token) {
            if (this.state.typeId == 1 || this.state.typeId == 2 || this.state.typeId == 4) {
                getUserIdFromAPI(token)
                    .then(userId => getStudentIdByUserIdFromAPI(userId, token))
                    .then(student => {
                        if (student) {
                            this.setState({
                                studentId: student.students_id
                            }, () => {
                                const { studentId, typeId, currentPage, limit } = this.state;
                                getCoursesByStudentIdPagined(token, studentId, typeId, currentPage, limit)
                                    .then(data => {
                                        this.setState(prevState => ({
                                            courses: [...prevState.courses, ...data.courses],
                                            currentPage: prevState.currentPage + 1,
                                            totalCount: data.total,
                                            totalPages: data.pages,
                                            isLoading: false
                                        }));
                                    })
                                    .catch(error => {
                                        this.setState({ isLoading: false });
                                        console.error("Error getCoursesByStudentIdPagined courses:", error);
                                    });
                            });
                        }
                    })
                    .catch(error => {
                        this.setState({ isLoading: false });
                        console.error("Error getUserIdFromAPI courses:", error);
                    })
            } else if (this.state.typeId == 3 || this.state.typeId == 5 || this.state.typeId == 6) {
                getUserIdFromAPI(token)
                    .then(userId => getProfessorIdByUserIdFromAPI(userId, token))
                    .then(professor => {
                        if (professor) {
                            this.setState({
                                professorId: professor.professors_id
                            }, () => {
                                const { professorId, typeId, currentPage, limit } = this.state;

                                getCoursesByProfessorIdPagined(token, professorId, typeId, currentPage, limit)
                                    .then(data => {
                                        this.setState(prevState => ({
                                            courses: [...prevState.courses, ...data.courses],
                                            currentPage: prevState.currentPage + 1,
                                            totalCount: data.total,
                                            totalPages: data.pages,
                                            isLoading: false
                                        }));
                                    })
                                    .catch(error => {
                                        this.setState({ isLoading: false });
                                        console.error("Error fetching courses:", error);
                                    });
                            });
                        }
                    })
                    .catch(error => {
                        this.setState({ isLoading: false });
                        console.error("Error fetching professor or user data:", error);
                    });
            }
        } else {
            this.props.history.push(`/`);
            return null;
        }
    }

    componentDidUpdate(prevProps) {
        if (prevProps.loggedInStatus !== this.props.loggedInStatus && this.props.loggedInStatus === "LOGGED_IN") {
            this.getCourses();
        }

        if (this.props.match.params.slug !== prevProps.match.params.slug) {
            this.setState({
                typeId: this.props.match.params.slug || null
            }, () => {
                this.getCourses(token);
            });

        }
    }

    componentWillUnmount() {
        this.hasUnmounted = true;
        window.onscroll = null;
    }


    onScroll() {
        if (
            window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100
        ) {
            if (this.state.typeId) {
                if (this.state.currentPage <= this.state.totalPages && !this.state.isLoading) {
                    const token = localStorage.getItem("token");
                    const { professorId, typeId, currentPage, limit } = this.state;
                    this.setState({ isLoading: true });
                    getCoursesByProfessorIdPagined(token, professorId, typeId, currentPage, limit)
                        .then(data => {
                            if (!this.hasUnmounted) {
                                this.setState(prevState => ({
                                    courses: [...prevState.courses, ...data.courses],
                                    currentPage: prevState.currentPage + 1,
                                    totalCount: data.total,
                                    totalPages: data.pages,
                                    isLoading: false
                                }));
                            }
                        })
                        .catch(error => {
                            console.error("Error fetching courses:", error);
                            if (!this.hasUnmounted) {
                                this.setState({ isLoading: false });
                            }
                        });
                }
            }
        }

    }

    handleNewCourseClick() {
        this.setState({
            courseModalIsOpen: true
        });
    }

    handleDeleteClick() {
        console.log("delete course click");
    }

    render() {
        const { courses = [] } = this.state;
        const { loggedInStatus } = this.props;
        if (loggedInStatus !== "LOGGED_IN") {
            this.props.history.push(`/`);
            return null;
        }
        return (
            <div className="course-content-page-wrapper">

                {!this.state.isLoading && courses.length === 0 ? (
                    <p>No hay cursos disponibles</p>
                ) : (
                    courses.length > 0 && (
                        <div>
                            {courses.map((course) => (
                                <div key={course.courses_id}>
                                    <CourseItem
                                        course={course}
                                        handleDeleteClick={this.handleDeleteClick}
                                    />
                                </div>
                            ))}
                        </div>
                    )
                )}
                {this.state.isLoading && (
                    <div className='content-loader'>
                        <FontAwesomeIcon icon="spinner" spin />
                    </div>
                )}
            </div>
        );
    }
}

export default withRouter(CourseContainer);
