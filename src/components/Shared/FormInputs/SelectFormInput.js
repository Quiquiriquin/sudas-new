import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
/* import ReactSelect from 'react-select'; */
import Select from '../Inputs/Select';

const SelectFormInput = ({
  name,
  label,
  defaultValue = '',
  options,
  rules,
  ...props
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  return (
    <div className="mb-4">
      <div
        style={{
          color: '#757575',
          fontSize: '1rem',
          paddingTop: '2px',
        }}
        className="px-6 gray-color mb-1 text-base truncate overflow-hidden"
      >
        {label}
      </div>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        render={({ field: { ref, ...inputState } }) => (
          <Select options={options} {...props} {...inputState} />
        )}
        rules={rules}
      />
      {errors && errors[name] && (
        <div className="px-6 text-sm" style={{ color: '#FF5858' }}>
          {errors[name].message}
        </div>
      )}
    </div>
  );
};

export default SelectFormInput;
