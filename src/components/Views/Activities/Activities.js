import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from 'react-query';
import UserHeader from '../../Shared/UserHeader/UserHeader';
import Button from '../../Shared/Buttons/Button';
import TableSectionHeader from '../../Shared/TableSectionHeader/TableSectionHeader';
import EditableTable from '../../Shared/EditableTable/EditableTable';
import {
  LIST_ACTIVITIES,
  UPDATE_ACTIVITY,
} from '../../../helpers/ActivityEndpoint';
import { GET_VERBS } from '../../../helpers/VerbsEndpoints';
import './Activities.scss';

const Activities = () => {
  const {
    register,
    watch,
    getValues,
    formState,
    unregister,
    ...form
  } = useForm();
  const { mutateAsync: updateActivity } = useMutation((info) =>
    UPDATE_ACTIVITY(info)
  );
  const { data: dataService } = useQuery(
    ['activities'],
    LIST_ACTIVITIES
  );
  const [newActivity, setNewActivity] = useState(false);
  const [data, setData] = useState([]);
  const [columns] = useState([
    {
      Header: 'Actividad',
      accessor: 'title',
    },
    {
      Header: 'Producto esperado',
      accessor: 'description',
    },
    {
      Header: 'Acciones',
      accessor: 'actions',
    },
  ]);

  useEffect(() => {
    if (dataService) {
      const { data: verbs } = dataService;
      const aux = verbs.map(({ id, description, title }) => ({
        id,
        description,
        title,
        actions: 'EDIT, SAVE',
      }));
      console.log(aux);
      setData(aux);
    }
  }, [dataService]);

  return (
    <div className="">
      <UserHeader />
      <div className="px-6 py-4 activities-container mt-6">
        <TableSectionHeader
          title="Actividades"
          label="Agregar actividad"
          newElement={newActivity}
          setNewElement={setNewActivity}
        />
        <EditableTable
          queryKey="activities"
          sectionKey="actividad"
          columns={columns}
          data={[...data, ...data]}
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
    </div>
  );
};

export default Activities;
