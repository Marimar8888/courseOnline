import React, { Component } from 'react'

import RegisterFormFields from '../forms/register-form-fields';
import { addUser } from '../services/user';


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
        addUser(this.state.name, this.state.email, this.state.password, this.state.setState, this.isMountedComponent)
            .then(response => {
                if (response.status === 201) {
                    if (this.isMountedComponent) {
                        this.props.handleSuccessfulReg();
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
