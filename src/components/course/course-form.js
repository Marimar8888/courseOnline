import React, { Component } from "react";
import { addCourse } from "../services/course";

import RichTextEditor from "../forms/rich-text-editor";
import CourseFormFields from "../forms/course-form-fields";

export default class CourseForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            id: "",
            title: "",
            active: true,
            content: "",
            image: "",
            price: "",
            discounted_price: "",
            professor_id: "",
            studycenter_id: "",
            category_id: "",
            isSubmitting: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRichTextEditorChange = this.handleRichTextEditorChange.bind(this);
    }

    handleRichTextEditorChange(content) {
        this.setState({ content });
    }

    buildForm() {
        let formData = new FormData();

        formData.append("courses_title", this.state.title);
        formData.append("courses_active", this.state.active === true ? 'true' : 'false');
        formData.append("courses_content", this.state.content);
        //formData.append("courses_image", this.state.image);
        formData.append("courses_price", this.state.price);
        formData.append("courses_discounted_price", this.state.discounted_price);
        formData.append("courses_professor_id", this.state.professor_id);
        formData.append("courses_studycenter_id", this.state.studycenter_id);
        formData.append("courses_category_id", this.state.category_id);

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
                            id: "",
                            title: "",
                            active: true,
                            content: "",
                            // courses_image: "",
                            price: "",
                            discounted_price: "",
                            professor_id: "",
                            studycenter_id: "",
                            category_id: "",
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
                 <CourseFormFields
                    state={this.state}
                    handleChange={this.handleChange}
                    setActive={(active) => this.setState({ active })}
                />
                <div className="one-column">
                    <RichTextEditor
                        handleRichTextEditorChange={this.handleRichTextEditorChange}
                    />
                </div>

                <div className="image-uploaders">

                </div>
                <button className="btn-save">Save</button>
            </form>
        );
    }
}