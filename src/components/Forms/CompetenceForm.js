import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useQuery } from 'react-query';
import FormInput from '../Shared/FormInputs/FormInput';
import SelectFormInput from '../Shared/FormInputs/SelectFormInput';
import {
  GET_CONNECTOR,
  GET_VERB,
} from '../../helpers/SubjectEndpoints';
import { SubjectContext } from '../../context/SubjectContext';

const CompetenceForm = ({
  index = 0,
  verbId,
  connectorId,
  objectText,
  qualityText,
}) => {
  const { setValue } = useForm();
  const { verbs, connectors } = useContext(SubjectContext);

  const verbValue = verbs[verbId - 1] || '';
  const connectorValue = connectors[connectorId - 1] || '';
  useEffect(() => {
    setValue(`competencies.${index}.object`, objectText);
    setValue(`competencies.${index}.quality`, qualityText);
  }, [objectText, qualityText, verbId, connectorId]);
  return (
    <div className="w-full">
      <div className="w-full flex justify-between pt-4">
        <div>
          <div>
            <SelectFormInput
              options={verbs}
              name={`competencies.${index}.verb`}
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
            name={`competencies.${index}.object`}
            label="Objeto"
            defaultValue={objectText || ''}
            placeholder={objectText}
            className="w-80"
            rules={{
              required: 'Ingresa el objeto',
            }}
          />
        </div>
        <div>
          <SelectFormInput
            options={connectors}
            name={`competencies.${index}.connector`}
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
            name={`competencies.${index}.quality`}
            label="Condición de calidad"
            defaultValue={qualityText || ''}
            placeholder={qualityText}
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

export default CompetenceForm;
