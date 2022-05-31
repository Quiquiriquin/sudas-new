import React, { useContext } from 'react';
import ReactSelect, { components } from 'react-select';
import { GeneralContext } from '../../../context/GeneralContext';

const Select = ({ options, ...propsComponent }) => {
  const { selectedTheme, themes } = useContext(GeneralContext);
  const Option = ({ ...props }) => {
    return (
      <>
        <components.Option {...props}>
          <div>
            <div>{props.data.label}</div>
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
    menu: (base) => ({
      ...base,
      zIndex: 9999,
    }),
    container: (styles, { isFocused, ...props }) => {
      return {
        ...styles,
        ...(propsComponent.small
          ? {
              maxHeight: '32px',
            }
          : {}),
      };
    },
    control: (styles, { isFocused, ...props }) => {
      return {
        ...styles,
        ...(propsComponent.type === 'borderless'
          ? { border: 'none !important' }
          : {
              border:
                isFocused && !propsComponent.type
                  ? `1px solid ${themes[selectedTheme].secondary}`
                  : '1px solid #b3b3b3',
            }),
        height: propsComponent.small ? '32px' : '48px',
        maxHeight: propsComponent.small ? '32px' : '48px',
        minHeight: propsComponent.small ? '32px' : '38px',
        ...(props.type === 'borderless'
          ? {
              borderRadius: 0,
              borderColor: 'none !important',
            }
          : {}),
        paddingLeft: '1rem',
        fontSize: propsComponent.small ? '12px' : '1rem',
        ...(propsComponent.type === 'borderless'
          ? {}
          : {
              ':hover': {
                boxShadow: '0px 6px 12px #3D4B5C26',
              },
            }),
        ...(isFocused && !propsComponent.type
          ? {
              outlineColor: isFocused
                ? `${themes[selectedTheme].secondary}`
                : '#b3b3b3',
            }
          : {}),
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
        padding: '0.5rem 1.5rem',
        cursor: isDisabled ? 'not-allowed' : 'pointer',
        ':active': {
          ...styles[':active'],
          backgroundColor: !isDisabled && isSelected && '#F2F2F2',
        },
      };
    },
  };

  return (
    <ReactSelect
      placeholder="Seleccionar"
      components={{
        Menu,
        Option,
        IndicatorSeparator: () => null,
      }}
      theme={(theme) => ({
        ...theme,
        colors: {
          ...theme.colors,
          primary: themes[selectedTheme].secondary,
        },
      })}
      menuPlacement="auto"
      menuPosition="absolute"
      menuShouldBlockScroll
      styles={coloursOption}
      options={options}
      {...propsComponent}
    />
  );
};

export default Select;
