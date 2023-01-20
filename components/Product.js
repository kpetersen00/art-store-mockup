import React from 'react';
import Link from 'next/link';

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
          <img src={urlFor(images && images[0])} className='product-image' />
          <p className='product-title'>{title}</p>
          <p className='product-price'>${price}</p>
        </div>
      </Link>
    </div>
  );
};

export default Product;
