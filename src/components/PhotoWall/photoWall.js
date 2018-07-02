import React from 'react';
import { Row, Col, Modal, Icon } from 'antd';
import { connect } from 'dva';
import MediaQuery from 'react-responsive';
import style from './photoWall.less';
import PhotoCard from '../photoCard/photoCard';
import PhotoDetail from '../PhotoDetail/photoDetail';

class PhotoWall extends React.Component {
  state = {
    detailVisible: false,
    chosenPhoto: {
      photoId: 0,
    },
    state: 'ready',
    searched: false,
    likedList: [],
  };
  componentWillMount() {
    this.props.dispatch({
      type: 'social/checkLike',
    });
  }
  componentWillReceiveProps(nextProps) {
    switch (nextProps.runningOp) {
      case 'checkLike':
        if (nextProps.likedList.state === 'success') {
          this.setState({
            likedList: nextProps.likedList.data,
          });
        }
        break;
      default:
        this.setState({
          searched: true,
        });
    }
  }
  createPhotoCard = (item) => {
    return (
      <PhotoCard
        liked={this.isLiked(item.photoId)}
        onClick={() => { this.showDetail(item); }}
        key={item.photoId} info={item}
      />
    );
  }
  isLiked = (photoId) => {
    for (const i of this.state.likedList) {
      if (i.photoId === photoId) {
        return true;
      }
    }
    return false;
  }
  showDetail = (info) => {
    this.setState({
      chosenPhoto: info,
      detailVisible: true,
    });
  };
  smPane = () => {
    const column1 = [];
    const column2 = [];
    for (let i = 0; i < this.props.photos.data.length; i += 2) {
      const item1 = this.props.photos.data[i];
      const item2 = this.props.photos.data[i + 1];
      column1.push(this.createPhotoCard(item1));
      if (item2 !== undefined) {
        column2.push(this.createPhotoCard(item2));
      }
    }
    return ([
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
    for (let i = 0; i < this.props.photos.data.length; i += 3) {
      const item1 = this.props.photos.data[i];
      const item2 = this.props.photos.data[i + 1];
      const item3 = this.props.photos.data[i + 2];
      column1.push(this.createPhotoCard(item1));
      if (item2 !== undefined) {
        column2.push(this.createPhotoCard(item2));
      }
      if (item3 !== undefined) {
        column3.push(this.createPhotoCard(item3));
      }
    }
    return ([
      <Col className={style['single-column']} span={8}>
        {column1}
      </Col>,
      <Col className={style['single-column']} span={8}>
        {column2}
      </Col>,
      <Col className={style['single-column']} span={8}>
        {column3}
      </Col>,
    ]);
  };
  xsPane = () => {
    const column = [];
    for (let i = 0; i < this.props.photos.data.length; i += 1) {
      const item = this.props.photos.data[i];
      column.push(this.createPhotoCard(item));
    }
    return (
      <Col span={24}>
        {column}
      </Col>
    );
  };
  paneCompute = (size) => {
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
    return photos;
  };
  render() {
    const pad = this.props.photos.state !== 'loading' ?
      (
        <Row type="flex" justify="space-between" align="top">
          <Col span={24}>
            <Row type="flex" justify="start" align="top">
              <MediaQuery minWidth={992} className={style['photo-wall-wrap']}>
                {this.paneCompute('md')}
              </MediaQuery>
              <MediaQuery minWidth={768} maxWidth={992} className={style['photo-wall-wrap']}>
                {this.paneCompute('sm')}
              </MediaQuery>
              <MediaQuery maxWidth={768} className={style['photo-wall-wrap']}>
                {this.paneCompute('xs')}
              </MediaQuery>
            </Row>
          </Col>
        </Row>
      )
      :
      (
        <div className={style['photo-wall-loading-wrap']}>
          <Icon type="loading" />
        </div>
      );
    return (
      <div>
        <div className={style['photo-wall-wrap']}>
          <div>
            {this.props.home ? '' : (
              <div>
                找到了{this.props.photos.data.length}个结果
              </div>
            )
            }
          </div>
          {pad}
          {this.props.photos.data.length === 0 ? (
            <p className="nothing-found">
              ╮(⊙︿⊙)╭
                <br />
              这个地方没有照片
              </p>
          ) : ''}
        </div>
        <Modal
          style={{ top: 20, height: '100%', width: '100%', paddingBottom: '0', margin: 0, overflow: 'none' }}
          bodyStyle={{ height: '100%', padding: 0, width: '100%' }}
          width="100%"
          visible={this.state.detailVisible}
          onCancel={() => { this.setState({ detailVisible: false }); }}
          footer={null}
        >
          <PhotoDetail
            photoInfo={this.state.chosenPhoto}
            liked={this.isLiked(this.state.chosenPhoto.photoId)}
          />
        </Modal>
      </div>
    );
  }
}
export default connect((models) => {
  return models.social;
})(PhotoWall);
