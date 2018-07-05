import React from 'react';
import { Collapse, Tabs, Button, Modal, Input, message } from 'antd';
import { connect } from 'dva';

import style from './messagePane.less';

const Panel = Collapse.Panel;

class MessagePane extends React.Component {
  state = {
    messages: {
      state: 'ready',
      data: [],
    },
    sentMessages: {
      state: 'ready',
      data: [],
    },
    nickName: '',
    messageSendVisible: false,
    editingMessage: '',
    messageLength: 0,
  };
  componentDidMount() {
    this.props.dispatch({
      type: 'social/fetchMessages',
    });
    this.props.dispatch({
      type: 'social/fetchSentMessages',
    });
    this.messageInterval = setInterval(() => {
      this.props.dispatch({
        type: 'social/fetchMessages',
      });
      this.props.dispatch({
        type: 'social/fetchSentMessages',
      });
    }, 10000);
  }

  componentWillReceiveProps(nextProps) {
    switch (nextProps.runningOp) {
      case 'fetchMessages': {
        if (nextProps.fetchMessages.state === 'success') {
          this.setState({
            messages: nextProps.fetchMessages,
          });
        }
        break;
      }
      case 'fetchSentMessages': {
        if (nextProps.fetchSentMessages.state === 'success') {
          this.setState({
            sentMessages: nextProps.fetchSentMessages,
          });
        }
        break;
      }
      case 'sendMessage': {
        if (nextProps.sendMessage.state === 'success') {
          message.success('私信已发送');
          this.setState({
            messageSendVisible: false,
            editingMessage: '',
            messageLength: 0,
          });
        }
        break;
      }
    }
  }
  componentDidUnmount() {
    clearInterval(this.messageInterval);
  }
  handleRead = (messageId) => {
    this.props.dispatch({
      type: 'social/readMessage',
      payload: messageId,
    });
    this.props.dispatch({
      type: 'social/fetchMessages',
    });
    this.props.dispatch({
      type: 'social/countUnread',
    });
  }
  handleMessageChange = (e) => {
    this.setState({
      editingMessage: e.target.value,
      messageLength: e.target.value.length,
    });
  }
  sendMessage = () => {
    if (this.state.messageLength === 0) {
      message.error('私信不能为空');
    } else if (this.state.messageLength > 200) {
      message.error('私信内容不能超过200字');
    } else {
      this.props.dispatch({
        type: 'social/sendMessage',
        payload: {
          receiverId: this.state.reply.fromId,
          content: this.state.editingMessage,
        },
      });
    }
  };
  render() {
    const messages = [];
    for (const item of this.state.messages.data) {
      messages.push(
        <Panel
          style={{ borderRadius: 5 }}
          key={item.messageId}
          header={
            <div
              className={style['message-title']}
              onClick={() => {
                this.handleRead(item.messageId);
              }}
            >
              {item.read === 'f' ? (<span className={style['new-dot']}>新</span>) : ''}
              来自{item.nickName}的私信
              <span style={{ float: 'right' }}>{item.createTime}</span>
            </div>
          }
        >
          <p>{item.content}</p>
          {item.fromId > 1 ? (
            <div className={style['message-action-wrapper']}>
              <p>
                <Button
                  onClick={() => {
                    this.setState({
                      reply: item,
                      messageSendVisible: true,
                    });
                  }}
                >回复</Button>
              </p>
            </div>
          ) : null}
        </Panel>,
      );
    }

    const sentMessages = [];
    for (const item of this.state.sentMessages.data) {
      sentMessages.push(
        <Panel
          style={{ borderRadius: 5 }}
          key={item.messageId}
          header={`发送给${item.nickName}的私信`}
        >
          <p>{item.content}</p>
        </Panel>,
      );
    }
    const redFont = this.state.messageLength > 200 ? 'warn-font' : '';
    return (
      <Tabs defaultActiveKey="received" tabPosition="left">
        <Tabs.TabPane
          tab="收到的私信"
          key="received"
        >
          <div>
            <Modal
              visible={this.state.messageSendVisible}
              title={`向${this.state.nickName}发送私信`}
              onCancel={() => { this.setMessageDialogVisible(false); }}
              onOk={this.sendMessage}
              footer={[
                <Button type="primary" onClick={this.sendMessage} disabled={this.state.messageLength > 200}>
                  发送
            </Button>,
              ]}
            >
              <div>
                <span>私信内容</span>
                <Input.TextArea
                  style={{ resize: 'none', height: 300, padding: 15 }}
                  value={this.state.editingMessage}
                  onChange={this.handleMessageChange}
                />
                <span className={style[redFont]}>{this.state.messageLength}/200</span>
              </div>
            </Modal>
            <Collapse
              bordered={false}
            >
              {messages}
            </Collapse>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane
          tab="发送的私信"
          key="sent"
        >
          <div>
            <Collapse
              bordered={false}
            >
              {sentMessages}
            </Collapse>
          </div>
        </Tabs.TabPane>
      </Tabs>
    );
  }
}
export default connect((models) => {
  return models.social;
})(MessagePane);
