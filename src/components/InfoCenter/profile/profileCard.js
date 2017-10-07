import React from 'react';
import { Input, Form, Upload, Button } from 'antd';
import { connect } from 'dva';
import style from './profileCard.less';

class ProfileCard extends React.Component {
  state = {
    editMode: false,
  }
  render() {
    return (
      <div>
        <div className={style['profile-form-wrap']}>
          <Form layout={'inline'}>
            <Form.Item label="昵称">
              <Input defaultValue={this.props.userInfo.nickName} disabled={!this.state.editMode} />
            </Form.Item>
          </Form>
        </div>
      </div>
    );
  }
}

export default connect()(ProfileCard);
