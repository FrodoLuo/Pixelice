import React from 'react';
import { Button, Form, Input } from 'antd';
import { connect } from 'dva';
import style from './signUpForm.less';

const FormItem = Form.Item;

class SignUpForm extends React.Component {
  state = {
    confirmDirty: false,
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
        this.props.dispatch({
          type: 'auth/signUp',
          payload: values,
        });
      }
    });
  };
  checkUserName = (rule, value, callback) => {
    const form = this.props.form;
    const exp = new RegExp('^([A-Za-z0-9]){3,12}$');
    if (!exp.test(form.getFieldValue('username'))) {
      callback('用户名允许输入3-12个字母或数字');
    } else {
      callback();
    }
  };
  checkPassword = (rule, value, callback) => {
    const exp = new RegExp('^([A-Za-z0-9!@#$%^&*()+-=]){6,16}$');
    const form = this.props.form;
    const spell = '!@#$%^&*()-=+等符号';
    if (value && this.state.confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    if (!exp.test(value)) {
      callback('密码允许输入6-16个字母或数字或'.concat(spell));
    } else {
      callback();
    }
  };
  handleConfirmBlur = (e) => {
    const value = e.target.value;
    this.setState({ confirmDirty: this.state.confirmDirty || !!value });
  };
  checkConfirm = (rule, value, callback) => {
    const form = this.props.form;
    if (value && value !== form.getFieldValue('password')) {
      callback('两次输入密码不一致');
    } else {
      callback();
    }
  };
  render() {
    const { getFieldDecorator } = this.props.form;
    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 6 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 14 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 14,
          offset: 6,
        },
      },
    };
    return (
      <Form className={style['form-wrap']} onSubmit={this.handleSubmit}>
        <FormItem
          {...formItemLayout}
          label="用户名"
          hasFeedback
        >
          {getFieldDecorator('username', {
            rules: [{
              required: true, message: '请输入用户名',
            }, {
              validator: this.checkUserName,
            }],
          })(
            <Input />,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="密码"
          hasFeedback
        >
          {getFieldDecorator('password', {
            rules: [{
              required: true, message: '请输入密码.',
            }, {
              validator: this.checkPassword,
            }],
          })(
            <Input type={'password'} onBlur={this.handleConfirmBlur} />,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="密码确认"
          hasFeedback
        >
          {getFieldDecorator('confirm', {
            rules: [{
              required: true, message: '请确认输入的密码',
            }, {
              validator: this.checkConfirm, trigger: 'always',
            }],
          })(
            <Input type={'password'} />,
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="E-mail"
          hasFeedback
        >
          {getFieldDecorator('email', {
            rules: [{
              type: 'email', message: '请输入有效的E-mail地址',
            }, {
              required: true, message: '请输入E-mail地址',
            }],
          })(
            <Input />,
          )}
        </FormItem>
        <FormItem {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">注册</Button>
        </FormItem>
      </Form>
    );
  }
}
const signUpForm = Form.create()(SignUpForm);
export default connect()(signUpForm);
