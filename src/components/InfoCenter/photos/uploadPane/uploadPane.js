import React from 'react';
import { Upload, Icon, Modal } from 'antd';
import { connect } from 'dva';

class UploadPane extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [],
  };
  handleUpload = () => {
    console.log(this.state.fileList);
    this.props.dispatch({
      type: 'photo/upload',
      payload: this.state.fileList,
    });
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
          beforeUpload={this.beforeUpload}
          action="/api/photo/upload"
          listType="picture-card"
          fileList={this.state.fileList}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
        >
          {this.state.fileList.length >= 3 ? null : uploadButton}
        </Upload>
        <Modal visible={this.state.previewVisible} footer={null} onCancel={this.handleCancel}>
          <img alt="example" style={{ width: '100%' }} src={this.state.previewImage} />
        </Modal>
      </div>
    );
  }
}
export default connect()(UploadPane);
