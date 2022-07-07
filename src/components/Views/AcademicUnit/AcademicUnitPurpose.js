import React from 'react';
import { SectionCard } from '../../Shared/SectionCard';

const AcademicUnitPurpose = ({ purpose }) => {
  return (
    <SectionCard>
      <div className="section-title">
        Propósito de la unidad de aprendizaje
      </div>
      <div className="section-body">
        {purpose ||
          'El propósito de la unidad de aprendizaje aún se esta' +
            ' trabajando'}
      </div>
    </SectionCard>
  );
};

export default AcademicUnitPurpose;
