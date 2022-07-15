import React, { Fragment, useContext } from 'react';
import ReactSelect, { components } from 'react-select';
import ReactCreatable from 'react-select/creatable';
import { Controller, useFormContext } from 'react-hook-form';
import close from '../../../assets/svgs/close.svg';

const MultiSelect = ({
  options,
  defaultValue = null,
  name,
  label,
  create = false,
  normalSize,
  placeholder,
  rules,
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext();
  const Option = (props) => {
    return (
      <>
        <components.Option {...props}>
          {/* eslint-disable-next-line react/destructuring-assignment */}
          <div className="selected-skill">{props.data.label}</div>
        </components.Option>
      </>
    );
  };

  const MultiValueRemove = (props) => {
    return (
      <>
        <components.MultiValueRemove {...props}>
          <img
            src={close}
            alt="cerrar"
            style={{
              maxWidth: 'none',
              width: '24px',
              height: '24px',
            }}
          />
        </components.MultiValueRemove>
      </>
    );
  };

  const selectOptions = {
    menu: (base) => ({
      ...base,
      left: 0,
      zIndex: 9999,
    }),
    menuList: (base) => ({
      ...base,
      left: 0,
    }),
    menuPortal: (base) => ({
      ...base,
      left: 0,
      top: 0,
      position: 'fixed',
    }),
    control: (styles, { isFocused }) => {
      return {
        ...styles,
        border: isFocused ? '1px solid #81C5ED' : '1px solid #b3b3b3',
        outlineColor: isFocused
          ? '1px solid #81C5ED'
          : '1px solid #b3b3b3',
        minHeight: normalSize ? '48px' : '80px',
        padding: normalSize ? '0 1rem' : '1rem',
        // overflow: 'auto',
        fontSize: '1rem',
        ':hover': {
          boxShadow: '0px 6px 12px #3D4B5C26',
        },
      };
    },
    multiValue: (styles, { data }) => {
      return {
        ...styles,
        backgroundColor: '#F2F2F2',
        border: '1px solid #F2F2F2',
        fontWeight: 700,
        minHeight: normalSize ? '48px' : '80px',
        display: 'flex',
        alignItems: 'center',
        paddingLeft: '16px',
        paddingRight: '16px',
        fontSize: '1rem',
        boxShadow: '0px 6px 12px #3D4B5C26',
        margin: '12px 24px 12px 2px',
      };
    },
    multiValueRemove: (styles, { data }) => {
      return {
        ...styles,
        fontSize: '24px',
        height: '24px',
        width: '24px',
        ':hover': {
          cursor: 'pointer',
        },
      };
    },
    option: (styles, { isDisabled, isFocused, isSelected }) => {
      // const color = chroma(data.color);
      return {
        ...styles,
        // eslint-disable-next-line no-nested-ternary
        backgroundColor: isDisabled
          ? null
          : isSelected || isFocused
          ? '#F2F2F2'
          : null,
        color: isDisabled ? '#ccc' : undefined,
        cursor: isDisabled ? 'not-allowed' : 'pointer',

        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled && isSelected && '#F2F2F2',
        },
      };
    },
  };

  return (
    <div>
      <p className="px-6 gray-color mb-1.5 text-base">{label}</p>
      <Controller
        control={control}
        name={name}
        defaultValue={defaultValue}
        rules={rules}
        render={({ field: { ref: innerRedf, ...inputState } }) =>
          create ? (
            <ReactCreatable
              closeMenuOnSelect
              // onChange={(e) => console.log(e)}
              formatCreateLabel={(userInput) =>
                `Crear  "${userInput}"`
              }
              placeholder={placeholder}
              components={{
                Option,
                MultiValueRemove,
                IndicatorSeparator: () => null,
              }}
              styles={selectOptions}
              options={options}
              menuPosition="absolute"
              menuPlacement="auto"
              menuShouldBlockScroll
              {...inputState}
            />
          ) : (
            <ReactSelect
              closeMenuOnSelect={false}
              // onChange={(e) => console.log(e)}
              placeholder={placeholder}
              components={{
                Option,
                MultiValueRemove,
                IndicatorSeparator: () => null,
              }}
              styles={selectOptions}
              options={options}
              menuPosition="absolute"
              menuPlacement="auto"
              menuShouldBlockScroll
              {...inputState}
            />
          )
        }
      />
      {errors && errors[name] && (
        <div className="px-6 text-sm" style={{ color: '#FF5858' }}>
          {errors[name].message}
        </div>
      )}
    </div>
  );
};

export default MultiSelect;
