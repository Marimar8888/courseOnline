import React, { Component } from 'react'

import EmailRecovery from './email-recovery';
import LoginFormFields from '../forms/login-form-fields';
import { login } from '../services/user';

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
    const { email, password } = this.state;
    const setErrorText = (errorMessage) => this.setState({ errorText: errorMessage });
    login(email, password, setErrorText, this.props.handleUnsuccessfulAuth)
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

