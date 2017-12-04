import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import PixeliceHeader from '../../components/Pixel-Header/pixeliceHeader';
import PixeliceFooter from '../../components/Pixel-Footer/pixelFooter';
import Cover from '../../components/Cover/cover';
import Carousel from '../../components/Carousel/carousel';
import PhotoWall from '../../components/PhotoWall/photoWall';

const { Content, Footer } = Layout;

class IndexPage extends React.Component {
  state = {
    hotPhotos: {
      state: 'ready',
      data: [],
    },
  }
  render() {
    return (
      <Layout>
        <PixeliceHeader home />
        <Content className="main-content" style={{ padding: 0 }}>
          <Cover home author="No one" />
          <Carousel />
          <PhotoWall photos={this.state.hotPhotos} />
        </Content>
        <PixeliceFooter />
      </Layout>
    );
  }
}

IndexPage.propTypes = {
};

export default connect()(IndexPage);
