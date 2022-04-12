import React, { useContext, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useQuery } from 'react-query';
import FormInput from '../Shared/FormInputs/FormInput';
import SelectFormInput from '../Shared/FormInputs/SelectFormInput';
import {
  GET_CONNECTOR,
  GET_VERB,
} from '../../helpers/SubjectEndpoints';
import { SubjectContext } from '../../context/SubjectContext';

const PurposeForm = ({
  verbId,
  connectorId,
  objectText,
  qualityText,
}) => {
  const { setValue } = useFormContext();
  const { verbs, connectors } = useContext(SubjectContext);

  const verbValue = verbs[verbId - 1]?.value || '';
  const connectorValue = connectors[connectorId - 1]?.value || '';
  useEffect(() => {
    setValue('object', objectText);
    setValue('quality', qualityText);
  }, [verbs, connectors, objectText, qualityText]);
  return (
    <div className="w-full">
      <div className="w-full flex justify-between pt-4">
        <div>
          <div>
            <SelectFormInput
              options={verbs}
              name="verb"
              label="Verbo"
              defaultValue={verbValue || ''}
              placeholder={
                verbValue === '' ? 'Selecciona...' : verbValue
              }
              className="w-48"
            />
          </div>
        </div>
        <div>
          <FormInput
            name="object"
            label="Objeto"
            defaultValue=""
            placeholder="Objeto..."
            className="w-80"
            rules={{
              required: 'Ingresa el objeto',
            }}
          />
        </div>
        <div>
          <SelectFormInput
            options={connectors}
            name="connector"
            label="Conector"
            defaultValue={connectorValue || ''}
            placeholder={
              connectorValue === '' ? 'Selecciona...' : connectorValue
            }
            className="w-48"
          />
        </div>
        <div>
          <FormInput
            name="quality"
            label="Condición de calidad"
            defaultValue=""
            placeholder="Condición de calidad..."
            className="w-80"
            rules={{
              required: 'Ingresa la condición de calidad',
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default PurposeForm;
