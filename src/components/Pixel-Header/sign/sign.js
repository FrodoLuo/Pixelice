import React from 'react';
import { connect } from 'dva';
import { Avatar, Modal, Form, Input, Button, message } from 'antd';
import style from './sign.less';
import { logout } from '../../../utils/Tool';

class Sign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      loginVisible: false,
      username: '',
      password: '',
      nickName: '',
    };
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'auth/userInfo',
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.userInfo.message === 20) {
      this.setState({
        logged: true,
        nickName: nextProps.userInfo.data.nickName,
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
      content = (
        <div className={style['sign-wrap']}>
          <Avatar icon="user" src="" />
          <span>{this.state.nickName}</span>
          <a onClick={logout}><span>注销</span></a>
        </div>
      );
    } else {
      content = (
        <div className={style['sign-wrap']}>
          <a onClick={this.showModal}>登录</a>
          <Modal
            title="登陆"
            style={{
              top: '-100px',
            }}
            visible={this.state.loginVisible}
            onCancel={this.handleCancel}
            footer={[
              <Button type={'primary'} key="submit" onClick={this.handleOk}>登陆</Button>,
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
            </div>
          </Modal>
          <a href="#signUp">注册</a>
        </div>
      );
    }
    return (content);
  }
}
export default connect((models) => {
  return {
    signIn: models.auth.signIn,
    userInfo: models.auth.userInfo,
  };
})(Sign);
