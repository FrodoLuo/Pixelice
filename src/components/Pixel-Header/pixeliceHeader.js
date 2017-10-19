import React from 'react';
import style from './pixeliceHeader.less';
import Logo from './logo/logo';
import Nav from './nav/nav';
import Sign from './sign/sign';

function PixeliceHeader(props) {
  const c = props.home ? 'header-wrap-home' : 'header-wrap';
  return (
    <div className={style[c]} id="header">
      <div className={style['left-wrap']}>
        <Logo />
        <Nav home />
      </div>
      <Sign home />
    </div>
  );
}
export default PixeliceHeader;
