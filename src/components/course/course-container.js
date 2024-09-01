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
        console.log("courseContainer:", courses);
        return (
            <div>
                <h2>Course Container</h2>
                {courses.length > 0 ? (
                    <ul>
                        {courses.map(course => {
                            console.log("Rendering course:", course);
                            return(
                                <div key={course.courses_id}>
                                    <h2>{course.courses_title}</h2>
                                    <img 
                                        src={course.courses_image} 
                                        alt={course.courses_title} 
                                        style={{ maxWidth: '30%', height: 'auto' }}
                                    />
                                    <p>{course.courses_content}</p>
                                </div>
                            );
                        })}
                    </ul>
                ) : (
                    <p>No hay cursos disponibles.</p>
                )}
            </div>
        )
    }
}

export default withRouter(CourseContainer);