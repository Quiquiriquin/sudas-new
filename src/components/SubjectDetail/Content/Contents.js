import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import UnitItemContent from './UnitItemContent';
import { GET_COMPETENCES } from '../../../helpers/SubjectEndpoints';
import { SubjectContext } from '../../../context/SubjectContext';
import Hours from './Hours';
import 'boxicons';

const Contents = () => {
  const { subject, hours, units, setHours, setUnits } =
    useContext(SubjectContext);

  const { isLoading: isLoadingUnits, data: unitsResponse } = useQuery(
    ['competences', subject.id],
    GET_COMPETENCES
  );

  useEffect(() => {
    if (unitsResponse) {
      setUnits(unitsResponse.data);
      let tempTheorySemester = 0;
      let tempPracticeSemester = 0;
      let tempAutonomousLearning = 0;
      unitsResponse.data?.forEach((unit) => {
        unit?.topics?.forEach((topic) => {
          tempTheorySemester += +topic?.T;
          tempPracticeSemester += +topic?.P;
          tempAutonomousLearning += +topic?.AA;
        });
      });
      setHours({
        totalHours: subject.totalHours,
        theory: subject?.theorySemester,
        theorySemester: subject.theorySemester - tempTheorySemester,
        practiceSemester:
          subject.practiceSemester - tempPracticeSemester,
        autonomousLearning: tempAutonomousLearning,
      });
    }
  }, [unitsResponse]);

  if (isLoadingUnits) return <p>Cargando...</p>;
  return (
    <>
      <div className="bodyCard p-5">
        <Hours hours={hours} />
        <p>
          En esta sección agregarán los contenidos de las unidades
          temáticas
        </p>
        <div>
          <ul>
            {units.map((unit, index) => (
              <UnitItemContent
                key={unit.id + unit.description}
                topics={unit.topics}
                unitName={unit.description}
                unitIndex={index + 1}
                subject={subject.id}
                units={units}
              />
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Contents;
