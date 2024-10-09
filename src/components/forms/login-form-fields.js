import React from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const LoginFormFields =({handleSubmit, handleChange, toggleEmailRecovery, handleRegisterClick, state}) => {
    return (
        <div className="login-modal-wrapper">
            <div className='title-login'>
                <h2>INICIA SESIÓN EN STUDY ONLINE</h2>
            </div>
            <form onSubmit={handleSubmit} className="auth-form-wrapper">
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

                <div className="errorText">{state.errorText}</div>

                <button className="btn" type="submit">Login</button>

                <div className="links-login-modal-wrapper">
                    <p className="link-forgot-pass" onClick={toggleEmailRecovery}>He olvidado la contraseña</p>
                    <p className="link-register">¿No tienes una cuenta?
                        <span className="register-link" onClick={handleRegisterClick}>Regístrate</span>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default LoginFormFields;