import FormData from 'form-data';
import * as request from '../utils/request';
import * as tool from '../utils/Tool';

export function userInfo() {
  return request.post('api/user/userInfo');
}

export function modifyInfo(vo) {
  console.log(vo);
  return request.post('api/user/modifyInfo', {
    userInfo: vo,
  });
}
