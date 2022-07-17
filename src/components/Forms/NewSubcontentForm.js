import React, { useEffect } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import FormInput from '../Shared/FormInputs/FormInput';
import Button from '../Shared/Buttons/Button';

const NewSubontentForm = ({ subtopic = '' }) => {
  const {
    formState: { isValid, isSubmitting },
    watch,
  } = useForm();

  return (
    <div className="w-full flex p-8 mx-auto flex-col">
      <div className="mb-2">
        <FormInput
          name="name"
          label="Nombre"
          defaultValue={subtopic}
          placeholder="Nombre del subcontenido..."
          rules={{
            required: 'Ingresa la el nombre del subcontenido',
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

export default NewSubontentForm;
