import React, { Component } from 'react';
import axios from "axios";
import { API_URL } from '../utils/constant';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import CourseItemStore from '../course/course-item-store';
import LoginNotification from '../modals/login-notification';
import { getFavoritesByUserId, deleteFavorite, createFavorite } from '../services/favorites';
import { getUserIdFromAPI } from '../services/user';
import { getAllCoursesWithPage } from '../services/course';
import { getCategory } from '../services/category';

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
            modalMessage: "",
            editingPermission: false
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

    getUserId(token) {
        if (token) {
            getUserIdFromAPI(token)
                .then(response => {
                    const userId = response;
                    this.setState({ userId }, () => {
                        getFavoritesByUserId(userId, token)
                            .then(response => {
                                const favoriteIds = response.map(favorite => favorite.favorites_course_id);
                                this.setState({
                                    favorites: favoriteIds
                                });
                                if (response.status === 404) {
                                    console.log("User doesn´t have favorites");
                                }
                            })
                    });

                })

        }
    }

    handleFavoriteClick = (courseId) => {
        const userId = this.state.userId;
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
            createFavorite(courseId, userId, token)
                .then(response => {
                    this.setState(prevState => ({
                        favorites: [...prevState.favorites, courseId]
                    }));
                })
        } else {
            deleteFavorite(courseId, userId, token)
                .then(response => {
                    this.setState(prevState => ({
                        favorites: prevState.favorites.filter(favId => favId !== courseId)
                    }));
                })
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
            this.getCategoryItems(this.state.categoryId);
        } else {
            this.getAllCourses();
        }
    }

    getAllCourses() {
        this.setState({
            isLoading: true
        });
        getAllCoursesWithPage(this.state, this.hasUnmounted)
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
                    this.setState({ isLoading: false });
                }
                console.error("Error fetching courses:", error);
            });
    }

    getCategoryItems() {
        getCategory(this.state.categoryId)
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
                console.log("getCategoryItems error", error);
            });
    }
      
    // getCategoryItems() {
    //     axios
    //         .get(
    //             `${API_URL}/category/${this.state.categoryId}`
    //         )
    //         .then(response => {
    //             console.log("getCategoryItem: ", response)
    //             if (!this.hasUnmounted) {
    //                 this.setState({
    //                     categoryId: response.data.categories_id,
    //                     categoryName: response.data.categories_name,
    //                     courses: [],
    //                     currentPage: 1,
    //                     totalPages: 0
    //                 }, () => {
    //                     this.getCourseByCategory();
    //                 });
    //             }
    //         })
    //         .catch(error => {
    //             console.log("getCategoryItem error", error);
    //         });
    // }

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
                <div className="category-title">
                    {this.state.categoryName && (
                        <h1>Cursos de {this.state.categoryName}</h1>
                    )}
                </div>

                {this.state.courses.map(course => {
                    const isCourseInCart = cartCourses.some(cartCourse => cartCourse.courses_id === course.courses_id);
                    const isFavorite = this.state.favorites.includes(course.courses_id);

                    return (
                        <CourseItemStore
                            key={course.courses_id}
                            course={course}
                            isCourseInCart={isCourseInCart}
                            onAddToCart={this.props.addToCart}
                            onFavoriteClick={this.handleFavoriteClick}
                            isFavorite={isFavorite}
                            editingPermission={this.editingPermission}
                        />
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

