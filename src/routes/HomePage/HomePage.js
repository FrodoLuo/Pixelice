import React from 'react';
import { connect } from 'dva';
import { Layout } from 'antd';
import PixeliceHeader from '../../components/Pixel-Header/pixeliceHeader';
import PixeliceFooter from '../../components/Pixel-Footer/pixelFooter';
import Cover from '../../components/Cover/cover';
import PhotoWall from '../../components/PhotoWall/photoWall';
import style from './HomePage.less';

const { Content, Footer } = Layout;

class IndexPage extends React.Component {
  state = {
    hotPhotos: {
      state: 'ready',
      data: [],
    },
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'photo/hotPhoto',
    });
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    switch (nextProps.photo.processing) {
      case 'hotPhotos':
        this.setState({
          hotPhotos: nextProps.photo.photos,
        });
    }
  }
  render() {
    console.log(this.state);
    return (
      <Layout>
        <PixeliceHeader home />
        <Content className="main-content" style={{ padding: 0 }}>
          <Cover home author="No one" />
          <div className="content-wrap" >
            <div className={style['hot-photo-pane']}>
              <h2 className={style['part-title']}>最热照片</h2>
              <PhotoWall photos={this.state.hotPhotos} home />
            </div>
          </div>
        </Content>
        <PixeliceFooter />
      </Layout>
    );
  }
}

IndexPage.propTypes = {
};

export default connect((models) => {
  return models;
})(IndexPage);
