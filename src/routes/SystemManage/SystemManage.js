import React from 'react';
import { Layout, Menu, Breadcrumb, Icon, Table, Tabs } from 'antd';
import { connect } from 'dva';


import Logo from '../../components/Pixel-Header/logo/logo';

const { Header, Content, Footer, Sider } = Layout;


class SystemManage extends React.Component {
  state = {
    users: {
      state: 'ready',
      data: [],
    },
    photos: {
      state: 'ready',
      data: [],
    },
    albums: {
      state: 'ready',
      data: [],
    },
    login: {
      state: 'ready',
      data: [],
    },
  };
  componentWillMount() {
    this.props.dispatch({
      type: 'system/users',
    });
    this.props.dispatch({
      type: 'system/photos',
    });
    this.props.dispatch({
      type: 'system/albums',
    });
    this.props.dispatch({
      type: 'system/logins',
    });
  }
  componentWillReceiveProps(nextProps) {
    this.setState({
      ...nextProps,
    });
  }
  onCollapse = (collapsed) => {
    this.setState({ collapsed });
  }
  render() {
    const columns = {
      users: [
        {
          title: '用户ID',
          dataIndex: 'userId',
        },
        {
          title: '用户昵称',
          dataIndex: 'nickName',
        },
        {
          title: '电子邮箱',
          dataIndex: 'email',
        },
        {
          title: '个人简介',
          dataIndex: 'intro',
        },
        {
          title: '电话',
          dataIndex: 'phone',
        },
        {
          title: '性别',
          dataIndex: 'gender',
        },
        {
          title: '粉丝数量',
          dataIndex: 'followers',
        },
        {
          title: '是否通过邮箱验证',
          dataIndex: 'verified',
        },
      ],
      photos: [
        {
          title: '照片ID',
          dataIndex: 'photoId',
        },
        {
          title: '标题',
          dataIndex: 'title',
        },
        {
          title: '照片url',
          dataIndex: 'photoUrl',
        },
        {
          title: '创建者Id',
          dataIndex: 'userId',
        },
        {
          title: '被点赞数量',
          dataIndex: 'liked',
        },
        {
          title: '介绍',
          dataIndex: 'intro',
        },
        {
          title: '创建日期',
          dataIndex: 'date',
        },
        {
          title: '压缩后url',
          dataIndex: 'zipUrl',
        },
        {
          title: '删除',
          dataIndex: 'deleted',
        },
      ],
      album: [
        {
          title: '相册ID',
          dataIndex: 'albumId',
        },
        {
          title: '相册名',
          dataIndex: 'albumName',
        },
        {
          title: '封面Id',
          dataIndex: 'coverPhotoId',
        },
        {
          title: '创建者Id',
          dataIndex: 'userId',
        },
        {
          title: '私有',
          dataIndex: 'private',
        },
        {
          title: '介绍',
          dataIndex: 'description',
        },
        {
          title: '创建日期',
          dataIndex: 'createDate',
        },
        {
          title: '已删除',
          dataIndex: 'deleted',
        },
      ],
      login: [
        {
          title: '登录名',
          dataIndex: 'userName',
        },
        {
          title: '密码',
          dataIndex: 'password',
        },
        {
          title: '用户Id',
          dataIndex: 'userId',
        },
        {
          title: 'token',
          dataIndex: 'token',
        },
      ],
    };
    console.log(this.state);
    return (
      <Layout style={{ minHeight: '100vh' }}>
        <Sider
          collapsible
          collapsed={this.state.collapsed}
          onCollapse={this.onCollapse}
        >
          <div style={{ margin: 15 }}>
            <Logo />
          </div>
          <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
            <Menu.Item key="1">
              <Icon type="database" />
              <span>数据管理</span>
            </Menu.Item>
          </Menu>
        </Sider>
        <Layout>
          <Header style={{ background: '#fff', padding: 15 }} >
            <h1>数据管理</h1>
          </Header>
          <Content style={{ margin: '0 16px' }}>
            <div>
              <Tabs tabPosition="left">
                <Tabs.TabPane tab={(<span>用户</span>)} key="users">
                  <Table columns={columns.users} dataSource={this.state.users.data} />
                </Tabs.TabPane>
                <Tabs.TabPane tab={(<span>照片</span>)} key="photos">
                  <Table columns={columns.photos} dataSource={this.state.photos.data} />
                </Tabs.TabPane>
                <Tabs.TabPane tab={(<span>相册</span>)} key="album">
                  <Table columns={columns.album} dataSource={this.state.albums.data} />
                </Tabs.TabPane>
                <Tabs.TabPane tab={(<span>登录信息</span>)} key="login">
                  <Table columns={columns.login} dataSource={this.state.login.data} />
                </Tabs.TabPane>
              </Tabs>
            </div>
          </Content>
          <Footer style={{ textAlign: 'center' }}>
            Ant Design ©2016 Created by Ant UED
          </Footer>
        </Layout>
      </Layout>
    );
  }
}
export default connect((models) => {
  return models.system;
})(SystemManage);
