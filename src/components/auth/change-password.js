import React, { useEffect, useState } from 'react';
import { useHistory,useLocation } from 'react-router-dom';

import ChangePasswordFormFields from '../forms/change-password-form-fields';
import { getUserIdFromAPI, updatePassword } from '../services/user';

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
            getUserIdFromAPI(resetToken)
                .then(id => {
                    if (id) {
                        setUserId(id);
                    }
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

        updatePassword(userId, resetToken, password, setErrorText, setMessage)
            .then(response => {
                setErrorText("");
                setPassword("");
                setConfirmPassword("");
                setMessage(`Contraseña modificada exitosamente`);
                history.push('/');
            })
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
