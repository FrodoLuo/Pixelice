import React from 'react';
import { Button, Icon, Dropdown, Menu } from 'antd';
import MediaQuery from 'react-responsive';
import style from './nav.less';

function Nav(props) {
  return (
    <div>
      <div className={style['nav-wrap']}>
        <a href="/">首页</a>
        <a href="square">广场</a>
      </div>
    </div>
  );
}
export default Nav;
