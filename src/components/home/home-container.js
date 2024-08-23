import React, { Component } from 'react'
import CarouselImages from './carrousel/home-carrousel';

import music from "./../../../static/assets/images/categories/music.png";
import persolacrow from "./../../../static/assets/images/categories/personalcrow.png";
import program from "./../../../static/assets/images/categories/program.png";


export default class HomeContainer extends Component {
  render() {
    return (
      <div className='home-container'>
        <div className='home-carrousell-image-wrapper'>
            <div className='home-carrousell-image'>
            <CarouselImages/>
            </div>
        </div>

        <div className='home-section-course-wrapper'>
            <div className='home-section-course-text'>
                 <h2>Amplia selección de cursos</h2>   
                 <div className='home-section-course-selector'>
                    <p>Programación</p>
                    <p>Dibujo</p>
                    <p>Marketing</p>
                    <p>Fotografía</p>
                    <p>Liderazgo</p>
                    <p>Crecimiento Personal</p>
                    <p>Música</p>
                    <p>Finanzas</p>
                 </div>
            </div>
            <div className='home-section-course-carrousel'>

            </div>
        </div>

        <div className='home-section-categories-wrapper'>
            <div className='home-section-categories-text'>
                 <h2>Categorías</h2>   
            </div>
            <div className='home-section-categories-links-wrapper'>
                <div className='home-section-categories-links-image'>
                    <div className='home-section-categories-links-image-button'>
                        <img src={program}></img>
                    </div>
                    <div className='home-section-categories-links-image-text'>
                        <p>Programación</p>
                    </div>
                </div>
                <div className='home-section-categories-links-image'>
                    <div className='home-section-categories-links-image-button'>
                        <img src='./../../../static/assets/images/categories/program.png'></img>
                    </div>
                    <div className='home-section-categories-links-image-text'>
                        <p>Dibujo</p>
                    </div>
                </div>
                <div className='home-section-categories-links-image'>
                    <div className='home-section-categories-links-image-button'>
                        <img src='./../../../static/assets/images/categories/program.png'></img>
                    </div>
                    <div className='home-section-categories-links-image-text'>
                        <p>Marketing</p>
                    </div>
                </div>
                <div className='home-section-categories-links-image'>
                    <div className='home-section-categories-links-image-button'>
                        <img src='./../../../static/assets/images/categories/program.png'></img>
                    </div>
                    <div className='home-section-categories-links-image-text'>
                        <p>Fotografía</p>
                    </div>
                </div>
                <div className='home-section-categories-links-image'>
                    <div className='home-section-categories-links-image-button'>
                        <img src='./../../../static/assets/images/categories/program.png'></img>
                    </div>
                    <div className='home-section-categories-links-image-text'>
                        <p>Liderazgo</p>
                    </div>
                </div>
                <div className='home-section-categories-links-image'>
                    <div className='home-section-categories-links-image-button'>
                        <img src={persolacrow}></img>
                    </div>
                    <div className='home-section-categories-links-image-text'>
                        <p>Crecimiento Personal</p>
                    </div>
                </div>
                <div className='home-section-categories-links-image'>
                    <div className='home-section-categories-links-image-button'>
                        <img src={music}></img>
                    </div>
                    <div className='home-section-categories-links-image-text'>
                        <p>Música</p>
                    </div>
                </div>
                <div className='home-section-categories-links-image'>
                    <div className='home-section-categories-links-image-button'>
                        <img src='./../../../static/assets/images/categories/program.png'></img>
                    </div>
                    <div className='home-section-categories-links-image-text'>
                        <p>Finanzas</p>
                    </div>
                </div>
            </div>
        </div>      
      </div>
    )
  }
}
