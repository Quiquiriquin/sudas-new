import React from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useMutation, useQueryClient } from 'react-query';
import Modal from './Modal';
import FormWrapper from '../../Forms/FormWrapper';
import NewUserForm from '../../Forms/NewUserForm';
import { REGISTER_USER_DASHBOARD } from '../../../helpers/EnpointsUser';

export default NiceModal.create(() => {
  const queryClient = useQueryClient();
  const { mutateAsync: createUsers } = useMutation(
    REGISTER_USER_DASHBOARD
  );
  const modal = useModal();
  const onSubmit = async (data) => {
    try {
      const users = data.users.map(
        ({ email, academicGrade, role }) => ({
          email,
          academicGrade,
          role: role.value,
        })
      );
      const ans = await createUsers({ users });
      queryClient.invalidateQueries(['users', 'users']);
      console.log(ans);
      modal.remove();
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <Modal width="100%">
      <div
        className="sofia-bold text-center mb-6"
        style={{ fontSize: '1.125rem', marginTop: '1rem' }}
      >
        Nuevo usuario
      </div>
      <FormWrapper onSubmit={onSubmit}>
        <NewUserForm />
      </FormWrapper>
    </Modal>
  );
});
