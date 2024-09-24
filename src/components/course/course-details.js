import React, { Component } from 'react';

import { getCourseByIdFromAPI } from '../services/course';

export default class CourseDetails extends Component {
    constructor(props) {
        super(props);
        this.state = {
            currentId: this.props.match.params.slug,
            courseItem: {}
        };
    }
    componentDidMount() {
        this.getCourseItem();
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
        return (
            <div className='course-details-wrapper'>
                <div className='course-details-image'>
                    <img src={courses_image} />
                </div>
                <div className='course-details-text'>
                    <div className='course-details-text-header'>
                        <h1>{courses_title}</h1>
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
                    {courses_content}
                </div>
            </div>
        )
    }
}
