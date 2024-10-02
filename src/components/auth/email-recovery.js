import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';

import { API_URL } from '../utils/constant';

const EmailRecovery = ({ toggleEmailRecovery }) => {

    const [email, setEmail] = useState('');
    const [errorText, setErrorText] = useState('');
    const [message, setMessage] =useState('');
    const [userId, setUserId ] = useState('');

    const handleChange = (event) => {
        setEmail(event.target.value); 
        setErrorText("");
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if(!email){
            setErrorText("Por favor, introduce un correo electrónico válido");
            return;
        }
        axios.post(`${API_URL}/forgot-password`, { users_email: email })
            .then(response => {
                setErrorText("");
                setMessage(`Email enviado a: ${email}`);
                setEmail("");
                setUserId(response.userId);
            })
            .catch(error => {
             
            });
    }

    return (
        <div>
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

export default EmailRecovery;
