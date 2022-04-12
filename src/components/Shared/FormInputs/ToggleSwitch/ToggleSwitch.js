/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React from 'react';
import './ToggleSwitch.scss';

const ToggleSwitch = React.forwardRef(
  (
    {
      name,
      size,
      disabled = false,
      optionLabels = ['No', 'Si'],
      onChange,
      form,
      ...props
    },
    ref
  ) => {
    const handleChange = (e) => {
      if (onChange) {
        onChange();
      }
    };

    return (
      <div className={`toggle-switch ${size}`}>
        <input
          type="checkbox"
          name={name}
          className="toggle-switch-checkbox"
          id={name}
          disabled={disabled}
          {...ref('switch')}
          {...props}
        />
        <label
          className="toggle-switch-label"
          htmlFor={name}
          tabIndex={disabled ? -1 : 1}
          onKeyDown={handleChange}
          onClick={handleChange}
        >
          <span
            className={
              disabled
                ? 'toggle-switch-inner toggle-switch-disabled'
                : 'toggle-switch-inner'
            }
            data-yes={optionLabels[0]}
            data-no={optionLabels[1]}
          />
          <span
            className={
              disabled
                ? 'toggle-switch-switch toggle-switch-disabled'
                : 'toggle-switch-switch'
            }
          />
        </label>
      </div>
    );
  }
);

export default ToggleSwitch;
