import React from 'react';
import { BackTop, Icon } from 'antd';
import style from './pixelFooter.less';

function PixelFooter() {
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
            backgroundColor: 'grey',
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
        Copyright Luoyuzhou 2017. Not for profit.
      </p>
    </div>
  );
}
export default PixelFooter;
