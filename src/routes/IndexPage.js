import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import PixeliceHeader from '../components/Pixel-Header/pixeliceHeader';
import Cover from '../components/Cover/cover';

const { Content, Footer } = Layout;

function IndexPage() {
  return (
    <Layout>
      <PixeliceHeader />
      <Content className="main-content">
        <Cover />
      </Content>
      <Footer />
    </Layout>
  );
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
