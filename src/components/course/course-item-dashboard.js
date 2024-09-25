import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Truncate from "react-truncate";
import striptags from "striptags";

const CourseItemDashboard = ({ course, typeId, handleDeleteClick, handleNewCourseClick }) => {
    return (
        <div>
            <div className="course-content-item-dashboard" key={course.courses_id}>
                <div className="course-content-image" key={course.courses_id}>
                    <img
                        src={course.courses_image}
                        alt={course.courses_title}
                        style={{ maxWidth: "100%", height: "auto" }}
                    />
                </div>
                <div className="course-content-text">
                    <div className="course-content-text-title">
                        <Link to={`/c/${course.courses_id}`}>
                            <h2>{course.courses_title}</h2>
                        </Link>
                    </div>
                    <div className="course-content-text-content">
                        <Truncate lines={5} ellipsis={
                            <span>
                                ...<Link to={`/c/${course.courses_id}`}>Leer más</Link>
                            </span>
                        }><p>{course.courses_content}</p></Truncate>

                    </div>

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

export default CourseItemDashboard;