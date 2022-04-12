/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
import React from 'react';
import {
  TimePickerComponent,
  Inject,
  MaskedDateTime,
} from '@syncfusion/ej2-react-calendars';
import { Controller, useFormContext } from 'react-hook-form';

const TimeInput = ({
  id,
  name,
  placeholder,
  label,
  style,
  width,
  rules,
  ...props
}) => {
  const { control } = useFormContext();

  const timeInput = document.getElementById(`timepicker-${id}`);
  const dateInputMask = (event) => {
    if (event.keyCode < 47 || event.keyCode > 57) {
      return 0;
    }

    const len = timeInput.value.length;
    timeInput.setAttribute('maxLength', 5);

    if (len !== 1 || len !== 3) {
      if (event.keyCode === 47) {
        return 0;
      }
    }

    if (len === 2) {
      timeInput.value += ':';
    }
  };

  timeInput && (timeInput.onkeyup = (event) => dateInputMask(event));

  return (
    <div className="" style={{ maxHeight: '48px' }}>
      {label && (
        <div
          className="text-base"
          style={{
            color: '#757575',
          }}
        >
          <label className="px-6 inline-block mb-2">{label}</label>
        </div>
      )}
      <div>
        <Controller
          name={name}
          control={control}
          rules={rules}
          render={({ field, formState: { errors } }) => (
            <>
              <TimePickerComponent
                id={`timepicker-${id}`}
                cssClass="e-custom-style"
                placeholder={placeholder}
                format={{
                  skeleton: 'Hm',
                }}
                maskPlaceholder={{
                  hour: 'HH',
                  minute: 'MM',
                }}
                openOnFocus
                strictMode
                step={15}
                scrollTo={new Date()}
                style={style}
                width={width}
                {...field}
              >
                <Inject services={[MaskedDateTime]} />
              </TimePickerComponent>
              {errors && errors[name] && (
                <label
                  className={`text-sm block ${label ? 'px-6' : ''}`}
                  style={{
                    color: '#FF5858',
                    position: 'absolute',
                  }}
                >
                  {errors[name].message}
                </label>
              )}
            </>
          )}
        />
      </div>
    </div>
  );
};

export default TimeInput;
