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
  },
  reducers: {
    saveUpload(state, { payload: data }) {
      return { ...state, upload: data };
    },
    savePhotos(state, { payload: data }) {
      return { ...state, photos: data };
    },
  },
};