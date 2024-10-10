import React, { useState } from 'react';

import EmailRecoveryFormFields from '../forms/email-recovery-form-fields';
import { sendEmailChangePassword } from '../services/user';

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
        sendEmailChangePassword(email)
            .then(response => {
                setErrorText("");
                setMessage(`Email enviado a: ${email}`);
                setEmail("");
                setUserId(response.userId);
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
