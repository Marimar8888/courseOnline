import React, { Component } from 'react';
import ImageGallery from 'react-image-gallery';
import "react-image-gallery/styles/scss/image-gallery.scss";

import image1 from "./../../../../static/assets/images/carousel-images/image1.jpg";
import image2 from "./../../../../static/assets/images/carousel-images/image2.jpg";
import image3 from "./../../../../static/assets/images/carousel-images/image3.jpg";
import image4 from "./../../../../static/assets/images/carousel-images/image4.jpg";
import image5 from "./../../../../static/assets/images/carousel-images/image5.jpg";
import image6 from "./../../../../static/assets/images/carousel-images/image6.jpg";

const images = [
  {
    original: image1,
    thumbnail: image1,
  },
  {
    original: image2,
    thumbnail: image2,
  },
  {
    original: image3,
    thumbnail: image3,
  },
  {
    original: image4,
    thumbnail: image4,
  },
  {
    original: image5,
    thumbnail: image5,
  },
  {
    original: image6,
    thumbnail: image6,
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


