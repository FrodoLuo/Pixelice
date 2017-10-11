import React from 'react';
import { Card, Icon, Col, Modal } from 'antd';
import PhotoDetail from './photoDetail';
import defaultPhoto from '../../../../assets/images/default_photo_cover.jpeg';
import style from './photoCard.less';

class PhotoCard extends React.Component {
  state = {
    detailVisible: false,
  };
  showDetail = () => {
    this.setState({
      detailVisible: true,
    });
  };
  hideDetail = () => {
    this.setState({
      detailVisible: false,
    });
  };
  render() {
    return (
      <Col xs={24} sm={11} md={6}>
        <Card
          bodyStyle={{ padding: 0 }}
          style={{ margin: '10px 2px', border: '#eee 1px solid' }}
        >
          <a onClick={this.showDetail}>
            <div className={style['photo-card-wrap']}>
              <img src={defaultPhoto} role="presentation" />
            </div>
            <div className={style['photo-simple-info-wrap']}>
              <div className={style['photo-title']}>
                {this.props.title}
              </div>
              <div className={style['photo-simple-info']}>
                <div>
                  <Icon type="heart" />
                  <span>{this.props.liked}</span>
                </div>
                <div>
                  <Icon type="star" />
                  <span>{this.props.star}</span>
                </div>
              </div>
            </div>
          </a>
        </Card>
        <Modal
          visible={this.state.detailVisible}
          onCancel={this.hideDetail}
          footer={null}
        >
          <PhotoDetail />
        </Modal>
      </Col>
    );
  }
}
export default PhotoCard;
