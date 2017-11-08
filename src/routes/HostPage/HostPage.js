import React from 'react';
import { Layout, Input, Form, Tabs, Modal } from 'antd';
import { connect } from 'dva';
import PixeliceHeader from '../../components/Pixel-Header/pixeliceHeader';
import PixeliceFooter from '../../components/Pixel-Footer/pixelFooter';

import InfoCover from '../../components/InfoCenter/infoCover/info-cover';
import ProfileCard from '../../components/InfoCenter/profile/profilePane';
import PhotoPane from '../../components/InfoCenter/photos/photoPane';

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
          email: '',
          avatarUrl: '',
          phone: '',
          gender: '',
          verified: '',
          followers: 0,
        },
      },
      photos: {
        state: 'loading',
        data: [],
      },
    };
    props.dispatch({
      type: 'user/getHostInfo',
      payload: {
        hostId: this.props.param.hostId,
      },
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.userInfo.message === 21) {
      Modal.error('该用户不存在');
    } else if (nextProps.userInfo.message === 20) {
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
          <InfoCover userInfo={this.state.userInfo} />
          <div className="content-wrap">
            <Tabs defaultActiveKey="1">
              <TabPane tab="作品" key="1">
                <PhotoPane />
                {this.props.children}
              </TabPane>
              <TabPane tab="相册" key="2">Content of Tab Pane 3</TabPane>
              <TabPane tab="资料" key="3">
                <ProfileCard userInfo={this.state.userInfo} />
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
  return {
    userInfo: models.user.userInfo,
  };
})(InfoCenterPage);
