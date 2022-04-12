import React from 'react';
import NiceModal, {
  unregister,
  useModal,
} from '@ebay/nice-modal-react';
import { useForm, useFormContext } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import Modal from './Modal';
import FormWrapper from '../../Forms/FormWrapper';
import NewContentForm from '../../Forms/NewContentForm';
import Hours from '../../SubjectDetail/Content/Hours';
import NewSubontentForm from '../../Forms/NewSubcontentForm';
import { UPDATE_COMPETENCE } from '../../../helpers/SubjectEndpoints';

export default NiceModal.create(
  ({ type, unitIndex = -1, topicIndex, units }) => {
    const queryClient = useQueryClient();
    const modal = useModal();
    const { mutateAsync: updateUnit } = useMutation(
      UPDATE_COMPETENCE,
      {
        onSuccess: () => {
          queryClient.invalidateQueries('competences');
        },
      }
    );
    const onSubmit = async (data) => {
      const { name } = data;
      const unitToUpdate = units.find(
        (unit) => unit.id === units[unitIndex - 1].id
      );
      if (type === 'new') {
        const topics = unitToUpdate.topics.map((topic, index) =>
          index === topicIndex
            ? {
                ...topic,
                subTopics: [...topic.subTopics, name],
              }
            : topic
        );
        console.log(topics);
        try {
          const ans = updateUnit({
            id: unitToUpdate.id,
            data: { topics },
          });
          console.log(ans);
        } catch (e) {
          console.log(e);
        }
      }
      if (type === 'edit') {
        // setUnits(
        //   units.map((unit) =>
        //     unit.id === index ? { ...unit, name: tematicUnit } : unit
        //   )
        // );
      }
      modal.hide();
    };

    return (
      <Modal width="100%">
        <div
          className="sofia-bold text-center mb-6"
          style={{ fontSize: '1.125rem', marginTop: '1rem' }}
        >
          {type === 'new' ? 'Nuevo' : 'Editar'} Subcontenido
        </div>
        <FormWrapper onSubmit={onSubmit}>
          <NewSubontentForm />
        </FormWrapper>
      </Modal>
    );
  }
);
