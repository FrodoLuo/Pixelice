import * as system from '../services/system';
import { mapStatus, mapStatu } from '../utils/statuCode';

export default {
  namespace: 'system',
  state: {
    users: {
      state: 'ready',
      data: [],
    },
    photos: {
      state: 'ready',
      data: [],
    },
    albums: {
      state: 'ready',
      data: [],
    },
    login: {
      state: 'ready',
      data: [],
    },
  },
  reducers: {
    saveUsers(state, { payload: data }) {
      return { ...state, users: data };
    },
    savePhotos(state, { payload: data }) {
      return { ...state, photos: data };
    },
    saveAlbums(state, { payload: data }) {
      return { ...state, albums: data };
    },
    saveLogins(state, { payload: data }) {
      return { ...state, login: data };
    },
  },
  effects: {
    *users({ payload }, { call, put }) {
      const result = yield call(system.getUsers);
      yield put({
        type: 'saveUsers',
        payload: {
          state: mapStatu(result.data.message),
          data: result.data.data,
        },
      });
    },
    *albums({ payload }, { call, put }) {
      const result = yield call(system.getAlbums);
      yield put({
        type: 'saveAlbums',
        payload: {
          state: mapStatu(result.data.message),
          data: result.data.data,
        },
      });
    },
    *photos({ payload }, { call, put }) {
      const result = yield call(system.getPhotos);
      yield put({
        type: 'savePhotos',
        payload: {
          state: mapStatu(result.data.message),
          data: result.data.data,
        },
      });
    },
    *logins({ payload }, { call, put }) {
      const result = yield call(system.getLogins);
      yield put({
        type: 'saveLogins',
        payload: {
          state: mapStatu(result.data.message),
          data: result.data.data,
        },
      });
    },
  },
  subscriptions: {},
};
