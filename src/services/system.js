import * as request from '../utils/request';

export function getUsers() {
  return request.post(
    '/api/system/users',
  );
}
export function getPhotos() {
  return request.post(
    '/api/system/photos',
  );
}
export function getAlbums() {
  return request.post(
    '/api/system/albums',
  );
}
export function getLogins() {
  return request.post(
    '/api/system/logins',
  );
}
