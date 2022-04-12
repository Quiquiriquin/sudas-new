import React from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import Modal from './Modal';
import FormWrapper from '../../Forms/FormWrapper';
import NewTematicUnitForm from '../../Forms/NewTematicUnitForm';
import {
  CREATE_UNIT_COMPETENCE,
  UPDATE_COMPETENCE,
} from '../../../helpers/SubjectEndpoints';

export default NiceModal.create(
  ({ units, setUnits, type, index = -1, unitName = '', subject }) => {
    const queryClient = useQueryClient();

    const { mutateAsync: createUnit } = useMutation(
      CREATE_UNIT_COMPETENCE,
      {
        onSuccess: () => {
          queryClient.invalidateQueries('competences');
        },
      }
    );

    const { mutateAsync: updateUnit } = useMutation(
      UPDATE_COMPETENCE,
      {
        onSuccess: () => {
          queryClient.invalidateQueries('competences');
        },
      }
    );

    const { handleSubmit } = useForm();
    const modal = useModal();

    const notifyError = (error) =>
      toast.error(error, {
        position: 'top-center',
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

    const onSubmit = (data) => {
      const { tematicUnit } = data;
      if (type === 'new') {
        if (units.length < 5) {
          try {
            const ans = createUnit({
              subjectId: subject,
              description: tematicUnit,
            });
            console.log(ans);
          } catch (e) {
            console.log(e);
          }
        } else {
          notifyError('Solo se permiten 5 unidades tematicas');
        }
      }
      if (type === 'edit') {
        if (units[index - 1]) {
          const { id } = units[index - 1];
          try {
            const ans = updateUnit({
              id,
              data: { description: tematicUnit },
            });
            console.log(ans);
          } catch (e) {
            console.log(e);
          }
        } else {
          console.log('holi');
        }
      }
      modal.hide();
    };
    return (
      <Modal width="100%">
        <div
          className="sofia-bold text-center mb-6"
          style={{ fontSize: '1.125rem', marginTop: '1rem' }}
        >
          {type === 'new' ? 'Nueva' : 'Editar'} Unidad Temática
        </div>
        <FormWrapper onSubmit={onSubmit}>
          <NewTematicUnitForm unitName={unitName} />
        </FormWrapper>
      </Modal>
    );
  }
);
