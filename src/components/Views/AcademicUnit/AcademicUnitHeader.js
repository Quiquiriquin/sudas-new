import React from 'react';
import styled from 'styled-components';

const SectionCard = styled.div`
  width: 100%;
  border-radius: 5px;
  background: #fff;
  padding: 20px;
  box-shadow: 0px 3px 6px #3d4b5c26;
  margin-bottom: 0.5rem;
`;

const AcademicUnitHeader = ({ subject }) => {
  return (
    <SectionCard>
      <div className="flex gap-6">
        <div className="w-1/2">
          <div className="flex text-base flex-row justify-around space-x-4">
            <div className="flex-grow-0 font-bold w-40 truncate">
              Unidad Academica
            </div>
            <div className="flex-grow">
              Escuela Nacional de Ciencias Biológicas
            </div>
          </div>
          <div className="flex text-base flex-row justify-around space-x-4">
            <div className="flex-grow-0 font-bold w-40 truncate">
              Programa Académico
            </div>
            <div className="flex-grow">
              {subject?.academicPlan?.name}
            </div>
          </div>
          <div className="flex text-base flex-row justify-around space-x-4">
            <div className="flex-grow-0 font-bold w-40 truncate">
              Semestre
            </div>
            <div className="flex-grow">{subject?.semester}</div>
          </div>
          <div className="flex text-base flex-row justify-around space-x-4">
            <div className="flex-grow-0 font-bold w-40 truncate">
              Tipo
            </div>
            <div className="flex-grow">{subject?.type}</div>
          </div>
        </div>
        <div className="w-1/2">
          <div className="flex text-base flex-row justify-around space-x-4">
            <div className="flex-grow-0 font-bold w-40 truncate">
              TEPIC/SATCA
            </div>
            <div className="flex-grow">
              {`${subject?.tepic} / ${subject?.satca}`}
            </div>
          </div>
          <div className="flex text-base flex-row justify-around space-x-4">
            <div className="flex-grow-0 font-bold w-40 truncate">
              Modalidad
            </div>
            <div className="flex-grow">
              {subject?.modality === 'FACE2FACE'
                ? 'Presencial'
                : 'En línea'}
            </div>
          </div>
          <div className="flex text-base flex-row justify-around space-x-4">
            <div className="flex-grow-0 font-bold w-40 truncate">
              Horas de práctica
            </div>
            <div className="flex-grow">
              {subject?.practiceSemester}
            </div>
          </div>
          <div className="flex text-base flex-row justify-around space-x-4">
            <div className="flex-grow-0 font-bold w-40 truncate">
              Horas de teoría
            </div>
            <div className="flex-grow">
              {subject?.theorySemester || 0}
            </div>
          </div>
        </div>
      </div>
    </SectionCard>
  );
};

export default AcademicUnitHeader;
