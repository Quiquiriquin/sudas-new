import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { SubjectContext } from '../../context/SubjectContext';
import CheckboxFormInput from '../Shared/FormInputs/CheckboxFormInput/CheckboxFormInput';
import './RelatedUnits.scss';

const ChipButton = styled.div`
  margin: 0.543rem;
  padding: 0.375rem 1rem;
  border-radius: 18px;
  background: #f2f2f2;
  border: 1px solid #f2f22;
  box-shadow: 0px 3px 6px #3d4b5c26;
  &:hover {
    box-shadow: 0px 6px 12px #3d4b5c26;
    cursor: pointer;
  }
  &.green {
    border: 1px solid #34be44;
    background: rgba(52, 190, 68, 0.1);
  }
`;

const RelatedUnits = () => {
  const { relatedUnits } = useContext(SubjectContext);
  const { next, prev, same } = relatedUnits;
  return (
    <>
      <div className="p-2 border-2 rounded my-3">
        <p className="font-bold mb-2">
          En esta sección se seleccionarán las unidades de aprendizaje
          predecesoras relacionadas
        </p>
        <div>
          <ul className="flex flex-wrap">
            {prev?.map(({ id, name }, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={`prev${id}${name}${index}`}>
                <CheckboxFormInput
                  name={`predecessor.${index}`}
                  value={name}
                  label={name}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="p-2 border-2 rounded my-3">
        <p className="font-bold mb-2">
          En esta sección se seleccionarán las unidades de aprendizaje
          laterales relacionadas
        </p>
        <div>
          <ul className="flex flex-wrap">
            {same?.map(({ id, name }, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={`same${id}${name}${index}`}>
                <CheckboxFormInput
                  name={`lateral.${index}`}
                  value={name}
                  label={name}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="p-2 border-2 rounded my-3">
        <p className="font-bold mb-2">
          En esta sección se seleccionarán las unidades de aprendizaje
          consecuentes relacionadas
        </p>
        <div>
          <ul className="flex flex-wrap">
            {next?.map(({ id, name }, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={`next${id}${name}${index}`}>
                <CheckboxFormInput
                  name={`consequent.${index}`}
                  value={name}
                  label={name}
                />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default RelatedUnits;
