import React from 'react';
import { client } from '../lib/client';
import { Product, FooterBanner, HeroBanner } from '../components';
const Home = ({ productsData, venderData, bannerData }) => {
  return (
    <>
      <HeroBanner heroBanner={bannerData.length && bannerData[0]} />
      <div className='products-heading'>
        <h2>Latest Pieces</h2>
        <p>Browse the newest art from our fantastic artists</p>
      </div>
      <div className='products-container'>
        {productsData?.map((product) => (
          <Product key={product._id} product={product} />
        ))}
      </div>
      <FooterBanner footerBanner={bannerData.length && bannerData[1]} />
    </>
  );
};

export const getServerSideProps = async () => {
  const productQuery = '*[_type == "product"]';
  const productsData = await client.fetch(productQuery);

  const vendorQuery = '*[_type == "vendor"]';
  const vendorData = await client.fetch(vendorQuery);

  const bannerQuery = '*[_type == "banner"]';
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { productsData, vendorData, bannerData },
  };
};

export default Home;
