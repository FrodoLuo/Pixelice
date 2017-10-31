import React from 'react';
import { Layout, Row, Col, Card, Affix, Tabs, Modal, Input } from 'antd';
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
    search: {
      message: 0,
      tried: false,
      data: [],
    },
  };
  componentWillMount() {
    console.log(this.props.location.search);
    this.props.dispatch({
      type: 'photo/getNewPhotos',
    });
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    this.setState({
      photos: nextProps.photos,
      search: nextProps.search,
    });
  }
  showDetail = (info) => {
    this.setState({
      chosenPhoto: info,
      detailVisible: true,
    });
  };
  handleSearch = (value) => {
    console.log(value);
    this.props.dispatch({
      type: 'photo/search',
      payload: value,
    });
  }
  render() {
    return (
      <Layout>
        <PixelHeader />
        <Content className="main-content">
          <div className="content-wrap">
            <Tabs defaultActiveKey="2">
              <Tabs.TabPane tab="最新作品" key="1">
                <PhotoWall photos={this.state.photos.data} />
              </Tabs.TabPane>
              <Tabs.TabPane tab="搜索" key="2">
                <div>
                  <div className={style['square-search-wrap']}>
                    <div className={style['square-search']}>
                      <Input.Search
                        placeholder="搜索图片关键词"
                        onSearch={this.handleSearch}
                      />
                    </div>
                  </div>
                  <PhotoWall photos={this.state.search.data} />
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
