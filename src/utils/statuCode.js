import { message } from 'antd';

const status = {
  20: 'success',
  21: 'error',
  41: 'denied',
};
export function mapStatu(stateCode) {
  const result = status[stateCode];
  if (result === 'denied') {
    message.error('请先登录');
  }
  return result;
}
// export default status;
