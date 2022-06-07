import apiClient from './BaseClient';

export const GET_BIBLIOGRAPHIES_NAMES = async () => {
  try {
    return apiClient({
      method: 'get',
      url: '/bibliography',
    });
  } catch (e) {
    throw new Error(e);
  }
};

export const UPDATE_BIBLIOGRAPHY = async (data) => {
  try {
    return apiClient({
      method: 'patch',
      url: '/bibliography',
      data,
    });
  } catch (e) {
    throw new Error(e);
  }
};

export const GET_AUTHORS = async () => {
  try {
    return apiClient({
      method: 'get',
      url: '/author',
    });
  } catch (e) {
    throw new Error(e);
  }
};

export const GET_EDITORIALS = async () => {
  try {
    return apiClient({
      url: '/editorial',
      method: 'get',
    });
  } catch (e) {
    throw new Error(e);
  }
};

export const UPDATE_EDITORIAL = async (data) => {
  try {
    return apiClient({
      url: '/editorial',
      method: 'patch',
      data,
    });
  } catch (e) {
    throw new Error(e);
  }
};

export const GET_SUBJECT_BIBLIO = async ({ queryKey }) => {
  try {
    const [, id] = queryKey;
    return apiClient({
      method: 'get',
      url: `/bibliography/subject/${id}`,
    });
  } catch (e) {
    throw new Error(e);
  }
};

export const CREATE_BIBLIOGRAPHY = async (data) => {
  try {
    return apiClient({
      method: 'post',
      url: '/bibliography',
      data,
    });
  } catch (e) {
    throw new Error(e);
  }
};

export const DELETE_BIBLIOGRAPHY = async (id) => {
  try {
    return apiClient({
      method: 'delete',
      url: `/bibliography/${id}`,
    });
  } catch (e) {
    throw new Error(e);
  }
};

export const UPDATE_AUTHOR = async (data) => {
  try {
    return apiClient({
      method: 'patch',
      url: `/author`,
      data,
    });
  } catch (e) {
    throw new Error(e);
  }
};
