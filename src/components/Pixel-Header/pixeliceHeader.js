import React from 'react';
import { Input, Row, Col } from 'antd';
import style from './pixeliceHeader.less';
import Logo from './logo/logo';
import Nav from './nav/nav';
import Sign from './sign/sign';

function PixeliceHeader(props) {
  const c = props.home ? 'header-wrap-home' : 'header-wrap';
  return (
    <div className={style[c]} id="header">
      <Row type="flex" justify="space-between" style={{ width: '100%' }}>
        <Col xs={24} sm={12}>
          <div className={style['left-wrap']}>
            <Logo />
            <Nav home />
            <div>
              <Input.Search />
            </div>
          </div>
        </Col>
        <Col xs={24} sm={12}>
          <Sign home />
        </Col>
      </Row>
    </div>
  );
}
export default PixeliceHeader;
