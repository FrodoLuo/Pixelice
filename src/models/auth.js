import * as authService from '../services/authService';
import * as tool from '../utils/Tool';

export default {
  namespace: 'auth',
  state: {
    signUp: {
      message: 0,
      token: '',
    },
    signIn: {
      message: 0,
      token: '',
    },
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
      },
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {  // eslint-disable-line
    },
  },

  effects: {
    *fetch({ payload }, { call, put }) {  // eslint-disable-line
      yield put({ type: 'save' });
    },
    *test({ payload }, { call, put }) {
      const result = yield call(authService.test);
    },
    *signUp({ payload: data }, { call, put }) {
      yield put({
        type: 'saveSignUpState',
        payload: { message: 0, token: '' },
      });
      const result = yield call(authService.signUp, data);
      yield put({
        type: 'saveSignUpState',
        payload: result.data,
      });
    },
    *signIn({ payload: { username, password } }, { call, put }) {
      yield put({
        type: 'saveSignInState',
        payload: { message: 0, token: '' },
      });
      const result = yield call(authService.signIn, { username, password });
      yield put({
        type: 'saveSignInState',
        payload: result.data,
      });
    },
    *userInfo({ payload }, { call, put }) {
      const result = yield call(authService.userInfo);
      console.log(result);
      yield put({
        type: 'saveUserInfo',
        payload: result.data,
      });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    saveSignUpState(state, { payload: data }) {
      tool.saveToken(data.token);
      return { ...state, signUp: data };
    },
    saveSignInState(state, { payload: data }) {
      tool.saveToken(data.token);
      return { ...state, signIn: data };
    },
    saveUserInfo(state, { payload: data }) {
      return { ...state, userInfo: data };
    },
  },
};

