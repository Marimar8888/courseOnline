import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/scss/image-gallery.scss";

const images = [
  {
    original: "https://programacionunica.com/images/carousel-images/image1.jpg",
    thumbnail: "https://programacionunica.com/images/carousel-images/image1.jpg",
  },
  {
    original: "https://programacionunica.com/images/carousel-images/image2.jpg",
    thumbnail: "https://programacionunica.com/images/carousel-images/image2.jpg",
  },
  {
    original: "https://programacionunica.com/images/carousel-images/image3.jpg",
    thumbnail: "https://programacionunica.com/images/carousel-images/image3.jpg",
  },
  {
    original: "https://programacionunica.com/images/carousel-images/image4.jpg",
    thumbnail: "https://programacionunica.com/images/carousel-images/image4.jpg",
  },
  {
    original: "https://programacionunica.com/images/carousel-images/image5.jpg",
    thumbnail: "https://programacionunica.com/images/carousel-images/image5.jpg",
  },
  {
    original: "https://programacionunica.com/images/carousel-images/image6.jpg",
    thumbnail: "https://programacionunica.com/images/carousel-images/image6.jpg",
  },
];


export default class CarouselImages extends Component {

  render() {
  
    return (
      <ImageGallery
      items={images}
      showPlayButton = {false}
      showThumbnails = {false}
      showFullscreenButton= {false}
      autoPlay = {true}
      showBullets = {true}
      slideInterval={3000}
      slideDuration = {1000}
      renderItem={(item) => (
        <div style={{height: '500px', margin: 'auto' }}>
          <img
            src={item.original}
            alt={item.originalAlt}
            style={{ height: '100%', objectFit: 'cover' }}
          />
        </div>
      )}
       />
    )}
}


