import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


class CourseContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            param: this.props.match.params.slug || null,
            courses: (this.props.location && this.props.location.state && this.props.location.state.courses) || [],
            totalCount: 0,
            currentPage: 0,
            isLoading: true,
            courseModalIsOpen: false
        }

        this.handleDeleteClick = this.handleDeleteClick.bind(this);
        this.handleNewCourseClick = this.handleNewCourseClick.bind(this);
    }

    handleNewCourseClick(){
        console.log("new course click");

    }

    handleDeleteClick(){
        console.log("delete course click");
    }

    render() {
        const { courses } = this.state;
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
                                                <FontAwesomeIcon icon= "trash"/>
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
                        <a className= "icon-plus-circle" onClick={this.handleNewCourseClick}>
                        <FontAwesomeIcon icon="plus-circle" />
                        </a>
                    </div>
 
                </div>
            </div>
        )
    }
}

export default withRouter(CourseContainer);