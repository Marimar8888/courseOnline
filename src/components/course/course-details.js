import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';

import { getCourseByIdFromAPI } from '../services/course';
import CourseForm from '../course/course-form';

export default class CourseDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentId: this.props.match.params.slug,
            courseItem: {},
            editMode: false,
            editingPermission: this.props.location.state.editingPermission || false
        };

        this.handleEditClick = this.handleEditClick.bind(this);
        this.handleImageDelete = this.handleImageDelete.bind(this);
        this.handleUpdateFormSubmission = this.handleUpdateFormSubmission.bind(this);
    }

    componentDidMount() {
        this.getCourseItem();
    }

    handleUpdateFormSubmission(course) {
        this.setState({
            courseItem: course,
            editMode: false
        });
    }

    handleImageDelete() {
        this.setState({
            courseItem: {
                image: ""
            }
        })
    }

    handleEditClick() {
        this.setState({ editMode: true });
    }

    getCourseItem() {
        const { currentId } = this.state;
        const token = localStorage.getItem("token");
        getCourseByIdFromAPI(currentId, token)
            .then(course => {
                this.setState({
                    courseItem: course
                });
            });
    }

    render() {
        const {
            courses_title,
            courses_image,
            courses_price,
            courses_discounted_price,
            courses_content
        } = this.state.courseItem
        const discounted = courses_discounted_price;

        const contentManager = () => {
            if (this.state.editMode && this.state.editingPermission) {
                return(
                    <CourseForm  
                        editMode={this.state.editMode} 
                        course={this.state.courseItem}
                        handleImageDelete = {this.handleImageDelete}
                        handleUpdateFormSubmission = {this.handleUpdateFormSubmission}
                    />
                );
            } else {
                return (
                    <div>
                        {courses_image ?
                            <div className='course-details-image'>
                                <img src={courses_image} />
                            </div> : null}
                        <div className='course-details-text'>
                            <div className='course-details-text-header'>
                                {this.state.editingPermission ? (
                                    <h1 className="title-with-click" onClick={this.handleEditClick}>{courses_title}</h1>
                                ) : (
                                    <h1>{courses_title}</h1>
                                )}
                            </div>
                            <div className='course-details-text-price'>
                                {discounted != null ? (
                                    <div>
                                        <div className='course-content-price-through'>
                                            {courses_price} €
                                        </div>
                                        <div className='course-content-discounted-price'>
                                            {courses_discounted_price} €
                                        </div>
                                    </div>
                                ) : (
                                    <div className='course-content-price'>
                                        {courses_price} €
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='course-details-content'>
                            {ReactHtmlParser(courses_content)}
                        </div>
                    </div>

                );
            }
        };
        return (
            <div className='course-details-wrapper'> {contentManager()} </div>
        )
    }
}
