import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import ReactSwitch from 'react-switch';

const SwitchFormInput = ({ name }) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { ref, onChange, value, ...field } }) => (
        <ReactSwitch
          onColor="#CFF4D7"
          offColor="#f2f2f2"
          offHandleColor="#b3b3b3"
          onHandleColor="#34BE44"
          checked={value}
          onChange={onChange}
          uncheckedIcon={false}
          checkedIcon={false}
          handleDiameter={18}
          height={24}
          width={48}
          {...field}
        />
      )}
    />
  );
};

export default SwitchFormInput;
