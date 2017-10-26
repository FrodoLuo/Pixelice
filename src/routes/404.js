import React from 'react';
import { Layout } from 'antd';
import PixeliceHeader from '../components/Pixel-Header/pixeliceHeader';
import PixeliceFooter from '../components/Pixel-Footer/pixelFooter';

function Error404() {
  return (
    <Layout>
      <PixeliceHeader />
      <Layout.Content className="main-content">
        <div>
          Opps! This page seems to be lost. :(
        </div>
      </Layout.Content>
      <PixeliceFooter />
    </Layout>
  );
}
export default Error404;
