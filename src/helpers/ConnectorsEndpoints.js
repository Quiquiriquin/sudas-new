import apiClient from './BaseClient';

export const GET_CONNECTORS = async () => {
  try {
    return apiClient({
      method: 'get',
      url: '/connector',
    });
  } catch (e) {
    throw new Error(e);
  }
};

export const SET_CONNECTOR = async (id, data) => {
  try {
    return apiClient({
      method: 'post',
      url: `/connector/unit/${id}`,
      data,
    });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const REMOVE_CONNECTOR = async (id, data) => {
  try {
    return apiClient({
      method: 'post',
      url: `/connector/unit/remove/${id}`,
      data,
    });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const DELETE_CONNECTOR = async (id) => {
  try {
    return apiClient({
      method: 'delete',
      url: `/connector/${id}`,
    });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const CREATE_CONNECTOR = async (data) => {
  try {
    return apiClient({
      method: 'post',
      url: `/connector`,
      data,
    });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const UPDATE_CONNECTOR = async (data) => {
  try {
    return apiClient({
      method: 'patch',
      url: `/connector`,
      data,
    });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};
