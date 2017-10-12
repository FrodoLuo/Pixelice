import React from 'react';
import { Row, Button } from 'antd';
import { connect } from 'dva';
import PhotoCard from './photoCard/photoCard';
import style from './photoPane.less';
import UploadPane from './uploadPane/uploadPane';

class PhotoPane extends React.Component {
  state = {
    photos: {
      message: 0,
      data: [],
    },
    uploadVisible: false,
    upload: {
      message: 0,
    },
  };
  componentWillMount() {
    this.props.dispatch({
      type: 'photo/fetchPhotos',
    });
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.photos.message === 20) {
      this.setState({
        photos: nextProps.photos,
      });
    }
  }
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
      const photos = [];
      for (let i = 0; i < this.state.photos.data.length; i += 1) {
        const item = this.state.photos.data[i];
        photos.push(
          <PhotoCard key={i} info={item} />,
        );
      }
      return (
        <Row type="flex" justify="space-between" className={style['photo-cards-wrap']}>
          {photos}
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
export default connect((models) => {
  return models.photo;
})(PhotoPane);
