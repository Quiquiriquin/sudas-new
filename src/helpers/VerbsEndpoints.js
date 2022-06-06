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

export const CREATE_VERB = async (data) => {
  console.log(data);
  try {
    return await apiClient({
      url: '/verb',
      method: 'post',
      data,
    });
  } catch (e) {
    return e;
  }
};

export const DELETE_VERB = async (data) => {
  try {
    return await apiClient({
      url: `/verb/${data}`,
      method: 'delete',
    });
  } catch (e) {
    return e;
  }
};

export const UPDATE_VERB = async (data) => {
  try {
    return await apiClient({
      url: `/verb`,
      method: 'patch',
      data,
    });
  } catch (e) {
    return e;
  }
};
