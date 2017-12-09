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
export function fetchPhotos() {
  return post(
    '/api/photo/fetchPhotos',
  );
}
export function fetchPhotosById(userId) {
  return get(
    `/api/photo/fetchPhotosById?userId=${userId}`,
  );
}
export function getNewPhotos() {
  return post('/api/photo/getNewPhotos');
}
export function randomPhoto() {
  return get('/api/photo/randomPhoto');
}
export function hotPhoto() {
  return get('/api/photo/getHotPhotos');
}
export function searchPhoto(keystring) {
  return get(`/api/photo/search?keystring=${keystring}`);
}
