import React from 'react';
import { Card, Icon } from 'antd';
import defaultPhoto from '../../../../assets/images/default_photo_cover.jpeg';
import style from './photoCard.less';

function PhotoCard(props) {
  return (
    <Card bodyStyle={{ padding: 0 }} bordered={false}>
      <div className={style['photo-card-wrap']}>
        <img src={defaultPhoto} role="presentation" />
      </div>
      <div>
        <div>
          <Icon type="heart" />
          <span>{props.liked}</span>
        </div>
        <div>
          <Icon type="star" />
          <span>{props.stared}</span>
        </div>
      </div>
    </Card>
  );
}
export default PhotoCard;
