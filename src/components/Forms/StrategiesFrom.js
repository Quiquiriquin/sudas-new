import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useQuery } from 'react-query';
import SelectFormInput from '../Shared/FormInputs/SelectFormInput';
import { GET_STRATEGIES } from '../../helpers/StrategiesEndpoints';

const StrategiesForm = ({ strategy: strategyProp }) => {
  const { data: optionsData } = useQuery(
    ['strategies'],
    GET_STRATEGIES
  );
  const [options, setOptions] = useState([]);
  const { watch, setValue } = useFormContext();
  const strategy = watch('strategy', '');

  useEffect(() => {
    setValue('strategy', strategyProp?.value);
  }, [strategyProp]);

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
      setValue('strategy', strategyProp);
    }
  }, [optionsData]);

  return (
    <div className="w-full">
      <div className="w-full flex justify-between pt-4">
        <SelectFormInput
          options={options}
          name="strategy"
          label="Estrategia"
          defaultValue={strategyProp || ''}
          placeholder="Elige un estrategia de enseñanza"
          className="w-96 flex-none"
        />
        <div className="flex-auto p-5">
          <p className="font-bold">Información de la estrategia</p>
          <p className="text-justify">
            {strategy
              ? strategy?.description
              : strategyProp?.description}
          </p>
        </div>
      </div>
      {/* <div className="flex flex-row-reverse">
        <div className="w-44">
          <Button type="submit" secondary>
            Guardar
          </Button>
        </div>
      </div> */}
    </div>
  );
};

export default StrategiesForm;
