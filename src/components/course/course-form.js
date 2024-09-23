import React, { Component } from "react";

import { addCourse } from "../services/course";

export default class CourseForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            courses_id: "",
            courses_title: "",
            courses_active: true,
            courses_content: "",
            courses_image: "",
            courses_price: "",
            courses_discounted_price: "",
            courses_professor_id: "",
            courses_studycenter_id: "",
            courses_category_id: "",
            isSubmitting: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
       
    }


    buildForm() {
        let formData = new FormData();

        formData.append("courses_title", this.state.courses_title);
        formData.append("courses_active", this.state.courses_active === true ? 'true' : 'false');
        //formData.append("courses_content", this.state.courses_content);
        //formData.append("courses_image", this.state.courses_image);
        formData.append("courses_price", this.state.courses_price);
        formData.append("courses_discounted_price", this.state.courses_discounted_price);
        formData.append("courses_professor_id", this.state.courses_professor_id);
        formData.append("courses_studycenter_id", this.state.courses_studycenter_id);
        formData.append("courses_category_id", this.state.courses_category_id);

        return formData;
    }

    handleSubmit(event) {
        event.preventDefault();
    
        const token = localStorage.getItem("token");
        if (token) {
            this.setState({ isSubmitting: true });
            addCourse(this.buildForm(), token)
                .then(data => {
                    if (this.props.handleSuccessfullFormSubmission) {
                        this.setState({
                            courses_title: "",
                            courses_active: true,
                            //courses_content: "",
                            // courses_image: "",
                            courses_price: "",
                            courses_discounted_price: "",
                            courses_professor_id: "",
                            courses_studycenter_id: "",
                            courses_category_id: "",
                            isSubmitting: false
                        });
                        this.props.handleSuccessfullFormSubmission(data);
                    }
                })
                .catch(error => {
                    console.log("Error al agregar el curso:", error);
                    this.setState({ isSubmitting: false }); 
                });
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="course-form-wrapper">
                <div className="two-column">
                    <input
                        type="text"
                        onChange={this.handleChange}
                        name="courses_title"
                        placeholder="Course Title"
                        value={this.state.courses_title}
                    />

                    <input
                        type="checkbox"
                        onChange={(e) => this.setState({ courses_active: e.target.checked })}
                        name="courses_active"
                        checked={this.state.courses_active}
                    />
                </div>
                <div className="three-column">
                    <input
                        type="text"
                        onChange={this.handleChange}
                        name="courses_price"
                        placeholder="Course price"
                        value={this.state.courses_price}
                    />

                    <input
                        type="text"
                        onChange={this.handleChange}
                        name="courses_discounted_price"
                        placeholder="Course price discounted"
                        value={this.state.courses_discounted_price}
                    />
                    <input
                        type="text"
                        onChange={this.handleChange}
                        name="courses_category_id"
                        placeholder="Course category"
                        value={this.state.courses_category_id}
                    />
                </div>
                <div className="two-column">
                    <input
                        type="text"
                        onChange={this.handleChange}
                        name="courses_professor_id"
                        placeholder="Course professor"
                        value={this.state.courses_professor_id}
                    />

                    <input
                        type="text"
                        onChange={this.handleChange}
                        name="courses_studycenter_id"
                        placeholder="Course study center"
                        value={this.state.courses_studycenter_id}
                    />
                </div>


                <div className="one-column">

                </div>

                <div className="image-uploaders">

                </div>

                <button className="btn">Save</button>
            </form>
        );
    }
}