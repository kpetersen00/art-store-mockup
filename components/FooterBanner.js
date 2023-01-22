import React from 'react';
import Image from 'next/image';
import { urlFor } from '../lib/client';

const FooterBanner = ({
  footerBanner: { image, smallText, midText, largeText },
}) => {
  return (
    <div className='hero-wrapper footer-banner'>
      <div className='image-wrapper'>
        <Image
          src={urlFor(image)}
          layout='fill'
          // objectFit='cover'
          // objectPosition='center'
          alt='hero image'
          className='hero-image'
        />
      </div>
      <div className='hero-text'>
        <p>{smallText}</p>
        <h1>{largeText}</h1>
        <h3>{midText}</h3>
      </div>
    </div>
  );
};

export default FooterBanner;
