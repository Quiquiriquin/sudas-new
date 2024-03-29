import React from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useMutation, useQueryClient } from 'react-query';
import Modal from './Modal';
import FormWrapper from '../../Forms/FormWrapper';
import { REGISTER_USER_DASHBOARD } from '../../../helpers/EnpointsUser';
import NewPracticesForm from '../../Forms/NewPracticesForm';

export default NiceModal.create(
  ({
    practices,
    type,
    unitIndex = -1,
    setPractices,
    setHours,
    practiceIndex = -1,
    practiceHour,
    setPracticeHour,
    samePlacePractices,
    practicePlace,
  }) => {
    // const queryClient = useQueryClient();
    const modal = useModal();
    const infoPractice = practices.find(
      (unit, index) => index === unitIndex - 1
    );
    const dataPractice = infoPractice?.practices[practiceIndex];
    const onSubmit = async (data) => {
      if (type === 'new') {
        const { name, hours: hoursValue, places } = data;
        setPractices(
          practices.map((unit, index) =>
            index === unitIndex - 1
              ? { ...unit, practices: [...unit.practices, data] }
              : unit
          )
        );
        setPracticeHour(
          practiceHour.map((ph, index) =>
            index === unitIndex - 1
              ? parseFloat(ph) - parseFloat(hoursValue)
              : ph
          )
        );
      }
      if (type === 'edit') {
        const { name, hours: hoursValue, places } = data;
        const prevHours = parseFloat(
          practices[unitIndex - 1].practices[practiceIndex].hours
        ).toFixed(2);
        console.log(prevHours);
        setPractices(
          practices.map((unit, index) => {
            return index === unitIndex - 1
              ? {
                  ...unit,
                  practices: unit.practices.map((p, i) =>
                    i === practiceIndex ? data : p
                  ),
                }
              : unit;
          })
        );
        setPracticeHour(
          practiceHour?.map((ph, index) =>
            index === unitIndex - 1
              ? parseFloat(prevHours) +
                parseFloat(ph) -
                parseFloat(hoursValue)
              : ph
          )
        );
      }
      modal.hide();
    };
    return (
      <Modal width="100%">
        <div
          className="sofia-bold text-center mb-6"
          style={{ fontSize: '1.125rem', marginTop: '1rem' }}
        >
          {type === 'new' ? 'Nueva Práctica' : 'Editar Práctica'}
        </div>
        <FormWrapper onSubmit={onSubmit}>
          <NewPracticesForm
            namePractice={dataPractice?.name}
            hours={dataPractice?.hours}
            place={dataPractice?.place}
            practicePlace={practicePlace}
            samePlacePractices={samePlacePractices}
          />
        </FormWrapper>
      </Modal>
    );
  }
);
