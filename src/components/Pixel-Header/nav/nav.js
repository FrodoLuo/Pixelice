import React from 'react';
import style from './nav.less';

function Nav() {
  return (
    <div className={style['nav-wrap']}>
      <a href="">首页</a>
      <a href="#square">广场</a>
    </div>
  );
}
export default Nav;
