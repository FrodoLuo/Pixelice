import React from 'react';
import { Collapse } from 'antd';
import { connect } from 'dva';

import style from './messagePane.less';

const Panel = Collapse.Panel;

class MessagePane extends React.Component {
  state = {
    messages: {
      state: 'ready',
      data: [],
    },
  };
  componentWillMount() {
    this.props.dispatch({
      type: 'social/fetchMessages',
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
          header={`來自${item.nickName}的私信`}
        >
          <p>{item.content}</p>
        </Panel>,
      );
    }
    return (
      <div>
        <Collapse
          onChange={
            (messageId) => {
              this.handleRead(messageId);
            }
          }
        >
          {messages}
        </Collapse>
      </div>
    );
  }
}
export default connect((models) => {
  return models.social;
})(MessagePane);
