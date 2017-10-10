import React from 'react';
import { Row, Button } from 'antd';
import { connect } from 'dva';
import PhotoCard from './photoCard/photoCard';
import style from './photoPane.less';
import UploadPane from './uploadPane/uploadPane';

class PhotoPane extends React.Component {
  state = {
    photos: [],
  };
  render() {
    return (
      <div>
        <div className={style['photo-control-wrap']}>
          <Button size={'large'} type="primary">上传照片</Button>
        </div>
        <div className={style['upload-pane-wrap']}>
          <UploadPane />
        </div>
        <Row type="flex" justify="space-between" className={style['photo-cards-wrap']}>
          <PhotoCard title="test" liked="14" star="3" />
          <PhotoCard title="test" liked="14" star="3" />
          <PhotoCard title="test" liked="14" star="3" />
          <PhotoCard title="test" liked="14" star="3" />
          <PhotoCard title="test" liked="14" star="3" />
          <PhotoCard title="test" liked="14" star="3" />
          <PhotoCard title="test" liked="14" star="3" />
          <PhotoCard title="test" liked="14" star="3" />
          <PhotoCard title="test" liked="14" star="3" />
          <PhotoCard title="test" liked="14" star="3" />
          <PhotoCard title="test" liked="14" star="3" />
          <PhotoCard title="test" liked="14" star="3" />
          <PhotoCard title="test" liked="14" star="3" />
          <PhotoCard title="test" liked="14" star="3" />
          <PhotoCard title="test" liked="14" star="3" />
          <PhotoCard title="test" liked="14" star="3" />
        </Row>
      </div>
    );
  }
}
export default connect()(PhotoPane);
