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
    search: {
      state: 'ready',
      data: [],
    },
  },
  subscriptions: {},
  effects: {
    *search({ payload: keystring }, { call, put }) {
      yield put({
        type: 'saveSearch',
        payload: {
          state: 'loading',
          data: [],
        },
      });
      const result = yield call(photoService.searchPhoto, keystring);
      console.log(result);
      let state = '';
      switch (result.data.message) {
        case 20:
          state = 'success';
          break;
        case 21:
          state = 'error';
          break;
      }
      yield put({
        type: 'saveSearch',
        payload: {
          state,
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
    saveSearch(state, { payload: data }) {
      return { ...state, search: data };
    },
  },
};
