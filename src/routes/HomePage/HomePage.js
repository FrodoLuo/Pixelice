import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import PixeliceHeader from '../../components/Pixel-Header/pixeliceHeader';
import PixeliceFooter from '../../components/Pixel-Footer/pixelFooter';
import Cover from '../../components/Cover/cover';
import Carousel from '../../components/Carousel/carousel';

const { Content, Footer } = Layout;

function IndexPage() {
  return (
    <Layout>
      <PixeliceHeader home />
      <Content className="main-content" style={{ padding: 0 }}>
        <Cover home author="No one" />
        <Carousel />
      </Content>
      <PixeliceFooter />
    </Layout>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
