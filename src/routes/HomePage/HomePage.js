import React from 'react';
import { connect } from 'dva';
import { Layout, Card, Avatar } from 'antd';
import PixeliceHeader from '../../components/Pixel-Header/pixeliceHeader';
import PixeliceFooter from '../../components/Pixel-Footer/pixelFooter';
import Cover from '../../components/Cover/cover';
import PhotoWall from '../../components/PhotoWall/photoWall';
import style from './HomePage.less';
import defaultAvatar from '../../assets/images/defaultAvatar.jpeg';

const { Content, Footer } = Layout;

class IndexPage extends React.Component {
  state = {
    hotPhotos: {
      state: 'ready',
      data: [],
    },
    hotUsers: {
      state: 'ready',
      data: [],
    },
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'photo/hotPhoto',
    });
    this.props.dispatch({
      type: 'social/getHotUsers',
    });
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    switch (nextProps.photo.processing) {
      case 'hotPhotos':
        this.setState({
          hotPhotos: nextProps.photo.photos,
        });
        break;
    }
    switch (nextProps.social.runningOp) {
      case 'hotUsers':
        this.setState({
          hotUsers: nextProps.social.hotUsers,
        });
    }
  }

  render() {
    console.log(this.state);
    const users = [];
    for (const item of this.state.hotUsers.data) {
      const src = item.avatarUrl === '' ? defaultAvatar : item.avatarUrl;
      users.push(
        <div
          key={item.userId}
          style={{
            maxWidth: 1420,
          }}
        >
          <Card
            style={{
              width: 240,
              height: 280,
              justifyContent: 'center',
            }}
          >
            <a href={`/user/${item.userId}`} className={style['recommond-avatar-wrapper']}>
              <Avatar style={{ height: 100, width: 100 }} src={src} />
            </a>
            <div className={style['recommond-info-wrapper']}>
              <h2>
                {item.nickName}
              </h2>
            </div>
            <div>
              {(item.intro === ' ' || item.intro === '' || item.intro === null) ? '这个人并没有留下自我介绍' : item.intro}
            </div>
          </Card>
        </div>,
      );
    }
    return (
      <Layout>
        <PixeliceHeader home />
        <Content className="main-content" style={{ padding: 0 }}>
          <Cover home author="No one" />
          <div className="content-wrap" >
            <div className={style['hot-photo-pane']}>
              <h2 className={style['part-title']}>最热照片</h2>
              <PhotoWall photos={this.state.hotPhotos} home />
            </div>
            <br />
            <div>
              <h2 className={style['part-title']}>推荐摄影人</h2>
              <div className={style['users-pane']}>
                {users}
              </div>
            </div>
          </div>
        </Content>
        <PixeliceFooter />
      </Layout>
    );
  }
}

IndexPage.propTypes = {
};

export default connect((models) => {
  console.log(models);
  return models;
})(IndexPage);
