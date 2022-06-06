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
import './Strategies.scss';
import { GET_STRATEGIES } from '../../../helpers/StrategiesEndpoints';

const Strategies = () => {
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
    ['strategies'],
    GET_STRATEGIES
  );
  const [newActivity, setNewActivity] = useState(false);
  const [data, setData] = useState([]);
  const [columns] = useState([
    {
      Header: 'Estrategia',
      accessor: 'label',
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
      const aux = verbs.map(({ id, description, label }) => ({
        id,
        description,
        label,
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
          title="Estrategias"
          label="Agregar estrategia"
          newElement={newActivity}
          setNewElement={setNewActivity}
        />
        <EditableTable
          queryKey="strategies"
          sectionKey="strategias"
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
    </div>
  );
};

export default Strategies;
