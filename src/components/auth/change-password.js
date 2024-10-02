import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

import { API_URL } from '../utils/constant';

const ChangePassword = () => {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorText, setErrorText] = useState('');
    const [message, setMessage] = useState('');
    const [userId, setUserId] = useState(null);

    const queryParams = new URLSearchParams(location.search);
    const resetToken = queryParams.get('token');
    const history = useHistory();

    const handleChange = (event) => {
        const { name, value } = event.target;
        console.log(name, value);
        if (name === 'password') {
            setPassword(value);
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
        }
        setErrorText("");
        setMessage("");
    };

    useEffect(() => {
        if (resetToken) {
            console.log("resetToken", resetToken);
            axios
                .get(
                    `${API_URL}/get_user_id`,
                    {
                        headers: {
                            Authorization: `Bearer ${resetToken}`
                        }
                    })
                .then(response => {
                    setUserId(response.data.users_id);
                })
                .catch(error => {
                    setErrorText("Token inválido o ha expirado");
                });
        }
    }, [resetToken]);

    const handleSubmit = (event) => {
        event.preventDefault();
        if (password !== confirmPassword) {
            setErrorText("Las contraseñas no coinciden");
            return;
        }
        axios({
            method: 'patch',
            url: `${API_URL}/user/${userId}`,
            data: {
                users_password: password
            },
            headers: {
                'Authorization': `Bearer ${resetToken}`,
            }
        })
            .then(response => {
                setErrorText("");
                setPassword("");
                setConfirmPassword("");
                setMessage(`Contraseña modificada exitosamente`);
                history.push('/login');

            })
            .catch(error => {
                if (error.response) {
                    if (error.response.status === 401) {
                        if (error.response.data.error === 'Token has expired') {
                            setErrorText("El token ha expirado. Solicite un nuevo enlace de restablecimiento.");
                        } else {
                            setErrorText("Error de autorización. Verifique su token.");
                        }
                    } else {
                        setErrorText("Error al cambiar la contraseña");
                    }
                } else {
                    setErrorText("Error al cambiar la contraseña");
                }
                setMessage("");
            });
    }

    return (
        <div className='change-password-wrapper'>
            <div className='change-password-container'>
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

export default ChangePassword;
