import React from 'react';
import ReactInputVerificationCode from 'react-input-verification-code';
import { Controller, useFormContext } from 'react-hook-form';

const VerificationCodeInput = ({ name }) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      rules={{
        pattern: {
          value: /^[0-9]*$/,
          message: 'Ingresa el código de verificación',
        },
      }}
      render={({ field: { ref: innerRef, ...field } }) => (
        <ReactInputVerificationCode
          placeholder="-"
          autoFocus
          length={6}
          {...field}
        />
      )}
    />
  );
};

export default VerificationCodeInput;
