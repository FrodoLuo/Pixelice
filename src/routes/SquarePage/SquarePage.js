import React from 'react';
import { Layout, Row, Col, Card, Affix, Tabs } from 'antd';
import { connect } from 'dva';
import MediaQuery from 'react-responsive';
import PixelHeader from '../../components/Pixel-Header/pixeliceHeader';
import PixelFooter from '../../components/Pixel-Footer/pixelFooter';
import Cover from '../../components/Cover/cover';
import style from './SquarePage.less';
import NewPhotoCard from '../../components/Square/newCard/newCard';

const { Content } = Layout;

class SquarePage extends React.Component {
  state = {
    photos: {
      message: 0,
      data: [],
    },
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
  smPane = () => {
    const column1 = [];
    const column2 = [];
    for (let i = 0; i < this.state.photos.data.length; i += 2) {
      const item1 = this.state.photos.data[i];
      const item2 = this.state.photos.data[i + 1];
      column1.push(
        <NewPhotoCard key={i} info={item1} />,
      );
      if (item2 !== undefined) {
        column2.push(
          <NewPhotoCard key={i + 1} info={item2} />,
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
        <NewPhotoCard key={i} info={item1} />,
      );
      if (item2 !== undefined) {
        column2.push(
          <NewPhotoCard key={i + 1} info={item2} />,
        );
      }
      if (item3 !== undefined) {
        column3.push(
          <NewPhotoCard key={i + 2} info={item3} />,
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
        <NewPhotoCard key={i} info={item} />,
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
        <Col key={i}>
          <NewPhotoCard info={item} />
        </Col>,
      );
    }
    return (
      <Layout>
        <PixelHeader />
        <Content className="main-content">
          <Cover />
          <div className="content-wrap">
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="最新作品" key="1">
                <div className={style['newphoto-wrap']}>
                  <Row type="flex" justify="space-between" align="top">
                    <Col xs={24} sm={20}>
                      <Row type="flex" justify="start" align="top">
                        <MediaQuery minWidth={992}>
                          {this.paneCompute('md')}
                        </MediaQuery>
                        <MediaQuery minWidth={768} maxWidth={992}>
                          {this.paneCompute('sm')}
                        </MediaQuery>
                        <MediaQuery maxWidth={768}>
                          {this.paneCompute('xs')}
                        </MediaQuery>
                      </Row>
                    </Col>
                    <Col>
                      <Affix>
                        <Card span={4} >
                          bla
                        </Card>
                      </Affix>
                    </Col>
                  </Row>
                </div>
              </Tabs.TabPane>
            </Tabs>
          </div>
        </Content>
        <PixelFooter />
      </Layout>
    );
  }
}
export default connect((models) => {
  return models.photo;
})(SquarePage);
