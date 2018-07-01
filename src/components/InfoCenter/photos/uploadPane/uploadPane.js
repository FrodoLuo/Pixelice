import React from 'react';
import { Upload, Icon, Modal, Button, message, Col, Row, Input, Form, Affix } from 'antd';
import { connect } from 'dva';

function hasErrors(fieldsError) {
  return Object.keys(fieldsError).some(field => fieldsError[field]);
}

class UploadPane extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
    info: {
      title: '',
      intro: '',
      tags: '',
    },
  };

  componentDidMount() {
    // To disabled submit button at the beginning.
    this.props.form.validateFields();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.processing === 'upload') {
      if (nextProps.upload.state === 'success') {
        message.success('保存成功, 即将跳转');
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else if (nextProps.upload.state === 'error') {
        message.error('服务器故障, 请稍后重试');
      }
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
  tagChange = (e) => {
    this.setState({
      info: {
        ...this.state.info,
        tags: e.target.value,
      },
    });
  };
  beforeUpload = (file) => {
    const isJPG = file.type === 'image/jpeg';
    if (!isJPG) {
      message.error('You can only upload JPG file!');
    }
    const isLt20M = file.size / 1024 / 1024 < 20;
    if (!isLt20M) {
      message.error('Image must smaller than 20MB!');
    }
    return isJPG && isLt20M;
  };

  render() {
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">上传</div>
      </div>
    );
    const { getFieldDecorator, getFieldsError, getFieldError, isFieldTouched } = this.props.form;
    const titleError = isFieldTouched('title') && getFieldError('title');
    const introError = isFieldTouched('intro') && getFieldError('intro');
    return (
      <Row type="flex" justify="space-between" align="top">
        <Col xs={24} sm={20}>
          <div>
            <Upload
              action="/api/photo/preUpload"
              listType="picture-card"
              fileList={this.state.fileList}
              onPreview={this.handlePreview}
              onChange={this.handleChange}
              beforeUpload={this.beforeUpload}
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
                <Form.Item
                  label="标题"
                  validateStatus={titleError ? 'error' : ''}
                  help={titleError || ''}
                >
                  {getFieldDecorator('title', {
                    rules: [{
                      required: true,
                      message: '请输入标题',
                    }, {
                      max: 16,
                      message: '标题长度限制在16字内',
                    }],
                  })(
                    <Input placeholder="标题限制在16字内" />,
                  )}
                </Form.Item>
                <Form.Item
                  label="描述"
                  validateStatus={introError ? 'error' : ''}
                  help={introError || ''}
                >
                  {getFieldDecorator('intro', {
                    rules: [{
                      max: 80,
                      message: '描述限制在80字内',
                    }],
                  })(
                    <Input placeholder="描述限制在80字内" />,
                  )}
                </Form.Item>
                <Form.Item label="标签">
                  {getFieldDecorator('tags', {
                    rules: [{
                      max: 40,
                      message: '标签总不超过40字',
                    }],
                  })(
                    <Input placeholder="请以空格分开标签" />,
                  )}
                </Form.Item>
                <Form.Item>
                  <Button type="primary" htmlType="submit" disabled={!(!hasErrors(getFieldsError()) && (this.state.fileList.length > 0))}>
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
  return models.photo;
})(UploadPaneInstance);
