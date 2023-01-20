import React from 'react';
import { urlFor } from '../lib/client';

const FooterBanner = ({
  footerBanner: { image, smallText, midText, largeText },
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
      className='footer-banner-container'
    >
      <div className='footer-hero-text'>
        <p>{smallText}</p>
        <h1>{largeText}</h1>
        <h3>{midText}</h3>
        {/* <img src={urlFor(image)} className='footer-banner-image' /> */}
      </div>
    </div>
  );
};

export default FooterBanner;
