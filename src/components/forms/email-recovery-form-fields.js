import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const EmailRecoveryFormFields = ({ handleSubmit, handleChange, toggleEmailRecovery, email, errorText, message }) => {
    return (
        <div className="login-modal-wrapper">
            <div className='title-login'>
                <h2>¿Has olvidado la contraseña?</h2>
            </div>
            <div className='title-login'>
                <h3>Te enviaremos un enlace por correo electrónico para que puedas restablecer tu contraseña.</h3>
            </div>
            <form onSubmit={handleSubmit} className="auth-form-wrapper">
                <div className="form-group">
                    <FontAwesomeIcon icon="envelope" />
                    <input
                        type="email"
                        name="email"
                        placeholder="Your email"
                        value={email}
                        onChange={handleChange}
                    />
                </div>

                {errorText && <div className="errorText">{errorText}</div>}
                {message && <div className="successText">{message}</div>}

                <button className="btn" type="submit" >Restablecer Contraseña</button>

                <div className="links-login-modal-wrapper">
                    <p className="link-register">¿Ya tienes cuenta?
                        <span className="register-link" onClick={toggleEmailRecovery}> Inicio Sesión</span>
                    </p>
                </div>
            </form>
        </div>
    )
}

export default EmailRecoveryFormFields;
