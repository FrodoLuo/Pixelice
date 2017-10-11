import { get, post } from '../utils/request';

export function upload(data) {
  console.log(data);
  const list = [];
  for (let i = 0; i < data.files.length; i += 1) {
    list.push(data.files[i].name);
  }
  return post(
    '/api/photo/upload',
    {
      list,
      info: data.info,
    },
  );
}
