import React from 'react';
import { Avatar, Popover } from 'antd';
import style from './userCard.less';

import UserDetail from '../../../userDetail/userDetail';
import defaultAvatar from '../../../../assets/images/defaultAvatar.jpeg';

function UserCard(props) {
  const detail = (
    <UserDetail userInfo={props.userInfo} />
  );
  const src = props.userInfo.avatarUrl === '' ? defaultAvatar : props.userInfo.avatarUrl;
  return (
    <div className={style['user-card-wrap']}>
      <Popover content={detail} trigger={['hover']}>
        <a href={`/user/${props.userInfo.userId}`} className={style['user-avatar-wrap']} >
          <img src={defaultAvatar} role="presentation" />
        </a>
        {/* <p>{props.userInfo}</p>*/}
      </Popover>
    </div>

  );
}
export default UserCard;
