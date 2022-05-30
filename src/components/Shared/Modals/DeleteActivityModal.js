import React, { useContext } from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import Modal from './Modal';
import Button from '../Buttons/Button';
import { UPDATE_COMPETENCE } from '../../../helpers/SubjectEndpoints';
import { REMOVE_ACTIVITY } from '../../../helpers/ActivityEndpoint';

export default NiceModal.create(
  ({
    unitStrategies,
    setUnitStrategies,
    unitIndex = -1,
    activityIndex = -1,
    id,
  }) => {
    // const queryClient = useQueryClient();
    const { handleSubmit } = useForm();
    const modal = useModal();
    // const { mutateAsync: updateUnit } = useMutation(
    //   UPDATE_COMPETENCE,
    //   {
    //     onSuccess: () => {
    //       queryClient.invalidateQueries('competences');
    //     },
    //   }
    // );

    const unitToUpdate = unitStrategies[unitIndex - 1];
    // const unitToUpdate = unitActivities?.find(
    //   (unit) => unit.id === unitActivities[unitIndex - 1].id
    // );

    const activityToDelete = unitToUpdate?.activities[activityIndex];

    console.log('Activity to delete: ', activityToDelete);

    const deleteContent = async () => {
      console.log(id);
      const { data: activities } = await REMOVE_ACTIVITY(
        unitToUpdate.id,
        {
          remove: [id],
        }
      );
      console.log('Actividades después de eliminar: ', activities);
      setUnitStrategies(
        unitStrategies?.map((unit, index) => {
          return index === unitIndex - 1
            ? {
                ...unit,
                activities,
              }
            : unit;
        })
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
          ¿Estas seguro de eliminar la actividad:{' '}
          {activityToDelete.title}?
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
