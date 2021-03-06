import React from 'react';
import { Modal, Upload, message, Avatar } from 'antd';
import { connect } from 'dva';
import style from './info-cover.less';
import defaultCover from '../../../assets/images/default_cover.jpeg';
import defaultAvatar from '../../../assets/images/defaultAvatar.jpeg';
import galaxy from '../../../assets/images/galaxy.jpg';

class InfoCenter extends React.Component {

  beforeUpload = (file) => {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error('Image must smaller than 2MB!');
    }
    return isJPG && isLt2M;
  }
  handleUploadDone = (obj) => {
    if (obj.file.response && obj.file.response.message === 20) {
      message.success('头像修改完成');
      this.props.dispatch({
        type: 'user/userInfo',
      });
    }
  }
  render() {
    const imgSrc = this.props.userInfo.avatarUrl === '' ? defaultAvatar : this.props.userInfo.avatarUrl;
    return (
      <div
        className={style['info-cover-background']}
        style={{ backgroundImage: `url(${this.props.userInfo.userId === 77 ? galaxy : defaultCover})` }}
      >
        <div className={style['info-cover-avatar-wrap']}>
          <Upload
            action="/api/user/modifyAvatar"
            beforeUpload={this.beforeUpload}
            onChange={this.handleUploadDone}
            showUploadList={false}
          >
            <Avatar style={{ height: 100, width: 100, cursor: 'pointer', borderRadius: '50%' }} src={imgSrc} />
          </Upload>
        </div>
        <div className={style['info-cover-info-wrap']}>
          <h2>{this.props.userInfo.nickName}</h2>
          <span>ID: {this.props.userInfo.userId}</span>
          <span>关注者: {this.props.userInfo.followers}</span>
        </div>
      </div>
    );
  }
}
export default connect()(InfoCenter);
