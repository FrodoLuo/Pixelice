import React from 'react';
import { Row, Col } from 'antd';
import { connect } from 'dva';
import PhotoCard from './photoCard/photoCard';
import style from './photoPane.less';

class PhotoPane extends React.Component {
  state = {
    photos: [],
  };
  render() {
    return (
      <Row type="flex" justify="space-between">
        <Col xs={24} sm={12} md={6}>
          <PhotoCard liked="14" star="3" />
        </Col>
      </Row>
    );
  }
}
export default connect()(PhotoPane);
