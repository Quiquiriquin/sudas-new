import React, { memo, useState } from 'react';
import moment from 'moment';
import { Controller, useFormContext } from 'react-hook-form';
import { Popover } from 'antd';
import Input from '../Inputs/Input';
import CalendarPopover from '../Popover/Calendar';

const DatePickerFormInput = memo(
  ({ label, name, rules, defaultValue = '', ...props }) => {
    const {
      control,
      formState: { errors },
      watch,
      setFocus,
      register,
    } = useFormContext();
    const watchField = watch(name);
    const [visibleCalendar, setVisibleCalendar] = useState(false);
    const outsideClose = () => setVisibleCalendar(false);
    return (
      <div className="mb-4 relative">
        {label && (
          <label
            style={{
              color: '#757575',
              fontSize: '1rem',
            }}
            className="px-6 inline-block mb-2"
          >
            {label}
          </label>
        )}
        <div className={!label ? 'mt-6' : ''}>
          <Popover
            zIndex={2000}
            visible={visibleCalendar}
            overlayClassName="teament-popover calendar"
            content={
              <CalendarPopover
                rules={rules}
                toggleVisible={outsideClose}
                name={name}
              />
            }
          >
            <Input
              {...register(name)}
              onFocus={() => {
                setVisibleCalendar(true);
              }}
              value={
                watchField &&
                moment(new Date(watchField)).format('DD.MM.YYYY')
              }
              hasError={errors && errors[name]}
              readonly
              placeholder="Selecciona la fecha"
              autoComplete="off"
              {...props}
            />
          </Popover>

          {errors && errors[name] && (
            <div
              className="px-6 text-xs absolute"
              style={{ color: '#FF5858' }}
            >
              {errors[name].message}
            </div>
          )}
        </div>
      </div>
    );
  }
);

export default DatePickerFormInput;
