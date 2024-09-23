import React, { Component } from "react";

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
            courses_category_id: ""
        };       
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        this.props.handleSuccessfullFormSubmission(this.state);
        event.preventDefault();
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
                        type="text"
                        onChange={this.handleChange}
                        name="courses_active"
                        placeholder="Course status"
                        value={this.state.courses_active}
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