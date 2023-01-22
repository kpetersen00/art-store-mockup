import React from 'react';
import { client, urlFor } from '../../lib/client';
import Image from 'next/image';
import { PortableText } from '@portabletext/react';
import { AiFillStar, AiOutlineStar } from 'react-icons/ai';
import { Product } from '../../components';
import { useStateContext } from '../../context/Statecontext';
import Marquee from 'react-fast-marquee';

const ProductDetails = ({ product, products }) => {
  const {
    defaultProductVariant: { images, price, title },
    body: { en },
  } = product;
  const { onAdd, setShowCart } = useStateContext();
  const handleBuyNow = () => {
    onAdd(product);
    setShowCart(true);
  };

  console.log(urlFor(images[0]));

  return (
    <div>
      <div className='product-details-container'>
        <div className='image-container'>
          <Image
            // width={10000}
            // height={10000}
            layout='fill'
            objectFit='contain'
            objectPosition='center'
            alt={title}
            src={urlFor(images[0])}
            className='product-detail-image'
          />
        </div>
        <div className='product-details-desc'>
          <h1>{title}</h1>
          <div className='reviews'>
            <div>
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiFillStar />
              <AiOutlineStar />
            </div>
            <p>(20)</p>
          </div>
          <h4>Details:</h4>
          <PortableText value={en} />
          <p className='price'>${price}</p>
          <div className='buttons'>
            <button
              type='button'
              className='add-to-cart'
              onClick={() => onAdd(product)}
            >
              Add to Cart
            </button>
            <button type='button' className='buy-now' onClick={handleBuyNow}>
              Buy Now
            </button>
          </div>
        </div>
      </div>
      <div className='maylike-products-wrapper'>
        <h2>You may also like</h2>
        <div className='marquee'>
          <Marquee speed={60} pauseOnHover gradient={false}>
            <div className='maylike-products-container'>
              {products.map((item) => (
                <Product key={item._id} product={item} />
              ))}
            </div>
            <div className='maylike-products-container'>
              {products.map((item) => (
                <Product key={item._id} product={item} />
              ))}
            </div>
          </Marquee>
        </div>
      </div>
    </div>
  );
};
export const getStaticPaths = async () => {
  const query = `*[_type == 'product'] {
   slug {
    current
   }
  }`;
  const products = await client.fetch(query);
  const paths = products.map((product) => ({
    params: {
      slug: product.slug.current,
    },
  }));
  return {
    paths,
    fallback: 'blocking',
  };
};
export const getStaticProps = async ({ params: { slug } }) => {
  const query = `*[_type == "product" && slug.current == '${slug}'][0]`;
  const productsQuery = '*[_type == "product"]';

  const product = await client.fetch(query);
  const products = await client.fetch(productsQuery);

  return {
    props: { product, products },
  };
};
export default ProductDetails;
