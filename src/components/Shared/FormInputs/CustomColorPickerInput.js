import React from 'react';
import styled from 'styled-components';
import { Controller, useFormContext } from 'react-hook-form';
import { padding, rgba } from 'polished';
import Input from '../Inputs/Input';

const CircleOption = styled.div`
  background: ${(props) => props.background};
  width: 24px;
  height: 24px;
  min-width: 24px;
  min-height: 24px;
  border-radius: 50%;
  &:hover {
    cursor: pointer;
    box-shadow: 0 6px 12px ${(props) => rgba(props.background, 0.33)};
  }
`;

const CustomColorPickerInput = ({
  colors,
  name,
  defaultValue,
  label,
}) => {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      defaultValue={defaultValue}
      render={({ field }) => (
        <div className="mb-4">
          <Input className="hidden" {...field} />
          <label
            className=""
            style={{
              color: '#757575',
              fontSize: '1rem',
            }}
          >
            {label}
          </label>
          <div className="flex mt-4 gap-4 items-center">
            {colors &&
              colors.map((elem) => (
                <div
                  className="flex justify-center items-center"
                  style={{
                    height: '34px',
                    width: '34px',
                    minHeight: '34px',
                    minWidth: '34px',
                    ...(field.value === elem
                      ? {
                          border: '1px solid #b3b3b3',
                          padding: '2px',
                          borderRadius: '50%',
                        }
                      : {}),
                  }}
                >
                  <CircleOption
                    select={field.value === elem}
                    onClick={() => field.onChange(elem)}
                    background={elem}
                  />
                </div>
              ))}
          </div>
        </div>
      )}
    />
  );
};

export default CustomColorPickerInput;
