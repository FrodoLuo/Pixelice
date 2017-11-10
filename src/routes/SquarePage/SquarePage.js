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
      state: 'ready',
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
  cpmponentDidMount() {
    console.log('mounted');
    this.setState({
      photos: this.proprs.photos,
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
    console.log(this.state);
    return (
      <Layout>
        <PixelHeader />
        <Content className="main-content">
          <Cover />
          <div className="content-wrap">
            <Tabs defaultActiveKey={this.props.match.params.target}>
              <Tabs.TabPane tab="最新作品" key="news">
                <PhotoWall photos={this.state.photos} />
              </Tabs.TabPane>
              <Tabs.TabPane tab="搜索" key="search">
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
