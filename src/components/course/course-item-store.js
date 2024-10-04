import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import Truncate from "react-truncate";
import striptags from "striptags";
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

const CourseItemStore = ({ course, isCourseInCart, onAddToCart, onFavoriteClick, isFavorite, editingPermission }) => {
    const discounted = course.courses_discounted_price;

    return (
        <div className="course-content-item" key={course.courses_id}>
            <div className="course-content-image">
                <img src={course.courses_image} alt={course.courses_title} />
            </div>
            <div className="course-content-text">
                <div className="course-content-text-title">
                    <Link
                        to={{
                            pathname: `/c/${course.courses_id}`,
                            state: { editingPermission }
                        }}
                    >
                        <h2>{course.courses_title}</h2>
                    </Link>
                    <Truncate lines={5} ellipsis={
                        <span>
                            ...<Link className="link-read-more" to={`/c/${course.courses_id}`} >Leer más</Link>
                        </span>
                    }><p>{striptags(course.courses_content)}</p></Truncate>
                </div>
            </div>
            <div className="course-content-rest">
                {discounted != null ? (
                    <div>
                        <div className="course-content-price-through">
                            {course.courses_price} €
                        </div>
                        <div className="course-content-discounted-price">
                            {course.courses_discounted_price} €
                        </div>
                    </div>
                ) : (
                    <div className="course-content-price">
                        {course.courses_price} €
                    </div>
                )}
            </div>
            <div className="course-content-button">
                <div className="btn-add-cart">
                    <button
                        className="btn"
                        onClick={() => onAddToCart(course)}
                        disabled={isCourseInCart}
                    >
                        {isCourseInCart ? 'Seleccionado' : 'Añadir a la cesta'}
                    </button>
                </div>
            </div>
            <div className="course-icons">
                <a
                    className="icon-star"
                    onClick={() => onFavoriteClick(course.courses_id)}
                >
                    <FontAwesomeIcon icon={isFavorite ? faStarSolid : faStarRegular} />
                </a>
            </div>
        </div>
    );
};
export default CourseItemStore;