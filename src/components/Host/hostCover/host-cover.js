import React from 'react';
import { Row, Col } from 'antd';
import style from './host-cover.less';
import defaultHostCover from '../../../assets/images/default_host_cover.jpg';

class HostCover extends React.Component {
  render() {
    console.log(this.props);
    return (
      <div className={style['host-cover-wrap']} style={{ backgroundImage: `url(${defaultHostCover})` }}>
        <Row type="flex" justify="center" align="center" style={{ width: '100%' }}>
          <Col xs={24} sm={3}>
            <div className={style['host-cover-avatar-wrap']}>
              <img src={this.props.hostInfo.data.avatarUrl} role="presentation" />
            </div>
          </Col>
          <Col>
            <div className={style['host-cover-info-wrap']}>
              <div className={style['host-cover-info']}>{this.props.hostInfo.data.nickName}</div>
              <div className={style['host-cover-info']}>{this.props.hostInfo.data.userId}</div>
              <div className={style['host-cover-info']}>关注者: {this.props.hostInfo.data.followers}</div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
export default HostCover;
