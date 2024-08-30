import React, { Component } from 'react';
import CarouselImages from './carrousel/home-carrousel';
import { withRouter } from 'react-router-dom';

import music from "./../../../static/assets/images/categories/music.png";
import persolacrow from "./../../../static/assets/images/categories/personalcrow.png";
import program from "./../../../static/assets/images/categories/program.png";


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
                                <img src='./../../../static/assets/images/categories/program.png'></img>
                            </div>
                            <div className='home-section-categories-links-image-text'>
                                <p>Dibujo</p>
                            </div>
                        </div>
                        <div className='home-section-categories-links-image'>
                            <div className='home-section-categories-links-image-button'
                                onClick={() => this.handleCategoryClick(3)}>
                                <img src='./../../../static/assets/images/categories/program.png'></img>
                            </div>
                            <div className='home-section-categories-links-image-text'>
                                <p>Marketing</p>
                            </div>
                        </div>
                        <div className='home-section-categories-links-image'>
                            <div className='home-section-categories-links-image-button'
                                onClick={() => this.handleCategoryClick(9)}>
                                <img src='./../../../static/assets/images/categories/program.png'></img>
                            </div>
                            <div className='home-section-categories-links-image-text'>
                                <p>Fotografía</p>
                            </div>
                        </div>
                        <div className='home-section-categories-links-image'>
                            <div className='home-section-categories-links-image-button'
                                onClick={() => this.handleCategoryClick(5)}>
                                <img src='./../../../static/assets/images/categories/program.png'></img>
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
export default withRouter(HomeContainer);
