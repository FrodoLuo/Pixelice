import React from 'react';
import { Modal } from 'antd';
import { connect } from 'dva';
import style from './info-cover.less';
import defaultCover from '../../../assets/images/default_cover.jpeg';
import defaultAvatar from '../../../assets/images/defaultAvatar.jpeg';

class InfoCenter extends React.Component {


  render() {
    const imgSrc = this.props.userInfo.avatarUrl === '' ? defaultAvatar : this.props.userInfo.avatarUrl;
    return (
      <div
        className={style['info-cover-background']}
        style={{ backgroundImage: `url(${defaultCover})` }}
      >
        <div className={style['info-cover-avatar-wrap']}>
          <img src={imgSrc} role="presentation" />
        </div>
        <div className={style['info-cover-info-wrap']}>
          <h2>{this.props.userInfo.nickName}</h2>
          <span>ID: {this.props.userInfo.userId}</span>
          <span>关注者: {this.props.userInfo.followers}</span>
        </div>
      </div>
    );
  }
}
export default connect()(InfoCenter);
