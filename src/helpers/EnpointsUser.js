import apiClient from './BaseClient';

// import { buildFormData } from '../utils/BuildFormData';

// export const CHANGE_TOKENS = async () => {
//   try {
//     return await apiClient({
//       url: '/first_login',
//       method: 'post',
//     });
//   } catch (e) {
//     throw e.response.data;
//   }
// };

export const LOGIN = async (data) => {
  try {
    return await apiClient({
      url: '/users/login',
      method: 'post',
      data,
    });
  } catch (e) {
    console.error(e);
    throw e.response.data;
  }
};

export const REGISTER_USER_DASHBOARD = async (body) => {
  try {
    return await apiClient({
      url: '/users/users-dashboard',
      method: 'post',
      data: body,
    });
  } catch (e) {
    console.error(e);
    throw e.response.data;
  }
};

// export const SEND_PASSWORD_VERIFICATION_CODE = async (data) => {
//   try {
//     return await apiClient({
//       method: 'post',
//       url: '/sendMailResetPassword',
//       data,
//     });
//   } catch (e) {
//     if (e.response && e.response.data) {
//       throw e.response.data;
//     }
//     throw new Error(e);
//   }
// };

// export const VERIFY_PASSWORD_CODE = async (data) => {
//   try {
//     return await apiClient({
//       method: 'post',
//       url: '/verifyResetCode',
//       data,
//     });
//   } catch (e) {
//     if (e.response && e.response.data) {
//       throw e.response.data;
//     }
//     throw new Error(e);
//   }
// };

// export const RESET_PASSWORD = async (data) => {
//   try {
//     return await apiClient({
//       method: 'post',
//       url: '/resetPassword',
//       data,
//     });
//   } catch (e) {
//     if (e.response && e.response.data) {
//       throw e.response.data;
//     }
//     throw new Error(e);
//   }
// };

// export const CHANGE_PASSWORD_LOGED_IN = async (data) => {
//   try {
//     return await apiClient({
//       method: 'post',
//       url: '/changePassword',
//       data,
//     });
//   } catch (e) {
//     if (e.response && e.response.data) {
//       throw e.response.data;
//     }
//     throw new Error(e);
//   }
// };

// export const VERIFY_CODE = async (data) => {
//   try {
//     return await apiClient({
//       method: 'post',
//       url: '/verifyCode',
//       data,
//     });
//   } catch (e) {
//     if (e.response && e.response.data) {
//       throw e.response.data;
//     }
//     throw new Error(e);
//   }
// };

// export const RESEND_CODE = async (data) => {
//   try {
//     return await apiClient({
//       method: 'post',
//       url: '/resendCode',
//       data,
//     });
//   } catch (e) {
//     if (e.response && e.response.data) {
//       throw e.response.data;
//     }
//     throw new Error(e);
//   }
// };

export const SIGNUP_MAIL = async (data) => {
  try {
    return await apiClient({
      url: '/users',
      method: 'post',
      data,
    });
  } catch (e) {
    console.log(e);
    if (e.response && e.response.data) {
      throw e.response.data;
    }
    throw new Error(e);
  }
};

// export const GET_INFO_USER = async () => {
//   try {
//     return await apiClient({
//       method: 'get',
//       url: '/infoUser',
//     });
//   } catch (e) {
//     console.log(e);
//     return e;
//   }
// };

// export const INIT_INFO_USER = async (data) => {
//   try {
//     return await apiClient({
//       method: 'post',
//       url: '/infoUser',
//       data,
//     });
//   } catch (e) {
//     console.log(e);
//     return e;
//   }
// };

// export const UPDATE_USER_AVATAR = async (data) => {
//   try {
//     const form_data = buildFormData(data);
//     return await apiClient({
//       method: 'post',
//       url: '/infoUser/avatar',
//       data: form_data,
//     });
//   } catch (e) {
//     return e;
//   }
// };

// export const UPDATE_INFO_USER = async (data) => {
//   try {
//     return await apiClient({
//       method: 'patch',
//       url: '/infoUser',
//       data,
//     });
//   } catch (e) {
//     return e;
//   }
// };

// export const GET_DEVICES = async () => {
//   try {
//     return await apiClient({
//       url: '/devices',
//     });
//   } catch (e) {
//     throw new Error(e);
//   }
// };

// export const DELETE_DEVICE = async (id) => {
//   try {
//     return await apiClient({
//       url: `/devices?deviceId=${id}`,
//       method: 'delete',
//     });
//   } catch (e) {
//     throw new Error(e);
//   }
// };

// export const GET_TEAM_USERS = async () => {
//   try {
//     return await apiClient({
//       url: `/users/team`,
//       method: 'get',
//     });
//   } catch (error) {
//     throw new Error(error);
//   }
// };

// export const DELETE_USER = async (id) => {
//   try {
//     return await apiClient({
//       url: `/users/${id}`,
//       method: 'delete',
//     });
//   } catch (error) {
//     throw new Error(error);
//   }
// };

export const GET_USERS = async ({ queryKey }) => {
  const [, , query] = queryKey;
  console.log(query);
  try {
    return await apiClient({
      url: '/users',
      method: 'get',
      params: {
        filter: query,
      },
    });
  } catch (e) {
    throw new Error(e);
  }
};

export const GET_USER = async ({ queryKey }) => {
  const [, id] = queryKey;
  try {
    return await apiClient({
      url: `/users/${id}`,
      method: 'get',
    });
  } catch (e) {
    throw new Error(e);
  }
};

export const UPDATE_USER = async ({ id, data }) => {
  try {
    return await apiClient({
      url: `/users/${id}`,
      method: 'patch',
      data,
    });
  } catch (e) {
    throw new Error(e);
  }
};

export const LOGOUT = async () => {
  try {
    return await apiClient({
      url: `/logout`,
      method: 'post',
    });
  } catch (error) {
    throw new Error(error);
  }
};

export const GET_AVAILABLE_TEACHERS = async () => {
  try {
    return await apiClient({
      url: `/users/available-users`,
      method: 'get',
    });
  } catch (error) {
    throw new Error(error);
  }
};

// export const DELETE_USER_PERMANENT = async (id) => {
//   try {
//     return await apiClient({
//       url: `/users/${id}/permanent`,
//       method: 'delete',
//     });
//   } catch (error) {
//     throw new Error(error);
//   }
// };

export const ACTIVATE_USER = async (id) => {
  try {
    return await apiClient({
      url: `/users/${id}`,
      method: 'post',
    });
  } catch (e) {
    return e;
  }
};
