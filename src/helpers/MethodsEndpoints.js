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
