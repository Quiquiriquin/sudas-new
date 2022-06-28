import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { DELETE_BIBLIOGRAPHY } from '../../../helpers/BibliographyEndpoints';

const BibliographyItem = ({
  id,
  title,
  library,
  year,
  author,
  editorial,
  kind,
}) => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(() => DELETE_BIBLIOGRAPHY(id));
  const deleteResource = async () => {
    try {
      await mutateAsync();
      toast.success('Se ha eliminado correctamente');
      queryClient.invalidateQueries({
        predicate: ({ queryKey }) =>
          queryKey.includes('bibliography'),
      });
    } catch (e) {
      toast.error(
        'Ocurrió un error al intentar eliminar el elemento'
      );
    }
  };

  const kinds = {
    BOOK: 'Libro',
    ANTOLOGY: 'Antología',
    OTHER: 'Otros',
  };

  return (
    <li key={id} className="content-list flex justify-between">
      <p className="font-bold w-96">
        {`${author?.name}. (${year}). ${title}. ${editorial?.name}. ISBN
                            ${library}`}
      </p>
      <div>
        <p>{kinds[kind]}</p>
      </div>
      <div className="flex">
        <div
          onClick={deleteResource}
          className="icon-btn flex items-center justify-center"
        >
          <box-icon type="solid" name="trash" />
        </div>
        <div className="icon-btn flex items-center justify-center">
          <box-icon type="solid" name="edit" />
        </div>
      </div>
    </li>
  );
};

export default BibliographyItem;
