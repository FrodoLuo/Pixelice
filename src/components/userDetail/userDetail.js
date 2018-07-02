import React from 'react';
import { } from 'antd';
import { connect } from 'dva';

import style from './userDetail.less';

class UserDetail extends React.Component {
  state = {
    fetched: false,
    hostInfo: {
      state: 'ready',
      data: {
        userId: '',
        nickName: '',
        avatarUrl: '',
        gender: '',
        intro: '',
        followers: 0,
      },
    },
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'user/hostInfo',
      payload: this.props.userInfo.userId,
    });
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if ((nextProps.user.hostInfo.state === 'success' || nextProps.user.hostInfo.state === 'self') && !this.state.fetched) {
      this.setState({
        hostInfo: nextProps.user.hostInfo,
        fetched: true,
      });
    }
  }
  render() {
    console.log(this.props);
    return (
      <div className={style['user-detail-wrap']}>
        <div className={style['user-detail-nickName']}>
          {this.state.hostInfo.data.nickName}
        </div>
        {/* <div className={style['user-detail-id']}>*/}
        {/* {this.state.hostInfo.data.userId}*/}
        {/* </div>*/}
        <div className={style['user-detail-intro']}>
          <p>
            {this.state.hostInfo.data.intro}
          </p>
        </div>
      </div>
    );
  }
}
export default connect((model) => {
  return model;
})(UserDetail);
