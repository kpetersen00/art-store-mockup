import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { urlFor } from '../lib/client';

const Product = ({
  product: {
    defaultProductVariant: { images, price, title },
    slug,
  },
}) => {
  return (
    <div>
      <Link href={`/product/${slug.current}`}>
        <div className='product-card'>
          <div className='product-image-container'>
            <Image
              src={urlFor(images[0])}
              layout='fill'
              objectFit='contain'
              objectPosition='center'
              alt={title}
              className='product-image'
            />
          </div>
          <div>
            <p className='product-title'>{title}</p>
            <p className='product-price'>${price}</p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default Product;
