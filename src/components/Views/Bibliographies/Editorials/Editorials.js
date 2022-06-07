import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import {
  LIST_ACTIVITIES,
  UPDATE_ACTIVITY,
} from '../../../../helpers/ActivityEndpoint';
import {
  GET_AUTHORS,
  GET_EDITORIALS,
  UPDATE_AUTHOR,
  UPDATE_EDITORIAL,
} from '../../../../helpers/BibliographyEndpoints';
import EditableTable from '../../../Shared/EditableTable/EditableTable';

const Editorials = () => {
  const {
    register,
    watch,
    getValues,
    formState,
    unregister,
    ...form
  } = useForm();
  const { mutateAsync: updateActivity } = useMutation((info) =>
    UPDATE_EDITORIAL(info)
  );

  const { data: dataService } = useQuery(
    ['editorials'],
    GET_EDITORIALS
  );
  const [newActivity, setNewActivity] = useState(false);
  const [data, setData] = useState([]);
  const [columns] = useState([
    {
      Header: 'Editorial',
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
        queryKey="editorials"
        sectionKey="editoriales"
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

export default Editorials;
