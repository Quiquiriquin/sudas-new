import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useQuery } from 'react-query';
import Button from '../Shared/Buttons/Button';
import FormInput from '../Shared/FormInputs/FormInput';
import SelectFormInput from '../Shared/FormInputs/SelectFormInput';
import { GET_METHODS } from '../../helpers/MethodsEndpoints';
import romanize from '../../helpers/Romanize';

const MethodsForm = ({ index = 0, method, unitIndex, unitName }) => {
  const { data: optionsData } = useQuery(['methods'], GET_METHODS);
  const { watch, setValue } = useFormContext();
  const [options, setOptions] = useState([]);
  const unitMethod = watch(`methods.${index}.method`);
  useEffect(() => {
    if (
      optionsData &&
      optionsData.status !== 204 &&
      optionsData?.data
    ) {
      const { data } = optionsData;
      setOptions(
        data.map(({ id, label, description }) => ({
          value: id,
          label,
          description,
        }))
      );
      setValue('methods', method);
    }
  }, [optionsData]);
  // useEffect(() => {}, [strategy]);
  useEffect(() => {
    setValue(`methods.${index}.method`, method);
  }, [method]);
  console.log(method);
  console.log(unitMethod);

  return (
    <div className="w-full">
      <div className="unit-item flex justify-between">
        <p>
          {romanize(unitIndex)}. {unitName}
        </p>
        <div className="flex">
          <div className="icon-btn flex items-center justify-center" />
        </div>
      </div>
      <div className="w-full flex justify-between pt-4">
        <SelectFormInput
          options={options}
          name={`methods.${index}.method`}
          label="Métodos de enseñanza"
          defaultValue={method || ''}
          placeholder="Elige un método de enseñanza"
          className="w-96 flex-none"
        />
        <div className="flex-auto p-5">
          <p className="font-bold">
            Información del método de enseñanza
          </p>
          {unitMethod || method ? (
            <p className="text-justify">
              {unitMethod?.description || method?.description}
            </p>
          ) : (
            <p />
          )}
        </div>
      </div>
    </div>
  );
};

export default MethodsForm;
