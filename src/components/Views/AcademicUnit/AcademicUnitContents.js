import React from 'react';
import { SectionCard } from '../../Shared/SectionCard';

const AcademicUnitContents = ({ contents }) => {
  return (
    <SectionCard>
      <div className="section-title">Contenidos</div>
      <div className="section-body">
        <ul className="m-5" style={{ listStyleType: 'upper-roman' }}>
          {contents?.map(({ name }) => (
            <li>{name}</li>
          ))}
        </ul>
      </div>
    </SectionCard>
  );
};

export default AcademicUnitContents;
