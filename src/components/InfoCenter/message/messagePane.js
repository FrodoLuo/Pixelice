import React from 'react';
import { Collapse, Tabs } from 'antd';
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
  };
  componentWillMount() {
    this.props.dispatch({
      type: 'social/fetchMessages',
    });
    this.props.dispatch({
      type: 'social/fetchSentMessages',
    });
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
    }
  }
  handleRead = (messageId) => {
    this.props.dispatch({
      type: 'social/readMessage',
      payload: messageId,
    });
  }
  render() {
    const messages = [];
    for (const item of this.state.messages.data) {
      messages.push(
        <Panel
          style={{ borderRadius: 5 }}
          key={item.messageId}
          header={<div>{item.read === 'f' ? (<span className={style['new-dot']}>新</span>) : ''}来自{item.nickName}的私信</div>}
        >
          <p>{item.content}</p>
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

    return (
      <Tabs defaultActiveKey="received" tabPosition="left">
        <Tabs.TabPane
          tab="收到的私信"
          key="received"
        >
          <div>
            <Collapse
              bordered={false}
              onChange={
                (messageId) => {
                  this.handleRead(messageId);
                }
              }
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
