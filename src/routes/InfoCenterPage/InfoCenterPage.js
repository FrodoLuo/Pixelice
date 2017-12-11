import React from 'react';
import { Layout, Input, Form, Tabs, message, Icon } from 'antd';
import { connect } from 'dva';
import PixeliceHeader from '../../components/Pixel-Header/pixeliceHeader';
import PixeliceFooter from '../../components/Pixel-Footer/pixelFooter';

import InfoCover from '../../components/InfoCenter/infoCover/info-cover';
import ProfileCard from '../../components/InfoCenter/profile/profilePane';
import PhotoPane from '../../components/InfoCenter/photos/photoPane';
import AlbumPane from '../../components/AlbumPane/albumPane';
import MessagePane from '../../components/InfoCenter/message/messagePane';

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
      message.error('请先登录以查看该页面, 正在跳转至首页...');
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
              <TabPane tab={<span><Icon type="picture" />作品</span>} key="work">
                <PhotoPane />
                {this.props.children}
              </TabPane>
              <TabPane tab={<span><Icon type="appstore" />相册</span>} key="album">
                <AlbumPane id={this.state.userInfo.userId} author />
              </TabPane>
              <TabPane tab={<span><Icon type="like" />赞!</span>} key="favorite">Content of Tab Pane 2</TabPane>
              <TabPane tab={<span><Icon type="eye" />订阅</span>} key="subs">Content of Tab Pane 3</TabPane>
              <TabPane tab={<span><Icon type="message" />私信</span>} key="message"><MessagePane /></TabPane>
              <TabPane tab={<span><Icon type="user" />资料</span>} key="profile">
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
