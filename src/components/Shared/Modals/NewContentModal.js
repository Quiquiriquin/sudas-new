import React from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useMutation, useQueryClient } from 'react-query';
import { useForm, useFormContext } from 'react-hook-form';
import Modal from './Modal';
import FormWrapper from '../../Forms/FormWrapper';
import NewContentForm from '../../Forms/NewContentForm';
import Hours from '../../SubjectDetail/Content/Hours';
import {
  UPDATE_COMPETENCE,
  UPDATE_SUBJECT,
} from '../../../helpers/SubjectEndpoints';

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
    subjectId,
  }) => {
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
      try {
        const { name, teoricHours, practicalHours, autonomousHours } =
          data;
        if (hours.theorySemester < teoricHours) return;
        if (hours.practiceSemester < practicalHours) return;
        // if (hours.autonomousLearning < autonomousHours) return;
        const unitToUpdate = units.find(
          (unit) => unit.id === units[unitIndex - 1].id
        );
        if (type === 'new') {
          try {
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
            const ans = await updateUnit({
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
              hours.autonomousLearning + autonomousHours,
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
          modal.remove();
        }
        if (type === 'edit') {
          try {
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
            const ans = await updateUnit({
              id: unitToUpdate.id,
              data: { topics },
            });
            console.log(ans);
          } catch (e) {
            console.log(e);
          }
          setHours(() => ({
            ...hours,
            theorySemester: hours.theorySemester - teoricHours,
            practiceSemester: hours.practiceSemester - practicalHours,
            autonomousLearning:
              hours.autonomousLearning + autonomousHours,
          }));
        }
        console.log(
          parseFloat(
            parseFloat(hours.autonomousLearning) -
              parseFloat(topicAA || 0) +
              parseFloat(autonomousHours)
          ).toFixed(1)
        );
        console.log(
          parseFloat(hours.autonomousLearning),
          parseFloat(topicAA || 0),
          parseFloat(autonomousHours)
        );
        await UPDATE_SUBJECT({
          id: subjectId,
          data: {
            autonomousLearning: parseFloat(
              parseFloat(hours.autonomousLearning) -
                parseFloat(topicAA || 0) +
                parseFloat(autonomousHours)
            ).toFixed(1),
          },
        });
        modal.hide();
        modal.remove();
      } catch (e) {
        console.log('ERROR: ', e);
      }
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
            {...hours}
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
