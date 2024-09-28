import React, { Component } from "react";
import DropzoneComponent from "react-dropzone-component";
import { withRouter } from "react-router-dom";

import RichTextEditor from "../forms/rich-text-editor";
import CourseFormFields from "../forms/course-form-fields";
import { addOrUpdateCourse, delete_course_image } from "../services/course";
import { API_URL } from "../utils/constant";

class CourseForm extends Component {
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
            isSubmitting: false,
            apiUrl: `${API_URL}/course`,
            apiAction: "post",
            previousState: {
                title: "",
                active: true,
                content: "",
                image: "",
                price: "",
                discounted_price: "",
                professor_id: "",
                studycenter_id: "",
                category_id: "",
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleRichTextEditorChange = this.handleRichTextEditorChange.bind(this);

        this.conponentConfig = this.componentConfig.bind(this);
        this.djsConfig = this.djsConfig.bind(this);
        this.handleImageDrop = this.handleImageDrop.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.imageRef = React.createRef();
    }

    componentDidMount() {
        if (this.props.editMode) {
            console.log("componentDidMount course:", this.props.course);
            this.setState({
                id: this.props.course.courses_id,
                title: this.props.course.courses_title,
                content: this.props.course.courses_content || null,
                image: this.props.course.courses_image || "",
                price: this.props.course.courses_price,
                discounted_price: this.props.course.courses_discounted_price || "",
                professor_id: this.props.course.professor,
                studycenter_id: this.props.course.studycenter || "",
                category_id: this.props.course.category,
                active: this.props.course.courses_active,
                apiUrl: `${API_URL}/course/${this.props.course.courses_id}`,
                apiAction: "patch",
                previousState: {
                    title: this.props.course.courses_title,
                    content: this.props.course.courses_content || null,
                    image: this.props.course.courses_image || "",
                    price: this.props.course.courses_price,
                    discounted_price: this.props.course.courses_discounted_price || "",
                    professor_id: this.props.course.professor,
                    studycenter_id: this.props.course.studycenter || "",
                    category_id: this.props.course.category,
                    active: this.props.course.courses_active,
                }
            })
        }
    }

    componentConfig() {
        return {
            iconFiletypes: [".jpg", ".png"],
            showFiletypeIcon: true,
            postUrl: this.state.apiUrl
        };
    }

    djsConfig() {
        return {
            autoProcessQueue: false,
            addRemoveLinks: true,
            maxFiles: 1
        };
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    handleImageDrop() {
        return {
            addedfile: file => {
                console.log("Archivo añadido:", file);
                this.setState({ image: file })
            }
        };
    }

    handleRichTextEditorChange(content) {
        this.setState({ content });
    }


    handleRichTextEditorChange(content) {
        this.setState({ content });
    }

    deleteImage(event) {
        event.preventDefault();
        const courseId = this.state.id
        const token = localStorage.getItem("token");
        if (token && courseId) {
            delete_course_image(courseId, token)
                .then(response => {
                    this.props.handleImageDelete();
                })
        }
    }

    handleSubmit(event) {
        event.preventDefault();
        console.log("handleSubmit editMode:", this.props.editMode);
        const token = localStorage.getItem("token");
        if (token) {
            this.setState({ isSubmitting: true });
            addOrUpdateCourse(this.state.apiUrl, this.state.apiAction, this.buildForm(), token)
                .then(data => {
                    const courseId = this.state.id;
                    console.log("Respuesta del servidor:", data);
                    if (this.state.image && this.imageRef.current && this.imageRef.current.dropzone) {
                        this.imageRef.current.dropzone.removeAllFiles();
                    }
                    this.setState({
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
                        isSubmitting: false,
                        apiUrl: `${API_URL}/course`,
                        apiAction: "post"

                    });
                    if (this.props.editMode) {
                        console.log("addOrUpdateCourse actualización curso", this.props.editMode);
                        this.setState({ isSubmitting: false });
                        this.props.handleUpdateFormSubmission(data);
                        this.props.history.push(`/c/${courseId}`);
                    } else {
                        this.setState({ isSubmitting: false });
                        this.props.handleSuccessfullFormSubmission(data);
                        console.log("addOrUpdateCourse creación curso", this.props.editMode);
                    }
                })
                .catch(error => {
                    console.log("Error al agregar el curso:", error);
                });
        }
    }

    buildForm() {

        let formData = new FormData();
       
        if (this.state.title !== this.state.previousState.title) {
            formData.append("courses_title", this.state.title);
        }
        if (this.state.active !== this.state.previousState.active) {
            formData.append("courses_active", this.state.active === true ? 'true' : 'false');
        }
        if (this.state.content !== this.state.previousState.content) {
            formData.append("courses_content", this.state.content);
        }
        if (this.state.price !== this.state.previousState.price) {
            formData.append("courses_price", this.state.price);
        }
        if (this.state.discounted_price !== this.state.previousState.discounted_price) {
            formData.append("courses_discounted_price", this.state.discounted_price);
        }
        if (this.state.professor_id !== this.state.previousState.professor_id) {
            formData.append("courses_professor_id", this.state.professor_id);
        }
        if (this.state.studycenter_id !== this.state.previousState.studycenter_id) {
            formData.append("courses_studycenter_id", this.state.studycenter_id);
        }
        if (this.state.category_id !== this.state.previousState.category_id) {
            formData.append("courses_category_id", this.state.category_id);
        }
    
        if (this.state.image !== this.state.previousState.image && this.state.image instanceof File) {
            formData.append("file", this.state.image);
        }
            
        console.log("Contenido del FormData antes de enviar:");
        for (const [key, value] of formData.entries()) {
            console.log(key, value);
        }
    
        return formData;
    }

    // buildForm() {
    //     let formData = new FormData();

    //     formData.append("courses_title", this.state.title);
    //     formData.append("courses_active", this.state.active === true ? 'true' : 'false');
    //     formData.append("courses_content", this.state.content);
    //     formData.append("courses_price", this.state.price);
    //     formData.append("courses_discounted_price", this.state.discounted_price);
    //     formData.append("courses_professor_id", this.state.professor_id);
    //     formData.append("courses_studycenter_id", this.state.studycenter_id);
    //     formData.append("courses_category_id", this.state.category_id);

    //     if (this.state.image && this.state.image instanceof File) {
    //         formData.append("file", this.state.image);
    //     }
    //     console.log("Contenido del FormData antes de enviar:");
    //     for (const [key, value] of formData.entries()) {
    //         console.log(key, value);
    //     }

    //     return formData;
    // }


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
                        editMode={this.props.editMode}
                        contentToEdit={
                            this.props.editMode && this.props.course.courses_content
                                ? this.props.course.courses_content
                                : null}
                    />
                </div>
                <div className="image-uploaders">
                    {this.props.editMode && this.props.course.courses_image ? (
                        <div className="course-manager-image-wrapper">
                            <img src={this.props.course.courses_image} />

                            <div className="image-removal-link">
                                <a onClick={this.deleteImage}>Remove file</a>
                            </div>

                        </div>
                    ) : (
                        <DropzoneComponent
                            ref={this.imageRef}
                            config={this.componentConfig()}
                            djsConfig={this.djsConfig()}
                            eventHandlers={this.handleImageDrop()}
                        >
                            <div className="dz-message">Image Principal</div>
                        </DropzoneComponent>
                    )}
                </div>

                <button className="btn-save">Save</button>

            </form>
        );
    }
};
export default withRouter(CourseForm);
