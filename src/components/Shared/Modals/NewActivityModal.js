import React from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useMutation, useQueryClient } from 'react-query';
import Modal from './Modal';
import FormWrapper from '../../Forms/FormWrapper';
import NewUserForm from '../../Forms/NewUserForm';
import { REGISTER_USER_DASHBOARD } from '../../../helpers/EnpointsUser';
import NewActivityForm from '../../Forms/NewActivityForm';
import { SET_ACTIVITY } from '../../../helpers/ActivityEndpoint';

export default NiceModal.create(
  ({
    unitStrategies,
    setUnitStrategies,
    type,
    unitIndex = -1,
    activityIndex = -1,
    id,
  }) => {
    const queryClient = useQueryClient();
    const modal = useModal();
    const onSubmit = async (data) => {
      console.log(data);
      if (data.actividad !== undefined) {
        if (type === 'new') {
          console.log('Asignando');
          const { actividad } = data;
          const { data: activities } = await SET_ACTIVITY(id, {
            selectedActivities: actividad.value,
          });
          console.log('Actividades: ', activities);
          setUnitStrategies(
            unitStrategies.map((unit, index) => {
              console.log(
                'ES la nueva: ',
                index === unitIndex - 1,
                unit
              );
              return index === unitIndex - 1
                ? {
                    ...unit,
                    activities,
                  }
                : unit;
            })
          );
          console.log(unitStrategies);
        }
        if (type === 'edit') {
          console.log('Editando');
          setUnitStrategies(
            unitStrategies.map((unit, index) => {
              console.log(unitIndex, index);
              return index === unitIndex - 1
                ? {
                    ...unit,
                    activities: unit.activities.map((actity, i) =>
                      i === activityIndex
                        ? data.actividad.label
                        : actity
                    ),
                  }
                : unit;
            })
          );
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
          Nueva Actividad
        </div>
        <FormWrapper onSubmit={onSubmit}>
          <NewActivityForm />
        </FormWrapper>
      </Modal>
    );
  }
);
