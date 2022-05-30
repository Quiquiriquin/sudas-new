import apiClient from './BaseClient';

export const LIST_ACTIVITIES = async () => {
  try {
    return apiClient({
      method: 'get',
      url: '/activities',
    });
  } catch (e) {
    throw new Error(e);
  }
};

export const SET_ACTIVITY = async (id, data) => {
  try {
    return apiClient({
      method: 'post',
      url: `/activities/unit/${id}`,
      data,
    });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const REMOVE_ACTIVITY = async (id, data) => {
  try {
    return apiClient({
      method: 'post',
      url: `/activities/unit/remove/${id}`,
      data,
    });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};
