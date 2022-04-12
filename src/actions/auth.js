import types from '../types/types';

export const startLogin = (userInfo) => ({
  type: types.login,
  payload: {
    userInfo,
  },
});
