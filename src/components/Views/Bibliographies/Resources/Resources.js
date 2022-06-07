import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import {
  LIST_ACTIVITIES,
  UPDATE_ACTIVITY,
} from '../../../../helpers/ActivityEndpoint';
import {
  GET_AUTHORS,
  GET_BIBLIOGRAPHIES_NAMES,
  GET_EDITORIALS,
  UPDATE_AUTHOR,
  UPDATE_BIBLIOGRAPHY,
  UPDATE_EDITORIAL,
} from '../../../../helpers/BibliographyEndpoints';
import EditableTable from '../../../Shared/EditableTable/EditableTable';

const Resources = () => {
  const {
    register,
    watch,
    getValues,
    formState,
    unregister,
    ...form
  } = useForm();
  const { mutateAsync: updateActivity } = useMutation((info) =>
    UPDATE_BIBLIOGRAPHY(info)
  );

  const { data: dataService } = useQuery(
    ['resources'],
    GET_BIBLIOGRAPHIES_NAMES
  );

  const [data, setData] = useState([]);
  const [columns] = useState([
    {
      Header: 'Título',
      accessor: 'title',
    },
    {
      Header: 'Tipo',
      accessor: 'type',
    },
    {
      Header: 'Año',
      accessor: 'year',
    },
    {
      Header: 'ISBN',
      accessor: 'library',
    },
    {
      Header: 'Acciones',
      accessor: 'actions',
    },
  ]);
  useEffect(() => {
    if (dataService) {
      console.log(dataService);
      const { data: verbs } = dataService;
      const aux = verbs.map(({ id, title, year, type, library }) => ({
        id,
        title,
        year,
        type,
        library,
        actions: 'EDIT, SAVE',
      }));
      console.log(aux);
      setData(aux);
    }
  }, [dataService]);
  return (
    <div className="authors">
      <EditableTable
        queryKey="resources"
        sectionKey="recursos"
        columns={columns}
        data={data}
        save={updateActivity}
        {...{
          ...form,
          register,
          watch,
          getValues,
          formState,
          unregister,
        }}
      />
    </div>
  );
};

export default Resources;
