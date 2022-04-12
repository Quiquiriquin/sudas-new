import React from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useMutation } from 'react-query';
import ModalGeneric from './Modal';
import FormWrapper from '../../Forms/FormWrapper';
import NewSubjectForm from '../../Forms/NewSubjectForm';
import { CREATE_SUBJECT } from '../../../helpers/SubjectEndpoints';

export default NiceModal.create(({ academicPlanId }) => {
  const { mutateAsync: createSubject } = useMutation(CREATE_SUBJECT);
  const modal = useModal();
  const submitForm = async (data) => {
    try {
      const ans = await createSubject({
        ...data,
        modality: data.modality.value,
        ...(academicPlanId
          ? { academicPlanId }
          : { academicPlanId: data.academicPlanId.value }),
        trainingArea: data.trainingArea.value,
        type: data.type.value,
      });
      console.log(ans);
      console.log(data);
      modal.resolve(true);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <ModalGeneric
      width="100%"
      style={{ paddingTop: '54px', paddingBottom: '54px' }}
    >
      <div>
        <div
          className="sofia-bold text-center mb-6"
          style={{ fontSize: '1.125rem' }}
        >
          Nueva unidad de aprendizaje
        </div>
        <FormWrapper onSubmit={submitForm}>
          <NewSubjectForm academicPlanId={academicPlanId} />
        </FormWrapper>
      </div>
    </ModalGeneric>
  );
});
