import React from 'react';
import { connect } from 'dva';
import {
  Row,
  Col,
  Modal,
  Input,
  Switch,
  Select,
  message,
  Button
} from 'antd';
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
      description: '',
      private: '',
    },
    createVisible: false,

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
    if (nextProps.modifyAlbum.state === 'success') {
      message.success('相册信息修改成功');
      this.refreshList();
    } else if (nextProps.modifyAlbum.state === 'error') {
      message.error('相册信息修改失败, 请稍后重试');
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
    window.document.getElementById('albumName').value = vo.albumName;
    window.document.getElementById('description').value = vo.description;
    window.document.getElementById('private').checked = vo.private === 'f';
  }
  refreshList = () => {
    const albumId = this.state.editingAlbum.albumId;
    const album = this.state.editingAlbum;
    const list = this.state.albumList.data;
    for (const item of list) {
      if (item.albumId === albumId) {
        Object.assign(item, album);
        break;
      }
      this.setState({
        albumList: {
          state: this.state.albumList.state,
          data: list,
        },
      });
    }
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
          onOk={
            () => {
              const edited = {
                albumId: this.state.editingAlbum.albumId,
                albumName: window.document.getElementById('albumName').value,
                description: window.document.getElementById('description').value,
                private: window.document.getElementById('private').checked ? 'f' : 't',
              };
              this.setState({
                editingAlbum: edited,
              });
              this.props.dispatch({
                type: 'album/modifyAlbum',
                payload: edited,
              });
              this.setEditVisible(false);
            }
          }
          onCancel={() => { this.setEditVisible(false); }}
          title={this.state.editingAlbum.albumName}
          style={{ top: '-100px' }}
        >
          <div style={{ flexDirection: 'column' }}>
            <h4>相册名称</h4>
            <Input
              id="albumName"
              defaultValue={this.state.editingAlbum.albumName}
            />
            <h4>相册描述</h4>
            <Input.TextArea
              id="description"
              autosize={{ minRows: 6 }}
              defaultValue={this.state.editingAlbum.description}
              style={{ resize: 'none' }}
            />
            {/* <Select>
            todo
          </Select> */}
            <h4>公开可见</h4>
            <Switch
              id="private"
              defaultChecked={this.state.editingAlbum.private === 'f'}
            />
          </div>
        </Modal>
        <div>
          <div>
            <Button>创建相册</Button>
          </div>
          <div className={style['album-pane-wrap']}>
            {albums}
          </div>
        </div>
      </div>
    );
  }
}
export default connect((models) => {
  console.log(models);
  return models.album;
})(AlbumPane);
