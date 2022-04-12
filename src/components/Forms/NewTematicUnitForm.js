import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import FormInput from '../Shared/FormInputs/FormInput';
import Button from '../Shared/Buttons/Button';

const NewTematicUnitForm = ({ unitName }) => {
  const {
    formState: { isValid, isSubmitting },
    setValue,
  } = useFormContext();

  useEffect(() => {
    setValue('tematicUnit', unitName);
  }, []);

  return (
    <div className="w-full flex p-8 mx-auto flex-col">
      <div className="mb-2">
        <FormInput
          name="tematicUnit"
          label="Unidad Temática"
          defaultValue=""
          placeholder="Unidad Temática..."
          rules={{
            required: 'Ingresa la unidad tematica',
          }}
        />
      </div>
      <div className="flex justify-end">
        <div className="w-48">
          <Button
            className="mt-6"
            primary
            disabled={!isValid || isSubmitting}
          >
            Guardar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewTematicUnitForm;
