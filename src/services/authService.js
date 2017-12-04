import FormData from 'form-data';
import * as request from '../utils/request';
import * as tool from '../utils/Tool';

export function test() {
  const formdata = new FormData();
  formdata.append('test', 'jjjkkk');
  return request.post('api/auth/test', {
    test: 'hello',
  });
}
export function signIn(data) {
  return request.post(
    '/api/auth/signIn',
    {
      username: data.username,
      password: tool.md5Cipher(data.password),
    },
  );
}
export function signUp(data) {
  console.log(data);
  const temp = {
    username: data.username,
    nickName: data.username,
    password: tool.md5Cipher(data.password),
    email: data.email,
    avatarUrl: '',
    intro: '',
    phone: '',
    gender: 's',
    verified: false,
  };
  console.log(temp);
  return request.post(
    '/api/auth/signUp',
    {
      vo: JSON.stringify(temp),
    }, {
      ContentType: 'application/json',
    });
}
export function sendVerify() {
  return request.post('/api/auth/sendVerify');
}
