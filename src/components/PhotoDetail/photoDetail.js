import React from 'react';
import { Row, Col, Icon } from 'antd';
import { connect } from 'dva';
import style from './photoDetail.less';

class PhotoDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      photoInfo: props.photoInfo,
      comment: [],
    };
  }
  render() {
    console.log(this.props.photoInfo);
    return (
      <div style={{ height: '100%' }}>
        <div className={style['photo-wrap']}>
          <img src={this.props.photoInfo.photoUrl} role="presentation" />
        </div>
        <div className={style['detail-wrap']}>
          <div className={style['detail-title']}>
            {this.props.photoInfo.title}
          </div>
          <span className={style['detail-date']}>{this.props.photoInfo.date}</span>
          <p>
            {this.props.photoInfo.intro}
          </p>
          <div className={style['social-wrap']}>
            <Icon type="heart" />
            <Icon type="qq" />
          </div>
        </div>
      </div>
    );
  }
}
export default connect()(PhotoDetail);
