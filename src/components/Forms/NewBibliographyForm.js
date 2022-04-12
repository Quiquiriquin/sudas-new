import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useModal } from '@ebay/nice-modal-react';
import MultiSelect from '../Shared/FormInputs/MultiSelect';
import {
  GET_AUTHORS,
  GET_BIBLIOGRAPHIES_NAMES,
  GET_EDITORIALS,
} from '../../helpers/BibliographyEndpoints';
import FormInput from '../Shared/FormInputs/FormInput';
import SelectFormInput from '../Shared/FormInputs/SelectFormInput';
import Button from '../Shared/Buttons/Button';

const NewBibliographyForm = ({ close }) => {
  const [biblioOptions, setBiblioOptions] = useState([]);
  const [editorialOptions, setEditorialOptions] = useState([]);
  const [authorOptions, setAuthorOptions] = useState([]);
  const { data: biblioData } = useQuery(
    ['bibliographies'],
    GET_BIBLIOGRAPHIES_NAMES
  );
  const { data: editorialData } = useQuery(
    ['editorials'],
    GET_EDITORIALS
  );
  const { data: authorData } = useQuery(['authors'], GET_AUTHORS);
  console.log(biblioData);

  const [types] = useState([
    {
      value: 'BASIC',
      label: 'Básica',
    },
    {
      value: 'COMPLEMENTARY',
      label: 'Complementaria',
    },
    {
      value: 'CYBER',
      label: 'Cibergrafía',
    },
    {
      value: 'DIGITAL',
      label: 'Recurso digital',
    },
  ]);

  useEffect(() => {
    if (biblioData) {
      const { data } = biblioData;
      setBiblioOptions(
        data.map(({ title, id }) => ({
          value: id,
          label: title,
        }))
      );
    }
  }, [biblioData]);

  useEffect(() => {
    if (editorialData) {
      const { data } = editorialData;
      setEditorialOptions(
        data.map(({ name, id }) => ({
          value: id,
          label: name,
        }))
      );
    }
  }, [editorialData]);

  useEffect(() => {
    if (authorData) {
      const { data } = authorData;
      setAuthorOptions(
        data.map(({ name, id }) => ({
          value: id,
          label: name,
        }))
      );
    }
  }, [authorData]);

  return (
    <div>
      <div className="flex gap-4">
        <div className="relative w-full">
          <MultiSelect
            normalSize
            placeholder="Busca o escribe el título de la bibliografía"
            name="title"
            defaultValue=""
            label="Nombre de la bibliografía"
            options={biblioOptions}
            create
          />
        </div>
        <div
          className=""
          style={{ minWidth: '220px', maxWidth: '220px' }}
        >
          <FormInput
            label="Año de publicación"
            name="year"
            defaultValue=""
            placeholder="Escribe el año"
            type="number"
            min={1900}
            max={new Date().getFullYear()}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="relative w-full">
          <MultiSelect
            normalSize
            placeholder="Busca o escribe el nombre del autor(es)"
            name="author"
            defaultValue=""
            label="Autor o autores"
            options={authorOptions}
            create
          />
        </div>
        <div
          className=""
          style={{ minWidth: '220px', maxWidth: '220px' }}
        >
          <SelectFormInput
            label="Tipo de bibliografía"
            name="type"
            defaultValue=""
            placeholder="Selecciona"
            options={types}
          />
        </div>
      </div>
      <div className="flex gap-4">
        <div className="relative w-full">
          <MultiSelect
            normalSize
            placeholder="Busca o escribe el nombre de editorial"
            name="editorial"
            defaultValue=""
            label="Editorial"
            options={editorialOptions}
            create
          />
        </div>
        <div
          className=""
          style={{ minWidth: '220px', maxWidth: '220px' }}
        >
          <FormInput
            label="ID biblioteca"
            name="library"
            defaultValue=""
            placeholder="Escribe el Id"
          />
        </div>
      </div>
      <div className="mt-8 flex justify-between">
        <Button onClick={close} style={{ maxWidth: '150px' }}>
          Cancelar
        </Button>
        <Button type="submit" secondary style={{ maxWidth: '175px' }}>
          Agregar
        </Button>
      </div>
    </div>
  );
};

export default NewBibliographyForm;
