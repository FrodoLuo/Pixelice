import React from 'react';
import { Layout, Input, Form, Tabs, Modal } from 'antd';
import { connect } from 'dva';
import PixeliceHeader from '../../components/Pixel-Header/pixeliceHeader';
import PixeliceFooter from '../../components/Pixel-Footer/pixelFooter';
import AlbumPane from '../../components/AlbumPane/albumPane';
import HostCover from '../../components/Host/hostCover/host-cover';

const TabPane = Tabs.TabPane;

class InfoCenterPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        message: 0,
        data: {
          userId: '',
          nickName: '',
          avatarUrl: '',
          gender: '',
          followers: 0,
        },
      },
      photos: {
        state: 'loading',
        data: [],
      },
    };
    props.dispatch({
      type: 'user/hostInfo',
      payload: props.match.params.hostId,
    });
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.hostInfo.state === 'error') {
      Modal.error('发生服务器错误');
    } else if (nextProps.hostInfo.state === 'success') {
      this.setState({
        userInfo: nextProps.userInfo.data,
      });
    }
  }
  render() {
    return (
      <Layout>
        <PixeliceHeader />
        <Layout.Content className="main-content no-cover">
          <HostCover hostInfo={this.state.userInfo} />
          <div className="content-wrap">
            <Tabs defaultActiveKey="1">
              <TabPane tab="作品" key="1">
                <AlbumPane />
              </TabPane>
              <TabPane tab="相册" key="2">Content of Tab Pane 3</TabPane>
              <TabPane tab="资料" key="3">
                rua!
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
  return models.user;
})(InfoCenterPage);
