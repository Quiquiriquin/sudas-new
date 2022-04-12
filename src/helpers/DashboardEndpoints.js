import apiClient from './BaseClient';

export const GET_DASHBOARD = async (data) => {
  try {
    return await apiClient({
      url: '/dashboard',
      method: 'get',
    });
  } catch (e) {
    console.error(e);
    throw e.response.data;
  }
};
