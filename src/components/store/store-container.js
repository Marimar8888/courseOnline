import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import { API_URL } from '../utils/constant';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

import LoginNotification from '../modals/login-notification';

class StoreContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            categoryId: this.props.match.params.slug || null,
            categoryName: "",
            currentPage: 1,
            totalCount: 0,
            totalPages: 0,
            isLoading: true,
            limit: 10,
            userId: "",
            favorites: [],
            isModalOpen: false,
            modalMessage: ""
        };
        this.hasUnmounted = false;
        this.activateInfiniteScroll();
        this.handleFavoriteClick = this.handleFavoriteClick.bind(this);
        this.closeModal = this.closeModal.bind(this);
    }

    componentDidMount() {
        const token = localStorage.getItem("token");
        const cartCourse = localStorage.getItem('cartCourses');
        this.loadCourses();
        if (token) {
            this.getUserId(token);
        }

    }

    componentDidUpdate(prevProps) {
        if (prevProps.loggedInStatus !== this.props.loggedInStatus && this.props.loggedInStatus === "LOGGED_IN") {
            const token = localStorage.getItem("token");
            this.getUserId(token);
        }

        if (this.props.match.params.slug !== prevProps.match.params.slug) {
            this.setState({
                categoryId: this.props.match.params.slug || null
            }, this.loadCourses);
        }
    }


    componentWillUnmount() {
        this.hasUnmounted = true;
        window.onscroll = null;
        this.setState({
            categoryId: this.props.match.params.slug || null,
            currentPage: 1,
            totalCount: 0,
            totalPages: 0,
            isLoading: true,
            favorites: []
        });
    }

    getAllFavorites(userId) {
        const token = localStorage.getItem("token");

        if (userId) {
            axios
                .get(
                    `${API_URL}/favorites/${userId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                .then(response => {
                    const favoriteIds = response.data.map(favorite => favorite.favorites_course_id);
                    this.setState({
                        favorites: favoriteIds
                    });
                    if (response.status === 404) {
                        console.log("User doesn´t have favorites");
                    }
                })
        }
    }

    getUserId(token) {
        if (token) {
            axios
                .get(
                    `${API_URL}/get_user_id`,
                    {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                .then(response => {
                    if (response.status === 200) {
                        const userId = response.data.users_id;
                        this.setState({ userId }, () => {
                            this.getAllFavorites(userId);
                        });
                    } else {
                        console.log("No Authorization");
                    }
                })
                .catch(error => {
                    if (error.response) {
                        console.log(`Error: ${error.response.status} - ${error.response.statusText}`);
                    } else {
                        console.log("Network or other error:", error.message);
                    }
                })
        }
    }

    deleteFavorite(courseId, token) {
        const userId = this.state.userId;

        axios
            .delete(
                `${API_URL}/favorite/${userId}/${courseId}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            .then(response => {
                this.setState(prevState => ({
                    favorites: prevState.favorites.filter(favId => favId !== courseId)
                }));
            })
            .catch(error => {
                console.log("error handleFavoriteClick", error);
            })
    }

    createFavorite(courseId, token) {
        const userId = this.state.userId;
        axios
            .post(
                `${API_URL}/favorite`,
                {
                    favorites_user_id: userId,
                    favorites_course_id: courseId
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
            .then(response => {
                this.setState(prevState => ({
                    favorites: [...prevState.favorites, courseId]
                }));
            })
            .catch(error => {
                console.log("error handleFavoriteClick", error);
            })
    }

    handleFavoriteClick = (courseId) => {
        const token = localStorage.getItem("token");

        if (!token) {
            this.setState({
                isModalOpen: true,
                modalMessage: "Para agregar favoritos debe loguearse"
            });
            return;
        }

        const favorite = this.state.favorites.includes(courseId);

        if (!favorite) {
            this.createFavorite(courseId, token);
        } else {
            this.deleteFavorite(courseId, token);
        }
    }

    activateInfiniteScroll() {
        window.onscroll = () => {
            if (
                window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100
            ) {
                if (this.state.categoryId) {
                    if (this.state.currentPage <= this.state.totalPages && !this.state.isLoading) {
                        this.getCourseByCategory();
                    }
                } else {
                    if (this.state.currentPage <= this.state.totalPages && !this.state.isLoading) {
                        this.getAllCourses();
                    }
                }

            }
        };
    }

    loadCourses = () => {
        if (this.state.categoryId) {
            this.getCategoryItem();
        } else {
            this.getAllCourses();
        }
    }

    getAllCourses() {
        this.setState({
            isLoading: true,
        });
        axios
            .get(
                `${API_URL}/courses?page=${this.state.currentPage}&limit=${this.state.limit}`
            )
            .then(response => {
                if (!this.hasUnmounted) {
                    this.setState({
                        courses: this.state.courses.concat(response.data.courses),
                        totalCount: response.data.total,
                        totalPages: response.data.pages,
                        currentPage: response.data.page + 1,
                        isLoading: false
                    });
                }
            })
            .catch(error => {
                if (!this.hasUnmounted) {
                    console.log("getAllCourses error", error);
                    this.setState({ isLoading: false });
                }
            });

    }

    getCategoryItem() {
        axios
            .get(
                `${API_URL}/category/${this.state.categoryId}`
            )
            .then(response => {
                if (!this.hasUnmounted) {
                    this.setState({
                        categoryId: response.data.categories_id,
                        categoryName: response.data.categories_name,
                        courses: [],
                        currentPage: 1,
                        totalPages: 0
                    }, () => {
                        this.getCourseByCategory();
                    });
                }
            })
            .catch(error => {
                console.log("getCategoryItem error", error);
            });
    }

    getCourseByCategory() {
        this.setState({
            isLoading: true,
        });
        axios
            .get(
                `${API_URL}/store/courses/${this.state.categoryId}?page=${this.state.currentPage}&limit=${this.state.limit}`
            )
            .then(response => {
                if (!this.hasUnmounted) {
                    this.setState({
                        courses: this.state.courses.concat(response.data.courses),
                        totalCount: response.data.total,
                        totalPages: response.data.pages,
                        currentPage: response.data.page + 1,
                        isLoading: false
                    });
                }
            })
            .catch(error => {
                console.log("getCourseByCategory error", error);
                this.setState({ isLoading: false });
            })
    }

    closeModal = () => {
        this.setState({ isModalOpen: false });
    }


    render() {
        const { cartCourses = [] } = this.props;
        return (
            <div className="course-content-page-wrapper">
                {this.state.categoryName && (
                    <h1>Cursos de {this.state.categoryName}</h1>
                )}

                {this.state.courses.map(course => {
                    const isCourseInCart = cartCourses.some(cartCourse => cartCourse.courses_id === course.courses_id);
                    const discounted = course.courses_discounted_price;
                    return (
                        <div className="course-content-item" key={course.courses_id}>
                            <div className='course-content-image'>
                                <img
                                    src={course.courses_image}
                                    alt={course.courses_title}
                                />
                            </div>
                            <div className='course-content-text'>
                                <div className='course-content-text-title'>
                                    <h2>{course.courses_title}</h2>
                                    <p>{course.courses_content}</p>
                                </div>
                                <div className='course-content-rest'>
                                    {discounted != null ? (
                                        <div>
                                            <div className='course-content-price-through'>
                                                {course.courses_price} €
                                            </div>
                                            <div className='course-content-discounted-price'>
                                                {course.courses_discounted_price} €
                                            </div>
                                        </div>
                                    ) : (
                                        <div className='course-content-price'>
                                            {course.courses_price} €
                                        </div>
                                    )}

                                    <div className='btn-add-cart'>
                                        <button
                                            className='btn'
                                            onClick={() => this.props.addToCart(course)}
                                            disabled={isCourseInCart}
                                        >
                                            {isCourseInCart ? 'Seleccionado' : 'Añadir a la cesta'}
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <div className='course-icons'>
                                <a
                                    className="icon-star"
                                    onClick={() => this.handleFavoriteClick(course.courses_id)}
                                >
                                    <FontAwesomeIcon icon={this.state.favorites.includes(course.courses_id) ? faStarSolid : faStarRegular} />
                                </a>
                            </div>
                        </div>
                    );
                })}

                {this.state.isLoading && (
                    <div className='content-loader'>
                        <FontAwesomeIcon icon="spinner" spin />
                    </div>
                )}

                <LoginNotification
                    isOpen={this.state.isModalOpen}
                    onRequestClose={this.closeModal}
                    message={this.state.modalMessage}
                />
            </div>
        );
    }
}

export default StoreContainer;

