import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import Button from '../Shared/Buttons/Button';
import FormInput from '../Shared/FormInputs/FormInput';
import TextAreaFormInput from '../Shared/FormInputs/TextAreaFormInput';

const IntentionForm = ({ intention }) => {
  const { setValue } = useFormContext();

  useEffect(() => {
    setValue('intention', intention);
  }, [intention]);

  return (
    <div className="w-full flex p-8 mx-auto flex-col">
      <div className="mb-2">
        <TextAreaFormInput
          noResize
          name="educationalIntention"
          rows={5}
          label="Intención educativa"
          defaultValue={intention}
          placeholder="La unidad de aprendizaje..."
        />
      </div>
    </div>
  );
};

export default IntentionForm;
