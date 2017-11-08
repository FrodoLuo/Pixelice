import * as photoService from '../services/photoService';
import stateCode from '../utils/statuCode';

export default {
  namespace: 'photo',
  state: {
    upload: {
      stata: 'ready',
    },
    photos: {
      state: 'ready',
      data: [],
    },
    cover: {
      state: 'ready',
      data: [{
        author: '',
        photoUrl: '',
      }],
    },
    coverCurrentIndex: 0,
    search: {
      state: 'ready',
      data: [],
    },
  },
  subscriptions: {},
  effects: {
    *setCoverIndex({ payload: index }, { put }) {
      yield put({
        type: 'saveCoverIndex',
        payload: index,
      });
    },
    *search({ payload: keystring }, { call, put }) {
      yield put({
        type: 'saveSearch',
        payload: {
          state: 'loading',
          data: [],
        },
      });
      const result = yield call(photoService.searchPhoto, keystring);
      yield put({
        type: 'saveSearch',
        payload: {
          state: stateCode[result.data.message],
          data: result.data.data,
        },
      });
    },
    *upload({ payload: { files, info } }, { call, put }) {
      yield put({
        type: 'saveUpload',
        payload: { message: 0 },
      });
      const result = yield call(photoService.upload, { files, info });
      yield put({
        type: 'saveUpload',
        payload: {
          state: stateCode[result.data.message],
        },
      });
    },
    *fetchPhotos({ payload }, { call, put }) {
      const result = yield call(photoService.fetchPhotos);
      yield put({
        type: 'savePhotos',
        payload: {
          state: stateCode[result.data.message],
          data: result.data.data,
        },
      });
    },
    *getNewPhotos({ payload }, { call, put }) {
      const result = yield call(photoService.getNewPhotos);
      yield put({
        type: 'savePhotos',
        payload: {
          state: stateCode[result.data.message],
          data: result.data.data,
        },
      });
    },
    *randomPhoto({ payload }, { call, put }) {
      const result = yield call(photoService.randomPhoto);
      yield put({
        type: 'saveCover',
        payload: {
          state: stateCode[result.data.message],
          data: result.data.result,
        },
      });
    },
  },
  reducers: {
    saveCoverIndex(state, { payload: data }) {
      return { ...state, coverCurrentIndex: data };
    },
    saveUpload(state, { payload: data }) {
      return { ...state, upload: data };
    },
    savePhotos(state, { payload: data }) {
      return { ...state, photos: data };
    },
    saveCover(state, { payload: data }) {
      return { ...state, cover: data };
    },
    saveSearch(state, { payload: data }) {
      return { ...state, search: data };
    },
  },
};
