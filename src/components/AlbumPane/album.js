import React from 'react';
import { Icon, Dropdown, Menu, Popconfirm } from 'antd';
import style from './album.less';

const MenuItem = Menu.Item;

export default function Album(props) {
  console.log(props);
  const menu = (
    <Menu>
      <MenuItem>
        <a onClick={() => { props.setEditVisible(true); props.setEditingAlbum(props.album); }}>
          <Icon type="edit" />&nbsp;编辑
        </a>
      </MenuItem>
      <MenuItem>
        <Popconfirm title="确认删除该相册?" okText="确认" cancelText="取消">
          <a>
            <Icon type="delete" />&nbsp;删除
          </a>
        </Popconfirm>
      </MenuItem>
    </Menu>
  );
  return (
    <div className={style['album-wrap']}>
      <a href={`/album/${props.album.albumId}`} >
        <div className={style['fake-border']}>
          <div className={style['fake-border']}>
            <div className={style['fake-border']}>
              <div
                className={style['album-card']}
                style={{ background: `url(${props.album.zipUrl}) no-repeat`, backgroundSize: 'cover' }}
              >
                <div className={style['album-title']}>
                  <div>
                    {props.album.albumName}
                  </div>
                  <Dropdown overlay={menu} trigger={['click']}>
                    <Icon className={style['more-button']} type="ellipsis" />
                  </Dropdown>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
}
