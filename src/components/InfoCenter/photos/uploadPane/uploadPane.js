import React from 'react';
import { Upload, Icon, Modal, Button, message, Col, Row, Input, Form, Affix } from 'antd';
import { connect } from 'dva';

class UploadPane extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
    info: {
      title: '',
      intro: '',
    },
  };
  componentWillReceiveProps(nextProps) {
    if (nextProps.photo.upload.message === 20) {
      message.success('保存成功, 即将跳转');
      setTimeout(() => {
        window.location.reload();
      }, 1500);
    } else if (nextProps.photo.upload.message === 21) {
      message.error('登录已失效, 请重新登陆');
      setTimeout(() => {
        window.location.href = '/';
      }, 1500);
    } else if (nextProps.photo.upload.message === 41) {
      message.error('服务器故障, 请稍后重试');
    }
  }
  handleUpload = (e) => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      if (!err) {
        console.log(values);
        this.props.dispatch({
          type: 'photo/upload',
          payload: {
            files: this.state.fileList,
            info: values,
          },
        });
      }
    });
  };
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = (file) => {
    this.setState({
      previewImage: file.thumbUrl,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList, event }) => {
    if (event) {
      if (event.percent === 100) {
        message.success('上传成功');
      }
    }
    this.setState({ fileList });
  };
  titleChange = (e) => {
    this.setState({
      info: {
        title: e.target.value,
        intro: this.state.info.intro,
      },
    });
  };
  introChange = (e) => {
    this.setState({
      info: {
        title: this.state.info.title,
        intro: e.target.value,
      },
    });
  };
  render() {
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    const { getFieldDecorator } = this.props.form;
    return (
      <Row type="flex" justify="space-between" align="top">
        <Col xs={24} sm={20}>
          <div>
            <Upload
              action="api/photo/preUpload"
              listType="picture-card"
              fileList={this.state.fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
              multiple
            >
              {uploadButton}
            </Upload>
            <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
              <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
            </Modal>
          </div>
        </Col>
        <Col xs={24} sm={4}>
          <Affix>
            <div>
              <Form onSubmit={this.handleUpload}>
                <Form.Item label="标题">
                  {getFieldDecorator('title', {
                    rules: [{
                      required: true,
                      message: '请输入标题',
                    }, {
                      max: 32,
                      message: '标题长度限制在16字内',
                    }],
                  })(
                    <Input placeholder="标题限制在16字内" />,
                  )}
                </Form.Item>
                <Form.Item label="描述">
                  {getFieldDecorator('intro', {
                    rules: [{
                      max: 80,
                      message: '描述限制在80字内',
                    }],
                  })(
                    <Input placeholder="标题限制在16字内" />,
                  )}
                </Form.Item>
                <Form.Item label="标签">
                  <Input placeholder="暂未实装" />
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit">
                    保存
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </Affix>
        </Col>
      </Row>
    );
  }
}
const UploadPaneInstance = Form.create()(UploadPane);

export default connect((models) => {
  console.log(models);
  return models;
})(UploadPaneInstance);
