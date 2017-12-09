import * as request from '../utils/request';

export function getAlbumsByUserId(userId) {
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

export function modifyAlbum(album) {
  console.log(album);
  return request.post(
    '/api/album/modifyAlbum',
    {
      album,
    },
  );
}

export function removeAlbum(albumId) {
  return request.post(
    '/api/album/removeAlbum',
    {
      albumId,
    },
  );
}

export function createAlbum(album) {
  return request.post(
    '/api/album/createAlbum',
    {
      album,
    },
  );
}

export function addToAlbum({ photoId, albumId }) {
  return request.post(
    '/api/album/addToAlbum',
    {
      photoId,
      albumId,
    },
  );
}
export function removeFromAlbum({ photoId, albumId }) {
  return request.post(
    '/api/album/removeFromAlbum',
    {
      photoId,
      albumId,
    },
  );
}
export function findInAlbum(photoId) {
  return request.post(
    '/api/album/findInAlbum',
    {
      photoId,
    },
  );
}

export function quickFetch(albumId) {
  return request.post(
    '/api/album/quickFetch',
    {
      albumId,
    },
  );
}
