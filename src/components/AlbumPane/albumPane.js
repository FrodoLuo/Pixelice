import React from 'react';
import { connect } from 'dva';
import { Row, Col, Modal, Input } from 'antd';
import Album from './album';
import PhotoWall from '../PhotoWall/photoWall';
import style from './albumPane.less';

class AlbumPane extends React.Component {
  state = {
    albumList: {
      state: 'ready',
      data: [],
    },
    editVisible: false,
    editingAlbum: {
      albumId: '',
      albumName: '',
      private: '',
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
  setEditVisible = (sw) => {
    this.setState({
      editVisible: sw,
    });
  }
  setEditingAlbum = (vo) => {
    this.setState({
      editingAlbum: vo,
    });
  }
  render() {
    const albums = [];
    for (const item of this.state.albumList.data) {
      albums.push(
        <Album
          key={albums.length}
          album={item}
          setEditVisible={this.setEditVisible}
          setEditingAlbum={this.setEditingAlbum}
        />,
      );
    }
    return (
      <div>
        <Modal
          visible={this.state.editVisible}
          onCancel={() => { this.setEditVisible(false); }}
          title={this.state.editingAlbum.albumName}
        >
          <Input label="相册名称" />
        </Modal>
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
