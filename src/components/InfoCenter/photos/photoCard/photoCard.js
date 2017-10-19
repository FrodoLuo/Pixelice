import React from 'react';
import { Card, Icon, Col, Modal } from 'antd';
import defaultPhoto from '../../../../assets/images/default_photo_cover.jpeg';
import style from './photoCard.less';

class PhotoCard extends React.Component {
  state = {
    detailVisible: false,
  };
  render() {
    return (
      <div>
        <Card
          bodyStyle={{ padding: 0 }}
          style={{ margin: '12px 2px', border: '#eee 1px solid' }}
        >
          <a onClick={this.props.onClick}>
            <div className={style['photo-card-wrap']}>
              <img src={this.props.info.zipUrl} role="presentation" />
            </div>
            <div className={style['photo-simple-info-wrap']}>
              <div className={style['photo-title']}>
                {this.props.info.title}
              </div>
              <div className={style['photo-simple-info']}>
                <div>
                  <Icon type="heart" />
                  <span>{this.props.info.liked}</span>
                </div>
                <div>
                  <Icon type="star" />
                  <span>{this.props.info.liked}</span>
                </div>
              </div>
            </div>
          </a>
        </Card>
      </div>
    );
  }
}
export default PhotoCard;
