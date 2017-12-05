import React from 'react';
import { Layout } from 'antd';
import { connect } from 'dva';
import PixeliceHeader from '../../components/Pixel-Header/pixeliceHeader';
import PixeliceFooter from '../../components/Pixel-Footer/pixelFooter';
import AlbumCover from '../../components/AlbumPane/albumCover';
import PhotoWall from '../../components/PhotoWall/photoWall';

class AlbumPage extends React.Component {
  state = {
    albumInfo: {
      state: 'ready',
      data: {
        albumName: '',
        createDate: '',
      },
    },
    photos: {
      state: 'ready',
      data: [],
    },
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'album/initAlbum',
      payload: this.props.match.params.albumId,
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      albumInfo: nextProps.albumInfo,
      photos: nextProps.albumPhotos,
    });
  }
  render() {
    return (
      <Layout>
        <PixeliceHeader />
        <Layout.Content className="main-content">
          <AlbumCover album={this.state.albumInfo.data} />
          <div className="content-wrap">
            <PhotoWall photos={this.state.photos} />
          </div>
        </Layout.Content>
        <PixeliceFooter />
      </Layout>
    );
  }
}
export default connect((models) => {
  console.log(models.album);
  return models.album;
})(AlbumPage);
