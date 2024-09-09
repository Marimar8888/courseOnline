import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class CourseContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            param: this.props.match.params.slug || null,
            courses: (this.props.location && this.props.location.state && this.props.location.state.courses) || [],
            currentPage: 1,
            totalCount: 0,
            totalPages: 0,
            isLoading: true,
            limit: 10,
            courseModalIsOpen: false
        }

        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleNewCourseClick = this.handleNewCourseClick.bind(this);
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
        const { courses } = this.state;
        console.log("Courses-container", courses);
        const { loggedInStatus } = this.props;

        if (loggedInStatus !== "LOGGED_IN") {
            this.props.history.push(`/`);
            return null;
        }
        return (
            <div>
                <div className="course-content-page-wrapper">
                    {courses.length > 0 ? (
                        <ul>
                            {courses.map(course => {
                                return (
                                    <div className="course-content-item" key={course.courses_id}>
                                        <div className='course-content-image' key={course.courses_id}>
                                            <img
                                                src={course.courses_image}
                                                alt={course.courses_title}
                                                style={{ maxWidth: '100%', height: 'auto' }}
                                            />
                                        </div>
                                        <div className='course-content-text'>
                                            <h2>{course.courses_title}</h2>

                                            <p>{course.courses_content}</p>
                                        </div>
                                        <div className='course-icons'>
                                            <a className="icon-trash" onClick={() => this.handleDeleteClick(course)}>
                                                <FontAwesomeIcon icon="trash" />
                                            </a>
                                        </div>
                                    </div>
                                );
                            })}
                        </ul>
                    ) : (
                        <p>No hay cursos disponibles.</p>
                    )}
                    <div className="new-course-link">
                        <a className="icon-plus-circle" onClick={this.handleNewCourseClick}>
                            <FontAwesomeIcon icon="plus-circle" />
                        </a>
                    </div>
                </div>

            </div >
        );
    }
}
export default withRouter(CourseContainer);