import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

const PreviewCompetencies = () => {
  const { watch } = useFormContext();
  const [object, quality] = watch(['object', 'quality']);
  const verb = watch('verb', '') ?? { value: '.' };
  const connector = watch('connector', '') ?? { value: '.' };
  const verbValue = verb?.value ?? '';
  const connectorValue = connector?.value ?? '';
  const competenceText = `${verbValue} ${object} ${connectorValue} ${quality}`;
  // eslint-disable-next-line
  if (verbValue.length == 0 && connectorValue.length == 0) {
    return <p>.</p>;
  }

  return (
    <div className="p-2">
      <div className="bg-prusian-blue text-white p-2 rounded">
        <p>Vista previa</p>
      </div>
      <div className="border-2 border-black p-4 m-2">
        <p>{competenceText}</p>
      </div>
    </div>
  );
};

export default PreviewCompetencies;
