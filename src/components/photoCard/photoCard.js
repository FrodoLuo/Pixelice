import React from 'react';
import { Card, Avatar, Icon } from 'antd';
import style from './photoCard.less';
import defaultAvatar from '../../assets/images/defaultAvatar.jpeg';

function photoCard(props) {
  const avatar = props.info.avatarUrl === '' ?
    defaultAvatar : props.info.avatarUrl;
  const k = (e) => {
    e.stopPropagation();
  };
  return (
    <Card bodyStyle={{ padding: 0 }} noHovering bordered={false} className={style['nc-wrap']} onClick={props.onClick}>
      <div className={style['nc-hover-wrap']}>
        <div className={style['nc-userInfo-wrap']}>
          <Avatar src={avatar} />
          <span className={style['nc-userInfo-nickName']}>{props.info.nickName}</span>
        </div>
      </div>
      <div className={style['nc-like-wrap']}>
        <Icon type="heart-o" />
      </div>
      <div className={style['nc-photo-wrap']}>
        <img src={props.info.zipUrl} role="presentation" />
      </div>
    </Card>
  );
}
export default photoCard;
