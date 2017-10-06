import React from 'react';
import { Steps, Layout, message } from 'antd';
import { connect } from 'dva';
import SignUpForm from '../../components/SignUp/Form/signUpForm';
import PixeliceHeader from '../../components/Pixel-Header/pixeliceHeader';
import PixeliceFooter from '../../components/Pixel-Footer/pixelFooter';
import style from './SignUpPage.less';
import Cover from '../../components/Cover/cover';

const { Content } = Layout;
const Step = Steps.Step;

class SignUpPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      current: 0,
    };
  }
  componentWillReceiveProps(nextProps) {
    console.log(nextProps);
    if (nextProps.message === 20) {
      this.setState({
        current: 1,
      });
      message.success('注册成功');
    } else if (nextProps.message === 21) {
      message.error('用户名或电子邮箱已被使用');
    }
  }
  render() {
    const steps = [
      {
        title: '填写信息',
        content: (
          <div>
            <SignUpForm />
          </div>
        ),
      },
      {
        title: '完成',
        content: (
          <div>
            注册完成, 即将跳转...
          </div>
        ),
      },
    ];
    return (
      <Layout>
        <PixeliceHeader />
        <Content className="main-content">
          <Cover />
          <div className="content-wrap">
            <h1>注册账号</h1>
            <Steps current={this.state.current}>
              {steps.map(item => <Step key={item.title} title={item.title} />)}
            </Steps>
            <div>
              {steps[this.state.current].content}
            </div>
          </div>
        </Content>
        <PixeliceFooter />
      </Layout>
    );
  }
}
export default connect((models) => {
  return models.auth.signUp;
})(SignUpPage);
