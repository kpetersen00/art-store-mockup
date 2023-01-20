import React from 'react';
import '../styles/global.css';
import { Layout } from '../components';
import { Statecontext } from '../context/Statecontext';
import { Toaster } from 'react-hot-toast';
function MyApp({ Component, pageProps }) {
  return (
    <Statecontext>
      <Layout>
        <Toaster />
        <Component {...pageProps} />
      </Layout>
    </Statecontext>
  );
}

export default MyApp;
