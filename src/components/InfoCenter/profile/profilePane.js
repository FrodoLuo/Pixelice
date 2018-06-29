import React from 'react';
import { Input, Form, Upload, Button, Select, Tabs } from 'antd';
import { connect } from 'dva';
import style from './profilePane.less';
import Info from './info/info';
import Account from './account/account';

const Option = Select.Option;

class ProfileCard extends React.Component {
  state = {};
  render() {
    console.log(this.props.userInfo);
    return (
      <div>
        <Info userInfo={this.props.userInfo} />
        <Account userInfo={this.props.userInfo} />
      </div>
    );
  }
}

export default connect()(ProfileCard);
