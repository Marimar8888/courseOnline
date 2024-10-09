import React, { useState } from 'react';
import axios from 'axios';

import { API_URL } from '../utils/constant';
import EmailRecoveryFormFields from '../forms/email-recovery-form-fields';

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
        <EmailRecoveryFormFields
            handleSubmit = {handleSubmit}
            handleChange = {handleChange}
            toggleEmailRecovery = {toggleEmailRecovery}
            email = {email}
            errorText = {errorText}
            message = {message}
        />
      </div>
    )
}

export default EmailRecovery;
