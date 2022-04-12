import React, { useContext, useEffect, useState } from 'react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import styled from 'styled-components';
import { SubjectContext } from '../../context/SubjectContext';
import {
  GET_CONNECTOR,
  GET_SUBJECT,
  GET_VERB,
  UPDATE_EDU_INTENTION,
} from '../../helpers/SubjectEndpoints';
import FormWrapper from '../Forms/FormWrapper';
import PurposeForm from '../Forms/PurposeForm';
import SelectFormInput from '../Shared/FormInputs/SelectFormInput';
import FormInput from '../Shared/FormInputs/FormInput';

const Purpose = () => {
  const { subject } = useContext(SubjectContext);
  const verbId = subject?.purpose?.verbId || 1;
  const connectorId = subject?.purpose?.connectorId || 1;
  const objectText = subject?.purpose?.object || '';
  const qualityText = subject?.purpose?.quality || '';

  return (
    <>
      <p>
        En esta sección describe el propósito de la unidad de
        aprendizaje
      </p>
      <p className="font-bold m-2">
        Verbo + Objeto + Conector + Condición de Calidad
      </p>
      <p className="font-bold">Ejemplo.</p>
      <p className="p-2">
        Asume las diferentes reacciones químicas inorganicas y la
        forma de compuestos, con base en los fundamentos de la
        estructura atómica
      </p>
      <div className="border-t-2 my-5" />
      <PurposeForm
        verbId={verbId}
        connectorId={connectorId}
        objectText={objectText}
        qualityText={qualityText}
      />
    </>
  );
};

export default Purpose;
