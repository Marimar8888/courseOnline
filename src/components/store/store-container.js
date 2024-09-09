import React, { Component } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from "axios";
import { API_URL } from '../utils/constant';

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
            limit: 10
        };
        this.activateInfiniteScroll();

    }

    componentDidMount() {
        this.loadCourses();
    }

    componentDidUpdate(prevProps) {
        if (this.props.match.params.slug !== prevProps.match.params.slug) {
            this.setState({
                categoryId: this.props.match.params.slug || null
            },
                this.getAllCourses
            );
        }
    }

    activateInfiniteScroll() {
        window.onscroll = () => {
            if (
                window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100
            ) {
                if (this.state.currentPage <= this.state.totalPages && !this.state.isLoading) {
                    this.getAllCourses();
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
        const url= this.state.currentPage;
        console.log("url:",url);
        axios
            .get(
                `${API_URL}/courses?page=${this.state.currentPage}&limit=${this.state.limit}`
            )
            .then(response => {
                console.log("getAllCourses:", response.data);
                const newCourses = response.data.courses.filter(
                    newCourse => !this.state.courses.some(course => course.courses_id === newCourse.courses_id)
                );
                this.setState(prevState => ({
                    courses: this.state.courses.concat(response.data.courses),
                    totalCount: response.data.total,
                    totalPages: response.data.pages,
                    currentPage: response.data.page + 1,
                    isLoading: false
                }));

            })
            .catch(error => {
                this.setState({ isLoading: false });
            });

    }


    getCategoryItem() {
        axios
            .get(
                `${API_URL}/category/${this.state.categoryId}`
            )
            .then(response => {
                this.setState({
                    categoryId: response.data.categories_id,
                    categoryName: response.data.categories_name,
                    courses: []
                }, () => {
                    this.getCourseByCategory();
                });
            })
            .catch(error => {
                console.log("getCategoryItem error", error);
            });
    }

    getCourseByCategory() {
        axios
            .get(
                `${API_URL}/store/courses/${this.state.categoryId}`
            )
            .then(response => {
                this.setState({
                    courses: response.data,
                });
            })
            .catch(error => {
                console.log('getCourseByCategory error', error);
            })
    }

    render() {
        return (
            <div className="course-content-page-wrapper">
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
                        <div>Icons crear borrar</div>
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

