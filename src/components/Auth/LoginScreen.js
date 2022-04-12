import React, { useContext } from 'react';

import { NavLink } from 'react-router-dom';
import { useMutation } from 'react-query';

// eslint-disable-next-line import/no-unresolved
import { LOGIN } from '../../helpers/EnpointsUser';

import { GeneralContext } from '../../context/GeneralContext';
import FormWrapper from '../Forms/FormWrapper';
import LoginForm from '../Forms/LoginForm';

const LoginScreen = () => {
  const { mutateAsync } = useMutation(LOGIN);

  // const { dispatch } = useContext(GeneralContext);

  const onSubmit = async (values) => {
    const ans = await mutateAsync(values);
  };

  return (
    <div className="w-screen h-screen bg-alabaster flex flex-row items-center justify-center overflow-hidden">
      <div className="container bg-white rounded shadow flex">
        <div className="bg-prusian-blue py-36 w-1/2">
          <h1 className="text-white text-center text-7xl">
            <p>Gestión de</p>
            <p>unidades de </p>
            <p>aprendizaje</p>
          </h1>
        </div>
        <div className="p-8 w-1/2 flex flex-col justify-between ">
          <div>
            <h2 className="text-marigold text-4xl text-center">
              Inicio de sesión
            </h2>
          </div>
          <div>
            <FormWrapper onSubmit={onSubmit}>
              <LoginForm />
            </FormWrapper>
          </div>
          <div>
            <div className="container flex flex-row-reverse space-x-4 space-x-reverse">
              <NavLink
                exact
                className="text-marigold"
                to="/auth/register"
              >
                Registro
              </NavLink>
              <p className="mr-3 ml-3">¿Ya estas registrado? </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginScreen;
