/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { useModal } from '@ebay/nice-modal-react';
import { useFormContext } from 'react-hook-form';
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
  const { watch } = useFormContext();
  const [biblioOptions, setBiblioOptions] = useState([]);
  const [editorialOptions, setEditorialOptions] = useState([]);
  const [authorOptions, setAuthorOptions] = useState([]);
  const { data: biblioData } = useQuery(
    ['bibliographies'],
    GET_BIBLIOGRAPHIES_NAMES
  );
  const { data: editorialData } = useQuery(
    ['editorials-2'],
    GET_EDITORIALS
  );
  const { data: authorData } = useQuery(['authors'], GET_AUTHORS);

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

  const [kinds] = useState([
    {
      value: 'BOOK',
      label: 'Libro',
    },
    {
      value: 'ANTOLOGY',
      label: 'Antología',
    },
    {
      value: 'MAGAZINE',
      label: 'Revista',
    },
    {
      value: 'OTHER',
      label: 'Otros',
    },
  ]);
  const [kindsCyber] = useState([
    {
      value: 'BOOK',
      label: 'Libro',
    },
    {
      value: 'ANTOLOGY',
      label: 'Antología',
    },
    {
      value: 'MEMORY',
      label: 'Memoria',
    },
  ]);
  const [kindsDigital] = useState([
    {
      value: 'TEXT',
      label: 'Texto',
    },
    {
      value: 'SIMUL',
      label: 'Simuladores',
    },
    {
      value: 'IMAGES',
      label: 'Imágenes',
    },
    {
      value: 'TUTORIALS',
      label: 'Tutoriales',
    },
    {
      value: 'VIDEOS',
      label: 'Videos',
    },
    {
      value: 'KEYNOTES',
      label: 'Presentaciones',
    },
    {
      value: 'DICTIONARIES',
      label: 'Diccionarios',
    },
    {
      value: 'OTHERS',
      label: 'Otros',
    },
  ]);

  useEffect(() => {
    if (biblioData) {
      const { data } = biblioData;
      const auxSet = new Set([]);
      const auxOptions = [];
      data.forEach(({ title, id }) => {
        if (!auxSet.has(title)) {
          auxSet.add(title);
          auxOptions.push({
            value: id,
            label: title,
          });
        }
      });
      setBiblioOptions(auxOptions);
    }
  }, [biblioData]);

  useEffect(() => {
    if (editorialData) {
      const { data } = editorialData;
      console.log('Esta es la data: ', data);
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
      <div className="flex gap-4 w-full">
        <div className="" style={{ minWidth: '220px' }}>
          <SelectFormInput
            label="Tipo de bibliografía"
            name="type"
            defaultValue={{
              value: 'BASIC',
              label: 'Básica',
            }}
            placeholder="Selecciona"
            options={types}
          />
        </div>
        <div className="w-full" style={{ minWidth: '220px' }}>
          <SelectFormInput
            menuPosition="fixed"
            label="Tipo de recurso"
            name="kind"
            placeholder="Selecciona"
            options={
              watch('type')?.value === 'DIGITAL'
                ? kindsDigital
                : watch('type')?.value === 'CYBER'
                ? kindsCyber
                : kinds
            }
          />
        </div>
      </div>
      {(watch('type')?.value === 'DIGITAL' ||
        watch('type')?.value === 'CYBER') && (
        <>
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
          </div>
          <div className="flex gap-4">
            <div className="relative w-full">
              <MultiSelect
                normalSize
                placeholder="Busca o escribe el título"
                name="title"
                defaultValue=""
                label="Título"
                options={biblioOptions}
                create
              />
            </div>
            <div className="w-full" style={{ minWidth: '220px' }}>
              <FormInput
                label="Dirección electrónica"
                name="url"
                defaultValue=""
                placeholder="Escribe el URL del recurso"
              />
            </div>
          </div>
          <div className="flex gap-4">
            <div
              className=""
              style={{ minWidth: '220px', maxWidth: '220px' }}
            >
              <FormInput
                label="Recuperado el"
                name="found"
                defaultValue=""
                placeholder="Escribe el año"
                type="date"
                min={1900}
                max={new Date().getFullYear()}
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
        </>
      )}
      {watch('type')?.value !== 'DIGITAL' &&
        watch('type')?.value !== 'CYBER' && (
          <>
            <div className="flex gap-4">
              <div className="relative w-full">
                <MultiSelect
                  normalSize
                  placeholder="Busca o escribe el título de la bibliografía"
                  name="title"
                  defaultValue=""
                  label="Título"
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
                className="w-full"
                style={{ minWidth: '220px', maxWidth: '220px' }}
              >
                <FormInput
                  label="País"
                  name="country"
                  defaultValue=""
                  placeholder="Escribe el país..."
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
                  label="ISBN / ID de la biblioteca"
                  name="library"
                  defaultValue=""
                  placeholder="Escribe el Id"
                />
              </div>
            </div>
          </>
        )}
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
