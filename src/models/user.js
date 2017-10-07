import * as userService from '../services/userService';

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
        followers: 0,
      },
    },
  },
  reducers: {
    saveUserInfo(state, { payload: data }) {
      return { ...state, userInfo: data };
    },
  },
  effects: {
    *userInfo({ payload }, { call, put }) {
      const result = yield call(userService.userInfo);
      yield put({
        type: 'saveUserInfo',
        payload: result.data,
      });
    },
  },
  subscriptions: {},
};
