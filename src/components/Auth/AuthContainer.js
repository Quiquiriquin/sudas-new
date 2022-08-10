import React, { useContext, useState } from 'react';
import { NavLink, useHistory, useRouteMatch } from 'react-router-dom';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import FormWrapper from '../Forms/FormWrapper';
import LoginForm from '../Forms/LoginForm';
import SignupForm from '../Forms/SignupForm';
import { LOGIN, SIGNUP_MAIL } from '../../helpers/EnpointsUser';
import { GeneralContext } from '../../context/GeneralContext';
import { startLogin } from '../../actions/auth';

import './Auth.scss';
import {
  getSessionCookie,
  setSessionCookie,
} from '../../helpers/Sessions';
import { SessionContext } from '../../context/SessionContext';
import { setLocalStorage } from '../../utils/GeneralFunctions';

const AuthContainer = () => {
  const history = useHistory();
  const { updateUser } = useContext(GeneralContext);
  const { updateSession } = useContext(SessionContext);
  const [isLogin, setIsLogin] = useState(true);
  const { url, path } = useRouteMatch();
  console.log(url, path);
  const { mutateAsync, isLoading: isLoadingLogin } =
    useMutation(LOGIN);
  const { mutateAsync: mutateAsyncRegster } =
    useMutation(SIGNUP_MAIL);

  const setUserInfo = (info) => {
    const {
      data: { a_t, ...userInfo },
      status,
    } = info;
    console.log(userInfo);
    localStorage.setItem('a_t', a_t);
    setSessionCookie(
      JSON.stringify({
        ...userInfo,
      })
    );
    updateUser({
      ...userInfo,
    });
    updateSession(getSessionCookie());
    history.push('/');
  };

  const onSubmit = async (values) => {
    try {
      const ans = await mutateAsync(values);
      setUserInfo(ans);
    } catch (e) {
      console.log('Error');
    }
  };

  const onSubmitRegister = async (values) => {
    try {
      const body = {
        ...values,
        academicGrade: values.academicGrade.value,
      };
      await mutateAsyncRegster(body);
      const ans = mutateAsync({
        email: body.email,
        password: body.password,
      });
      setUserInfo(ans);
      toast.success('Usuario registrado exitosamente');
    } catch (e) {
      console.log(e);
      toast.error('Ocurrió un error al registrarse');
    }
  };

  return (
    <div className="auth-container w-screen h-screen flex flex-row items-center justify-center overflow-hidden">
      <div className="forms-container flex">
        <div
          className={`title-container w-1/2 flex justify-center items-center ${
            isLogin ? 'active' : 'inactive'
          }`}
        >
          <h1 className="text-white text-center text-7xl">
            Gestión de unidades de aprendizaje
          </h1>
        </div>
        <div className="p-8 w-1/2 flex flex-col justify-center ">
          <div>
            <h2 className="text-nao text-4xl text-center">
              Inicio de sesión
            </h2>
          </div>
          <div>
            <FormWrapper onSubmit={onSubmit}>
              <LoginForm />
            </FormWrapper>
          </div>
          <div
            style={{
              position: 'absolute',
              bottom: '24px',
              left: '24px',
            }}
          >
            <div className="container flex flex-row-reverse space-x-4 space-x-reverse">
              <div
                className="text-marigold cursor-pointer"
                onClick={() => setIsLogin(false)}
              >
                Registrate
              </div>
              <p className="mr-3 ml-3">¿Aún no estás registrado? </p>
            </div>
          </div>
        </div>
        <div className="p-8 w-1/2  flex flex-col justify-center">
          <div>
            <h2 className="text-marigold text-4xl text-center">
              Registro de gestión
            </h2>
          </div>
          <div>
            <FormWrapper onSubmit={onSubmitRegister}>
              <SignupForm />
            </FormWrapper>
          </div>
          {/* <NavRegister items={items} /> */}
          <div
            style={{
              position: 'absolute',
              bottom: '24px',
              right: '24px',
            }}
          >
            <div className="container flex flex-row-reverse space-x-4 space-x-reverse">
              <div
                className="text-marigold cursor-pointer"
                onClick={() => setIsLogin(true)}
              >
                Inicia Sesión
              </div>
              <p className="mr-3 ml-3">¿Ya estas registrado? </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthContainer;
