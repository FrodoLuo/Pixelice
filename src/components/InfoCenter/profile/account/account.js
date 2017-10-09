import React from 'react';
import { Button, Input } from 'antd';
import { connect } from 'dva';
import style from './account.less';


class Account extends React.Component {
  state = {
    mailSent: false,
    count: 120,
    sendVerify: {
      message: 0,
    },
    resetPW: {
      message: 0,
    },
  };
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }
  handleSendVerify = () => {
    this.props.dispatch({
      type: 'auth/sendVerify',
    });
    this.setState({
      // mailSent: tru,
    });
  };
  render() {
    console.log(this.props.userInfo.verified);
    const verified = this.props.userInfo.verified === '1' ?
      (
        <div className={style['verified-label']}>
          <span>已认证</span>
        </div>
      )
      :
      (
        <div>
          <span className={style['unverified-label']}>尚未认证</span>
          <Button
            disabled={this.state.mailSent}
            onClick={this.handleSendVerify}
          >
            {this.state.mailSent ? this.state.count : '发送认证邮件'}
          </Button>
        </div>
      );
    return (
      <div>
        <h3>电子邮箱</h3>
        <div className={style['account-info-wrap']}>
          <span>注册邮箱: </span>{this.props.userInfo.email}
          <span>{verified}</span>
        </div>
        <h3>密码</h3>
      </div>
    );
  }
}
export default connect((models) => {
  return {
    sendVerify: models.auth.sendVerify,
  };
})(Account);
