import React, { useContext, useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { SubjectContext } from '../../context/SubjectContext';

const PreviewPurposeIntetion = () => {
  const { relatedUnits } = useContext(SubjectContext);
  const { next, prev, same } = relatedUnits;
  const { watch } = useFormContext();
  const [
    intention,
    object,
    quality,
    consequent = [],
    lateral = [],
    predecessor = [],
  ] = watch([
    'intention',
    'object',
    'quality',
    'next',
    'same',
    'prev',
  ]);
  const verb = watch('verb', '');
  const connector = watch('connector', '');
  const purposeText = `${verb?.label || ''} ${object} ${
    connector?.label || ''
  } ${quality}`;

  const getTextCheckBox = (a, a2) => {
    let text = '';
    a.forEach((x, index) => {
      text += `${a2[x].name}`;
      if (index !== a.length - 1) {
        text += ',';
      }
    });
    return text;
  };

  const predecessorOptions = predecessor.reduce((a, e, i) => {
    return e[Object.keys(e)[0]] ? a.concat(i) : a;
  }, []);
  const lateralOptions = lateral.reduce(
    (a, e, i) => (e[Object.keys(e)[0]] ? a.concat(i) : a),
    []
  );
  const consequentOptions = consequent.reduce(
    (a, e, i) => (e[Object.keys(e)[0]] ? a.concat(i) : a),
    []
  );

  return (
    <>
      <div className="border-2 border-black p-4">
        <p className="font-bold text-xl text-center">
          INTENCIÓN EDUCATIVA
        </p>
        <p>{intention}</p>
        <p>
          Esta unidad educativa se relaciona{' '}
          {`${
            predecessorOptions.length > 0
              ? ` de manera antecedente con
          ${getTextCheckBox(predecessorOptions, prev)}`
              : ''
          }`}
          {lateralOptions.length > 0 &&
            `${predecessorOptions.length > 0 ? ' y' : ''} de manera
          lateral con ${getTextCheckBox(lateralOptions, same)}`}{' '}
          {consequentOptions.length > 0 &&
            `${lateralOptions.length > 0 ? ' y' : ''} de
          manera consequente con ${getTextCheckBox(
            consequentOptions,
            next
          )}`}
        </p>
      </div>
      <div className="border-2 border-t-0 border-black  p-4">
        <p className="font-bold text-xl text-center">
          PROPÓSITO DE LA UNIDAD DE APRENDIZAJE
        </p>
        {verb?.label?.length === 0 &&
        connector?.label?.length === 0 ? (
          ''
        ) : (
          <p>{purposeText}</p>
        )}
      </div>
    </>
  );
};

export default PreviewPurposeIntetion;
