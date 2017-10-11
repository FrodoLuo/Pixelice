import React from 'react';
import { Row, Button } from 'antd';
import { connect } from 'dva';
import PhotoCard from './photoCard/photoCard';
import style from './photoPane.less';
import UploadPane from './uploadPane/uploadPane';

class PhotoPane extends React.Component {
  state = {
    photos: [],
    uploadVisible: false,
    upload: {
      message: 0,
    },
  };
  openUpload = () => {
    this.setState({
      uploadVisible: true,
    });
  };
  hideUpload = () => {
    this.setState({
      uploadVisible: false,
    });
  };
  paneCompute = () => {
    if (this.state.uploadVisible) {
      return (
        <div className={style['upload-pane-wrap']}>
          <UploadPane />
        </div>
      );
    } else {
      return (
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
      );
    }
  };
  render() {
    const buttonhandler = this.state.uploadVisible ?
      this.hideUpload
      :
      this.openUpload;
    return (
      <div>
        <div className={style['photo-control-wrap']}>
          <Button
            onClick={buttonhandler}
            size={'large'}
            type={this.state.uploadVisible ? '' : 'primary'}
          >
            {this.state.uploadVisible ? '取消' : '上传图片'}
          </Button>
        </div>
        {this.paneCompute()}
      </div>
    );
  }
}
export default connect()(PhotoPane);
