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
  },
  reducers: {
    saveLike(state, { payload: data }) {
      return { ...state, like: data, runningOp: 'like' };
    },
    saveDislike(state, { payload: data }) {
      return { ...state, dislike: data, runningOp: 'dislike' };
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
      yield put({
        type: 'saveLike',
        payload: {
          state: mapStatu(result.data.message),
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
      yield put({
        type: 'saveDislike',
        payload: {
          state: mapStatu(result.data.message),
        },
      });
    },
  },
  subscriptions: {},
};
