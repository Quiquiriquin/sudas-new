import React, { Fragment } from 'react';
import ReactSelect, { components } from 'react-select';
import { useFormContext, Controller } from 'react-hook-form';
import { nanoid } from 'nanoid';

const SelectColors = ({ label, options }) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();

  const SingleValue = ({ children, ...props }) => {
    return (
      <components.SingleValue {...props}>
        <div className="">{props.data.label}</div>
        <div className="flex gap-4 ">
          {props.data.palette.map((elem) => (
            <div
              key={nanoid('4')}
              style={{
                background: elem,
                height: '24px',
                width: '24px',
              }}
            />
          ))}
        </div>
      </components.SingleValue>
    );
  };

  const Option = ({ ...props }) => {
    return (
      <>
        <components.Option {...props}>
          <div className="flex items-center justify-between px-2">
            <div>{props.data.label}</div>
            <div
              className="flex justify-between"
              style={{ width: '104px' }}
            >
              {props.data.palette.map((color, index) => (
                <div
                  key={`${nanoid(5)}`}
                  style={{
                    width: '24px',
                    height: '24px',
                    background: color,
                  }}
                />
              ))}
            </div>
          </div>
        </components.Option>
      </>
    );
  };

  const Menu = ({ children, ...props }) => {
    return (
      <>
        <components.Menu {...props}>
          <div>
            <div>{children}</div>
          </div>
        </components.Menu>
      </>
    );
  };

  const coloursOption = {
    singleValue: (base) => ({
      ...base,
      width: '100%',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    }),
    menu: (base) => ({
      ...base,
      zIndex: 9999,
    }),
    control: (styles, { isFocused, ...props }) => {
      return {
        ...styles,
        border: isFocused ? '1px solid #1791E4' : '1px solid #b3b3b3',
        height: '48px',
        paddingLeft: '1rem',
        fontSize: '1rem',
        width: '100%',
        ':hover': {
          boxShadow: '0px 6px 12px #3D4B5C26',
        },
      };
    },
    option: (styles, { data, isDisabled, isFocused, isSelected }) => {
      // const color = chroma(data.color);
      return {
        ...styles,
        // eslint-disable-next-line no-nested-ternary
        backgroundColor: isDisabled
          ? null
          : isSelected || isFocused
          ? '#F2F2F2'
          : null,
        // eslint-disable-next-line no-nested-ternary
        color: isDisabled ? '#ccc' : '#606060',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled && isSelected && '#F2F2F2',
        },
      };
    },
  };

  return (
    <>
      <div className="px-6 gray-color mb-1.5 text-base">{label}</div>
      <Controller
        control={control}
        name="company_colors"
        defaultValue=""
        render={({ field: { ref, ...inputState } }) => (
          <ReactSelect
            {...inputState}
            placeholder="Seleccionar"
            components={{
              Menu,
              Option,
              IndicatorSeparator: () => null,
              SingleValue,
            }}
            styles={coloursOption}
            options={options}
          />
        )}
        rules={{
          required: 'Selecciona una opción de colores',
        }}
      />
      {errors && errors.company_colors && (
        <div className="px-6 text-sm" style={{ color: '#FF5858' }}>
          {errors.company_colors.message}
        </div>
      )}
    </>
  );
};

export default SelectColors;
