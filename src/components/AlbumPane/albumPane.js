import React from 'react';
import { connect } from 'dva';
import { Row, Col, Modal, Input, Switch, Select } from 'antd';
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
          style={{ top: '-150px' }}
        >
          <div style={{ flexDirection: 'column' }}>
            <h4>相册名称</h4>
            <Input
              id="albumName"
              defaultValue={this.state.editingAlbum.albumName}
            />
            <h4>相册描述</h4>
            <Input.TextArea
              id="albumName"
              autosize={{ minRows: 6 }}
              defaultValue={this.state.editingAlbum.despription}
              style={{ resize: 'none' }}
            />
            {/* <Select>
            todo
          </Select> */}
            <h4>公开可见</h4>
            <Switch
              id="albumName"
              defaultChecked={this.state.editingAlbum.private === 'f'}
            />
          </div>
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
