import React from 'react';
import { Row, Col, Modal, Input } from 'antd';
import { connect } from 'dva';
import style from './host-cover.less';
import defaultHostCover from '../../../assets/images/default_host_cover.jpg';
import defaultAvatar from '../../../assets/images/defaultAvatar.jpeg';
import Subscribe from '../subscribe/subscribe';

class HostCover extends React.Component {
  state = {
    messageSendVisible: false,
    sendMessage: {
      state: 'ready',
    },
    editingMessage: '',
    followed: false,
    messageLength: 0,
  };
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({
      ...this.state,
      followed: nextProps.hostInfo.data.followed === 't',
    });
  }
  setMessageDialogVisible = (sw) => {
    this.setState({
      messageSendVisible: sw,
    });
  }
  handleFollow = () => {
    if (this.state.followed) {
      this.props.dispatch({
        type: 'social/unfollow',
        payload: this.props.hostInfo.data.userId,
      });
    } else {
      this.props.dispatch({
        type: 'social/follow',
        payload: this.props.hostInfo.data.userId,
      });
    }
    this.props.dispatch({
      type: 'user/hostInfo',
      payload: this.props.hostInfo.data.userId,
    });
  }
  handleMessageChange = (e) => {
    this.setState({
      editingMessage: e.target.value,
      messageLength: e.target.value.length,
    });
  }
  render() {
    const avatar = this.props.hostInfo.data.avatarUrl || defaultAvatar;
    return (
      <div className={style['host-cover-wrap']} style={{ backgroundImage: `url(${defaultHostCover})` }}>
        <div className={style['host-cover-content']}>
          <div className={style['host-cover-avatar-wrap']}>
            <img src={avatar} role="presentation" />
          </div>
          <div className={style['host-cover-info-wrap']}>
            <div className={style['host-cover-info']}>{this.props.hostInfo.data.nickName}</div>
            <div className={style['host-cover-info']}>关注者: {this.props.hostInfo.data.followers}</div>
          </div>
          <Subscribe
            subscribed={this.state.followed}
            showMessage={this.setMessageDialogVisible}
            handleFollow={this.handleFollow}
          />
        </div>
        <Modal
          visible={this.state.messageSendVisible}
          title={`向${this.props.hostInfo.data.nickName}发送私信`}
          onCancel={() => { this.setMessageDialogVisible(false); }}
        >
          <div>
            <span>私信内容</span>
            <Input.TextArea
              style={{ resize: 'none', height: 300, padding: 15 }}
              value={this.state.editingMessage}
              onChange={this.handleMessageChange}
            />
            <span>{this.state.messageLength}/200</span>
          </div>
        </Modal>
      </div>
    );
  }
}
export default connect()(HostCover);
