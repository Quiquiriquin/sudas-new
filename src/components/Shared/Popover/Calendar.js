import React, { useRef, useState } from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { formatDate } from 'react-calendar/dist/umd/shared/dateFormatter';
import moment from 'moment';
import Calendar from 'react-calendar';
import Button from '../Buttons/Button';
import chevronLeft from '../../../assets/svgs/ChevronLeft.svg';
import chevronRight from '../../../assets/svgs/ChevronRight.svg';

import 'react-calendar/dist/Calendar.css';
import { useOutsideAlerter } from '../../../CustomHooks/useOutsideAlert';

const CalendarPopover = ({
  toggleVisible,
  name,
  rules,
  defaultValue = '',
}) => {
  const currentDate = new Date();
  const { setValue, formState } = useFormContext();
  const formatMonthSelector = (locale, date) => {
    const month = moment(date).locale('es-MX').format('MMMM YY');
    return `${month.charAt(0).toUpperCase()}${month.slice(1)}`;
  };

  const today = () => {
    setValue(name, currentDate);
  };

  const tomorrow = () => {
    const aux = moment(new Date())
      .add(1, 'days')
      .format('DD MMMM YYYY');
    setValue(name, new Date(aux));
  };

  const in2Days = () => {
    const aux = moment(new Date())
      .add(2, 'days')
      .format('DD MMMM YYYY');
    setValue(name, new Date(aux));
  };
  const calendarRef = useRef(null);
  useOutsideAlerter(calendarRef, toggleVisible);
  return (
    <Controller
      name={name}
      defaultValue={defaultValue}
      rules={rules}
      render={({ field: { onChange, ...field } }) => (
        <div ref={calendarRef}>
          <div className="flex gap-2 mb-4">
            <div className="w-full">
              <Button light small onClick={today}>
                Hoy
              </Button>
            </div>
            <div>
              <Button light small onClick={tomorrow}>
                Mañana
              </Button>
            </div>
            <div className="w-full">
              <Button light small onClick={in2Days}>
                En 2 días
              </Button>
            </div>
          </div>
          <Calendar
            locale="es-MX"
            next2Label={null}
            prev2Label={null}
            formatMonthYear={formatMonthSelector}
            nextLabel={
              <div className="flex justify-center">
                <img src={chevronRight} alt="Siguiente" />
              </div>
            }
            prevLabel={
              <div className="flex justify-center">
                <img src={chevronLeft} alt="Siguiente" />
              </div>
            }
            onChange={onChange}
            {...field}
          />
          <div className="flex gap-2 mt-4">
            <div className="w-full">
              <Button small>Limpiar</Button>
            </div>
            <div className="w-full">
              <Button primary small>
                Agregar
              </Button>
            </div>
          </div>
        </div>
      )}
    />
  );
};

export default CalendarPopover;
