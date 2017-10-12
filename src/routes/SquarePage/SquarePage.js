import React from 'react';
import { Layout } from 'antd';
import { connect } from 'dva';
import PixelHeader from '../../components/Pixel-Header/pixeliceHeader';
import PixelFooter from '../../components/Pixel-Footer/pixelFooter';
import Cover from '../../components/Cover/cover';

const { Content } = Layout;

class SquarePage extends React.Component {
  state = {
    photos: {
      message: 0,
      data: [],
    },
  };
  componentWillMount() {
    this.props.dispatch({
      type: 'photo/getNewPhotos',
    });
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({
      photos: nextProps.photos,
    });
  }
  render() {
    const photos = [];
    for (let i = 0; i < this.state.photos.data.length; i += 1) {
      const item = this.state.photos.data[i];
      photos.push(
        <div key={i}>
          <img src={item.photoUrl} role="presentation" />
        </div>,
      );
    }
    return (
      <Layout>
        <PixelHeader />
        <Content>
          <Cover />
          <div>
            {photos}
          </div>
        </Content>
        <PixelFooter />
      </Layout>
    );
  }
}
export default connect((models) => {
  return models.photo;
})(SquarePage);
