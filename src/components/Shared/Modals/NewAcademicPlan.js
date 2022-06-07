import React from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useMutation } from 'react-query';
import ModalGeneric from './Modal';
import FormWrapper from '../../Forms/FormWrapper';
import NewAcademicPlanForm from '../../Forms/NewAcademicPlanForm';
import {
  CREATE_ACADEMIC_PLAN,
  UPDATE_ACADEMIC_PLAN,
} from '../../../helpers/AcademicPlanEndpoints';

export default NiceModal.create(
  ({ edit = false, information = null, planId = null }) => {
    const modal = useModal();
    const { mutateAsync: createAcademicPlan } = useMutation(
      edit ? UPDATE_ACADEMIC_PLAN : CREATE_ACADEMIC_PLAN
    );
    const submitForm = async ({
      subjects: prevSubjects,
      ...data
    }) => {
      try {
        console.log(data, prevSubjects);
        const subjects = [];
        const updateSubjects = [];
        prevSubjects.forEach(({ name, semester, id }) => {
          if (name) {
            subjects.push({
              name,
              semester: parseInt(semester, 10),
              ...(id ? { id } : {}),
            });
          }
        });
        const body = {
          ...data,
          modality: data?.modality.value,
          period: parseInt(data.period, 10),
          subjects,
          ...(edit ? { id: planId } : {}),
        };
        console.log(body);
        const ans = await createAcademicPlan(body);
        console.log(ans);
        modal.resolve(true);
        modal.remove();
      } catch (e) {
        console.log(e);
      }
    };
    return (
      <ModalGeneric width="100%">
        <div
          className="sofia-bold text-center mb-6"
          style={{ fontSize: '1.125rem' }}
        >
          Nuevo plan académico
        </div>
        <FormWrapper>
          <NewAcademicPlanForm
            information={information}
            submit={submitForm}
          />
        </FormWrapper>
      </ModalGeneric>
    );
  }
);
