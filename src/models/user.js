import { message } from 'antd';
import * as userService from '../services/userService';
import { mapStatu } from '../utils/statuCode';

const initState = {
  modify: {
    state: 'ready',
  },
};

export default {
  namespace: 'user',
  state: {
    userInfo: {
      message: 0,
      data: {
        userId: '',
        nickName: '',
        email: '',
        avatarUrl: '',
        phone: '',
        gender: '',
        verified: '',
        intro: '',
        followers: 0,
      },
    },
    hostInfo: {
      state: 'ready',
      data: {
        userId: '',
        nickName: '',
        avatarUrl: '',
        gender: '',
        intro: '',
        followers: 0,
      },
    },
    modify: {
      state: 'ready',
    },
  },
  reducers: {
    initState(state, { payload }) {
      return { ...state, ...initState };
    },
    saveUserInfo(state, { payload: data }) {
      return { ...state, userInfo: data };
    },
    saveModify(state, { payload: data }) {
      return { ...state, modify: data };
    },
    saveHostInfo(state, { payload: data }) {
      return { ...state, hostInfo: data };
    },
  },
  effects: {
    *hostInfo({ payload: hostId }, { call, put }) {
      const result = yield call(userService.hostInfo, hostId);
      yield put({
        type: 'saveHostInfo',
        payload: {
          state: mapStatu(result.data.message),
          data: result.data.data,
        },
      });
    },
    *userInfo({ payload }, { call, put }) {
      yield put({
        type: 'initState',
      });
      const result = yield call(userService.userInfo);
      yield put({
        type: 'saveUserInfo',
        payload: result.data,
      });
    },
    *modifyUserInfo({ payload: vo }, { call, put }) {
      yield put({
        type: 'saveModify',
        payload: { state: 'loading' },
      });
      const result = yield call(userService.modifyInfo, vo);
      let state;
      console.log(result);
      switch (result.data.message) {
        case 19:
          state = 'occupied';
          break;
        case 20:
          state = 'success';
          break;
        case 21:
          state = 'error';
          break;
        case 41:
          state = 'denied';
          break;
        default:
          state = '';
      }
      if (state === 'denied') {
        message.error('登录超时, 请重新登录');
        setTimeout(() => {
          window.location.href = '/';
        }, 500);
      }
      yield put({
        type: 'saveModify',
        payload: { state },
      });
    },
  },
  subscriptions: {},
};
