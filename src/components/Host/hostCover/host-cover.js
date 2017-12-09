import React from 'react';
import { Row, Col } from 'antd';
import style from './host-cover.less';
import defaultHostCover from '../../../assets/images/default_host_cover.jpg';
import defaultAvatar from '../../../assets/images/defaultAvatar.jpeg';

class HostCover extends React.Component {
  render() {
    console.log(this.props);
    const avatar = this.props.hostInfo.data.avatarUrl || defaultAvatar;
    console.log(avatar);
    return (
      <div className={style['host-cover-wrap']} style={{ backgroundImage: `url(${defaultHostCover})` }}>
        <div className={style['host-cover-avatar-wrap']}>
          <img src={avatar} role="presentation" />
        </div>
        <div className={style['host-cover-info-wrap']}>
          <div className={style['host-cover-info']}>{this.props.hostInfo.data.nickName}</div>
          <div className={style['host-cover-info']}>关注者: {this.props.hostInfo.data.followers}</div>
        </div>
      </div>
    );
  }
}
export default HostCover;
