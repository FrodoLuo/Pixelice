import * as photoService from '../services/photoService';
import { mapStatu } from '../utils/statuCode';

export default {
  namespace: 'photo',
  state: {
    processing: '',
    upload: {
      stata: 'ready',
    },
    delete: {
      state: 'ready',
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
    *getLikedPhotos({ payload }, { call, put }) {
      const result = yield call(photoService.getLikedPhotos);
      yield put({
        type: 'savePhotos',
        payload: {
          data: {
            state: mapStatu(result.data.message),
            data: result.data.data,
          },
          process: 'likedPhotos',
        },
      });
    },
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
          state: mapStatu(result.data.message),
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
          state: mapStatu(result.data.message),
        },
      });
    },
    *delete({ payload: photoId }, { call, put }) {
      yield put({
        type: 'saveDelete',
        payload: { message: 0 },
      });
      const result = yield call(photoService.deletePhoto, photoId);
      yield put({
        type: 'saveDelete',
        payload: {
          state: mapStatu(result.data.message),
        },
      });
    },
    *fetchPhotos({ payload }, { call, put }) {
      const result = yield call(photoService.fetchPhotos);
      yield put({
        type: 'savePhotos',
        payload: {
          data: {
            state: mapStatu(result.data.message),
            data: result.data.data,
          },
          process: 'fetchPhotos',
        },
      });
    },
    *fetchPhotosById({ payload: userId }, { call, put }) {
      const result = yield call(photoService.fetchPhotosById, userId);
      yield put({
        type: 'savePhotos',
        payload: {
          data: {
            state: mapStatu(result.data.message),
            data: result.data.data,
          },
          process: 'fetchPhotos',
        },
      });
    },
    *getNewPhotos({ payload }, { call, put }) {
      const result = yield call(photoService.getNewPhotos);
      yield put({
        type: 'savePhotos',
        payload: {
          data: {
            state: mapStatu(result.data.message),
            data: result.data.data,
          },
          process: 'newPhotos',
        },
      });
    },
    *randomPhoto({ payload }, { call, put }) {
      const result = yield call(photoService.randomPhoto);
      yield put({
        type: 'saveCover',
        payload: {
          state: mapStatu(result.data.message),
          data: result.data.result,
        },
      });
    },
    *hotPhoto({ payload }, { call, put }) {
      const result = yield call(photoService.hotPhoto);
      yield put({
        type: 'savePhotos',
        payload: {
          data: {
            state: mapStatu(result.data.message),
            data: result.data.data,
          },
          process: 'hotPhotos',
        },
      });
    },
  },
  reducers: {
    saveCoverIndex(state, { payload: data }) {
      return { ...state, coverCurrentIndex: data, processing: 'coverIndex' };
    },
    saveUpload(state, { payload: data }) {
      return { ...state, upload: data, processing: 'upload' };
    },
    savePhotos(state, { payload: { data, process } }) {
      return { ...state, photos: data, processing: process };
    },
    saveCover(state, { payload: data }) {
      return { ...state, cover: data, processing: 'coverPhoto' };
    },
    saveSearch(state, { payload: data }) {
      return { ...state, search: data, processing: 'search' };
    },
    saveDelete(state, { payload: data }) {
      return { ...state, delete: data, processing: 'delete' };
    },
  },
};
