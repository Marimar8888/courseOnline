import React, { useState } from 'react';
import axios from 'axios';
import { API_URL } from '../utils/constant';

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
      <div className="contact-form-container">
        <form onSubmit={handleSubmit} className="contact-form">
          <h2>Solicita información</h2>
          <div className="form-group">
            <label htmlFor="name">Nombre:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Correo electrónico:</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="subject">Asunto:</label>
            <input
              type="text"
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="description">Descripción:</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
            ></textarea>
          </div>
          {message && <p className="message">{message}</p>}
          <div className="form-group form-check">
            <input
              type="checkbox"
              id="acceptConditions"
              name="acceptConditions"
              checked={formData.acceptConditions}
              onChange={handleChange}
            />
            <label className="acceptConditions" htmlFor="acceptConditions">
              Autorizo. De conformidad con lo establecido en el Reglamento Europeo de Protección de Datos (UE 2016/679), usted queda informado y presta su consentimiento expreso e inequívoco a la incorporación de los datos que nos facilita en los ficheros de datos personales responsabilidad de FORMACION ONLINE, S.L. (BBB232323) con domicilio social en, Calle Mayor, s/n, 20000 DONOSTIA - Gipuzkoa - Tel.: +34 , donde podrá ejercitar sus derechos de acceso, rectificación, cancelación y oposición mediante una carta dirigida a esta dirección o a través de email a info@cursoonline.com.
            </label>
          </div>
          <button 
          type="submit" 
          className={`btn-save ${formData.acceptConditions ? 'btn' : ''}`}
          disabled={!formData.acceptConditions}>Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
