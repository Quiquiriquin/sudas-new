import React from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useMutation, useQueryClient } from 'react-query';
import { useForm, useFormContext } from 'react-hook-form';
import Modal from './Modal';
import FormWrapper from '../../Forms/FormWrapper';
import NewContentForm from '../../Forms/NewContentForm';
import Hours from '../../SubjectDetail/Content/Hours';
import { UPDATE_COMPETENCE } from '../../../helpers/SubjectEndpoints';

export default NiceModal.create(
  ({
    units,
    type,
    unitIndex = -1,
    hours,
    setHours,
    topicIndex = -1,
    practiceHour,
    setPracticeHour,
    topicName = '',
    topicTeoric = 0,
    topicPractice = 0,
    topicAA = 0,
  }) => {
    console.log(topicName);
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
      const { name, teoricHours, practicalHours, autonomousHours } =
        data;
      const unitToUpdate = units.find(
        (unit) => unit.id === units[unitIndex - 1].id
      );
      if (type === 'new') {
        const topics =
          unitToUpdate.topics === null
            ? [
                {
                  P: practicalHours,
                  T: teoricHours,
                  AA: autonomousHours,
                  title: name,
                  subTopics: [],
                },
              ]
            : [
                ...unitToUpdate?.topics,
                {
                  P: practicalHours,
                  T: teoricHours,
                  AA: autonomousHours,
                  title: name,
                  subTopics: [],
                },
              ];
        try {
          const ans = updateUnit({
            id: unitToUpdate.id,
            data: { topics },
          });
          console.log(ans);
        } catch (e) {
          console.log(e);
        }
        setHours({
          ...hours,
          theorySemester: hours.theorySemester - teoricHours,
          practiceSemester: hours.practiceSemester - practicalHours,
          autonomousLearning:
            hours.autonomousLearning - autonomousHours,
        });
        // console.log(practicalHours);
        setPracticeHour(
          practiceHour.map((ph, index) =>
            index === unitIndex - 1
              ? parseFloat(ph) + parseFloat(practicalHours)
              : ph
          )
        );
        modal.hide();
      }
      if (type === 'edit') {
        const topics = unitToUpdate.topics.map((topic, index) =>
          index === topicIndex
            ? {
                P: practicalHours,
                T: teoricHours,
                AA: autonomousHours,
                title: name,
                subTopics: [],
              }
            : topic
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
        setHours({
          ...hours,
          theorySemester: hours.theorySemester - teoricHours,
          practiceSemester: hours.practiceSemester - practicalHours,
          autonomousLearning:
            hours.autonomousLearning - autonomousHours,
        });
      }
      modal.hide();
    };
    return (
      <Modal width="100%">
        <div
          className="sofia-bold text-center mb-6"
          style={{ fontSize: '1.125rem', marginTop: '1rem' }}
        >
          {type === 'new' ? 'Nuevo' : 'Editar'} Contenido
        </div>
        <Hours hours={hours} />
        <FormWrapper onSubmit={onSubmit}>
          <NewContentForm
            topicName={topicName}
            topicTeoric={topicTeoric}
            topicPractice={topicPractice}
            topicAA={topicAA}
          />
        </FormWrapper>
      </Modal>
    );
  }
);
