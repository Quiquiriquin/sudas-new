import FormWrapper from '../components/Forms/FormWrapper';
import apiClient from './BaseClient';

export const GET_METHODS = async () => {
  try {
    return await apiClient({
      method: 'get',
      url: `/methods`,
    });
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const SET_METHOD = async (id, data) => {
  try {
    return apiClient({
      method: 'post',
      url: `/methods/unit/${id}`,
      data,
    });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const REMOVE_METHOD = async (id, data) => {
  try {
    return apiClient({
      method: 'post',
      url: `/methods/unit/remove/${id}`,
      data,
    });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const DELETE_METHOD = async (id) => {
  try {
    return apiClient({
      method: 'delete',
      url: `/methods/${id}`,
    });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const CREATE_METHOD = async (data) => {
  try {
    return apiClient({
      method: 'post',
      url: `/methods`,
      data,
    });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const UPDATE_METHOD = async (data) => {
  try {
    return apiClient({
      method: 'patch',
      url: `/methods`,
      data,
    });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};
