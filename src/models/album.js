import * as albumService from '../services/albumService';
import { mapStatu } from '../utils/statuCode';

export default {
  namespace: 'album',
  state: {
    runningOp: '',
    albumsList: {
      state: 'ready',
      data: [],
    },
    albumPhotos: {
      state: 'ready',
      data: [],
    },
    albumInfo: {
      state: 'ready',
      data: {
        albumName: '',
        createDate: '',
      },
    },
    photosForCover: {
      state: 'ready',
      data: [],
    },
    inAlbumList: {
      state: 'ready',
      data: [],
    },
    modifyAlbum: {
      state: 'ready',
      data: [],
    },
    removeAlbum: {
      state: 'ready',
      data: [],
    },
    createAlbum: {
      state: 'ready',
      data: [],
    },
    pickPhoto: {
      state: 'ready',
    },
  },
  reducers: {
    savePhotosForCover(state, { payload: data }) {
      return { ...state, photosForCover: data, runningOp: 'quickFetch' };
    },
    saveAlbumsList(state, { payload: data }) {
      return { ...state, albumsList: data, runningOp: 'getAlbum' };
    },
    saveAlbumPhotos(state, { payload: data }) {
      return { ...state, albumPhotos: data, runningOp: 'getPhoto' };
    },
    saveAlbumInfo(state, { payload: data }) {
      return { ...state, albumInfo: data, runningOp: 'getAlbumInfo' };
    },
    saveModifyAlbum(state, { payload: data }) {
      return { ...state, modifyAlbum: data, runningOp: 'modify' };
    },
    saveRemoveAlbum(state, { payload: data }) {
      return { ...state, removeAlbum: data, runningOp: 'remove' };
    },
    saveCreateAlbum(state, { payload: data }) {
      return { ...state, createAlbum: data, runningOp: 'create' };
    },
    saveInList(state, { payload: data }) {
      return { ...state, inAlbumList: data, runningOp: 'checkInAlbum' };
    },
  },
  effects: {
    *quickFetch({ payload: albumId }, { call, put }) {
      yield put({
        type: 'savePhotosForCover',
        payload: {
          state: 'loading',
          data: [],
        },
      });
      const result = yield call(albumService.quickFetch, albumId);
      yield put({
        type: 'savePhotosForCover',
        payload: {
          state: mapStatu(result.data.message),
          data: result.data.data,
        },
      });
    },
    *getAlbumsByToken({ payload }, { call, put }) {
      yield put({
        type: 'saveAlbumslist',
        payload: {
          state: 'loading',
          data: [],
        },
      });
      const result = yield call(albumService.getAlbumsByToken);
      yield put({
        type: 'saveAlbumsList',
        payload: {
          state: mapStatu(result.data.message),
          data: result.data.data,
        },
      });
    },
    *getAlbumsByUserId({ payload: userId }, { call, put }) {
      yield put({
        type: 'saveAlbumslist',
        payload: {
          state: 'loading',
          data: [],
        },
      });
      const result = yield call(albumService.getAlbumsByUserId, userId);
      yield put({
        type: 'saveAlbumsList',
        payload: {
          state: mapStatu(result.data.message),
          data: result.data.data,
        },
      });
    },
    *initAlbum({ payload: albumId }, { call, put }) {
      yield put({
        type: 'saveAlbumInfo',
        payload: {
          state: 'loading',
          data: {
            albumName: '',
            createDate: '',
          },
        },
      });
      yield put({
        type: 'saveAlbumPhotos',
        payload: {
          stata: 'loading',
          data: [],
        },
      });
      const resultPhoto = yield call(albumService.getAlbumPhotosByAlbumId, albumId);
      const resultInfo = yield call(albumService.getAlbumInfoById, albumId);
      yield put({
        type: 'saveAlbumInfo',
        payload: {
          state: mapStatu(resultInfo.data.message),
          data: resultInfo.data.data,
        },
      });
      yield put({
        type: 'saveAlbumPhotos',
        payload: {
          state: mapStatu(resultPhoto.data.message),
          data: resultPhoto.data.data,
        },
      });
    },
    *modifyAlbum({ payload: album }, { call, put }) {
      yield put({
        type: 'saveModifyAlbum',
        payload: {
          state: 'loading',
          data: null,
        },
      });
      const result = yield call(albumService.modifyAlbum, album);
      yield put({
        type: 'saveModifyAlbum',
        payload: {
          state: mapStatu(result.data.message),
          data: result.data.data,
        },
      });
    },
    *removeAlbum({ payload: albumId }, { call, put }) {
      yield put({
        type: 'saveRemoveAlbum',
        payload: {
          state: 'loading',
          data: null,
        },
      });
      const result = yield call(albumService.removeAlbum, albumId);
      yield put({
        type: 'saveRemoveAlbum',
        payload: {
          state: mapStatu(result.data.message),
          data: result.data.data,
        },
      });
    },
    *createAlbum({ payload: album }, { call, put }) {
      yield put({
        type: 'saveCreateAlbum',
        payload: {
          state: 'loading',
          data: null,
        },
      });
      const result = yield call(albumService.createAlbum, album);
      yield put({
        type: 'saveCreateAlbum',
        payload: {
          state: mapStatu(result.data.message),
          data: result.data.data,
        },
      });
    },
    *addToAlbum({ payload: { albumId, photoId } }, { call, put }) {
      yield put({
        type: 'pickPhoto',
        payload: {
          state: 'loading',
        },
      });
      const result = yield call(albumService.addToAlbum, { albumId, photoId });
      yield put({
        type: 'pickPhoto',
        payload: {
          state: mapStatu(result.data.message),
        },
      });
    },
    *removeFromAlbum({ payload: { albumId, photoId } }, { call, put }) {
      yield put({
        type: 'pickPhoto',
        payload: {
          state: 'loading',
        },
      });
      const result = yield call(albumService.removeFromAlbum, { albumId, photoId });
      yield put({
        type: 'pickPhoto',
        payload: {
          state: mapStatu(result.data.message),
        },
      });
    },
    *findInAlbum({ payload: photoId }, { call, put }) {
      yield put({
        type: 'saveInList',
        payload: {
          state: 'loading',
          data: [],
        },
      });
      const result = yield call(albumService.findInAlbum, photoId);
      yield put({
        type: 'saveInList',
        payload: {
          state: mapStatu(result.data.message),
          data: result.data.data,
        },
      });
    },
  },
  subscriptions: {},
};
