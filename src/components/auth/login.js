import React, { Component } from 'react'
import axios from 'axios';

import { API_URL } from '../utils/constant';
import EmailRecovery from './email-recovery';
import LoginFormFields from '../forms/login-form-fields';

export default class Login extends Component {
  constructor(props) {
    super(props);

    this.state = {
      email: "",
      password: "",
      errorText: "",
      showEmailRecovery: false
    };
    this.isMountedComponent = false;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleRegisterClick = this.handleRegisterClick.bind(this);
    this.toggleEmailRecovery = this.toggleEmailRecovery.bind(this);
  }

  toggleEmailRecovery() {
    this.setState({ showEmailRecovery: !this.state.showEmailRecovery });
  }

  handleRegisterClick() {
    if (this.props.openRegisterModal) {
      this.props.openRegisterModal();
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

  handleSubmit(event) {
    event.preventDefault();
    axios
      .post(
        `${API_URL}/login`,
        {
            users_email: this.state.email,
            users_password: this.state.password
        }
      )
      .then(response => {
        if (response.status === 200) {
          if (this.isMountedComponent) {
            localStorage.setItem('token', response.data.token);
            localStorage.setItem('user_name', response.data.user_name);
            this.props.handleSuccessfulAuth();
          }
        } else {
          if (this.isMountedComponent) {
            this.setState({
              errorText: "Wrong email or password"
            });
            this.props.handleUnsuccessfulAuth();
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
                  errorText: "User Not Found"
                });
                break;
              case 401:
                this.setState({
                  errorText: "Incorrect password"
                });
                break;
              default:
                this.setState({
                  errorText: "Unexpected error. Please try again."
                });
            }
          } else if (error.request) {

            this.setState({
              errorText: "Unexpected error. Check your internet connection."
            });
          } else {

            this.setState({
              errorText: "Error processing the request. Please try again."
            });
          }
          this.props.handleUnsuccessfulAuth();
        }
      });
  }

  render() {
    if(this.state.showEmailRecovery){
      return <EmailRecovery toggleEmailRecovery={this.toggleEmailRecovery}/>
    }
    return (
      <div>
        <LoginFormFields
          handleSubmit={this.handleSubmit}
          handleChange={this.handleChange}
          toggleEmailRecovery={this.toggleEmailRecovery}
          handleRegisterClick={this.handleRegisterClick}
          state={this.state}
        />
      </div>
    )
  }
}

