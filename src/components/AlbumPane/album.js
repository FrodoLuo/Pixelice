import React from 'react';
import { Icon, Dropdown, Menu } from 'antd';
import style from './album.less';

const MenuItem = Menu.Item;

export default function Album(props) {
  console.log(props);
  const menu = (
    <Menu>
      <MenuItem>
        <a>
          <Icon type="edit" />&nbsp;编辑
        </a>
      </MenuItem>
      <MenuItem>
        <a>
          <Icon type="delete" />&nbsp;删除
        </a>
      </MenuItem>
    </Menu>
  );
  return (
    <div className={style['album-wrap']} onClick={() => { window.location.href = `/album/${props.album.albumId}`; }}>
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
    </div>
  );
}
