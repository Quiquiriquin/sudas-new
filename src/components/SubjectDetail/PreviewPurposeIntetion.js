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
    'consequent',
    'lateral',
    'predecessor',
  ]);
  const verb = watch('verb', '');
  const connector = watch('connector', '');
  const purposeText = `${verb?.label || ''} ${object} ${connector?.label || ''} ${quality}`;

  const getTextCheckBox = (a, a2) => {
    let text = '';
    a.forEach((x) => {
      text += `${a2[x].name} ,`;
    });
    return text;
  };

  const predecessorOptions = predecessor.reduce(
    (a, e, i) => (e ? a.concat(i) : a),
    []
  );
  const lateralOptions = lateral.reduce(
    (a, e, i) => (e ? a.concat(i) : a),
    []
  );
  const consequentOptions = consequent.reduce(
    (a, e, i) => (e ? a.concat(i) : a),
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
          Esta unidad educativa se relaciona de manera antecedente con{' '}
          {getTextCheckBox(predecessorOptions, prev)} y de manera
          lateral con {getTextCheckBox(lateralOptions, same)} y de
          manera consequente con{' '}
          {getTextCheckBox(consequentOptions, next)}
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
