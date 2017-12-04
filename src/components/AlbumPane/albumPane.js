import React from 'react';
import { connect } from 'dva';
import { Row, Col } from 'antd';
import Album from './album';
import PhotoWall from '../PhotoWall/photoWall';
import style from './albumPane.less';

class AlbumPane extends React.Component {
  state = {
    albumList: {
      state: 'ready',
      data: [],
    },
  }
  componentWillMount() {
    this.props.dispatch({
      type: 'album/getAlbumsByToken',
    });
  }
  componentWillReceiveProps(nextProps) {
    switch (nextProps.albumsList.state) {
      case 'success':
        this.setState({
          albumList: nextProps.albumsList,
        });
        break;
    }
  }
  render() {
    const albums = [];
    for (const item of this.state.albumList.data) {
      albums.push(
        <Album key={albums.length} album={item} />,
      );
    }
    return (
      <div>
        <div className={style['album-pane-wrap']}>
          {albums}
        </div>
      </div>
    );
  }
}
export default connect((models) => {
  return models.album;
})(AlbumPane);
