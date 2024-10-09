import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const ChangePasswordFormFields = ({ handleSubmit, handleChange, password, confirmPassword, errorText, message }) => {
    return (
        <div className='change-password-container'>
            <div className="login-modal-wrapper">
                <div className='title-login'>
                    <h3>Introduzca su nueva contraseña</h3>
                </div>
                <form onSubmit={handleSubmit} className="auth-form-wrapper">
                    <div className="form-group">
                        <FontAwesomeIcon icon="lock" />
                        <input
                            type="password"
                            name="password"
                            placeholder="Your password"
                            value={password}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form-group">
                        <FontAwesomeIcon icon="lock" />
                        <input
                            type="password"
                            name="confirmPassword"
                            placeholder="Confirm your password"
                            value={confirmPassword}
                            onChange={handleChange}
                        />
                    </div>

                    {errorText && <div className="errorText">{errorText}</div>}
                    {message && <div className="successText">{message}</div>}

                    <div className="links-login-modal-wrapper">
                        <p className="link-register">
                            <button type="submit" className="btn-save">Guardar</button>
                        </p>
                    </div>
                </form>
            </div>
        </div>
    )
}
export default ChangePasswordFormFields;