import React, { useContext, useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { useParams } from 'react-router-dom';
import { Card } from 'antd';
import styled from 'styled-components';
import { nanoid } from 'nanoid';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { GeneralContext } from '../../../context/GeneralContext';
import {
  GET_ACADEMIC_PLAN,
  GET_ACADEMIC_PLAN_SUBJECTS,
} from '../../../helpers/AcademicPlanEndpoints';
import UserCard from '../../Shared/UserCard/UserCard';
import SubjectCard from '../../Shared/SubjectCard/SubjectCard';
import './AcademicPlanDetail.scss';
import AddButton from '../../Shared/Buttons/AddButton';
import NewSubjectModal from '../../Shared/Modals/NewSubjectModal';
import NewAcademicPlan from '../../Shared/Modals/NewAcademicPlan';
import AuthoritiesModal from '../../Shared/Modals/AuthoritiesModal';

const CardContainer = styled.div`
  border-radius: 5px;
  background: #ffffff;
  padding: 24px;
  margin-bottom: 1.5rem;
`;

const AcademicPlanDetail = () => {
  const { id, name: academicPlanName } = useParams();
  const queryClient = useQueryClient();
  const modal = useModal(NewSubjectModal);
  const [subjects, setSubjects] = useState();
  const {
    user: { name, firstSurname },
  } = useContext(GeneralContext);
  const { data: academicPlanSubjects, isLoading: isLoadingSubjects } =
    useQuery(
      ['academic-plan', 'subjects', id],
      GET_ACADEMIC_PLAN_SUBJECTS
    );
  const { data: academicPlanData } = useQuery(
    ['academic-plan', 'detail', id],
    GET_ACADEMIC_PLAN
  );

  useEffect(() => {
    if (academicPlanSubjects && academicPlanSubjects.data) {
      setSubjects(academicPlanSubjects.data);
    }
  }, [academicPlanSubjects]);

  const openSubjectModal = () => {
    modal
      .show({
        academicPlanId: id,
      })
      .then((r) => {
        queryClient.invalidateQueries([
          'academic-plan',
          'subjects',
          id,
        ]);
        modal.remove();
      });
  };

  const openEditModal = () => {
    console.log('Editando');
    console.log(academicPlanData);
    const { data } = academicPlanData;
    NiceModal.show(NewAcademicPlan, {
      edit: true,
      information: {
        ...data,
        subjects: data?.academicPlanSubjects,
      },
      planId: id,
    }).then((res) => {
      queryClient.invalidateQueries(['academic-plan', 'detail', id]);
    });
  };

  const openAuthorities = () => {
    const {
      data: {
        designedBy,
        reviewedBy,
        approvedBy,
        authorizedBy,
        approvedBy2,
        principal,
        subPrincipal,
      },
    } = academicPlanData;
    NiceModal.show(AuthoritiesModal, {
      planAuthorities: {
        designedBy,
        reviewedBy,
        approvedBy,
        authorizedBy,
        approvedBy2,
        principal,
        subPrincipal,
      },
      id,
    }).then((res) => {
      console.log(res);
    });
  };

  return (
    <div className="academic-plan-detail flex flex-col border-white flex-1 bg-platinum overflow-hidden">
      <div className="bg-white rounded px-6 py-4 shadow flex flex-initial justify-between items-center">
        <h1 className="text-lg">
          Plan académico <strong>{academicPlanName}</strong>
        </h1>
        <div className="flex gap-6 items-center">
          <div onClick={openAuthorities}>
            <label className="click-link">Añadir autoridades</label>
          </div>
          <div className="cursor-pointer" onClick={openEditModal}>
            <box-icon type="solid" name="edit-alt" />
          </div>
        </div>
      </div>
      <div
        onClick={openSubjectModal}
        className="flex items-center cursor-pointer mt-6"
      >
        <AddButton className="cursor-pointer" />{' '}
        <label
          className="block sofia-bold cursor-pointer"
          style={{ marginTop: '1px', fontSize: '14px' }}
        >
          Añadir materia
        </label>
      </div>
      <div
        className="pb-4 subject-list mt-4 h-full overflow-auto grid lg:grid-cols-5 md:grid-cols-4 sm:grid-cols-3 xs:grid-cols-2 gap-4"
        style={{ maxHeight: 'calc(100vh - 168px)' }}
      >
        {isLoadingSubjects && (
          <>
            <SubjectCard
              loading={isLoadingSubjects}
              name="Microbiología general"
              semester={3}
              key={nanoid(6)}
            />
            <SubjectCard
              loading={isLoadingSubjects}
              name="Microbiología general"
              key={nanoid(6)}
              semester={3}
            />
            <SubjectCard
              loading={isLoadingSubjects}
              name="Microbiología general"
              key={nanoid(6)}
              semester={3}
            />
            <SubjectCard
              loading={isLoadingSubjects}
              name="Microbiología general"
              key={nanoid(6)}
              semester={3}
            />
          </>
        )}
        {!isLoadingSubjects &&
          subjects &&
          subjects.map((elem) => (
            <SubjectCard {...elem} key={nanoid(6)} />
          ))}
      </div>
    </div>
  );
};

export default AcademicPlanDetail;
