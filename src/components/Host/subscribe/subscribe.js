import React from 'react';
import { connect } from 'dva';
import { Button, Icon } from 'antd';
import style from './subscribe.less';

function Subscribe(props) {
  return (
    <div className={style['subscribe-wrap']}>
      <Button type={props.subscribed ? 'primary' : 'normal'} onClick={props.handleFollow}>
        <Icon type="eye" />{props.subscribed ? '已关注' : '关注'}
      </Button>
      &nbsp;
      <Button onClick={() => { props.showMessage(true); }}>
        <Icon type="message" />发送私信
      </Button>
    </div>
  );
}
export default connect()(Subscribe);
