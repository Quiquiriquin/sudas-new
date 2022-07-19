import React, { useContext } from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import Modal from './Modal';
import FormWrapper from '../../Forms/FormWrapper';
import NewBibliographyForm from '../../Forms/NewBibliographyForm';
import AuthoritiesForm from '../../Forms/AuthoritiesForm';
import { UPDATE_ACADEMIC_PLAN_AUTHORITIES } from '../../../helpers/AcademicPlanEndpoints';

export default NiceModal.create(
  ({ id, planAuthorities, ...props }) => {
    const queryClient = useQueryClient();
    const { mutateAsync: updatePlanAuthorities } = useMutation(
      (info) => UPDATE_ACADEMIC_PLAN_AUTHORITIES(info)
    );
    const modal = useModal();
    const onSubmit = async (data) => {
      try {
        const finalBody = {
          id,
          ...data,
        };
        const ans = await updatePlanAuthorities(finalBody);
        console.log(ans);
        toast.success('Autoridades actualizadas correctamente');
        queryClient.invalidateQueries([
          'academic-plan',
          'detail',
          id,
        ]);
        modal.remove();
      } catch (e) {
        console.log(e);
        toast.error('Ocurrió un error al actualizar la información');
      }
    };
    const close = () => modal.remove();

    return (
      <Modal width="100%" height="100%">
        <div
          className="sofia-bold text-center mb-6"
          style={{ fontSize: '1.125rem', marginTop: '1rem' }}
        >
          Nueva bibliografía
        </div>
        <FormWrapper onSubmit={onSubmit}>
          <AuthoritiesForm authorities={planAuthorities} />
        </FormWrapper>
      </Modal>
    );
  }
);
