import React, { useContext, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useQuery } from 'react-query';
import Button from '../Shared/Buttons/Button';
import FormInput from '../Shared/FormInputs/FormInput';
import { SubjectContext } from '../../context/SubjectContext';

const PracticeForm = () => {
  const { subject } = useContext(SubjectContext);
  const { watch, formState } = useFormContext();
  return (
    <div className="w-full">
      <div className="w-full flex justify-between pt-4">
        <FormInput
          name="practicePlace"
          label="Lugar de realización"
          defaultValue={subject?.practicePlace || ''}
          placeholder="Laboratorio..."
          className="w-96 flex-none"
        />
      </div>
      <div className="flex flex-row-reverse">
        <div className="w-44">
          <Button
            disabled={!formState.isDirty}
            type="submit"
            secondary
          >
            Guardar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PracticeForm;
