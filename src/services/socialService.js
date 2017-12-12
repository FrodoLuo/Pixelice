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
export function follow(followedId) {
  return request.post(
    '/api/social/follow',
    {
      followedId,
    },
  );
}
export function unfollow(followedId) {
  return request.post(
    '/api/social/unfollow',
    {
      followedId,
    },
  );
}
export function sendMessage(message) {
  return request.post(
    '/api/social/sendMessage',
    {
      receiverId: message.receiverId,
      content: message.content,
    },
  );
}
export function fetchMessage() {
  return request.post(
    '/api/social/fetchMessages',
  );
}
export function fetchSentMessage() {
  return request.post(
    '/api/social/fetchSentMessages',
  );
}
export function messageDetail(messageId) {
  return request.post(
    '/api/social/messageDetail',
    {
      messageId,
    },
  );
}
export function countUnread() {
  return request.post(
    '/api/social/countUnread',
  );
}
export function getFollowedUsers() {
  return request.post(
    '/api/social/getFollowedUsers',
  );
}
export function getHotUsers() {
  return request.get(
    '/api/social/getHotUsers',
  );
}
