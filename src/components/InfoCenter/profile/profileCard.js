import React from 'react';
import { Input, Form, Upload, Button, Select, Tabs } from 'antd';
import { connect } from 'dva';
import style from './profileCard.less';
import Info from './info/info';
import Account from './account/account';

const Option = Select.Option;

class ProfileCard extends React.Component {
  state = {};
  render() {
    console.log(this.props.userInfo);
    return (
      <div>
        <Tabs size="small" tabPosition="left" defaultActiveKey="1">
          <Tabs.TabPane tab="个人信息" key="1">
            <Info userInfo={this.props.userInfo} />
          </Tabs.TabPane>
          <Tabs.TabPane tab="账户" key="2">
            <Account userInfo={this.props.userInfo} />
          </Tabs.TabPane>
        </Tabs>
      </div>
    );
  }
}

export default connect()(ProfileCard);
