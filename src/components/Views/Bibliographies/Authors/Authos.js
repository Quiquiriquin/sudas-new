import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import {
  LIST_ACTIVITIES,
  UPDATE_ACTIVITY,
} from '../../../../helpers/ActivityEndpoint';
import {
  GET_AUTHORS,
  UPDATE_AUTHOR,
} from '../../../../helpers/BibliographyEndpoints';
import EditableTable from '../../../Shared/EditableTable/EditableTable';

const Authors = () => {
  const {
    register,
    watch,
    getValues,
    formState,
    unregister,
    ...form
  } = useForm();
  const { mutateAsync: updateActivity } = useMutation((info) =>
    UPDATE_AUTHOR(info)
  );

  const { data: dataService } = useQuery(['authors'], GET_AUTHORS);
  const [newActivity, setNewActivity] = useState(false);
  const [data, setData] = useState([]);
  const [columns] = useState([
    {
      Header: 'Nombre del autor',
      accessor: 'name',
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
      const aux = verbs.map(({ id, name }) => ({
        id,
        name,
        actions: 'EDIT, SAVE',
      }));
      console.log(aux);
      setData(aux);
    }
  }, [dataService]);
  return (
    <div className="authors">
      <EditableTable
        queryKey="authors"
        sectionKey="autores"
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

export default Authors;
