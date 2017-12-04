import React from 'react';
import { Layout, Input, Form, Tabs, Modal } from 'antd';
import { connect } from 'dva';
import PixeliceHeader from '../../components/Pixel-Header/pixeliceHeader';
import PixeliceFooter from '../../components/Pixel-Footer/pixelFooter';

import InfoCover from '../../components/InfoCenter/infoCover/info-cover';
import ProfileCard from '../../components/InfoCenter/profile/profilePane';
import PhotoPane from '../../components/InfoCenter/photos/photoPane';
import AlbumPane from '../../components/AlbumPane/albumPane';

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
    };
    props.dispatch({
      type: 'user/userInfo',
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.userInfo.message === 21) {
      Modal.error('未登录或登录已失效, 即将跳转至首页');
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
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
            <Tabs defaultActiveKey={this.props.match.params.target}>
              <TabPane tab="作品" key="work">
                <PhotoPane />
                {this.props.children}
              </TabPane>
              <TabPane tab="相册" key="album">
                <AlbumPane id={this.state.userInfo.userId} />
              </TabPane>
              <TabPane tab="收藏" key="favorite">Content of Tab Pane 2</TabPane>
              <TabPane tab="订阅" key="subs">Content of Tab Pane 3</TabPane>
              <TabPane tab="资料" key="profile">
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
