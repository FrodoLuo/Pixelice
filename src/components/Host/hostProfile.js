import React from 'react';
import { Input, Form, Select } from 'antd';
import style from './hostProfile.less';


const Option = Select.Option;

function hostProfile(props) {
  return (
    <div className={style['profile-wrap']}>
      <Form layout={'vertical'}>
        <Form.Item label="个人介绍">
          <Input.TextArea
            defaultValue={props.hostInfo.data.intro}
            disabled
          />
        </Form.Item>
        <Form.Item label="昵称">
          <Input
            defaultValue={props.hostInfo.data.nickName}
            disabled
          />
        </Form.Item>
        <Form.Item label="ID">
          <Input
            defaultValue={props.hostInfo.data.userId}
            disabled
          />
        </Form.Item>
        <Form.Item label="性别">
          <Select
            defaultValue={props.hostInfo.data.gender}
            disabled
          >
            <Option value="m">男</Option>
            <Option value="f">女</Option>
            <Option value="s">保密</Option>
          </Select>
        </Form.Item>
      </Form>
    </div>
  );
}
export default hostProfile;
