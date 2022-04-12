import React, { useState, memo } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import Input from '../Inputs/Input';
import { ReactComponent as EyeIcon } from '../../../assets/svgs/eye.svg';
import { ReactComponent as EyeOff } from '../../../assets/svgs/eye-off.svg';
import FormInput from './FormInput';

const PasswordInput = ({
  label,
  name,
  rules,
  defaultValue = '',
  ...props
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const [localType, setLocalType] = useState('password');
  const handleShowHide = () => {
    setLocalType(localType === 'password' ? 'text' : 'password');
  };
  return (
    <div className="mb-4">
      <label
        style={{
          color: '#757575',
          fontSize: '1rem',
        }}
        className="px-6 inline-block mb-2"
      >
        {label}
      </label>
      <div>
        <Controller
          name={name}
          rules={rules}
          control={control}
          defaultValue={defaultValue}
          render={({ field: { ref: innerRef, ...field } }) => (
            <div className="relative">
              {localType === 'password' ? (
                <EyeOff
                  onClick={handleShowHide}
                  id="eyeOff"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: '24px',
                    bottom: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                  }}
                />
              ) : (
                <EyeIcon
                  onClick={handleShowHide}
                  id="eye"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: '24px',
                    bottom: '50%',
                    transform: 'translateY(-50%)',
                    cursor: 'pointer',
                  }}
                />
              )}
              <Input
                hasError={errors && errors[name]}
                {...field}
                {...props}
                type={localType}
              />
            </div>
          )}
        />
        {errors && errors[name] && (
          <div className="px-6 text-sm" style={{ color: '#FF5858' }}>
            {errors[name].message}
          </div>
        )}
      </div>
    </div>
  );
};
export default PasswordInput;
