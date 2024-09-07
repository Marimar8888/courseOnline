import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
// import axios from "axios";
// import { API_URL } from '../utils/constant';


class CourseContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            param: this.props.match.params.slug || null,
            courses: (this.props.location && this.props.location.state && this.props.location.state.courses) || []
        }
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
                                        <div>Icons crear borrar</div>
                                    </div>
                                );
                            })}
                        </ul>
                    ) : (
                        <p>No hay cursos disponibles.</p>
                    )}
                </div>
            </div>
        )
    }
}

export default withRouter(CourseContainer);