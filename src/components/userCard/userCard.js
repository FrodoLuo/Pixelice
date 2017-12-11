import React from 'react';
import { Avatar } from 'antd';
import style from './userCard.less';

import defaultAvatar from '../../assets/images/defaultAvatar.jpeg';

function UserCard(props) {
  return (
    <div className={style['user-card-wrap']}>
      <a href={`/user/${props.userInfo.userId}`}>
        <div className={style['user-content-wrap']}>
          <div className={style['user-avatar-wrap']}>
            <div className={style['user-avatar']}>
              <img src={defaultAvatar} role="presentation" />
            </div>
          </div>
          <div className={style['user-info-wrap']}>
            <div className={style['user-info-name']}>
              {props.userInfo.nickName}
            </div>
            <div className={style['user-info-data']}>
              粉丝&nbsp;{props.userInfo.followers}
            </div>
            <div className={style['user-info-intro']}>
              {props.userInfo.intro}
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
export default UserCard;
