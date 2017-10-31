import React from 'react';
import { Row, Col, Modal } from 'antd';
import MediaQuery from 'react-responsive';
import style from './photoWall.less';
import PhotoCard from '../photoCard/photoCard';
import PhotoDetail from '../PhotoDetail/photoDetail';

class PhotoWall extends React.Component {
  state = {
    detailVisible: false,
    chosenPhoto: undefined,
  };
  showDetail = (info) => {
    this.setState({
      chosenPhoto: info,
      detailVisible: true,
    });
  };
  smPane = () => {
    const column1 = [];
    const column2 = [];
    for (let i = 0; i < this.props.photos.length; i += 2) {
      const item1 = this.props.photos[i];
      const item2 = this.props.photos[i + 1];
      column1.push(
        <PhotoCard onClick={() => { this.showDetail(item1); }} key={i} info={item1} />,
      );
      if (item2 !== undefined) {
        column2.push(
          <PhotoCard onClick={() => { this.showDetail(item2); }} key={i + 1} info={item2} />,
        );
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
    for (let i = 0; i < this.props.photos.length; i += 3) {
      const item1 = this.props.photos[i];
      const item2 = this.props.photos[i + 1];
      const item3 = this.props.photos[i + 2];
      column1.push(
        <PhotoCard onClick={() => { this.showDetail(item1); }} key={i} info={item1} />,
      );
      if (item2 !== undefined) {
        column2.push(
          <PhotoCard onClick={() => { this.showDetail(item2); }} key={i + 1} info={item2} />,
        );
      }
      if (item3 !== undefined) {
        column3.push(
          <PhotoCard onClick={() => { this.showDetail(item3); }} key={i + 2} info={item3} />,
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
    const column = [];
    for (let i = 0; i < this.props.photos.length; i += 1) {
      const item = this.props.photos[i];
      column.push(
        <PhotoCard onClick={() => { this.showDetail(item); }} key={i} info={item} />,
      );
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
    return (
      <div>
        <div className={style['photo-wall-wrap']}>
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
        </div>
        <Modal
          style={{ top: 10, height: '90%', paddingBottom: '0' }}
          bodyStyle={{ height: '100%' }}
          width="90%"
          visible={this.state.detailVisible}
          onCancel={() => { this.setState({ detailVisible: false }); }}
          footer={null}
        >
          <PhotoDetail photoInfo={this.state.chosenPhoto} />
        </Modal>
      </div>
    );
  }
}
export default PhotoWall;
