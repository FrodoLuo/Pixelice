import { get, post } from '../utils/request';

export function upload(files) {
  console.log(files);
  return post(
    '/api/photo/upload',
    files,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    },
  );
}
