import React, { Component } from 'react';
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
            isLoading: false,
            limit: 10
        };
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

    loadCourses = () => {
        if (this.state.categoryId) {
            this.getCategoryItem();
        } else {
            this.getAllCourses();
        }
    }

    // getAllCourses() {
    //     axios
    //         .get(
    //             `${API_URL}/courses`
    //         )
    //         .then(response => {
    //             this.setState({
    //                 courses: response.data,
    //                 categoryName: "All Courses"
    //             })
    //         })
    // }

    getAllCourses() {

        this.setState({ isLoading: true });

        axios
            .get(
                `${API_URL}/courses?page=${this.state.currentPage}&limit=${this.state.limit}`
            )
            .then(response => {
                this.setState(prevState => ({
                    courses: [...prevState.courses, ...response.data.courses],  // Concatenar cursos nuevos
                    totalCount: response.data.total,
                    isLoading: false,
                    currentPage: prevState.currentPage + 1
                }));
            })
            .catch(error => {
                console.log("getCourses error", error);
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
            <div className="store-content-page-wrapper">
                {this.state.courses.map(course => (
                    <div className="store-content-item" key={course.courses_id}>
                        <div className='store-content-image' key={course.courses_id}>
                            <img
                                src={course.courses_image}
                                alt={course.courses_title}
                                style={{ maxWidth: '100%', height: 'auto' }}
                            />
                        </div>
                        <div className='store-content-text'>
                            <h2>{course.courses_title}</h2>

                            <p>{course.courses_content}</p>
                        </div>
                        <div>Icons crear borrar</div>
                    </div>
                ))}
            </div>
        )
    }
}

export default StoreContainer;

