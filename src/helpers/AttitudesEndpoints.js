/* eslint-disable no-async-promise-executor */
import apiClient from './BaseClient';

export const GET_ATTITUDES = () => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(
        await apiClient({
          method: 'get',
          url: 'attitudes',
        })
      );
    } catch (e) {
      reject(new Error(e));
    }
  });
};

export const CREATE_ATTITUDE = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(
        await apiClient({
          method: 'post',
          url: 'attitudes',
          data,
        })
      );
    } catch (e) {
      reject(new Error(e));
    }
  });
};

export const DELETE_ATTITUDE = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(
        await apiClient({
          method: 'delete',
          url: `attitudes/${id}`,
        })
      );
    } catch (e) {
      reject(new Error(e));
    }
  });
};

export const UPDATE_ATTITUDE = ({ ...data }) => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(
        await apiClient({
          method: 'patch',
          url: `attitudes`,
          data,
        })
      );
    } catch (e) {
      reject(new Error(e));
    }
  });
};
