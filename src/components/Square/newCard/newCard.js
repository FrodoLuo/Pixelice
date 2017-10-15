import React from 'react';
import { Card, Avatar, Modal } from 'antd';
import style from './newCard.less';
import defaultAvatar from '../../../assets/images/defaultAvatar.jpeg';

function newCard(props) {
  const avatar = props.info.avatarUrl === '' ?
    defaultAvatar : props.info.avatarUrl;
  return (
    <Card onClick={props.onClick} bordered={false} noHovering className={style['nc-wrap']}>
      <div className={style['nc-userInfo-wrap']}>
        <Avatar src={avatar} />
        <span className={style['nc-userInfo-nickName']}>{props.info.nickName}</span>
      </div>
      <div className={style['nc-intro-wrap']}>
        {props.info.intro}
      </div>
      <div className={style['nc-photo-wrap']}>
        <img src={props.info.zipUrl} role="presentation" />
      </div>
      <div className={style['nc-footer']}>
        <span>发表于{props.info.date}</span>
      </div>
    </Card>
  );
}
export default newCard;
