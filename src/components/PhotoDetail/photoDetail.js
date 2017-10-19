import React from 'react';
import { Row, Col } from 'antd';
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
    return (
      <div style={{ height: '100%' }}>
        <Row type="flex" style={{ height: '100%' }}>
          <Col xs={24} sm={20}>
            <div className={style['photo-wrap']}>
              <img src={this.props.photoInfo.photoUrl} role="presentation" />
            </div>
          </Col>
          <Col>
            details
          </Col>
        </Row>
      </div>
    );
  }
}
export default connect()(PhotoDetail);
