import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

const FormWrapper = ({ children, className, onSubmit, ...props }) => {
  const methods = useForm({
    mode: 'all',
  });
  return (
    <FormProvider {...methods}>
      <form
        className={className}
        onSubmit={methods.handleSubmit(onSubmit)}
      >
        {React.cloneElement(children, {}, children)}
      </form>
    </FormProvider>
  );
};

export default FormWrapper;
