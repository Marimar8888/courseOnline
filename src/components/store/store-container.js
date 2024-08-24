import React, { Component } from 'react';
import axios from "axios";
import { API_URL } from '../utils/constant';

class StoreContainer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            courses: [],
            categoryId: this.props.match.params.slug,
            categoryName: ""
        };
    }

    componentDidMount() {
        this.getCategoryItem();
    }

    getCategoryItem() {
        axios
            .get(
                `${API_URL}/category/${this.state.categoryId}`
            )
            .then(response => {
                this.setState({ 
                    categoryId: response.data.categories_id,
                    categoryName: response.data.categories_name
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
                    courses: response.data
                });
                console.log('courses', this.state.courses);
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
                                style={{ maxWidth: '40%', height: 'auto' }}
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

