import apiClient from './BaseClient';

export const GET_VERBS = async () => {
  try {
    return await apiClient({
      url: '/verb',
      method: 'get',
    });
  } catch (e) {
    return e;
  }
};
