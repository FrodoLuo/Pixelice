import React from 'react';
import { Card, Icon, Col, Modal, Dropdown, Menu, Popconfirm } from 'antd';
import { connect } from 'dva';
import defaultPhoto from '../../../../assets/images/default_photo_cover.jpeg';
import style from './photoCard.less';


class PhotoCard extends React.Component {
  state = {
    detailVisible: false,
    albumList: [],
    inList: [],
  };
  componentWillReceiveProps(nextProps) {
    this.setState({
      albumList: nextProps.albumsList.data,
      inList: nextProps.inAlbumList.data,
    });
  }
  handlePick = (albumId) => {
    this.props.dispatch({
      type: 'album/addToAlbum',
      payload: {
        photoId: this.props.info.photoId,
        albumId,
      },
    });
  }
  handleRemove = () => {
    this.props.dispatch({
      type: 'album/removeFromAlbum',
      payload: {
        photoId: this.props.info.photoId,
      },
    });
  }
  inAlbum = (num) => {
    for (const i of this.state.inList) {
      if (i.albumId === num) return true;
    }
    return false;
  }
  render() {
    const albumListDrop = [];
    for (const item of this.state.albumList) {
      albumListDrop.push(
        <Menu.Item key={albumListDrop.length}>
          <a onClick={() => { this.handlePick(item.albumId); }}>
            {this.inAlbum(item.albumId) ? (<Icon type="pushpin" />) : (<Icon type="pushpin-o" />)}
            {item.albumName}
            {item.private === 'f' ? '' : (
              <Icon type="lock-o" />
            )}
          </a>
        </Menu.Item>,
      );
    }
    const albumSelect = (
      <Menu selectable>
        <Menu.Item>
          <a>
            无
          </a>
        </Menu.Item>
        <Menu.Divider />
        {albumListDrop}
      </Menu>
    );
    const menu = (
      <Menu>
        <Menu.Item>
          <a>
            <Icon type="delete" />
            删除
          </a>
        </Menu.Item>
        <Menu.Item>
          <Dropdown overlay={albumSelect} trigger={['hover']}>
            <a
              onMouseEnter={() => {
                this.props.dispatch({
                  type: 'album/getAlbumsByToken',
                });
              }}
            >
              <Icon type="appstore-o" />
              相册
            </a>
          </Dropdown>
        </Menu.Item>
      </Menu>
    );
    return (
      <div>
        <Card
          bodyStyle={{ padding: 0 }}
          style={{ margin: '12px 2px', border: '#eee 1px solid' }}
        >
          <a onClick={this.props.onClick}>
            <div className={style['photo-card-wrap']}>
              <img src={this.props.info.zipUrl} role="presentation" />
            </div>
            <div className={style['photo-simple-info-wrap']}>
              <div className={style['photo-title']}>
                {this.props.info.title}
              </div>
              <div className={style['photo-simple-info']}>
                <div>
                  <Icon type="heart" />
                  <span>{this.props.info.liked}</span>
                </div>
                <div
                  onClick={
                    (e) => {
                      e.stopPropagation();
                      this.props.dispatch({
                        type: 'album/findInAlbum',
                        payload: this.props.info.photoId,
                      });
                    }
                  }
                >
                  <Dropdown overlay={menu} trigger={['click']}>
                    <Icon className={style['more-button']} type="ellipsis" />
                  </Dropdown>
                </div>
              </div>
            </div>
          </a>
        </Card>
      </div>
    );
  }
}
export default connect((models) => {
  return models.album;
})(PhotoCard);
