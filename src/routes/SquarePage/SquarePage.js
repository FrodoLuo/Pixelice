import React from 'react';
import { Layout, Row, Col, Card, Affix, Tabs, Modal } from 'antd';
import { connect } from 'dva';
import MediaQuery from 'react-responsive';
import PixelHeader from '../../components/Pixel-Header/pixeliceHeader';
import PixelFooter from '../../components/Pixel-Footer/pixelFooter';
import Cover from '../../components/Cover/cover';
import style from './SquarePage.less';
import NewPhotoCard from '../../components/Square/newCard/newCard';
import PhotoDetail from '../../components/PhotoDetail/photoDetail';

const { Content } = Layout;

class SquarePage extends React.Component {
  state = {
    photos: {
      message: 0,
      data: [],
    },
    detailVisible: false,
    chosenPhoto: undefined,
  };
  componentWillMount() {
    this.props.dispatch({
      type: 'photo/getNewPhotos',
    });
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({
      photos: nextProps.photos,
    });
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
    for (let i = 0; i < this.state.photos.data.length; i += 2) {
      const item1 = this.state.photos.data[i];
      const item2 = this.state.photos.data[i + 1];
      column1.push(
        <NewPhotoCard onClick={() => { this.showDetail(item1); }} key={i} info={item1} />,
      );
      if (item2 !== undefined) {
        column2.push(
          <NewPhotoCard onClick={() => { this.showDetail(item2); }} key={i + 1} info={item2} />,
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
    for (let i = 0; i < this.state.photos.data.length; i += 3) {
      const item1 = this.state.photos.data[i];
      const item2 = this.state.photos.data[i + 1];
      const item3 = this.state.photos.data[i + 2];
      column1.push(
        <NewPhotoCard onClick={() => { this.showDetail(item1); }} key={i} info={item1} />,
      );
      if (item2 !== undefined) {
        column2.push(
          <NewPhotoCard onClick={() => { this.showDetail(item2); }} key={i + 1} info={item2} />,
        );
      }
      if (item3 !== undefined) {
        column3.push(
          <NewPhotoCard onClick={() => { this.showDetail(item3); }} key={i + 2} info={item3} />,
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
    for (let i = 0; i < this.state.photos.data.length; i += 1) {
      const item = this.state.photos.data[i];
      column.push(
        <NewPhotoCard onClick={() => { this.showDetail(item); }} key={i} info={item} />,
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
    const photos = [];
    for (let i = 0; i < this.state.photos.data.length; i += 1) {
      const item = this.state.photos.data[i];
      photos.push(
        <Col key={i} span={24}>
          <NewPhotoCard onClick={this.showDetail} info={item} />
        </Col>,
      );
    }
    return (
      <Layout>
        <PixelHeader />
        <Content className="main-content">
          <div className="content-wrap">
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="最新作品" key="1">
                <div className={style['newphoto-wrap']}>
                  <Row type="flex" justify="space-between" align="top">
                    <Col>
                      <Affix>
                        <Card span={2} >
                          bla
                        </Card>
                      </Affix>
                    </Col>
                    <Col xs={24} sm={20}>
                      <Row type="flex" justify="start" align="top">
                        <MediaQuery minWidth={992} className={style['newphoto-wrap']}>
                          {this.paneCompute('md')}
                        </MediaQuery>
                        <MediaQuery minWidth={768} maxWidth={992} className={style['newphoto-wrap']}>
                          {this.paneCompute('sm')}
                        </MediaQuery>
                        <MediaQuery maxWidth={768} className={style['newphoto-wrap']}>
                          {this.paneCompute('xs')}
                        </MediaQuery>
                      </Row>
                    </Col>
                    <Col>
                      <Affix>
                        <Card span={2} >
                          bla
                        </Card>
                      </Affix>
                    </Col>
                  </Row>
                </div>
              </Tabs.TabPane>
            </Tabs>
          </div>
          <Modal
            style={{ position: 'absolute', top: 20 }}
            width="90%"
            visible={this.state.detailVisible}
            onCancel={() => { this.setState({ detailVisible: false }); }}
            footer={null}
          >
            <PhotoDetail photoInfo={this.state.chosenPhoto} />
          </Modal>
        </Content>
        <PixelFooter />
      </Layout>
    );
  }
}
export default connect((models) => {
  return models.photo;
})(SquarePage);
