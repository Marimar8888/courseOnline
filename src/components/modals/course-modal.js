import React, { Component } from "react";
import ReactModal from "react-modal";

import CourseForm from "../course/course-form";

ReactModal.setAppElement(".app-wrapper");

export default class CourseModal extends Component {
    constructor(props) {
        super(props);
        this.customStyles = {
            content: {
                top: "50%",
                left: "50%",
                right: "auto",
                marginRight: "-50%",
                transform: "translate(-50%,-50%)",
                width: "800px"
            },
            overlay: {
                backgroundColor: "rgba(1,1,1,0.75)"
            }
        }
    }

    render() {
        return (
            <ReactModal
                style={this.customStyles}
                isOpen={this.props.modalIsOpen}
                onRequestClose={() => {
                    this.props.handleModalClose();
                }}>
                <CourseForm />
            </ReactModal>
        );
    }
}