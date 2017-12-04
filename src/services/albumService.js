import * as request from '../utils/request';

export function getAlbumsById(userId) {
  return request.get(
    `/api/album/getAlbumsByUserId?userId=${userId}`,
  );
}

export function getAlbumsByToken() {
  return request.post(
    '/api/album/getAlbumsByToken',
  );
}

export function getAlbumInfoById(albumId) {
  return request.get(
    `/api/album/getAlbumInfoById?albumId=${albumId}`,
  );
}
export function getAlbumPhotosByAlbumId(albumId) {
  return request.get(
    `/api/album/getAlbumPhotos?albumId=${albumId}`,
  );
}
