import React, { memo } from 'react';
import { useFormContext, Controller } from 'react-hook-form';
import 'react-phone-number-input/style.css';
import PhoneInput from 'react-phone-number-input';
import es from 'react-phone-number-input/locale/es.json';
import Input from '../Inputs/Input';

const FormInput = memo(
  ({ label, name, rules, defaultValue = '', ...props }) => {
    const { control } = useFormContext();
    return (
      <div className="mb-4 relative">
        <label
          style={{
            color: '#757575',
            fontSize: '1rem',
          }}
          className="px-6 inline-block mb-1 truncate w-full"
        >
          {label}
        </label>
        <div style={{ marginTop: '-4px' }}>
          <Controller
            name={name}
            rules={rules}
            control={control}
            defaultValue={defaultValue}
            render={({
              field: { ref: innerRef, ...field },
              formState: { errors },
            }) => (
              <>
                {name === 'phone_number' ? (
                  <PhoneInput
                    labels={es}
                    international
                    countryCallingCodeEditable={false}
                    defaultCountry="MX"
                    maxLength={17}
                    className="t-general-input"
                    {...field}
                    {...props}
                  />
                ) : (
                  <Input
                    hasError={errors && errors[name]}
                    {...field}
                    {...props}
                  />
                )}
                {console.log(errors)}
                {errors && errors[name] && (
                  <div
                    className="px-6 text-xs absolute"
                    style={{ color: '#FF5858' }}
                  >
                    {errors[name].message}
                  </div>
                )}
              </>
            )}
          />
        </div>
      </div>
    );
  }
);
export default FormInput;
