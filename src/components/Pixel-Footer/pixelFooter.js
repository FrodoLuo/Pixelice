import React from 'react';
import { BackTop, Icon } from 'antd';
import style from './pixelFooter.less';

function PixelFooter() {
  setTimeout(() => {
    const i = window.document.getElementById('loading-mask');
    i.style.visibility = 'hidden';
    i.style.opacity = 0;
  }, 1500);
  return (
    <div className={style['footer-wrap']}>
      <BackTop
        style={{
          right: '12px',
          bottom: '6px',
          position: 'fixed',
        }}
      >
        <div
          style={{
            fontSize: '32px',
            backgroundColor: 'rgb(101,117,138)',
            borderRadius: '2px',
            height: '45px',
            width: '45px',
            lineHeight: '45px',
            textAlign: 'center',
          }}
        >
          <Icon type="up" />
        </div>
      </BackTop>
      <p>
        版权所有：罗宇舟。人机交互使我快乐！
      </p>
    </div>
  );
}
export default PixelFooter;
