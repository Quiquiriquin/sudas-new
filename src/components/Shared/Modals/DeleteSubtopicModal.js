import React, { useContext } from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import Modal from './Modal';
import Button from '../Buttons/Button';
import { UPDATE_COMPETENCE } from '../../../helpers/SubjectEndpoints';

export default NiceModal.create(
  ({
    units,
    unitIndex = -1,
    topicIndex = -1,
    subtopicIndex = -1,
  }) => {
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

    const subtopicToDelete =
      unitToUpdate.topics[topicIndex].subTopics[subtopicIndex];

    const deleteSubtopic = () => {
      const topics = unitToUpdate.topics.map((topic, index) => {
        const newSubtopics = topic.subTopics.filter((st, i) => {
          return i !== subtopicIndex;
        });
        return index === topicIndex
          ? {
              ...topic,
              subTopics: newSubtopics,
            }
          : topic;
      });
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
          ¿Estas seguro de eliminar el subcontenidos:{' '}
          {subtopicToDelete}?
        </div>
        <div className="flex justify-center mt-12">
          <div className="w-48">
            <Button isDelete onClick={deleteSubtopic}>
              Borrar
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
);
