import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const RegisterFormFields = ({handleSubmit, handleChange, handleLoginClick, state}) => {
    return (
        <div className="login-modal-wrapper">
            <div className='title-login'>
                <h2>REGISTRATE Y EMPIEZA A APRENDER</h2>
            </div>

            <form onSubmit={handleSubmit} className="auth-form-wrapper">
                <div className="form-group">
                    <FontAwesomeIcon icon="user" />
                    <input
                        type="text"
                        name="name"
                        placeholder="Your user name"
                        value={state.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <FontAwesomeIcon icon="envelope" />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your email"
                        value={state.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <FontAwesomeIcon icon="lock" />
                    <input
                        type="password"
                        name="password"
                        placeholder="Your password"
                        value={state.password}
                        onChange={handleChange}
                    />
                </div>
                <div className="form-group">
                    <FontAwesomeIcon icon="lock" />
                    <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm your password"
                        value={state.confirmPassword}
                        onChange={handleChange}
                    />
                </div>

                <div className="errorText">{state.errorText}</div>

                <button className="btn" type="submit">Regístrate</button>

                <div className="links-login-modal-wrapper">

                    <p className="link-register">¿Ya tienes cuenta?
                        <span className="register-link" onClick={handleLoginClick}> Inicio Sesión</span>
                    </p>
                </div>
            </form>
        </div>
    )
}
export default RegisterFormFields;
