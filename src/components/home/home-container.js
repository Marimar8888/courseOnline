import React, { Component } from 'react';
import CarouselImages from './carrousel/home-carrousel';
import { withRouter } from 'react-router-dom';

import music from "./../../../static/assets/images/categories/music.png";
import persolacrow from "./../../../static/assets/images/categories/personalcrow.png";
import program from "./../../../static/assets/images/categories/program.png";
import dibujo from "./../../../static/assets/images/categories/dibujo.png";
import marketing from "./../../../static/assets/images/categories/marketing.png";
import fotografia from "./../../../static/assets/images/categories/fotografia.png";
import Liderazgo from "./../../../static/assets/images/categories/liderazgo.png";
import finanzas from "./../../../static/assets/images/categories/finanzas.png";



import section from "./../../../static/assets/images/home/retrato-cuerpo-entero-hombre-feliz-confiado.png";


class HomeContainer extends Component {

    handleCategoryClick = (categoryId) => {
        this.props.history.push(`/store/${categoryId}`);
    }

    render() {
        return (
            <div className='home-container'>
                <div className='home-carrousell-image-wrapper'>
                    <div className='home-carrousell-image'>
                        <CarouselImages />
                    </div>
                </div>

                <div className='home-section-course-wrapper'>
                    <div className='home-section-course-message'>
                        <h1>Encuentra la formación que mejor se adapta a ti</h1>
                        <span>Consulta nuestra oferta de formaciones y desarrolla tu carrera profesional</span>
                    </div>
                    <div className='home-section-course-image'>
                        <img className="home-section-course-image-people" src={section} alt="section home image" />  
                    </div>
                </div>

                <div className='home-section-categories-wrapper'>
                    <div className='home-section-categories-text'>
                        <h2>Categorías</h2>
                    </div>
                    <div className='home-section-categories-links-wrapper'>
                        <div className='home-section-categories-links-image'>
                            <div className='home-section-categories-links-image-button'
                                onClick={() => this.handleCategoryClick(1)}>
                                <img src={program}></img>
                            </div>
                            <div className='home-section-categories-links-image-text'>
                                <p>Programación</p>
                            </div>
                        </div>
                        <div className='home-section-categories-links-image'>
                            <div className='home-section-categories-links-image-button'
                                onClick={() => this.handleCategoryClick(2)}>
                                <img src={dibujo}></img>
                            </div>
                            <div className='home-section-categories-links-image-text'>
                                <p>Dibujo</p>
                            </div>
                        </div>
                        <div className='home-section-categories-links-image'>
                            <div className='home-section-categories-links-image-button'
                                onClick={() => this.handleCategoryClick(3)}>
                                <img src={marketing}></img>
                            </div>
                            <div className='home-section-categories-links-image-text'>
                                <p>Marketing</p>
                            </div>
                        </div>
                        <div className='home-section-categories-links-image'>
                            <div className='home-section-categories-links-image-button'
                                onClick={() => this.handleCategoryClick(9)}>
                                <img src={fotografia}></img>
                            </div>
                            <div className='home-section-categories-links-image-text'>
                                <p>Fotografía</p>
                            </div>
                        </div>
                        <div className='home-section-categories-links-image'>
                            <div className='home-section-categories-links-image-button'
                                onClick={() => this.handleCategoryClick(5)}>
                                <img src={Liderazgo}></img>
                            </div>
                            <div className='home-section-categories-links-image-text'>
                                <p>Liderazgo</p>
                            </div>
                        </div>
                        <div className='home-section-categories-links-image'>
                            <div className='home-section-categories-links-image-button'
                                onClick={() => this.handleCategoryClick(6)}>
                                <img src={persolacrow}></img>
                            </div>
                            <div className='home-section-categories-links-image-text'>
                                <p>Crecimiento Personal</p>
                            </div>
                        </div>
                        <div className='home-section-categories-links-image'>
                            <div className='home-section-categories-links-image-button'
                                onClick={() => this.handleCategoryClick(7)}>
                                <img src={music}></img>
                            </div>
                            <div className='home-section-categories-links-image-text'>
                                <p>Música</p>
                            </div>
                        </div>
                        <div className='home-section-categories-links-image'>
                            <div className='home-section-categories-links-image-button'
                                onClick={() => this.handleCategoryClick(11)}>
                                <img src={finanzas}></img>
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
export default withRouter(HomeContainer);
