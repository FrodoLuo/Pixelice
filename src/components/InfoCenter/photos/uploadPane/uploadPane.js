import React from 'react';
import { Upload, Icon, Modal } from 'antd';
import { connect } from 'dva';

class UploadPane extends React.Component {
  state = {
    previewVisible: false,
    previewImage: '',
    fileList: [{
      uid: -1,
      name: 'xxx.png',
      status: 'done',
      url: 'https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png',
    }],
  };
  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = (file) => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true,
    });
  };

  handleChange = ({ fileList }) => this.setState({ fileList });

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
          action="//jsonplaceholder.typicode.com/posts/"
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
