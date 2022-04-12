import React, { useEffect } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import FormInput from '../Shared/FormInputs/FormInput';
import Button from '../Shared/Buttons/Button';

const NewContentForm = ({
  topicName,
  topicTeoric,
  topicPractice,
  topicAA,
}) => {
  const {
    formState: { isValid, isSubmitting },
    setValue,
  } = useForm();

  return (
    <div className="w-full flex p-8 mx-auto flex-col">
      <div className="mb-2">
        <FormInput
          name="name"
          label="Nombre"
          defaultValue={topicName}
          placeholder="Nombre del contenido..."
          rules={{
            required: 'Ingresa la el nombre del contenido',
          }}
        />
        <FormInput
          name="teoricHours"
          label="Horas teóricas"
          defaultValue={topicTeoric}
          placeholder="5"
          rules={{
            required: 'Ingresa las horas teóricas',
          }}
        />
        <FormInput
          name="practicalHours"
          label="Horas prácticas"
          defaultValue={topicPractice}
          placeholder="5"
          rules={{
            required: 'Ingresa las horas prácticas',
          }}
        />
        <FormInput
          name="autonomousHours"
          label="Horas aprendizaje autónomo"
          defaultValue={topicAA}
          placeholder="5"
          rules={{
            required: 'Ingresa las horas de aprendizaje autónomas',
          }}
        />
      </div>
      <Button
        className="mt-6"
        primary
        disabled={!isValid || isSubmitting}
      >
        Guardar
      </Button>
    </div>
  );
};

export default NewContentForm;
