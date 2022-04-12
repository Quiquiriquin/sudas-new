import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { nanoid } from 'nanoid';
import { GET_USERS } from '../../../helpers/EnpointsUser';
import NewUserModal from '../../Shared/Modals/NewUserModal';
import AddButton from '../../Shared/Buttons/AddButton';
import UserCard from '../../Shared/UserCard/UserCard';
import SubjectCard from '../../Shared/SubjectCard/SubjectCard';
import { GET_ACADEMIC_PLAN_SUBJECTS } from '../../../helpers/AcademicPlanEndpoints';
import { GET_SUBJECTS } from '../../../helpers/SubjectEndpoints';
import NewSubjectModal from '../../Shared/Modals/NewSubjectModal';

const Subjects = () => {
  const [filterStatus, setFilterStatus] = useState();
  const queryClient = useQueryClient();
  const modal = useModal(NewSubjectModal);
  const [subjects, setSubjects] = useState();
  const { data: subjectsInformation, isLoading: isLoadingSubjects } =
    useQuery(['subjects'], GET_SUBJECTS);

  useEffect(() => {
    if (subjectsInformation) {
      setSubjects(subjectsInformation.data);
    }
  }, [subjectsInformation]);
  const openModal = () => {
    NiceModal.show(NewUserModal);
  };

  const updateFilters = (current) => {
    console.log(current);
    if (filterStatus) {
      console.log(filterStatus);
      const activeFilters = filterStatus.split(',');
      const newFilters = [];
      activeFilters.forEach((elem) => {
        if (elem !== current) newFilters.push(elem);
      });
      if (!activeFilters.find((elem) => elem === current)) {
        newFilters.push(current);
      }
      setFilterStatus(
        newFilters.length > 0 ? newFilters.join(',') : null
      );
    } else {
      setFilterStatus(`${current}`);
    }
  };

  const openSubjectModal = () => {
    modal.show().then((r) => {
      queryClient.invalidateQueries(['subjects']);
      modal.remove();
    });
  };

  return (
    <div className="h-full users-view">
      <div className="bg-white rounded px-6 py-4 shadow flex-initial">
        <span className="text-lg">Unidades de aprendizaje</span>
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
      <div className="mt-6 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 users-container gap-6">
        {isLoadingSubjects && (
          <>
            <SubjectCard
              loading={isLoadingSubjects}
              key={nanoid(6)}
            />
            <UserCard loading={isLoadingSubjects} key={nanoid(6)} />
            <UserCard loading={isLoadingSubjects} key={nanoid(6)} />
            <UserCard loading={isLoadingSubjects} key={nanoid(6)} />
          </>
        )}
        {!isLoadingSubjects && (
          <>
            {subjects &&
              subjects.map((elem) => (
                <SubjectCard all {...elem} key={nanoid(6)} />
              ))}
          </>
        )}
      </div>
    </div>
  );
};

export default Subjects;
