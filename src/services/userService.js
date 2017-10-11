import FormData from 'form-data';
import * as request from '../utils/request';
import * as tool from '../utils/Tool';

export function userInfo() {
  return request.post('api/user/userInfo');
}
