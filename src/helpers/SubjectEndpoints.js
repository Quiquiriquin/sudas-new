import FormWrapper from '../components/Forms/FormWrapper';
import apiClient from './BaseClient';

export const GET_SUBJECT = async ({ queryKey }) => {
  const [, id] = queryKey;
  console.log(id);
  try {
    return await apiClient({
      method: 'get',
      url: `/subject/${id}`,
    });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};
export const GET_SUBJECTS = async () => {
  try {
    return await apiClient({
      method: 'get',
      url: `/subject`,
    });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const GET_USER_SUBJECTS = async ({ queryKey }) => {
  try {
    const [, , id] = queryKey;
    return await apiClient({
      method: 'get',
      url: `/subject/collaborator/${id}`,
    });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const GET_VERB = async () => {
  try {
    return await apiClient({
      method: 'get',
      url: `/verb`,
    });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const GET_CONNECTOR = async () => {
  try {
    return await apiClient({
      method: 'get',
      url: `/connector`,
    });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const GET_CONTENT_SUBJECT = async ({ queryKey }) => {
  const [, id] = queryKey;
  try {
    return await apiClient({
      method: 'get',
      url: `/content/${id}?subjectId=${id}`,
    });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const GET_BIBLIO = async ({ queryKey }) => {
  const [, id] = queryKey;
  try {
    return await apiClient({
      method: 'get',
      url: `/subject/biblio/${id}`,
    });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const CREATE_UNIT_COMPETENCE = async (data) => {
  console.log(data, '***');
  try {
    return await apiClient({
      method: 'post',
      url: `/unit-competence`,
      data,
    });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const GET_RELATED_UNITS = async ({ queryKey }) => {
  const [, id] = queryKey;
  try {
    return await apiClient({
      method: 'get',
      url: `/subject/related/${id}`,
    });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const GET_COMPETENCES = async ({ queryKey }) => {
  const [, id] = queryKey;
  try {
    return await apiClient({
      method: 'get',
      url: `/unit-competence/subject/${id}`,
    });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const UPDATE_COMPETENCE = async ({ id, data }) => {
  try {
    return await apiClient({
      method: 'patch',
      url: `/unit-competence/${id}`,
      data,
    });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const UPDATE_EDU_INTENTION = async ({ id, data }) => {
  try {
    return await apiClient({
      method: 'patch',
      url: `/subject/${id}`,
      data,
    });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const UPDATE_PURPOSE = async ({ id, data }) => {
  try {
    return await apiClient({
      method: 'patch',
      url: `/purpose/${id}`,
      data,
    });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const UPDATE_UNIT_COMPETENCE = async ({ id, data }) => {
  console.log(id, data);
  try {
    return await apiClient({
      method: 'patch',
      url: `/unit-competence/${id}`,
      data,
    });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const CREATE_PURPOSE = async (data) => {
  try {
    return await apiClient({
      method: 'post',
      url: `/purpose/`,
      data,
    });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const CREATE_SUBJECT = async (data) => {
  try {
    return await apiClient({
      method: 'post',
      url: `/subject`,
      data,
    });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const CREATE_CONTENT = async (data) => {
  try {
    return await apiClient({
      method: 'post',
      url: `/content/`,
      data,
    });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const GET_PROFILE_FORM = async ({ queryKey }) => {
  try {
    const [, , id] = queryKey;
    return await apiClient({
      method: 'get',
      url: `/teacher-profile/subject/${id}`,
    });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const CREATE_TEACHER_PROFILE = async ({ id, data }) => {
  try {
    return await apiClient({
      method: 'post',
      url: `/teacher-profile/${id}`,
      data,
    });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const UPDATE_TEACHER_PROFILE = async ({ id, data }) => {
  try {
    return await apiClient({
      method: 'patch',
      url: `/teacher-profile/${id}`,
      data,
    });
  } catch (e) {
    console.log(e);
    throw new Error(e);
  }
};

export const UPDATE_SUBJECT = async ({ id, data }) => {
  try {
    return await apiClient({
      method: 'patch',
      url: `/subject/${id}`,
      data,
    });
  } catch (e) {
    throw new Error(e);
  }
};
