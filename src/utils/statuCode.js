import { message } from 'antd';

const status = {
  20: 'success',
  21: 'error',
  41: 'denied',
};
export function mapStatu(stateCode) {
  const result = status[stateCode];
  if (result === 'denied') {
    message.error('登录已失效请重新登陆, 正在跳转至首页');
    setTimeout(
      () => {
        window.location.href = '/';
      },
      1500,
    );
  }
  return result;
}
// export default status;
