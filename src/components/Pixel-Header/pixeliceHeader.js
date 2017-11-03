import React from 'react';
import { Input, Row, Col, Menu, Dropdown, Icon } from 'antd';
import MediaQuery from 'react-responsive';
import style from './pixeliceHeader.less';
import Logo from './logo/logo';
import Nav from './nav/nav';
import Sign from './sign/sign';

function PixeliceHeader(props) {
  console.log(props);
  const menu = (
    <div
      style={{
        backgroundColor: 'white',
        margin: '5px',
        boxShadow: '0 0 10px rgba(0,0,0,0.5)',
        display: 'inline-block',
      }}
    >
      <Nav />
      <Sign />
    </div>
  );
  const c = props.home ? 'header-wrap-home' : 'header-wrap';
  return (
    <div className={style[c]} id="header">
      <MediaQuery minWidth={768}>
        <Row type="flex" justify="space-between" style={{ width: '100%' }}>
          <Col xs={24} sm={12}>
            <div className={style['left-wrap']}>
              <Logo />
              <Nav />
              <div>
                {
                  props.home ? '' : (<Input.Search />)
                }
              </div>
            </div>
          </Col>
          <Col xs={24} sm={12}>
            <Sign home />
          </Col>
        </Row>
      </MediaQuery>
      <MediaQuery maxWidth={768}>
        <div className={style['header-wrap-mobile']}>
          <Logo />
          <div>
            <Input.Search />
          </div>
          <Dropdown overlay={menu} style={{ backgroundColor: 'white' }}>
            <Icon type="bars" style={{ fontSize: '24px', margin: '0 10px 0 0' }} />
          </Dropdown>
        </div>
      </MediaQuery>
    </div>
  );
}
export default PixeliceHeader;
