import React from 'react';
import { connect } from 'dva';
import { } from 'antd';

import UserCard from './userCard/userCard';
import style from './followPane.less';

class FollowPane extends React.Component {
  state = {
    followedUsers: {
      state: 'ready',
      data: [],
    },
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'social/getFollowedUsers',
    });
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    switch (nextProps.runningOp) {
      case 'followedUsers': {
        if (nextProps.followedUsers.state === 'success') {
          this.setState({
            followedUsers: nextProps.followedUsers,
          });
        }
      }
    }
  }
  render() {
    const users = [];
    for (const item of this.state.followedUsers.data) {
      users.push(
        <UserCard
          userInfo={item}
          key={item.userId}
        />,
      );
    }
    return (
      <div className={style['users-wrap']}>
        {users}
      </div>
    );
  }
}
export default connect((models) => {
  return models.social;
})(FollowPane);
