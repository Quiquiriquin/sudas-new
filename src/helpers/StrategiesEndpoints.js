import FormWrapper from '../components/Forms/FormWrapper';
import apiClient from './BaseClient';

export const GET_STRATEGIES = async () => {
  try {
    return await apiClient({
      method: 'get',
      url: `/strategies`,
    });
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const CREATE_STRATEGY = async (data) => {
  try {
    return await apiClient({
      method: 'post',
      url: `/strategies`,
      data,
    });
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const UPDATE_STRATEGY = async (data) => {
  try {
    return await apiClient({
      method: 'patch',
      url: `/strategies`,
      data,
    });
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const DELETE_STRATEGY = async (id) => {
  try {
    return await apiClient({
      method: 'delete',
      url: `/strategies/${id}`,
    });
  } catch (e) {
    console.log(e);
    return e;
  }
};
