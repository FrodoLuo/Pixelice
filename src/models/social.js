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
  },
  reducers: {
    saveLike(state, { payload: data }) {
      return { ...state, like: data, runningOp: 'like' };
    },
    saveDislike(state, { payload: data }) {
      return { ...state, dislike: data, runningOp: 'dislike' };
    },
    saveLikedList(state, { payload: data }) {
      return { ...state, likedList: data, runningOp: 'checkLike' };
    },
  },
  effects: {
    *like({ payload: photoId }, { call, put }) {
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
    *dislike({ payload: photoId }, { call, put }) {
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
    *checkLike({ payload }, { call, put }) {
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
