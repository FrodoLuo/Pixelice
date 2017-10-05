import React from 'react';
import { connect } from 'dva';
import { Avatar } from 'antd';
import style from './sign.less';

class Sign extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
    };
  }
  handleTest = () => {
    console.log('ready to test');
    this.props.dispatch({
      type: 'auth/test',
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
          <a onClick={this.handleTest}>登录</a>
          <a href="#signUp">注册</a>
        </div>
      );
    }
    return (content);
  }
}
export default connect()(Sign);
