import React from 'react';
import { useFormContext } from 'react-hook-form';
import FormInput from '../Shared/FormInputs/FormInput';
import PasswordInput from '../Shared/FormInputs/PasswordInput';
import Button from '../Shared/Buttons/Button';

const LoginForm = () => {
  const {
    formState: { isValid, isSubmitting },
  } = useFormContext();
  return (
    <div className="w-96 flex p-8 mx-auto flex-col">
      <div className="mb-2">
        <FormInput
          name="email"
          label="Correo electrónico"
          defaultValue=""
          placeholder="ejemplo@ipn.mx"
          rules={{
            required: 'Ingresa tu correo electrónico',
          }}
        />
      </div>
      <div>
        <PasswordInput
          name="password"
          defaultValue=""
          label="Contraseña"
          placeholder="*************"
          rules={{
            required: 'Ingresa tu contraseña',
          }}
        />
      </div>

      <Button
        className="mt-6"
        primary
        disabled={!isValid || isSubmitting}
      >
        Iniciar sesión
      </Button>
    </div>
  );
};

export default LoginForm;
