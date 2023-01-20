import React from 'react';
import { urlFor } from '../lib/client';

const HeroBanner = ({
  heroBanner: { image, smallText, midText, largeText },
}) => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url("${urlFor(
          image
        )}")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
      className='hero-banner-container'
    >
      <div className='hero-text'>
        <p>{smallText}</p>
        <h1>{largeText}</h1>
        <h3>{midText}</h3>
      </div>
      {/* <img
        src={urlFor(image)}
        alt='banner-image'
        className='hero-banner-image'
      /> */}
    </div>
  );
};

export default HeroBanner;
