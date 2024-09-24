import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const CourseItem = ({ course, typeId, handleDeleteClick, handleNewCourseClick }) => {
    return (
        <div>
            <div className="course-content-item" key={course.courses_id}>
                <div className="course-content-image" key={course.courses_id}>
                    <img
                        src={course.courses_image}
                        alt={course.courses_title}
                        style={{ maxWidth: "100%", height: "auto" }}
                    />
                </div>
                <div className="course-content-text">
                <Link to={`/c/${course.courses_id}`}>       
                        <h2>{course.courses_title}</h2>
                    </Link>
                    <p>{course.courses_content}</p>
                </div>
                <div className="course-icons">
                    <a
                        className="icon-trash"
                        onClick={() => handleDeleteClick(course)}
                    >
                        <FontAwesomeIcon icon="trash" />
                    </a>
                </div>
            </div>
            {(typeId == 3 || typeId == 5) && (
                <div className="new-course-link">
                    <a className="icon-plus-circle" onClick={handleNewCourseClick}>
                        <FontAwesomeIcon icon="plus-circle" />
                    </a>
                </div>
            )}

        </div>
    );
};

export default CourseItem;