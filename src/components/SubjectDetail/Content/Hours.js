import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { SubjectContext } from '../../../context/SubjectContext';

const Hours = ({ hours }) => {
  const {
    totalHours,
    theorySemester,
    practiceSemester,
    autonomousLearning,
  } = hours;
  return (
    <p className="text-right">
      Horas teoricas restantes:{' '}
      <span className="rounded border-2 font-bold p-2">
        {theorySemester}
      </span>{' '}
      Horas practicas restantes:{' '}
      <span className="rounded border-2 font-bold p-2">
        {practiceSemester}
      </span>{' '}
      {/* Horas de AA restantes:{' '} */}
      {/* <span className="rounded border-2 font-bold p-2"> */}
      {/*  {autonomousLearning} */}
      {/* </span>{' '} */}
    </p>
  );
};

export default Hours;
