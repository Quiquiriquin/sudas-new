import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import Input from '../../Inputs/Input';
import './CheckboxFormInput.scss';

const CheckboxFormInput = ({
  name,
  defaultValue = false,
  rules,
  label,
  ...props
}) => {
  const { control } = useFormContext();
  return (
    <div className="relative">
      <div>
        <Controller
          name={name}
          rules={rules}
          control={control}
          defaultValue={defaultValue}
          render={({
            field: { ref: innerRef, onChange, ...field },
            formState: { errors },
          }) => (
            <label
              className="container-checkbox text-base"
              style={{
                color: '#757575',
                fontSize: '1rem',
              }}
            >
              {label}
              <input
                ref={innerRef}
                type="checkbox"
                checked={field.value}
                onChange={(e) => onChange(e.target.checked)}
                {...props}
                {...field}
              />
              <span className="checkmark" />
            </label>
          )}
        />
      </div>
    </div>
  );
};

export default CheckboxFormInput;
