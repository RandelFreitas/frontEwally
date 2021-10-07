import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import DefaultLayout from '../components/screen/defaultLayout';

const MyApp = ({ Component, pageProps }) => {
  const Layout = Component.Layout || DefaultLayout;

  return (
    <>
      <Layout>
        <CssBaseline />
        <Component {...pageProps} />
      </Layout>
    </>
  );
};

export default MyApp;
