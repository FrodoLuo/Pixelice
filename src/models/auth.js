import * as authService from '../services/authService';

export default {
  namespace: 'auth',
  state: {
    signUp: {
      message: 0,
      token: '',
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
      console.log(result);
    },
    *signUp({ payload: data }, { call, put }) {
      const result = yield call(authService.signUp, data);
      yield put({
        type: 'saveSignUpState',
        payload: result.data,
      });
    },
  },

  reducers: {
    save(state, action) {
      return { ...state, ...action.payload };
    },
    saveSignUpState(state, { payload: data }) {
      return { ...state, signUp: data };
    },
  },
};

