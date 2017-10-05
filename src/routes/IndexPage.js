import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import PixeliceHeader from '../components/Pixel-Header/pixeliceHeader';
import PixeliceFooter from '../components/Pixel-Footer/pixelFooter';
import Cover from '../components/Cover/cover';

const { Content, Footer } = Layout;

function IndexPage() {
  return (
    <Layout>
      <PixeliceHeader home />
      <Content className="main-content">
        <Cover home author="No one" />
      </Content>
      <PixeliceFooter />
    </Layout>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
