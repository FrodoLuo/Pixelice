import React from 'react';
import { Card, Avatar, Icon, Popover } from 'antd';
import { connect } from 'dva';
import style from './photoCard.less';
import defaultAvatar from '../../assets/images/defaultAvatar.jpeg';
import UserDetail from '../userDetail/userDetail';

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
      const k = parseInt(window.document.getElementById(`${props.info.photoId}_liked`).innerHTML, 10);
      if (k >= props.info.liked && k <= props.info.liked + 1) { window.document.getElementById(`${props.info.photoId}_liked`).innerHTML = k - 1; }
    } else {
      props.dispatch({
        type: 'social/like',
        payload: props.info.photoId,
      });
      const k = parseInt(window.document.getElementById(`${props.info.photoId}_liked`).innerHTML, 10);
      if (k <= props.info.liked && k >= props.info.liked - 1) { window.document.getElementById(`${props.info.photoId}_liked`).innerHTML = k + 1; }
    }
  };
  const detail = (
    <UserDetail fromPhoto userInfo={props.info} />
  );
  return (
    <Card bodyStyle={{ padding: 0 }} noHovering bordered={false} className={style['nc-wrap']} onClick={props.onClick}>
      <div className={style['nc-hover-wrap']}>
        <div className={style['nc-userInfo-wrap']}>
          <Popover content={detail}>
            <a href={`/user/${props.info.userId}`} onClick={(e) => { e.stopPropagation(); }}>
              <Avatar src={avatar} />
            </a>
          </Popover>
          <span className={style['nc-userInfo-nickName']}>{props.info.nickName}</span>
        </div>
      </div>
      <div className={style['nc-like-wrap']} onClick={handleLike}>
        <span id={`${props.info.photoId}_liked`} >{props.info.liked}</span>&nbsp;<Icon type={props.liked ? 'heart' : 'heart-o'} />
      </div>
      <div className={style['nc-photo-wrap']}>
        <img src={props.info.zipUrl} role="presentation" />
      </div>
    </Card>
  );
}
export default connect()(photoCard);
