import React, { useState } from 'react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    description: '',
    email: '',
    acceptConditions: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);
    //TODO
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
          <div className="form-group form-check">
            <input
              type="checkbox"
              id="acceptConditions"
              name="acceptConditions"
              checked={formData.acceptConditions}
              onChange={handleChange}
            />
            <label className="acceptConditions" htmlFor="acceptConditions">
              Autorizo. De conformidad con lo establecido en el Reglamento Europeo de Protección de Datos (UE 2016/679), usted queda informado y presta su consentimiento expreso e inequívoco a la incorporación de los datos que nos facilita en los ficheros de datos personales responsabilidad de TECNOLOGÍA CONTABLE APLICADA, S.L. (B95198321) con domicilio social en, Hurtado de Amézaga, 27. Pl. 10ª, 48008 BILBAO - Bizkaia - Tel.: +34 911 17 61 00, donde podrá ejercitar sus derechos de acceso, rectificación, cancelación y oposición mediante una carta dirigida a esta dirección o a través de email a info@comeralia.com.
            </label>
          </div>
          <button 
          type="submit" 
          //className="submit-btn" 
          className={`btn-save ${formData.acceptConditions ? 'btn' : ''}`}
          disabled={!formData.acceptConditions}>Enviar</button>
        </form>
      </div>
    </div>
  );
};

export default Contact;
