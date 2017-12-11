import React from 'react';
import { connect } from 'dva';
import { } from 'antd';

import UserCard from '../../userCard/userCard';

class FollowPane extends React.Component {
  render() {
    return (
      <div>
        <UserCard
          userInfo={{
            userId: 59,
            nickName: '舟舟',
            intro: '这个人很烂 什么都没有留下',
            followers: 0,
          }}
        />
      </div>
    );
  }
}
export default connect()(FollowPane);
