import * as albumService from '../services/albumService';
import stateCode from '../utils/statuCode';

export default {
  namespace: 'album',
  state: {
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
  },
  reducers: {
    saveAlbumsList(state, { payload: data }) {
      return { ...state, albumsList: data };
    },
    saveAlbumPhotos(state, { payload: data }) {
      return { ...state, albumPhotos: data };
    },
    saveAlbumInfo(state, { payload: data }) {
      return { ...state, albumInfo: data };
    },
  },
  effects: {
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
          state: stateCode[result.data.message],
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
          state: stateCode[resultInfo.data.message],
          data: resultInfo.data.data,
        },
      });
      yield put({
        type: 'saveAlbumPhotos',
        payload: {
          state: stateCode[resultPhoto.data.message],
          data: resultPhoto.data.data,
        },
      });
    },
  },
  subscriptions: {},
};
