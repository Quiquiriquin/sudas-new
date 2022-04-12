import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import CheckboxFormInput from '../../Shared/FormInputs/CheckboxFormInput/CheckboxFormInput';
import './SkillsAtittudes.scss';

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

const SkillsActtitudes = ({ skills, attitudes }) => (
  <>
    <div className="p-2 border-2 rounded my-3">
      <p className="font-bold mb-2">
        En esta sección se seleccionarán las habilidades didácticas
        del docente
      </p>
      <div>
        <ul className="flex flex-wrap">
          {skills.map(({ type, id, name }) => (
            <li key={id}>
              <CheckboxFormInput
                name={type}
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
        En esta sección se seleccionarán las actitudes del docente
      </p>
      <div>
        <ul className="flex flex-wrap">
          {attitudes.map(({ type, id, name }) => (
            <li key={id}>
              <CheckboxFormInput
                name={type}
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

export default SkillsActtitudes;
