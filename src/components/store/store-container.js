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
        this.hasUnmounted = false;
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
            isLoading: true
        });
    }

    activateInfiniteScroll() {
        window.onscroll = () => {
            if (
                window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 100
            ) {
                if(this.state.categoryId){
                    if( this.state.currentPage <= this.state.totalPages && !this.state.isLoading) {
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

