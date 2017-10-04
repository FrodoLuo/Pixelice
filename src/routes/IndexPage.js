import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import PixeliceHeader from '../components/Pixel-Header/pixeliceHeader';

const { Content, Footer } = Layout;

function IndexPage() {
  return (
    <Layout>
      <PixeliceHeader />
      <Content className="main-content" />
      <Footer />
    </Layout>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
