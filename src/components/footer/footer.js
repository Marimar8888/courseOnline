import React from 'react';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-left">
          <div className="footer-column">
            <a href="#">Inicio</a>
            <a href="#">Enseña con nosotros</a>
            <a href="#">Contacto</a>
          </div>
          <div className="footer-column">
            <a href="#">Cookie Settings</a>
            <a href="#">Política de Cookies</a>
            <a href="#">Términos</a>
          </div>
          <div className="footer-column">
            <a href="#">Política de Privacidad</a>
          </div>
        </div>
        <div className="footer-right">
          <label htmlFor="language-selector">Idioma:</label>
          <select id="language-selector">
            <option value="es">Español</option>
            <option value="en">English</option>
            <option value="fr">Français</option>
            {/* Agrega más opciones según sea necesario */}
          </select>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
