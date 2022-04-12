import React, { useContext, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { SubjectContext } from '../../context/SubjectContext';
import IntentionForm from '../Forms/IntentionForm';

const EducationalIntention = () => {
  const { subject } = useContext(SubjectContext);
  const intetion = subject?.educationalIntention || '';
  const {
    formState: { isValid, isSubmitting },
    setValue,
  } = useFormContext();

  useEffect(() => {
    if (subject?.educationalIntention) {
      setValue(
        'educationalIntention',
        subject?.educationalIntention,
        {
          shouldValidate: true,
        }
      );
    }
  }, [subject]);

  return (
    <>
      <p>
        En esta sección se describe brevemente cómo contribuye tu
        Unidad de aprendizaje al perfil del egresado
      </p>
      <p className="font-bold">Ejemplo</p>
      <p>
        La unidad de aprendizaje Genética contribuye al perfil de
        egreso de la Licenciatura en Biología desarrollando
        conocimiento de los mecanismos hereditarios y de control
        genético de los organismos, sentando las bases para el manejo,
        mejoramiento e investigación de los seres vivos. Asimismo,
        fomenta habilidades de pensamiento crítico y analítico,
        creatividad, organización, trabajo en equipo, valores y
        comportamiento ético.
      </p>
      <IntentionForm intention={intetion} />
    </>
  );
};

export default EducationalIntention;
