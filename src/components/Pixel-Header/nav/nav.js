import React from 'react';
import { Button, Icon, Dropdown, Menu } from 'antd';
import MediaQuery from 'react-responsive';
import style from './nav.less';

const menu = (
  <Menu className={style['drop-menu']}>
    <Menu.Item>
      <a href="">首页</a>
    </Menu.Item>
    <Menu.Item>
      <a href="#square">广场</a>
    </Menu.Item>
  </Menu>
);

function Nav() {
  return (
    <div>
      <MediaQuery minWidth={768}>
        <div className={style['nav-wrap']}>
          <a href="">首页</a>
          <a href="#square">广场</a>
        </div>
      </MediaQuery>
      <MediaQuery maxWidth={768}>
        <Dropdown overlay={menu} trigger={['click']}>
          <Icon style={{ fontSize: '20px' }} type="menu-fold" />
        </Dropdown>
      </MediaQuery>
    </div>
  );
}
export default Nav;
