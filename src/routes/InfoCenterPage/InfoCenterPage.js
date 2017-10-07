import React from 'react';
import { Layout, Input, Form, Tabs, Modal } from 'antd';
import { connect } from 'dva';
import PixeliceHeader from '../../components/Pixel-Header/pixeliceHeader';
import PixeliceFooter from '../../components/Pixel-Footer/pixelFooter';
import InfoCover from '../../components/InfoCenter/infoCover/info-cover';

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
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'user/userInfo',
    });
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
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
            <Tabs defaultActiveKey="1">
              <TabPane tab="作品" key="1">Content of Tab Pane 1</TabPane>
              <TabPane tab="相册" key="2">Content of Tab Pane 3</TabPane>
              <TabPane tab="收藏" key="3">Content of Tab Pane 2</TabPane>
              <TabPane tab="订阅" key="4">Content of Tab Pane 3</TabPane>
              <TabPane tab="资料" key="5">Content of Tab Pane 3</TabPane>
            </Tabs>
          </div>
        </Layout.Content>
        <PixeliceFooter />
      </Layout>
    );
  }
}
export default connect((models) => {
  console.log(models);
  return {
    userInfo: models.user.userInfo,
  };
})(InfoCenterPage);
