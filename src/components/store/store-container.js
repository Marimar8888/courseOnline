import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import { API_URL } from '../utils/constant';
import { faStar as faStarSolid } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

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
            favorites: []
        };
        this.hasUnmounted = false;
        this.activateInfiniteScroll();
        this.handleFavoriteClick = this.handleFavoriteClick.bind(this);

    }

    componentDidMount() {
        this.loadCourses();
        this.getUserId();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.slug !== prevProps.match.params.slug) {
            this.setState({
                categoryId: this.props.match.params.slug || null
            },
                this.loadCourses
            );
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
                })
                .catch(error => {
                    console.log("error getAllFavorites", error)
                })
        }

    }

    getUserId() {
        const token = localStorage.getItem("token");
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
                    this.setState({
                        userId: response.data.users_id
                    })
                    this.getAllFavorites(this.state.userId);
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
                console.log("response handleFavoriteClick", response);
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
            console.log("Debe loguearse para crear favoritos");
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

    render() {
        return (
            <div className="course-content-page-wrapper">
                {this.state.categoryName ?
                    <h1>Cursos de {this.state.categoryName}</h1>
                    : null}

                {this.state.courses.map(course => (
                    <div className="course-content-item" key={course.courses_id}>
                        <div className='course-content-image'>
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
                            <a
                                className="icon-star"
                                onClick={() => this.handleFavoriteClick(course.courses_id)}
                            >
                                <FontAwesomeIcon icon={this.state.favorites.includes(course.courses_id) ? faStarSolid : faStarRegular} />
                            </a>
                        </div>
                    </div>
                ))}
                {this.state.isLoading ? (
                    <div className='content-loader'>
                        <FontAwesomeIcon icon="spinner" spin />
                    </div>) : null}
            </div>
        )
    }
}

export default StoreContainer;

