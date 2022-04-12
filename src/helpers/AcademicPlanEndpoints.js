import apiClient from './BaseClient';

export const GET_ACADEMIC_PLANS = async () => {
  try {
    return await apiClient({
      method: 'get',
      url: '/academic-plan',
    });
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const GET_ACADEMIC_PLAN = async ({ queryKey }) => {
  const [, , id] = queryKey;
  try {
    return await apiClient({
      method: 'get',
      url: `/academic-plan/${id}`,
    });
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const GET_ACADEMIC_PLAN_SUBJECTS = async ({ queryKey }) => {
  const [, , academicPlanId] = queryKey;
  try {
    return await apiClient({
      method: 'get',
      url: `/subject`,
      params: {
        academicPlanId,
      },
    });
  } catch (e) {
    console.log(e);
    return e;
  }
};

export const CREATE_ACADEMIC_PLAN = async (data) => {
  try {
    return await apiClient({
      method: 'post',
      url: `/academic-plan`,
      data,
    });
  } catch (e) {
    console.log(e);
    return e;
  }
};
