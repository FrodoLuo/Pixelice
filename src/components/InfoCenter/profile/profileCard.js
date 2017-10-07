import React from 'react';
import { Input, Form, Upload, Button, Select } from 'antd';
import { connect } from 'dva';
import style from './profileCard.less';

const Option = Select.Option;

class ProfileCard extends React.Component {
  state = {
    editMode: false,
  };
  render() {
    return (
      <div>
        <div className={style['profile-form-wrap']}>
          <Form layout={'vertical'}>
            <Form.Item label="个人介绍">
              <Input.TextArea
                defaultValue={this.props.userInfo.intro}
                disabled={!this.state.editMode}
              />
            </Form.Item>
            <Form.Item label="昵称">
              <Input defaultValue={this.props.userInfo.nickName} disabled={!this.state.editMode} />
            </Form.Item>
            <Form.Item label="ID">
              <Input defaultValue={this.props.userInfo.userId} disabled={!this.state.editMode} />
            </Form.Item>
            <Form.Item label="电子邮箱">
              <Input defaultValue={this.props.userInfo.email} disabled={!this.state.editMode} />
            </Form.Item>
            <Form.Item label="电话号码">
              <Input defaultValue={this.props.userInfo.phone} disabled={!this.state.editMode} />
            </Form.Item>
            <Form.Item label="性别">
              <Select defaultValue={this.props.userInfo.gender} disabled={!this.state.editMode}>
                <Option value="m">男</Option>
                <Option value="f">女</Option>
                <Option value="s">保密</Option>
              </Select>
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default connect()(ProfileCard);
