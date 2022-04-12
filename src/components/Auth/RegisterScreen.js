import React from 'react';
import { NavLink } from 'react-router-dom';
import NavRegister from './NavRegister';
import FormWrapper from '../Forms/FormWrapper';
import SignupForm from '../Forms/SignupForm';

const RegisterScreen = () => {
  const items = [true, false, false];

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
        <div className="p-8 w-1/2  flex flex-col justify-between">
          <div>
            <h2 className="text-marigold text-4xl text-center">
              Registro de gestión
            </h2>
          </div>
          <div>
            <FormWrapper>
              <SignupForm />
            </FormWrapper>
          </div>
          <div>
            <div className="container flex flex-row-reverse space-x-4 space-x-reverse">
              <NavLink
                exact
                className="text-marigold"
                to="/auth/login"
              >
                Iniciar Sesión
              </NavLink>
              <p className="mr-3 ml-3">¿Ya estas registrado? </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterScreen;
