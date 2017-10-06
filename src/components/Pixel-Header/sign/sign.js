import React from 'react';
import { connect } from 'dva';
import { Avatar, Modal, Form, Input, Button, message } from 'antd';
import style from './sign.less';

class Sign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      loginVisible: false,
      username: '',
      password: '',
    };
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'auth/userInfo',
    });
  }
  showModal = () => {
    this.setState({
      loginVisible: true,
    });
  };
  handleOk = (e) => {
    console.log(this.state);
    this.setState({
      loginVisible: false,
    });
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
          <a href=""><span>注销</span></a>
          <Avatar icon="user" src="" />
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
export default connect()(Sign);
