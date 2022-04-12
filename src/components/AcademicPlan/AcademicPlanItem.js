import React, { memo } from 'react';
import styled from 'styled-components';
import { useHistory } from 'react-router-dom';

const InfoCard = styled.div`
  width: 200px;
  height: 100%;
  border-radius: 5px;
  padding: 1rem;
  text-align: center;
  display: flex;
  flex-direction: column;

  h3 {
    color: rgba(0, 0, 0, 0.5);
    font-size: 1.125rem;
    text-align: left;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  p {
    color: #000000;
    font-size: 2rem;
    text-align: left;
    font-weight: bold;
  }

  h4 {
    color: #5cc8bf;
    font-weight: bold;
    font-size: 1rem;
    text-align: left;
  }

  box-icon {
    height: 30px;
    min-width: 50px;
    border-radius: 12px;
    line-height: 50px;
    text-align: center;
    fill: #5cc8bf;
  }
`;

const AcademicUnit = styled.div`
  width: 100%;
  //height: 150px;
  border-radius: 5px;
  background: #fff;
  padding: 20px;
  display: flex;
  flex-direction: row;
  gap: 20px;
  justify-content: space-between;
  box-shadow: 0px 3px 6px #3d4b5c26;
  margin-bottom: 1rem;
`;

const AcademicPlanItem = memo(({ name, id, subjects, teachers }) => {
  const history = useHistory();
  const goToPlan = () => {
    history.push(`/plan-academico/${id}/${name}`);
  };
  return (
    <div>
      {/* eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions */}
      <h2
        onClick={goToPlan}
        className="text-2xl font-bold py-4 px-4 cursor-pointer"
      >
        {name}
      </h2>
      <AcademicUnit className="shadow">
        <InfoCard>
          <h3 className="card_title">Profesores activos</h3>
          <p className="card_number">{teachers}</p>
          {/* <div className="flex items-center"> */}
          {/*  <box-icon type="solid" name="group" /> */}
          {/*  <h4 className="adtional_info">120</h4> */}
          {/* </div> */}
        </InfoCard>
        <InfoCard>
          <h3 className="card_title">Materias activas</h3>
          <p className="card_number">{subjects?.active}</p>
          <div className="flex items-center">
            <box-icon type="solid" name="group" />
            <h4 className="adtional_info">
              {subjects.total} en total
            </h4>
          </div>
        </InfoCard>
        <InfoCard>
          <h3 className="card_title">Materias Disponibles</h3>
          <p className="card_number">{subjects?.noAssigned}</p>
          <div className="flex items-center">
            <box-icon type="solid" name="group" />
            <h4 className="adtional_info">
              {subjects.total} en total
            </h4>
          </div>
        </InfoCard>
        <InfoCard>
          <h3 className="card_title">Materias pausadas</h3>
          <p className="card_number">{subjects?.stopped}</p>
          <div className="flex items-center">
            <box-icon type="solid" name="group" />
            <h4 className="adtional_info">
              {subjects?.total} en total
            </h4>
          </div>
        </InfoCard>
      </AcademicUnit>
    </div>
  );
});

export default AcademicPlanItem;
