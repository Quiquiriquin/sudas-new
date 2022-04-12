import React, { useContext } from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import Modal from './Modal';
import Button from '../Buttons/Button';

export default NiceModal.create(
  ({
    practices,
    setPractices,
    unitIndex = -1,
    practiceIndex = -1,
  }) => {
    const queryClient = useQueryClient();
    const { handleSubmit } = useForm();
    const modal = useModal();

    const unitToUpdate = practices[unitIndex - 1];
    // const unitToUpdate = unitActivities?.find(
    //   (unit) => unit.id === unitActivities[unitIndex - 1].id
    // );

    const practiceToDelete = unitToUpdate?.practices[practiceIndex];

    const deleteContent = () => {
      setPractices(
        practices.map((unit, index) =>
          index === unitIndex - 1
            ? {
                ...unit,
                practices: unit.practices.filter(
                  (p, i) => i !== practiceIndex
                ),
              }
            : unit
        )
      );
      modal.hide();
    };
    //   const activities = unitToUpdate.topics.filter(
    //     (topic, index) => index !== topicIndex
    //   );
    //   try {
    //     const ans = updateUnit({
    //       id: unitToUpdate.id,
    //       data: { topics },
    //     });
    //     console.log(ans);
    //   } catch (e) {
    //     console.log(e);
    //   }
    //   modal.hide();
    // };

    return (
      <Modal width="100%">
        <div
          className="sofia-bold text-center mb-6"
          style={{ fontSize: '1.125rem', marginTop: '1rem' }}
        >
          ¿Estas seguro de eliminar el contenido y sus subconntenidos:{' '}
          {practiceToDelete.name}?
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
