import * as photoService from '../services/photoService';

export default {
  namespace: 'photo',
  state: {
    upload: {
      message: 0,
    },
    photos: {
      message: 0,
      data: [],
    },
    cover: {
      message: 0,
      result: {
        author: '',
        photoUrl: '',
      },
    },
  },
  subscriptions: {},
  effects: {
    *upload({ payload: { files, info } }, { call, put }) {
      yield put({
        type: 'saveUpload',
        payload: { message: 0 },
      });
      const result = yield call(photoService.upload, { files, info });
      yield put({
        type: 'saveUpload',
        payload: result.data,
      });
    },
    *fetchPhotos({ payload }, { call, put }) {
      const result = yield call(photoService.fetchPhotos);
      yield put({
        type: 'savePhotos',
        payload: result.data,
      });
    },
    *getNewPhotos({ payload }, { call, put }) {
      const result = yield call(photoService.getNewPhotos);
      yield put({
        type: 'savePhotos',
        payload: result.data,
      });
    },
    *randomPhoto({ payload }, { call, put }) {
      const result = yield call(photoService.randomPhoto);
      console.log(result);
      yield put({
        type: 'saveCover',
        payload: result.data,
      });
    },
  },
  reducers: {
    saveUpload(state, { payload: data }) {
      return { ...state, upload: data };
    },
    savePhotos(state, { payload: data }) {
      return { ...state, photos: data };
    },
    saveCover(state, { payload: data }) {
      return { ...state, cover: data };
    },
  },
};
