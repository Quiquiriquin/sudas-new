import React from 'react';
import { useFormContext } from 'react-hook-form';
import FormInput from '../Shared/FormInputs/FormInput';
import PasswordInput from '../Shared/FormInputs/PasswordInput';
import Button from '../Shared/Buttons/Button';
import SelectFormInput from '../Shared/FormInputs/SelectFormInput';

const SignupForm = () => {
  const {
    formState: { isValid },
  } = useFormContext();
  return (
    <div className="w-96 flex p-8 mx-auto flex-col">
      <div className="flex gap-6 mb-2">
        <FormInput
          name="name"
          label="Nombre"
          defaultValue=""
          placeholder="John"
          rules={{
            required: 'Ingresa tu nombre',
          }}
        />
        <FormInput
          name="firstSurname"
          label="Apellido"
          defaultValue=""
          placeholder="Doe"
          rules={{
            required: 'Ingresa tu apellido',
          }}
        />
      </div>
      <div className="">
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
          autoComplete="off"
          rules={{
            required: 'Ingresa tu contraseña',
          }}
        />
      </div>
      <div className="">
        <SelectFormInput
          options={[
            {
              value: 'licenciatura',
              label: 'Licenciatura',
            },
            {
              value: 'maestria',
              label: 'Maestria',
            },
            {
              value: 'doctorado',
              label: 'Doctorado',
            },
          ]}
          name="academicGrade"
          label="Grado académico"
          defaultValue=""
          placeholder="Licenciatura"
        />
      </div>

      <Button className="mt-6" primary disabled={!isValid}>
        Registrar
      </Button>
    </div>
  );
};

export default SignupForm;
