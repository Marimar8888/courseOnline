import React, { Component } from "react";
import DropzoneComponent from "react-dropzone-component";
import { withRouter } from "react-router-dom";

import RichTextEditor from "../forms/rich-text-editor";
import CourseFormFields from "../forms/course-form-fields";
import { addOrUpdateCourse, delete_course_image } from "../services/course";
import { getProfessorByProfessorIdFromAPI } from "../services/professor";
import { categoryNamesFromAPI } from '../services/category';
import { studyCentersNamesFromAPI } from '../services/center';
import { getUserIdFromAPI } from "../services/user";
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
            professor: [],
            studycenter_id: "",
            studycenter_names: [],
            category_id: "",
            category_names: [],
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
        this.toggleActive = this.toggleActive.bind(this);
        this.getProfessorName = this.getProfessorName.bind(this);
        this.getCategoryNames = this.getCategoryNames.bind(this);
        this.getStudyCentersNames = this.getStudyCentersNames.bind(this);

        this.conponentConfig = this.componentConfig.bind(this);
        this.djsConfig = this.djsConfig.bind(this);
        this.handleImageDrop = this.handleImageDrop.bind(this);
        this.deleteImage = this.deleteImage.bind(this);
        this.imageRef = React.createRef();
    }

    componentDidMount() {
        const token = localStorage.getItem("token");
        if (this.props.editMode && token) {
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
            this.getProfessorName(this.props.course.professor, token);
            this.getCategoryNames();
            this.getStudyCentersNames(this.props.course.professor, token);
        } else {
            getUserIdFromAPI(token)
                .then(response => {
                    this.setState({
                        professor_id: response
                    }, () => {
                        this.getProfessorName(this.state.professor_id, token);
                        this.getStudyCentersNames(this.state.professor_id, token);
                    });
                })
            this.getCategoryNames();
        }
    }

    getCategoryNames() {
        categoryNamesFromAPI()
            .then(response => {
                this.setState({ category_names: response });
            })
    }

    getProfessorName(professorId, token) {
        getProfessorByProfessorIdFromAPI(professorId, token)
            .then(response => {
                this.setState({ professor: response });
            })
    }

    getStudyCentersNames(professorId, token) {
        studyCentersNamesFromAPI(professorId, token)
            .then(response => {
                if (Array.isArray(response)) {
                    this.setState({ studycenter_names: response });
                }
            })
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

    toggleActive() {
        const newActiveState = !this.state.active;
        this.setState({ active: newActiveState });
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        })
    }


    handleImageDrop() {
        return {
            addedfile: file => {
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
        const token = localStorage.getItem("token");
        if (token) {
            this.setState({ isSubmitting: true });
            addOrUpdateCourse(this.state.apiUrl, this.state.apiAction, token, this.state, this.state.previousState)
                .then(data => {
                    const courseId = this.state.id;
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
                        this.setState({ isSubmitting: false });
                        this.props.handleUpdateFormSubmission(data);
                        this.props.history.push(`/c/${courseId}`);
                    } else {
                        this.setState({ isSubmitting: false });
                        this.props.handleSuccessfullFormSubmission(data);
                    }
                })
                .catch(error => {
                    console.log("Error al agregar el curso:", error);
                });
        }
    }

    render() {
        return (
            <form onSubmit={this.handleSubmit} className="course-form-wrapper">
                <CourseFormFields
                    state={this.state}
                    handleChange={this.handleChange}
                    setActive={this.toggleActive}
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
