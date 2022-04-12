import React, { useContext } from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import Modal from './Modal';
import Button from '../Buttons/Button';
import { UPDATE_COMPETENCE } from '../../../helpers/SubjectEndpoints';

export default NiceModal.create(
  ({ units, unitIndex = -1, hours, setHours, topicIndex = -1 }) => {
    const queryClient = useQueryClient();
    const { handleSubmit } = useForm();
    const modal = useModal();
    const { mutateAsync: updateUnit } = useMutation(
      UPDATE_COMPETENCE,
      {
        onSuccess: () => {
          queryClient.invalidateQueries('competences');
        },
      }
    );
    const unitToUpdate = units.find(
      (unit) => unit.id === units[unitIndex - 1].id
    );

    const topicToDelete = unitToUpdate.topics[topicIndex];

    const deleteContent = () => {
      const topics = unitToUpdate.topics.filter(
        (topic, index) => index !== topicIndex
      );
      try {
        const ans = updateUnit({
          id: unitToUpdate.id,
          data: { topics },
        });
        console.log(ans);
      } catch (e) {
        console.log(e);
      }
      modal.hide();
    };

    return (
      <Modal width="100%">
        <div
          className="sofia-bold text-center mb-6"
          style={{ fontSize: '1.125rem', marginTop: '1rem' }}
        >
          ¿Estas seguro de eliminar el contenido y sus subconntenidos:{' '}
          {topicToDelete?.title}?
        </div>
        <div className="flex justify-center mt-12">
          <div className="w-48">
            <Button isDelete onClick={deleteContent}>
              Borrar
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
);
