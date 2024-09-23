import React, { Component } from "react";
import ReactModal from "react-modal";

export default class CourseModal extends Component {
    constructor(props) {
        super(props);        
    }
    
    render() { 
        return (
            <ReactModal 
                isOpen={this.props.modalIsOpen}
                onRequestClose={() => {
                    this.props.handleModalClose();
                }}>
                <h1>I'm a Modall!!</h1>
            </ReactModal>
        );
    }
}