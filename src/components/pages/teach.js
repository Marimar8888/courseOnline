import React from 'react';
import woman from "./../../../static/assets/images/home/portrait-smiling-casual-woman.jpg";
import happy from "./../../../static/assets/images/home/happy.jpg";
import happyTogether from "./../../../static/assets/images/home/community-young-people-happy-together.jpg";
import people from "./../../../static/assets/images/home/people-collage-design.jpg";


const Teach = ({openRegisterModal}) =>{

  return (
    <div className="content-page-wrapper">
      <div className='content-page-header'>
        <h1 className="header-title">Ven a formar a estudiantes</h1>
        <h3 className="header-subtitle">Cambia tu vida y la de miles de personas.</h3>
        <button className="btn" onClick={openRegisterModal}>Empieza ya</button>
        <img className="header-image" src={woman} alt="header home image" />
      </div>
      <div className='content-page-content-1'>
        <h1 className='content-1-title'>Hay tantas razones para empezar</h1>
        <div className='content-page-content-1-resons'>
          <div className='content-1-reason'>
            <h2>Vive de lo que más te gusta</h2>
            <img className="reason-image-1" src={happy} alt="header home image" />
          </div>
          <div className='content-1-reason'>
            <h2>Desarrollate como formador</h2>
            <img className="reason-image-2" src={people} alt="header home image" />            
          </div>
          <div className='content-1-reason'>
            <h2>Cambia vidas</h2>
            <img className="reason-image-3" src={happyTogether} alt="header home image" />
          </div>
        </div>
      </div>
      <div className='content-page-content-2'>
        <div className="content-2-text">
          <h1>+ 12M</h1>
          <span>Empresas</span>
        </div>
        <div className="content-2-text">
          <h1>+ 20M</h1>
          <span>Alumnos</span>
        </div>
        <div className="content-2-text">
          <h1>+ 1M</h1>
          <span>Profesores</span>
        </div>
        <div className="content-2-text">
          <h1>+ 10</h1>
          <span>Paises</span>
        </div>
        <div className="content-2-text">
          <h1>En 8</h1>
          <span>Idiomas</span>
        </div>
      </div>
      <div className='content-page-content-3'>
        <h1>Conviértete en formador ahora</h1>
        <span>Únete a nosotros mediante la tienda virtual de aprendizaje en línea.</span>
        <button className="btn" onClick={openRegisterModal}>Empezar</button>
      </div>
    </div>
  )
}
export default Teach;
