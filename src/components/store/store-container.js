import React, { Component } from 'react';
import axios from "axios";
import { API_URL } from '../utils/constant';

class StoreContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            categoryId: this.props.match.params.slug || null,
            categoryName: ""
        };
    }

    componentDidMount() {
        this.loadCourses();
    }

    componentDidUpdate(prevProps){
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
        }else{
            this.getAllCourses();
        }
    }

    getAllCourses() {
        axios
            .get(
                `${API_URL}/courses`
            )
            .then(response => {
                this.setState({
                    courses: response.data,
                    categoryName: "All Courses"
                })
            })
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
            .catch(error =>{
                console.log('getCourseByCategory error', error);
            })
    }

    render() {
        return (
            <div className="content-page-wrapper">
                <h1>{this.state.categoryName}</h1>
                <div>
                    {this.state.courses.map(course => (
                        <div key={course.courses_id}>
                            <h2>{course.courses_title}</h2>
                            <img 
                                src={course.courses_image} 
                                alt={course.courses_title} 
                                style={{ maxWidth: '30%', height: 'auto' }}
                            />
                            <p>{course.courses_content}</p>
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default StoreContainer;

