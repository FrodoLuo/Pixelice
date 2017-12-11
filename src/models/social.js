import { mapStatu } from '../utils/statuCode';
import * as socialService from '../services/socialService';

export default {
  namespace: 'social',
  state: {
    runningOp: '',
    like: {
      state: 'ready',
    },
    dislike: {
      state: 'ready',
    },
    likedList: {
      state: 'ready',
      data: [],
    },
    follow: {
      state: 'ready',
    },
    unfollow: {
      state: 'ready',
    },
    sendMessage: {
      state: 'ready',
    },
    fetchMessages: {
      state: 'ready',
      data: [],
    },
    fetchSentMessages: {
      state: 'ready',
      data: [],
    },
    messageDetail: {
      state: 'ready',
      data: {},
    },
    unread: {
      state: 'ready',
      data: 0,
    },
    followedUsers: {
      state: 'ready',
      data: [],
    },
  },
  reducers: {
    saveFollow(state, { payload: data }) {
      return { ...state, follow: data, runningOp: 'follow' };
    },
    saveUnfollow(state, { payload: data }) {
      return { ...state, unfollow: data, runningOp: 'unfollow' };
    },
    saveSendMessage(state, { payload: data }) {
      return { ...state, sendMessage: data, runningOp: 'sendMessage' };
    },
    saveFetchMessages(state, { payload: data }) {
      return { ...state, fetchMessages: data, runningOp: 'fetchMessages' };
    },
    saveFetchSentMessages(state, { payload: data }) {
      return { ...state, fetchSentMessages: data, runningOp: 'fetchSentMessages' };
    },
    saveMessageDetail(state, { payload: data }) {
      return { ...state, messageDetail: data, runningOp: 'messageDetail' };
    },
    saveLike(state, { payload: data }) {
      return { ...state, like: data, runningOp: 'like' };
    },
    saveDislike(state, { payload: data }) {
      return { ...state, dislike: data, runningOp: 'dislike' };
    },
    saveLikedList(state, { payload: data }) {
      return { ...state, likedList: data, runningOp: 'checkLike' };
    },
    saveUnread(state, { payload: data }) {
      return { ...state, unread: data, runningOp: 'countUnread' };
    },
    saveFollowedUsers(state, { payload: data }) {
      return { ...state, followedUsers: data, runningOp: 'followedUsers' };
    },
  },
  effects: {
    *getFollowedUsers({ payload }, { call, put }) {
      yield put({
        type: 'saveFollowedUsers',
        payload: {
          state: 'loading',
          data: [],
        },
      });
      const result = yield call(socialService.getFollowedUsers);
      yield put({
        type: 'saveFollowedUsers',
        payload: {
          state: mapStatu(result.data.message),
          data: result.data.data,
        },
      });
    },
    *countUnread({ payload }, { call, put }) {
      yield put({
        type: 'saveUnread',
        payload: {
          state: 'loading',
          data: 0,
        },
      });
      const result = yield call(socialService.countUnread);
      yield put({
        type: 'saveUnread',
        payload: {
          state: mapStatu(result.data.message),
          data: result.data.data,
        },
      });
    },
    *follow({ payload: followedId }, { call, put }) {
      yield put({
        type: 'saveFollow',
        payload: {
          state: 'loading',
        },
      });
      const result = yield call(socialService.follow, followedId);
      yield put({
        type: 'saveFollow',
        payload: {
          state: mapStatu(result.data.message),
        },
      });
    },
    *unfollow({ payload: followedId }, { call, put }) {
      yield put({
        type: 'saveUnfollow',
        payload: {
          state: 'loading',
        },
      });
      const result = yield call(socialService.unfollow, followedId);
      yield put({
        type: 'saveUnfollow',
        payload: {
          state: mapStatu(result.data.message),
        },
      });
    },
    *sendMessage({ payload: message }, { call, put }) {
      yield put({
        type: 'saveSendMessage',
        payload: {
          state: 'loading',
        },
      });
      const result = yield call(socialService.sendMessage, message);
      yield put({
        type: 'saveSendMessage',
        payload: {
          state: mapStatu(result.data.message),
        },
      });
    },
    *fetchMessages({ payload }, { call, put }) {
      yield put({
        type: 'saveFetchMessages',
        payload: {
          state: 'loading',
          data: [],
        },
      });
      const result = yield call(socialService.fetchMessage);
      yield put({
        type: 'saveFetchMessages',
        payload: {
          state: mapStatu(result.data.message),
          data: result.data.data,
        },
      });
    },
    *fetchSentMessages({ payload }, { call, put }) {
      yield put({
        type: 'saveFetchSentMessages',
        payload: {
          state: 'loading',
          data: [],
        },
      });
      const result = yield call(socialService.fetchSentMessage);
      yield put({
        type: 'saveFetchSentMessages',
        payload: {
          state: mapStatu(result.data.message),
          data: result.data.data,
        },
      });
    },
    * readMessage({ payload: messageId }, { call, put }) {
      const result = yield call(socialService.messageDetail, messageId);
    },
    * like({ payload: photoId }, { call, put }) {
      yield put({
        type: 'saveLike',
        payload: {
          state: 'loading',
        },
      });
      const result = yield call(socialService.like, photoId);
      const likedList = yield call(socialService.checkLike);
      yield put({
        type: 'saveLike',
        payload: {
          state: mapStatu(result.data.message),
        },
      });
      yield put({
        type: 'saveLikedList',
        payload: {
          state: mapStatu(likedList.data.message),
          data: likedList.data.data,
        },
      });
    },
    * dislike({ payload: photoId }, { call, put }) {
      yield put({
        type: 'saveDislike',
        payload: {
          state: 'loading',
        },
      });
      const result = yield call(socialService.dislike, photoId);
      const likedList = yield call(socialService.checkLike);
      yield put({
        type: 'saveDislike',
        payload: {
          state: mapStatu(result.data.message),
        },
      });
      yield put({
        type: 'saveLikedList',
        payload: {
          state: mapStatu(likedList.data.message),
          data: likedList.data.data,
        },
      });
    },
    * checkLike({ payload }, { call, put }) {
      yield put({
        type: 'saveLikedList',
        payload: {
          state: 'loading',
          data: [],
        },
      });
      const result = yield call(socialService.checkLike);
      yield put({
        type: 'saveLikedList',
        payload: {
          state: mapStatu(result.data.message),
          data: result.data.data,
        },
      });
    },
  },
  subscriptions: {},
};
