import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useQuery } from 'react-query';
import Button from '../Shared/Buttons/Button';
import FormInput from '../Shared/FormInputs/FormInput';
import SelectFormInput from '../Shared/FormInputs/SelectFormInput';

const NewPracticesForm = ({
  namePractice = '',
  hours = 0.0,
  place = '',
}) => {
  const { watch } = useFormContext();
  const strategy = watch('method', '');
  const inputs = [
    {
      name: 'name',
      placeholder: 'Nombre de la práctica',
      label: 'Nombre de la practica. ',
      defaultValue: namePractice,
      rules: {
        required: 'Inserta el nombre de la práctica ',
      },
    },
    {
      name: 'hours',
      placeholder: '1.0',
      label: 'horas',
      defaultValue: hours,
      rules: {
        required: 'Inserta las horas de la práctica',
      },
    },
    {
      name: 'place',
      placeholder: 'Laboratorio',
      label: 'Lugar de realización',
      defaultValue: place,
      rules: {
        required: 'Inserta las horas de la práctica',
      },
    },
  ];

  return (
    <div className="w-full">
      <div className="mb-2">
        <FormInput {...inputs[0]} />
        <FormInput {...inputs[1]} />
        <FormInput {...inputs[2]} />
      </div>
      <div className="flex flex-row-reverse p-2">
        <div className="w-44">
          <Button type="submit" secondary>
            Guardar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewPracticesForm;
