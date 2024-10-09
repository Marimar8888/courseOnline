import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../utils/constant';

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
    const formData = buildFormContact();
  
    axios({
      method: "post",
      url: `${API_URL}/contact`,
      data: formData
    })
    .then(response => {
      console.log('Formulario enviado con éxito:', response.data);
      setMessage('Formulario enviado correctamente.');
        setFormData({
          name: '',
          subject: '',
          description: '',
          email: '',
          acceptConditions: false,
        });
    })
    .catch(error => {
      console.log("Error al enviar el formulario:", error);
      setMessage('Hubo un error al enviar el formulario.');
    });
  };

  const buildFormContact = () => {
    let contactFormData = new FormData();
    contactFormData.append("contacts_name", formData.name);
    contactFormData.append("contacts_email", formData.email);
    contactFormData.append("contacts_subject", formData.subject);
    contactFormData.append("contacts_message", formData.description);
    contactFormData.append("contacts_check", formData.acceptConditions ? 'true' : 'false');
  
    return contactFormData;
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
