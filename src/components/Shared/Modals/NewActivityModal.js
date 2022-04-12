import React from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useMutation, useQueryClient } from 'react-query';
import Modal from './Modal';
import FormWrapper from '../../Forms/FormWrapper';
import NewUserForm from '../../Forms/NewUserForm';
import { REGISTER_USER_DASHBOARD } from '../../../helpers/EnpointsUser';
import NewActivityForm from '../../Forms/NewActivityForm';

export default NiceModal.create(
  ({
    unitStrategies,
    setUnitStrategies,
    type,
    unitIndex = -1,
    activityIndex = -1,
  }) => {
    const queryClient = useQueryClient();
    const modal = useModal();
    const onSubmit = async (data) => {
      if (data.actividad !== undefined) {
        if (type === 'new') {
          setUnitStrategies(
            unitStrategies.map((unit, index) => {
              return index === unitIndex - 1
                ? {
                    ...unit,
                    activities: [
                      ...unit.activities,
                      data.actividad.label,
                    ],
                  }
                : unit;
            })
          );
          console.log(unitStrategies);
        }
        if (type === 'edit') {
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
          Nueva Práctica
        </div>
        <FormWrapper onSubmit={onSubmit}>
          <NewActivityForm />
        </FormWrapper>
      </Modal>
    );
  }
);
