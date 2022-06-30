import React from 'react';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import moment from 'moment-timezone';
import { DELETE_BIBLIOGRAPHY } from '../../../helpers/BibliographyEndpoints';

const BibliographyItem = ({
  id,
  title,
  library,
  year,
  author,
  editorial,
  kind,
  country,
  url,
  found,
  type,
}) => {
  const queryClient = useQueryClient();
  const { mutateAsync } = useMutation(() => DELETE_BIBLIOGRAPHY(id));
  console.log(moment.localeData('en').months());
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
    TEXT: 'Texto',
    SIMUL: 'Simulador',
    IMAGES: 'Imágenes',
    TUTORIALS: 'Tutoriales',
    VIDEOS: 'Videos',
    KEYNOTES: 'Presentaciones',
    DICTIONARIES: 'Diccionarios',
    OTHERS: 'Otros',
    MEMORY: 'Memorias',
  };

  if (type === 'CYBER' || type === 'DIGITAL') {
    return (
      <li key={id} className="content-list flex justify-between">
        <p className="font-bold" style={{ maxWidth: '50%' }}>
          {`${author?.name}. (${year}).`} <i>{title}</i>.{' '}
          {`EN: ${url}. Recuperado el ${moment(
            new Date(found),
            'DD [de] MMMM [de] YYYY',
            'MX'
          )
            .format('DD [de] MMMM [de] YYYY')
            .replace('January', 'Enero')
            .replace('February', 'Febrero')
            .replace('March', 'Marzo')
            .replace('April', 'Abril')
            .replace('May', 'Mayo')
            .replace('June', 'Junio')
            .replace('July', 'Julio')
            .replace('August', 'Agosto')
            .replace('September', 'Septiembre')
            .replace('October', 'Octubre')
            .replace('November', 'Noviembre')
            .replace('December', 'Diciembre')}`}
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
  }

  return (
    <li key={id} className="content-list flex justify-between">
      <p className="font-bold" style={{ maxWidth: '50%' }}>
        {`${author?.name}. (${year}).`} <i>{title}</i>.{' '}
        {`${country}: ${editorial?.name}. ISBN
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
