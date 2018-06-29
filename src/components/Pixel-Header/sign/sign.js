import React from 'react';
import { connect } from 'dva';
import { Avatar, Modal, Form, Input, Button, message, Badge } from 'antd';
import style from './sign.less';
import { logout } from '../../../utils/Tool';
import defaultAvatar from '../../../assets/images/defaultAvatar.jpeg';

class Sign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      loginVisible: false,
      username: '',
      password: '',
      nickName: '',
      avatarUrl: '',
      unread: {
        state: 'ready',
        data: 0,
      },
    };
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'user/userInfo',
    });
    if (this.state.logged) {
      this.props.dispatch({
        type: 'social/countUnread',
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.userInfo.message === 20) {
      this.setState({
        logged: true,
        nickName: nextProps.userInfo.data.nickName,
        avatarUrl: nextProps.userInfo.data.avatarUrl,
        unread: nextProps.unread,
      });
    }
    if (nextProps.signIn.message === 20) {
      message.success('登录成功.');
      setTimeout(() => {
        window.location.reload();
      }, 2500);
    }
    if (nextProps.signIn.message === 21) {
      message.error('用户名或密码不正确');
    }
  }
  showModal = () => {
    this.setState({
      loginVisible: true,
    });
  };
  handleOk = (e) => {
    console.log(this.state);
    this.props.dispatch({
      type: 'auth/signIn',
      payload: {
        username: this.state.username,
        password: this.state.password,
      },
    });
  };
  handleCancel = (e) => {
    this.setState({
      loginVisible: false,
    });
  };
  handleUNChange = (e) => {
    this.setState({
      username: e.target.value,
    });
  };
  handlePWChange = (e) => {
    this.setState({
      password: e.target.value,
    });
  };
  render() {
    let content;
    if (this.state.logged) {
      const imgSrc = this.state.avatarUrl === '' ?
        defaultAvatar : this.state.avatarUrl;
      console.log(this.state);
      content = (
        <div className={style['sign-wrap']}>
          <a href="/infoCenter/work" className={style['upload-entry']}>上传图片</a>
          <a href="/infoCenter/work"><Avatar src={imgSrc} /></a>
          <a href="/infoCenter/work"><span>{this.state.nickName}</span></a>
          <Badge style={{ left: 10, top: 8 }} count={this.state.unread.data}><a className={style['badge-a']} href="/infoCenter/message"><span>消息</span></a></Badge>
          <a onClick={logout}><span>注销</span></a>
        </div>
      );
    } else {
      content = (
        <div className={style['sign-wrap']}>
          <a onClick={this.showModal} className={style['upload-entry']}>上传图片</a>
          <a onClick={this.showModal}>登录</a>
          <Modal
            title="登录"
            style={{
              top: '-100px',
            }}
            width={300}
            visible={this.state.loginVisible}
            onCancel={this.handleCancel}
            footer={[
              <Button type={'primary'} key="submit" onClick={this.handleOk}>登录</Button>,
            ]}
          >
            <div>
              <Form>
                <Form.Item
                  label="用户名"
                >
                  <Input onChange={this.handleUNChange} />
                </Form.Item>
                <Form.Item
                  label="密码"
                >
                  <Input type={'password'} onChange={this.handlePWChange} />
                </Form.Item>
              </Form>
              <span>没有账号?<a href="/signUp">马上注册</a></span>
            </div>
          </Modal>
          <a href="/signUp">注册</a>
        </div>
      );
    }
    return (content);
  }
}
export default connect((models) => {
  return {
    unread: models.social.unread,
    signIn: models.auth.signIn,
    userInfo: models.user.userInfo,
  };
})(Sign);
