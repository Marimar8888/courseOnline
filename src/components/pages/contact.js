import React, { useState } from 'react';

import { addContact } from '../services/contact';
import ContactFormFields from '../forms/contact-form-fields';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    description: '',
    email: '',
    acceptConditions: false
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    addContact(formData, setFormData, setMessage)
      .then(response => {
        console.log('Formulario enviado con éxito:', response.data);
        setMessage('Formulario enviado correctamente.');
       
        })
  };
   

  return (
    <div className='content-page-wrapper'>
      <ContactFormFields
        formData = {formData}
        handleChange = {handleChange}
        handleSubmit = {handleSubmit}
        message = {message}
      />
    </div>
  );
};

export default Contact;
