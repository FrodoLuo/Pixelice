import React from 'react';
import { Form, Button, Select, Row, Col, Input, Icon, message } from 'antd';
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
    editForm: {
      intro: '',
      nickName: '',
      phone: '',
      gender: this.props.userInfo.data.gender,
    },
    modify: {
      state: 'ready',
    },
  };
  componentDidMount() {
    this.state.profileForm = { ...this.props.userInfo.data };
    this.state.editForm = { ...this.state.profileForm };
    console.log(this.state);
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    switch (nextProps.modify.state) {
      case 'success':
        message.success('修改成功');
        this.setState({
          editMode: false,
        });
        this.props.dispatch({
          type: 'user/userInfo',
        });
        break;
      case 'occupied':
        message.error('昵称已被占用');
        break;
      case 'error':
        message.error('遇到服务器错误, 修改失败');
    }
    this.setState({
      modify: nextProps.modify,
    });
  }

  changeIntro = (e) => {
    this.setState({
      editForm: {
        ...this.state.editForm,
        intro: e.target.value,
      },
    });
  };
  changePhone = (e) => {
    this.setState({
      editForm: {
        ...this.state.editForm,
        phone: e.target.value,
      },
    });
  };
  changeNickName = (e) => {
    this.setState({
      editForm: {
        ...this.state.editForm,
        nickName: e.target.value,
      },
    });
  };
  changeGender = (value) => {
    this.setState({
      editForm: {
        ...this.state.editForm,
        gender: value,
      },
    });
  };
  handleModify = () => {
    this.props.dispatch({
      type: 'user/modifyUserInfo',
      payload: this.state.editForm,
    });
  }
  render() {
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 12 },
      },
    };
    const wrap = this.state.editMode ?
      (
        <div>
          <Button
            type="primary"
            onClick={this.handleModify}
            loading={this.state.modify.state === 'loading'}
          >
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
    return (
      <Row type="flex" align="top">
        <Col xs={24} sm={16}>
          <div>
            <Form layout={'horizontal'}>
              <Form.Item {...formItemLayout} label="个人介绍">
                <Input.TextArea
                  defaultValue={this.props.userInfo.data.intro}
                  disabled={!this.state.editMode}
                  onChange={this.changeIntro}
                />
              </Form.Item>
              <Form.Item {...formItemLayout} label="昵称">
                <Input
                  defaultValue={this.props.userInfo.data.nickName}
                  disabled={!this.state.editMode}
                  onChange={this.changeNickName}
                />
              </Form.Item>
              <Form.Item {...formItemLayout} label="ID">
                <Input
                  defaultValue={this.props.userInfo.data.userId}
                  disabled
                />
              </Form.Item>
              <Form.Item {...formItemLayout} label="电话号码">
                <Input
                  defaultValue={this.props.userInfo.data.phone}
                  disabled={!this.state.editMode}
                  onChange={this.changePhone}
                />
              </Form.Item>
              <Form.Item {...formItemLayout} label="性别">
                <Select
                  defaultValue={this.props.userInfo.data.gender}
                  disabled={!this.state.editMode}
                  onSelect={this.changeGender}
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
export default connect((models) => {
  console.log(models);
  return models.user;
})(Info);
