import React from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useMutation } from 'react-query';
import ModalGeneric from './Modal';
import FormWrapper from '../../Forms/FormWrapper';
import NewAcademicPlanForm from '../../Forms/NewAcademicPlanForm';
import { CREATE_ACADEMIC_PLAN } from '../../../helpers/AcademicPlanEndpoints';

export default NiceModal.create(() => {
  const modal = useModal();
  const { mutateAsync: createAcademicPlan } = useMutation(
    CREATE_ACADEMIC_PLAN
  );
  const submitForm = async (data) => {
    try {
      console.log(data);
      const body = {
        ...data,
        modality: data.value,
        period: parseInt(data.period, 10),
      };
      const ans = await createAcademicPlan(body);
      console.log(ans);
      modal.resolve(true);
      modal.remove();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <ModalGeneric width="60%">
      <div
        className="sofia-bold text-center mb-6"
        style={{ fontSize: '1.125rem' }}
      >
        Nuevo plan académico
      </div>
      <FormWrapper onSubmit={submitForm}>
        <NewAcademicPlanForm />
      </FormWrapper>
    </ModalGeneric>
  );
});
