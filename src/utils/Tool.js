import Cookies from 'js-cookie';
import md5 from 'js-md5';
import { Modal, message } from 'antd';

export function checkLog() {
  const signature = Cookies.get('token');
  if (signature === undefined) {
    jumpToLogin();
  } else {
    return signature;
  }
}

export function saveToken(token, expire) {
  return Cookies.set('token', token, { expires: expire });
}
export function removeToken() {
  return Cookies.remove('token');
}
export function logout() {
  removeToken();
  message.info('已登出账号');
  setTimeout(() => {
    window.location.reload();
  }, 2000);
}
export function jumpToLogin() {
  Modal.error({
    title: '登录失效或未登录',
    content: '即将跳转登录界面...',
  });
  setTimeout(() => {
    window.location.href = '/login';
  }, 2000);
}

export function md5Cipher(data) {
  // console.log(md5(data));
  return md5(data);
}
