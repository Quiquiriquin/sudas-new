import React, { useEffect } from 'react';
import { useForm, useFormContext } from 'react-hook-form';
import FormInput from '../Shared/FormInputs/FormInput';
import Button from '../Shared/Buttons/Button';

const NewContentForm = ({
  topicName,
  topicTeoric,
  topicPractice,
  topicAA,
  autonomousLearning,
  theorySemester,
  theory,
}) => {
  const {
    formState: { isValid, isSubmitting },
    setValue,
    watch,
  } = useForm();

  useEffect(() => {
    console.log(
      Math.floor(
        parseFloat(autonomousLearning) +
          parseFloat(watch('autonomousHours') || 0)
      ) >
        parseFloat(theorySemester) * 0.3
    );

    console.log(
      parseFloat(autonomousLearning) +
        parseFloat(watch('autonomousHours')),
      parseFloat(autonomousLearning),
      parseFloat(watch('autonomousHours'))
    );
    setValue('autonomousHours', topicAA, {
      shouldDirty: true,
    });
  }, []);

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
        />
        <FormInput
          name="practicalHours"
          label="Horas prácticas"
          defaultValue={topicPractice}
          placeholder="5"
        />
        <FormInput
          name="autonomousHours"
          label="Horas aprendizaje autónomo"
          placeholder="5"
          defaultValue={topicAA}
          type="number"
          rules={{
            max: {
              value: Math.floor(parseFloat(theory) * 0.3),
              message: `Las suma de horas de aprendizaje autónomo no pueden ser mayores a ${Math.floor(
                parseFloat(theory) * 0.3
              )} tienes ${Math.floor(
                parseFloat(autonomousLearning) +
                  parseFloat(watch('autonomousHours') || topicAA || 0)
              )} horas actualmente`,
            },
          }}
        />
      </div>
      <Button
        type="submit"
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
