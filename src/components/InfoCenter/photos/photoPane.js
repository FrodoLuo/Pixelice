import React from 'react';
import { Row, Button, Col, Modal, message } from 'antd';
import { connect } from 'dva';
import MediaQuery from 'react-responsive';
import PhotoCard from './photoCard/photoCard';
import style from './photoPane.less';
import UploadPane from './uploadPane/uploadPane';
import PhotoDetail from '../../PhotoDetail/photoDetail';

class PhotoPane extends React.Component {
  state = {
    photos: {
      state: 'ready',
      data: [],
    },
    uploadVisible: false,
    sortOption: false,
    upload: {
      message: 0,
    },
    chosenPhoto: undefined,
    detailVisible: false,
  };

  componentWillMount() {
    this.props.dispatch({
      type: 'photo/fetchPhotos',
    });
  }

  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.photos.state === 'success') {
      this.setState({
        photos: nextProps.photos,
      });
    }
    if (nextProps.processing === 'delete' && nextProps.delete.state === 'success') {
      message.success('照片已删除');
      this.props.dispatch({
        type: 'photo/fetchPhotos',
      });
    }
  }

  sortPhoto = () => {
    this.setState({
      sortOption: !this.state.sortOption,
    });
  };
  showDetail = (info) => {
    this.setState({
      chosenPhoto: info,
      detailVisible: true,
    });
  };
  openUpload = () => {
    this.setState({
      uploadVisible: true,
    });
  };
  handleDeletePhoto = (photoId) => {
    this.props.dispatch({
      type: 'photo/delete',
      payload: photoId,
    });
  };
  hideUpload = () => {
    this.setState({
      uploadVisible: false,
    });
  };
  smPane = () => {
    const column1 = [];
    const column2 = [];
    for (let i = 0; i < this.state.photos.data.length; i += 2) {
      const item1 = this.state.photos.data[i];
      const item2 = this.state.photos.data[i + 1];
      column1.push(
        <PhotoCard
          handleDelete={this.handleDeletePhoto}
          onClick={() => {
            this.showDetail(item1);
          }}
          toAlbum={this.props.toAlbum}
          key={i}
          info={item1}
        />,
      );
      if (item2 !== undefined) {
        column2.push(
          <PhotoCard
            handleDelete={this.handleDeletePhoto}
            onClick={() => {
              this.showDetail(item2);
            }}
            toAlbum={this.props.toAlbum}
            key={i + 1}
            info={item2}
          />,
        );
      }
    }
    return ([
      <div><Button
        onClick={this.sortPhoto}
        size={'middle'}
      >
        {this.state.sortOption ? '欣赏新的照片' : '欣赏旧照'}
      </Button></div>,
      <Col span={12}>
        {column1}
      </Col>,
      <Col span={12}>
        {column2}
      </Col>,
    ]);
  };
  mdPane = () => {
    const column1 = [];
    const column2 = [];
    const column3 = [];
    for (let i = 0; i < this.state.photos.data.length; i += 3) {
      const item1 = this.state.photos.data[i];
      const item2 = this.state.photos.data[i + 1];
      const item3 = this.state.photos.data[i + 2];
      column1.push(
        <PhotoCard
          handleDelete={this.handleDeletePhoto}
          onClick={() => {
            this.showDetail(item1);
          }}
          toAlbum={this.props.toAlbum}
          key={i}
          info={item1}
        />,
      );
      if (item2 !== undefined) {
        column2.push(
          <PhotoCard
            handleDelete={this.handleDeletePhoto}
            onClick={() => {
              this.showDetail(item2);
            }}
            toAlbum={this.props.toAlbum}
            key={i + 1}
            info={item2}
          />,
        );
      }
      if (item3 !== undefined) {
        column3.push(
          <PhotoCard
            handleDelete={this.handleDeletePhoto}
            onClick={() => {
              this.showDetail(item3);
            }}
            toAlbum={this.props.toAlbum}
            key={i + 2}
            info={item3}
          />,
        );
      }
    }
    return ([
      <Col span={8}>
        {column1}
      </Col>,
      <Col span={8}>
        {column2}
      </Col>,
      <Col span={8}>
        {column3}
      </Col>,
    ]);
  };
  xsPane = () => {
    const column1 = [];
    for (let i = 0; i < this.state.photos.data.length; i += 1) {
      const item1 = this.state.photos.data[i];
      column1.push(
        <PhotoCard
          handleDelete={this.handleDeletePhoto}
          onClick={() => {
            this.showDetail(item1);
          }}
          toAlbum={this.props.toAlbum}
          key={i}
          info={item1}
        />,
      );
    }
    return ([
      <Col span={24}>
        {column1}
      </Col>,
    ]);
  };
  paneCompute = (size) => {
    if (this.state.uploadVisible) {
      return (
        <div className={style['upload-pane-wrap']}>
          <UploadPane />
        </div>
      );
    } else {
      let photos;
      switch (size) {
        case 'xs':
          photos = this.xsPane();
          break;
        case 'sm':
          photos = this.smPane();
          break;
        case 'md':
          photos = this.mdPane();
          break;
        default:
          photos = '';
          break;
      }
      return (
        <div>
          <Button
            onClick={this.sortPhoto}
            size={'default'}
          >
            {this.state.sortOption ? '欣赏新的照片' : '欣赏旧照'}
          </Button>
          <Row
            type="flex"
            justify="space-between"
            align="top"
            className={style['photo-cards-wrap']}
            gutter={10}
          >{photos}
          </Row>
        </div>
      );
    }
  };

  render() {
    const buttonhandler = this.state.uploadVisible ?
      this.hideUpload
      :
      this.openUpload;
    this.state.photos.data.reverse();
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
        <MediaQuery minWidth={992}>
          {this.paneCompute('md')}
        </MediaQuery>
        <MediaQuery minWidth={768} maxWidth={992}>
          {this.paneCompute('sm')}
        </MediaQuery>
        <MediaQuery maxWidth={768}>
          {this.paneCompute('xs')}
        </MediaQuery>
        <Modal
          style={{ top: 20, height: '100%', paddingBottom: '0', margin: 0, overflow: 'none' }}
          bodyStyle={{ height: '100%', padding: 0, width: '100%' }}
          width="100%"
          visible={this.state.detailVisible}
          onCancel={() => {
            this.setState({ detailVisible: false });
          }}
          footer={null}
        >
          <PhotoDetail photoInfo={this.state.chosenPhoto} />
        </Modal>
      </div>
    );
  }
}

export default connect((models) => {
  return models.photo;
})(PhotoPane);
