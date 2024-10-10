import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useHistory,useLocation } from 'react-router-dom';

import { API_URL } from '../utils/constant';
import ChangePasswordFormFields from '../forms/change-password-form-fields';

const ChangePassword = () => {

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [errorText, setErrorText] = useState('');
    const [message, setMessage] = useState('');
    const [userId, setUserId] = useState(null);

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const resetToken = queryParams.get('token');
    const history = useHistory();

    const handleChange = (event) => {
        const { name, value } = event.target;

        if (name === 'password') {
            setPassword(value);
            if (value.length < 8) {
                setErrorText("La contraseña debe tener al menos 8 caracteres.");
            } else {
                setErrorText("");
            }
        } else if (name === 'confirmPassword') {
            setConfirmPassword(value);
        }

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

        const passwordComplexity = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
        if (!passwordComplexity.test(password)) {
            setErrorText("La contraseña debe tener letras, números y al menos un símbolo.");
            return;
        }
     
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
                history.push('/');

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
        <div>
            <ChangePasswordFormFields
                handleSubmit = {handleSubmit}
                handleChange = {handleChange}
                password = {password}
                confirmPassword = {confirmPassword}
                errorText = {errorText}
                message = {message}
            />
        </div>
    )
}

export default ChangePassword;
