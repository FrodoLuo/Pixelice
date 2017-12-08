import React from 'react';
import { Card, Avatar, Icon } from 'antd';
import { connect } from 'dva';
import style from './photoCard.less';
import defaultAvatar from '../../assets/images/defaultAvatar.jpeg';

function photoCard(props) {
  const avatar = props.info.avatarUrl === '' ?
    defaultAvatar : props.info.avatarUrl;
  const handleLike = (e) => {
    e.stopPropagation();
    if (props.liked) {
      props.dispatch({
        type: 'social/dislike',
        payload: props.info.photoId,
      });
    } else {
      props.dispatch({
        type: 'social/like',
        payload: props.info.photoId,
      });
    }
  };
  return (
    <Card bodyStyle={{ padding: 0 }} noHovering bordered={false} className={style['nc-wrap']} onClick={props.onClick}>
      <div className={style['nc-hover-wrap']}>
        <div className={style['nc-userInfo-wrap']}>
          <Avatar src={avatar} />
          <span className={style['nc-userInfo-nickName']}>{props.info.nickName}</span>
        </div>
      </div>
      <div className={style['nc-like-wrap']} onClick={handleLike}>
        {props.info.liked}&nbsp;<Icon type={props.liked ? 'heart' : 'heart-o'} />
      </div>
      <div className={style['nc-photo-wrap']}>
        <img src={props.info.zipUrl} role="presentation" />
      </div>
    </Card>
  );
}
export default connect()(photoCard);
