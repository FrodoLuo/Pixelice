import React from 'react';
import { Layout, Row, Col, Card, Affix, Tabs, Modal } from 'antd';
import { connect } from 'dva';
import MediaQuery from 'react-responsive';
import PixelHeader from '../../components/Pixel-Header/pixeliceHeader';
import PixelFooter from '../../components/Pixel-Footer/pixelFooter';
import Cover from '../../components/Cover/cover';
import style from './SquarePage.less';
import PhotoWall from '../../components/PhotoWall/photoWall';

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
    console.log(this.props.location.search);
    this.props.dispatch({
      type: 'photo/getNewPhotos',
    });
  }
  componentWillReceiveProps(nextProps) {
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
  render() {
    return (
      <Layout>
        <PixelHeader />
        <Content className="main-content">
          <div className="content-wrap">
            <Tabs defaultActiveKey="1">
              <Tabs.TabPane tab="最新作品" key="1">
                <PhotoWall photos={this.state.photos.data} />
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
