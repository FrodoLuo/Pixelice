import React from 'react';
import { Upload, Icon, Modal, Button } from 'antd';
import { connect } from 'dva';

class UploadPane extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
  }
  handleUpload = () => {
    console.log(this.state.fileList);
    this.props.dispatch({
      type: 'photo/upload',
      payload: this.state.fileList,
    });
    return true;
  };
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = (file) => {
    this.setState({
      previewImage: file.thumbUrl,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => {
    this.setState({ fileList });
  };
  beforeUpload = () => false;
  render() {
    const uploadButton = (
      <div>
        <Icon type="plus" />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return (
      <div>
        <Upload
          action="api/photo/preUpload"
          listType="picture-card"
          fileList={this.state.fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {uploadButton}
        </Upload>
        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
        </Modal>
      </div>
    );
  }
}
export default connect((models) => {
  console.log(models);
  return models.photo.upload;
})(UploadPane);
