import React from 'react';
import { connect } from 'dva';
import { Avatar } from 'antd';
import style from './pixeliceHeader.less';

class PixeliceHeader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
    };
  }
  render() {
    let content;
    if (this.state.logged) {
      content = (
        <div className={style['nav-wrap']}>
          <a href=""><span>注销</span></a>
          <Avatar icon="user" src="" />
        </div>
      );
    } else {
      content = (
        <div className={style['nav-wrap']}>
          <a href=""><span>登录</span></a>
          <a href=""><span>注册</span></a>
        </div>
      );
    }
    return (content);
  }
}
export default connect()(PixeliceHeader);
