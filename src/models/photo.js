import * as photoService from '../services/photoService';

export default {
  namespace: 'photo',
  state: {
    upload: {
      message: 0,
    },
  },
  subscriptions: {},
  effects: {
    *upload({ payload: files }, { call, put }) {
      yield put({
        type: 'saveUpload',
        payload: { message: 0 },
      });
      const result = yield call(photoService.upload, files);
      yield put({
        type: 'saveUpload',
        payload: result.data,
      });
    },
  },
  reducers: {
    saveUpload(state, { payload: data }) {
      return { ...state, upload: data };
    },
  },
};
