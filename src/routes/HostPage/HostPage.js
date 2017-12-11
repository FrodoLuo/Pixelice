import React from 'react';
import { Layout, Input, Form, Tabs, Modal } from 'antd';
import { connect } from 'dva';
import PixeliceHeader from '../../components/Pixel-Header/pixeliceHeader';
import PixeliceFooter from '../../components/Pixel-Footer/pixelFooter';
import AlbumPane from '../../components/AlbumPane/albumPane';
import HostCover from '../../components/Host/hostCover/host-cover';
import PhotoWall from '../../components/PhotoWall/photoWall';
import HostProfile from '../../components/Host/hostProfile';

const TabPane = Tabs.TabPane;

class InfoCenterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hostInfo: {
        state: 'ready',
        data: {
          userId: '',
          nickName: '',
          avatarUrl: '',
          gender: '',
          followers: 0,
          intro: '',
        },
      },
      photos: {
        state: 'loading',
        data: [],
      },
    };
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'user/hostInfo',
      payload: this.props.match.params.hostId,
    });
    this.props.dispatch({
      type: 'photo/fetchPhotosById',
      payload: this.props.match.params.hostId,
    });
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.user.hostInfo.state === 'success') {
      this.setState({
        hostInfo: nextProps.user.hostInfo,
      });
    } else if (nextProps.user.hostInfo.state === 'self') {
      window.location.href = '/infoCenter/work';
    }
    switch (nextProps.photo.processing) {
      case 'fetchPhotos':
        this.setState({
          photos: nextProps.photo.photos,
        });
    }
  }
  render() {
    return (
      <Layout>
        <PixeliceHeader />
        <Layout.Content className="main-content no-cover">
          <HostCover hostInfo={this.state.hostInfo} />
          <div className="content-wrap">
            <Tabs defaultActiveKey="1">
              <TabPane tab="作品" key="1">
                <PhotoWall photos={this.state.photos} />
              </TabPane>
              <TabPane tab="相册" key="2">
                <AlbumPane host hostId={this.props.match.params.hostId} /></TabPane>
              <TabPane tab="资料" key="3">
                <HostProfile hostInfo={this.state.hostInfo} />
              </TabPane>
            </Tabs>
          </div>
        </Layout.Content>
        <PixeliceFooter />
      </Layout>
    );
  }
}
export default connect((models) => {
  return models;
})(InfoCenterPage);
