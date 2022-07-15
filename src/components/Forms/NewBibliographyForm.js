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

const NewBibliographyForm = ({
  close,
  hasAllBasic,
  completeBasic,
}) => {
  const {
    watch,
    setError,
    clearErrors,
    formState: { isValid },
  } = useFormContext();
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
      isDisabled: completeBasic,
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

  useEffect(() => {
    if (watch('year') && watch('type')?.value === 'BASIC') {
      console.log(watch('year'));
      const parsed = parseInt(watch('year'), 10);
      console.log(parsed);
      console.log(parseInt(new Date().getFullYear(), 10) - 5);
      const minYear = parseInt(new Date().getFullYear(), 10) - 5;
      if (parsed <= minYear && hasAllBasic) {
        setError('year', {
          message: 'Solo se permiten 2 mayores a 5 años',
          type: 'min',
        });
      } else {
        console.log('Limpiando');
        clearErrors('year');
      }
    }
  }, [watch('year')]);

  return (
    <div>
      <div className="flex gap-4 w-full">
        <div className="" style={{ minWidth: '220px' }}>
          <SelectFormInput
            label="Tipo de bibliografía"
            name="type"
            defaultValue={
              completeBasic
                ? {
                    value: 'COMPLEMENTARY',
                    label: 'Complementaria',
                  }
                : {
                    value: 'BASIC',
                    label: 'Básica',
                  }
            }
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
                rules={{
                  required: 'Selecciona o crea un autor(es)',
                }}
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
                rules={{
                  required: 'Selecciona o crea un título',
                }}
              />
            </div>
            <div className="w-full" style={{ minWidth: '220px' }}>
              <FormInput
                label="Dirección electrónica"
                name="url"
                defaultValue=""
                placeholder="Escribe el URL del recurso"
                rules={{
                  required: 'Escribe la URL del recurso',
                }}
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
                rules={{
                  required: 'Escribe el año de publicación',
                }}
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
                  rules={{
                    required: 'Selecciona o crea un título',
                  }}
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
                  min={
                    hasAllBasic && watch('type')?.value === 'BASIC'
                      ? new Date().getFullYear() - 5
                      : 1900
                  }
                  max={new Date().getFullYear()}
                  rules={{
                    ...(watch('type')?.value === 'BASIC'
                      ? {
                          min: {
                            value:
                              parseInt(new Date().getFullYear(), 10) -
                              5,
                            message:
                              '2 bibliografías de más de 5 años',
                          },
                        }
                      : {}),
                  }}
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
                  rules={{
                    required: 'Selecciona o crea un autor',
                  }}
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
                  rules={{
                    required: 'Escribe el país',
                  }}
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
                  rules={{
                    required: 'Selecciona o crea una editorial',
                  }}
                />
              </div>
              <div className="">
                <SelectFormInput
                  menuPosition="fixed"
                  label="Identificador"
                  name="idType"
                  placeholder="Selecciona"
                  rules={{
                    required: 'Selecciona un identificador',
                  }}
                  options={[
                    {
                      value: 'ISBN',
                      label: 'ISBN',
                    },
                    {
                      value: 'ID',
                      label: 'ID',
                    },
                    {
                      value: 'ISSN',
                      label: 'ISSN',
                    },
                  ]}
                />
              </div>
              <div
                className=""
                style={{ minWidth: '220px', maxWidth: '220px' }}
              >
                <FormInput
                  label="No. Identificador"
                  name="library"
                  defaultValue=""
                  placeholder="Escribe el identificador"
                  rules={{
                    required: 'Ingresa el identificador',
                  }}
                />
              </div>
            </div>
          </>
        )}
      <div className="mt-8 flex justify-between">
        <Button onClick={close} style={{ maxWidth: '150px' }}>
          Cancelar
        </Button>
        <Button
          disabled={!isValid}
          type="submit"
          secondary
          style={{ maxWidth: '175px' }}
        >
          Agregar
        </Button>
      </div>
    </div>
  );
};

export default NewBibliographyForm;
