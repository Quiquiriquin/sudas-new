import React, { useContext } from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import Modal from './Modal';
import FormWrapper from '../../Forms/FormWrapper';
import NewUserForm from '../../Forms/NewUserForm';
import { REGISTER_USER_DASHBOARD } from '../../../helpers/EnpointsUser';
import NewBibliographyForm from '../../Forms/NewBibliographyForm';
import { SubjectContext } from '../../../context/SubjectContext';
import { CREATE_BIBLIOGRAPHY } from '../../../helpers/BibliographyEndpoints';

export default NiceModal.create(({ subject }) => {
  const queryClient = useQueryClient();
  const context = useContext(SubjectContext);
  const { mutateAsync: createBibliography } = useMutation((data) =>
    CREATE_BIBLIOGRAPHY(data)
  );
  console.log(context);
  const modal = useModal();
  const onSubmit = async (data) => {
    try {
      const {
        type,
        year,
        library,
        author: authorSelect,
        editorial: editorialSelect,
        title: titleSelect,
        country,
        kind,
      } = data;
      console.log('Data del formulario: ', data);
      const finalBody = {
        type: type.value,
        year,
        library,
        author: authorSelect.value,
        editorial: editorialSelect.value,
        title: titleSelect?.label,
        subjectId: subject?.id,
        country,
        kind: kind.value,
      };
      const ans = await createBibliography(finalBody);
      queryClient.invalidateQueries({
        predicate: ({ queryKey }) =>
          queryKey.includes('bibliography'),
      });
      console.log(ans);
      toast.success('Bibliografía añadida exitosamente');
      modal.remove();
    } catch (e) {
      console.log(e);
      toast.error('Ocurrió un error al guardar la bibliografía');
      modal.remove();
    }
  };

  const close = () => modal.remove();

  return (
    <Modal width="100%" height="100%">
      <div
        className="sofia-bold text-center mb-6"
        style={{ fontSize: '1.125rem', marginTop: '1rem' }}
      >
        Nueva bibliografía
      </div>
      <FormWrapper onSubmit={onSubmit}>
        <NewBibliographyForm close={close} />
      </FormWrapper>
    </Modal>
  );
});
