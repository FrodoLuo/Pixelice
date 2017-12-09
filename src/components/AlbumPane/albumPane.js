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
  Button,
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
      coverId: 0,
      private: '',
    },
    afterInfo: {
      albumId: '',
      albumName: '',
      description: '',
      coverId: 0,
      private: '',
    },
    createVisible: false,
    photosForCover: [],
  }
  componentWillMount() {
    this.setState({
      runningOp: 'getAlbum',
    });
    if (this.props.host) {
      this.props.dispatch({
        type: 'album/getAlbumsByUserId',
        payload: this.props.hostId,
      });
    } else {
      this.props.dispatch({
        type: 'album/getAlbumsByToken',
      });
    }
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    switch (nextProps.runningOp) {
      case 'getAlbum':
        switch (nextProps.albumsList.state) {
          case 'success':
            this.setState({
              albumList: nextProps.albumsList,
            });
            break;
        }
        break;
      case 'modify':
        if (nextProps.modifyAlbum.state === 'success') {
          message.success('相册信息修改成功');
          // this.refreshList();
          this.props.dispatch({
            type: 'album/getAlbumsByToken',
          });
        } else if (nextProps.modifyAlbum.state === 'error') {
          message.error('相册信息修改失败, 请稍后重试');
        }
        break;
      case 'create':
        if (nextProps.createAlbum.state === 'success') {
          message.success('相册创建成功');
          // this.refreshList();
          this.props.dispatch({
            type: 'album/getAlbumsByToken',
          });
        } else if (nextProps.createAlbum.state === 'error') {
          message.error('相册创建失败, 请稍后重试');
        }
        break;
      case 'remove':
        if (nextProps.removeAlbum.state === 'success') {
          message.success('相册删除成功');
          // this.refreshList();
          this.props.dispatch({
            type: 'album/getAlbumsByToken',
          });
        } else if (nextProps.createAlbum.state === 'error') {
          message.error('相册删除失败, 请稍后重试');
        }
        break;
      case 'quickFetch':
        if (nextProps.photosForCover.state === 'success') {
          this.setState({
            photosForCover: nextProps.photosForCover.data,
          });
        }
        break;
    }
  }
  setEditVisible = (sw) => {
    this.setState({
      editVisible: sw,
    });
  }
  setCreateVisible = (sw) => {
    this.setState({
      createVisible: sw,
    });
  }
  setEditingAlbum = (vo) => {
    this.setState({
      editingAlbum: vo,
      afterInfo: {
        albumId: vo.albumId,
        albumName: vo.albumName,
        description: vo.description,
        coverId: vo.coverPhotoId,
        private: vo.private,
      },
    });
    this.props.dispatch({
      type: 'album/quickFetch',
      payload: vo.albumId,
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
  changeName = (e) => {
    this.setState({
      afterInfo: {
        ...this.state.afterInfo,
        albumName: e.target.value,
      },
    });
  }
  changeDescription = (e) => {
    this.setState({
      afterInfo: {
        ...this.state.afterInfo,
        description: e.target.value,
      },
    });
  }
  changePrivate = (checked) => {
    this.setState({
      afterInfo: {
        ...this.state.afterInfo,
        private: checked ? 'f' : 't',
      },
    });
  }
  changeCover = (value) => {
    this.setState({
      afterInfo: {
        ...this.state.afterInfo,
        coverId: value,
      },
    });
  }
  render() {
    const albums = [];
    for (const item of this.state.albumList.data) {
      albums.push(
        <Album
          key={albums.length}
          album={item}
          author={this.props.author}
          setEditVisible={this.setEditVisible}
          setEditingAlbum={this.setEditingAlbum}
          delete={
            (albumId) => {
              this.props.dispatch({
                type: 'album/removeAlbum',
                payload: albumId,
              });
            }
          }
        />,
      );
    }
    const photosForCover = [];
    for (const item of this.state.photosForCover) {
      photosForCover.push(
        <Select.Option value={item.photoId} key={item.photoId} label="133">
          <img src={item.zipUrl} role="presentation" />
          {item.title}
        </Select.Option>,
      );
    }
    return (
      <div>
        <Modal
          visible={this.state.editVisible}
          onOk={
            () => {
              this.props.dispatch({
                type: 'album/modifyAlbum',
                payload: this.state.afterInfo,
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
              value={this.state.afterInfo.albumName}
              onChange={this.changeName}
              defaultValue={this.state.editingAlbum.albumName}
              required
            />
            <h4>相册描述</h4>
            <Input.TextArea
              id="description"
              value={this.state.afterInfo.description}
              autosize={{ minRows: 6 }}
              onChange={this.changeDescription}
              defaultValue={this.state.editingAlbum.description}
              style={{ resize: 'none' }}
            />
            <h4>封面照片</h4>
            <Select
              className={style['select-wrap']}
              id="coverSelect"
              value={this.state.afterInfo.coverId}
              onChange={this.changeCover}
            >
              {photosForCover}
            </Select>
            <h4>公开可见</h4>
            <Switch
              id="private"
              onChange={this.changePrivate}
              checked={this.state.afterInfo.private === 'f'}
            />
          </div>
        </Modal>
        <Modal
          visible={this.state.createVisible}
          onOk={
            () => {
              this.props.dispatch({
                type: 'album/createAlbum',
                payload: this.state.afterInfo,
              });
              // console.log(this.state.afterInfo);
              this.setCreateVisible(false);
            }
          }
          onCancel={() => { this.setCreateVisible(false); }}
          title="创建相册"
          style={{ top: '-100px' }}
        >
          <div style={{ flexDirection: 'column' }}>
            <h4>相册名称</h4>
            <Input
              id="albumName"
              value={this.state.afterInfo.albumName}
              onChange={this.changeName}
              required
            />
            <h4>相册描述</h4>
            <Input.TextArea
              id="description"
              value={this.state.afterInfo.description}
              autosize={{ minRows: 6 }}
              onChange={this.changeDescription}
              style={{ resize: 'none' }}
            />
            {/* <Select>
            todo
          </Select> */}
            <h4>公开可见</h4>
            <Switch
              id="private"
              checked={this.state.afterInfo.private === 'f'}
              onChange={this.changePrivate}
            />
          </div>
        </Modal>
        <div>
          <div>
            {this.props.author ? (
              <Button
                onClick={
                  () => {
                    this.setCreateVisible(true);
                    this.setState({
                      afterInfo: {
                        albumId: '',
                        albumName: '',
                        description: '',
                        private: '',
                      },
                    });
                  }
                }
              >
                创建相册
            </Button>
            ) : ''}
          </div>
          <div className={style['album-pane-wrap']}>
            {albums}
            {albums.length === 0 ? (
              <p className="nothing-found">
                ╮(⊙︿⊙)╭
                <br />
                这个up主没有相册
              </p>
            ) : ''}
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
