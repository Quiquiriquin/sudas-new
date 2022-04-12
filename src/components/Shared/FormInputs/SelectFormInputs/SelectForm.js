/* eslint-disable react/no-array-index-key */
import React, { useContext } from 'react';
import { Controller } from 'react-hook-form';
/* import InputError from '../../InputError'; */
import { GeneralContext } from '../../../../context/GeneralContext';
import Select from '../../Inputs/Select';

function SelectForm({
  control,
  name,
  defaultValue,
  rules,
  errors,
  inputProps,
  label,
  className,
  style,
  defaultValueText,
  disabled,
}) {
  const { mainColor } = useContext(GeneralContext);
  const styles = {
    ...style,
  };
  if (mainColor) {
    styles.borderColor = mainColor;
    styles.boxShadow = `0px 3px 6px ${mainColor}`;
  }

  return (
    <div>
      <div className="px-6 gray-color mb-1.5 text-base">{label}</div>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue || ''}
        rules={rules}
        render={(inputState) => (
          <div className="select-wrapper">
            <Select
              disabled={inputProps.disabled}
              hasError={errors[name]}
              style={styles}
              className={`t-general-input select ${className || ''}`}
              {...inputProps}
              {...inputState}
            >
              {defaultValueText && (
                <option value="" disabled>
                  {defaultValueText || ''}
                </option>
              )}
              {inputProps.options &&
                inputProps.options.map((item, index) => (
                  <option
                    key={`select-form-${index}`}
                    value={item.value}
                    disabled={
                      item.allow &&
                      !item.allow.includes(
                        localStorage.getItem('rol')
                      )
                    }
                  >
                    {item.label}
                  </option>
                ))}
            </Select>
          </div>
        )}
      />
      {/* {errors && errors[name] && (
        <InputError>{errors[name].message}</InputError>
      )} */}
    </div>
  );
}

export default SelectForm;
