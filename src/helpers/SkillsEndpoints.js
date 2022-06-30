/* eslint-disable no-async-promise-executor */
import apiClient from './BaseClient';

export const GET_SKILLS = () => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(
        await apiClient({
          method: 'get',
          url: 'skills',
        })
      );
    } catch (e) {
      reject(new Error(e));
    }
  });
};

export const CREATE_SKILL = (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(
        await apiClient({
          method: 'post',
          url: 'skills',
          data,
        })
      );
    } catch (e) {
      reject(new Error(e));
    }
  });
};

export const DELETE_SKILL = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(
        await apiClient({
          method: 'delete',
          url: `skills/${id}`,
        })
      );
    } catch (e) {
      reject(new Error(e));
    }
  });
};

export const UPDATE_SKILL = ({ ...data }) => {
  return new Promise(async (resolve, reject) => {
    try {
      resolve(
        await apiClient({
          method: 'patch',
          url: `skills`,
          data,
        })
      );
    } catch (e) {
      reject(new Error(e));
    }
  });
};
