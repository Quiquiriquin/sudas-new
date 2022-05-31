import React, { useContext } from 'react';
import styled from 'styled-components';
import { useQuery, useQueryClient } from 'react-query';
import { nanoid } from 'nanoid';
import { useModal } from '@ebay/nice-modal-react';
import { SessionContext } from '../../../context/SessionContext';
import { GET_DASHBOARD } from '../../../helpers/DashboardEndpoints';
import { GET_ACADEMIC_PLANS } from '../../../helpers/AcademicPlanEndpoints';
import AcademicPlanItem from '../../AcademicPlan/AcademicPlanItem';
import AddButton from '../../Shared/Buttons/AddButton';
import NewAcademicPlan from '../../Shared/Modals/NewAcademicPlan';
import './UnitsManagement.scss';

const UnitsManagement = () => {
  const { session } = useContext(SessionContext);
  const queryClient = useQueryClient();
  const modal = useModal(NewAcademicPlan);
  const { name, firstSurname } = session;
  const { data: academicPlansResponse } = useQuery(
    ['academic-plans'],
    GET_ACADEMIC_PLANS
  );
  console.log(academicPlansResponse);
  const openModalForm = () => {
    modal
      .show()
      .then((r) => queryClient.invalidateQueries(['academic-plans']));
  };
  return (
    <div className="flex flex-col border-white flex-1 bg-platinum overflow-hidden">
      <div className="bg-white rounded px-6 py-4 shadow flex-initial">
        <h1 className="text-lg">
          Hola, {name} {firstSurname}
        </h1>
      </div>
      <div
        onClick={openModalForm}
        className="flex items-center cursor-pointer mt-6"
      >
        <AddButton className="cursor-pointer" />{' '}
        <label
          className="block sofia-bold cursor-pointer"
          style={{ marginTop: '1px', fontSize: '14px' }}
        >
          Añadir plan académico
        </label>
      </div>
      <div
        className="mt-4 pb-4 rounded h-full overflow-auto"
        style={{ maxHeight: 'calc(100vh - 168px)' }}
      >
        {academicPlansResponse &&
          academicPlansResponse?.data?.map((elem) => (
            <AcademicPlanItem {...elem} key={nanoid(6)} />
          ))}
      </div>
    </div>
  );
};

export default UnitsManagement;
