import React, { Component } from 'react'
import axios from 'axios';
import { API_URL } from '../utils/constant';
import RegisterFormFields from '../forms/register-form-fields';


export default class Register extends Component {

    constructor(props) {
        super(props);

        this.state = {
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            errorText: ""
        };
        this.isMountedComponent = false;
        this.handleLoginClick = this.handleLoginClick.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        if (this.state.password !== this.state.confirmPassword) {
            this.setState({
                errorText: "Las contraseñas no coinciden."
            });
            return;
        }
        axios
            .post(
                `${API_URL}/user`,
                {
                    users_name: this.state.name,
                    users_email: this.state.email,
                    users_password: this.state.password
                }
            )
            .then(response => {
                if (response.status === 201) {
                    if (this.isMountedComponent) {
                        this.props.handleSuccessfulReg();
                    }
                }
            })
            .catch(error => {
                if (this.isMountedComponent) {
                    if (error.response) {
                        switch (error.response.status) {
                            case 400:
                                this.setState({
                                    errorText: error.response.data.error
                                });
                                break;
                            case 404:
                                this.setState({
                                    errorText: "A required resource could not be found on the server."
                                });
                                break;
                            case 500:
                                this.setState({
                                    errorText: "Server error. Please try again later."
                                });
                                break;
                            default:
                                this.setState({
                                    errorText: "Unexpected error. Please try again."
                                });                                
                            
                        }
                    }else if (error.request) {
                        if (this.isMountedComponent) {
                            this.setState({
                                errorText: "A response could not be obtained from the server. Check your internet connection."
                            });
                        }
                    }else {
                        if (this.isMountedComponent) {
                            this.setState({
                                errorText: "An error occurred while processing the request. Please try again."
                            });
                        }
                    }
                }
            });
    }

    handleLoginClick() {
        if (this.props.openLoginModal) {
            this.props.openLoginModal();
        }
    }

    componentDidMount() {
        this.isMountedComponent = true;
    }

    componentWillUnmount() {
        this.isMountedComponent = false;
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value,
            errorText: ""
        });
    }

    render() {
        return (
            <div >
                <RegisterFormFields
                  handleSubmit = {this.handleSubmit}
                  handleChange = {this.handleChange}
                  handleLoginClick = {this.handleLoginClick}
                  state = {this.state}
                />
            </div>
        )
    }
}
