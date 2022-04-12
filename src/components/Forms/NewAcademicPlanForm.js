import React from 'react';
import { useFormContext } from 'react-hook-form';
import FormInput from '../Shared/FormInputs/FormInput';
import SelectFormInput from '../Shared/FormInputs/SelectFormInput';
import Button from '../Shared/Buttons/Button';

const NewAcademicPlanForm = () => {
  const {
    formState: { isValid, isSubmitting },
  } = useFormContext();

  const inputs = [
    {
      name: 'name',
      placeholder: 'Químico Farmacéutico Industrial',
      label: 'Nombre del plan académico',
      rules: {
        required: 'Inserta el nombre del plan académico',
      },
    },
    {
      name: 'shortName',
      placeholder: 'QFI',
      label: 'Siglas',
      rules: {
        required: 'Inserta las siglas',
      },
    },
    {
      name: 'semesters',
      placeholder: '8',
      label: 'No. de semestres',
      rules: {
        required: 'Inserta el número de semestres',
      },
    },
    {
      name: 'modality',
      placeholder: 'Selecciona',
      label: 'Modalidad',
      options: [
        {
          value: 'FACE2FACE',
          label: 'Escolarizada',
        },
        {
          value: 'ONLINE',
          label: 'En línea',
        },
        {
          value: 'MIX',
          label: 'Mixto',
        },
      ],
      rules: {
        required: 'Selecciona la modalidad',
      },
    },
    {
      name: 'period',
      placeholder: '2020/1',
      label: 'Periodo',
      rules: {
        required: 'Inserta el periodo',
      },
    },
  ];

  return (
    <div>
      <div className="w-full">
        <FormInput {...inputs[0]} />
      </div>
      <div className="flex gap-4">
        <div className="w-full">
          <FormInput {...inputs[1]} />
        </div>
        <div className="w-full">
          <FormInput {...inputs[2]} />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="w-full">
          <SelectFormInput {...inputs[3]} />
        </div>
        <div className="w-full">
          <FormInput {...inputs[4]} />
        </div>
      </div>
      <div className="flex justify-end">
        <Button
          disabled={!isValid || isSubmitting}
          style={{ maxWidth: '130px' }}
          type="submit"
          primary
        >
          Crear
        </Button>
      </div>
    </div>
  );
};

export default NewAcademicPlanForm;
