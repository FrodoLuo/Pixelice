import React from 'react';
import { Form, Button, Select, Row, Col, Input, Icon } from 'antd';
import { connect } from 'dva';
import style from './info.less';

const Option = Select.Option;

class Info extends React.Component {
  state = {
    editMode: false,
    profileForm: {
      userId: '',
      nickName: '',
      email: '',
      avatarUrl: '',
      phone: '',
      gender: '',
      verified: '',
      followers: 0,
    },
  };
  render() {
    const wrap = this.state.editMode ?
      (
        <div>
          <Button type="primary">
            <Icon type="check" />
            确定
          </Button>
          &nbsp;
          <Button
            onClick={() => {
              this.setState({
                editMode: false,
              });
            }}
          >
            <Icon type="close" />
            取消
          </Button>
        </div>
      )
      :
      (
        <div>
          <Button
            type="primary"
            onClick={() => {
              this.setState({
                editMode: true,
              });
            }}
          >
            <Icon type="edit" />
            编辑
          </Button>
        </div>
      );
    console.log(this.props.userInfo);
    return (
      <Row type="flex" align="top">
        <Col xs={24} sm={16}>
          <div>
            <Form layout={'vertical'}>
              <Form.Item label="个人介绍">
                <Input.TextArea
                  defaultValue={this.props.userInfo.intro}
                  disabled={!this.state.editMode}
                />
              </Form.Item>
              <Form.Item label="昵称">
                <Input
                  defaultValue={this.props.userInfo.nickName}
                  disabled={!this.state.editMode}
                />
              </Form.Item>
              <Form.Item label="ID">
                <Input
                  defaultValue={this.props.userInfo.userId}
                  disabled={!this.state.editMode}
                />
              </Form.Item>
              <Form.Item label="电子邮箱">
                <Input
                  defaultValue={this.props.userInfo.email}
                  disabled={!this.state.editMode}
                />
              </Form.Item>
              <Form.Item label="电话号码">
                <Input
                  defaultValue={this.props.userInfo.phone}
                  disabled={!this.state.editMode}
                />
              </Form.Item>
              <Form.Item label="性别">
                <Select
                  defaultValue={this.props.userInfo.gender}
                  disabled={!this.state.editMode}
                >
                  <Option value="m">男</Option>
                  <Option value="f">女</Option>
                  <Option value="s">保密</Option>
                </Select>
              </Form.Item>
            </Form>
          </div>
        </Col>
        <Col xs={24} sm={{ span: 6, offset: 1 }}>
          {wrap}
        </Col>
      </Row>
    );
  }
}
export default connect()(Info);
