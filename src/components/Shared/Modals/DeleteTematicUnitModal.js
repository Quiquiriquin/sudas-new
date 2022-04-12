import React from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import Modal from './Modal';
import Button from '../Buttons/Button';

export default NiceModal.create(
  ({ units, setUnits, unitName, index }) => {
    const { handleSubmit } = useForm();
    const modal = useModal();

    const deleteUnit = () => {
      setUnits(units.filter((unit) => unit.id !== index));
      modal.hide();
    };

    return (
      <Modal width="100%">
        <div
          className="sofia-bold text-center mb-6"
          style={{ fontSize: '1.125rem', marginTop: '1rem' }}
        >
          ¿Estas seguro de eliminar la unidad tematica: {unitName}?
        </div>
        <div className="flex justify-center mt-12">
          <div className="w-48">
            <Button isDelete onClick={deleteUnit}>
              Borrar
            </Button>
          </div>
        </div>
      </Modal>
    );
  }
);
