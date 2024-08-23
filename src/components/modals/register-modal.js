import React, { Component } from "react";
import ReactModal from "react-modal";

import Register from "../auth/register";

ReactModal.setAppElement(".app-wrapper");

export default class RegisterModal extends Component {
    constructor(props) {
        super(props);

        this.customStyles = {
            content: {
                top: "50%",
                left: "50%",
                right: "auto",
                marginRight: "-50%",
                transform: "translate(-50%, -50%)",
                width: "500px",
                height: "540px"
            },
            overlay: {
                backgroundColor: "rgba(1, 1, 1, 0.75)"
            }
        };

        this.handleClose = this.handleClose.bind(this);
        this.handleSuccessfulReg = this.handleSuccessfulReg.bind(this);
    }

    handleClose() {
        this.props.onClose();
    }

    handleSuccessfulReg() {
        this.props.handleSuccessfulRegister();
        this.props.onClose(); 
    }

    render() {
        return (
            <ReactModal
                style={this.customStyles}
                isOpen={this.props.isOpen}
                onRequestClose={this.handleClose}
            >
           
            <Register 
                openLoginModal={this.props.openLoginModal}
                handleSuccessfulReg={this.handleSuccessfulReg}
            />
              
            </ReactModal>
        );
    }
}
