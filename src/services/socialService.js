import * as request from '../utils/request';

export function like(photoId) {
  return request.post(
    '/api/social/like',
    {
      photoId,
    },
  );
}
export function dislike(photoId) {
  return request.post(
    '/api/social/dislike',
    {
      photoId,
    },
  );
}
export function checkLike() {
  return request.post(
    '/api/social/checkLiked',
  );
}

