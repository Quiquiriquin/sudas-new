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
