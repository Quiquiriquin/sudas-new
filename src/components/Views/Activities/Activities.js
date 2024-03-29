import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import UserHeader from '../../Shared/UserHeader/UserHeader';
import Button from '../../Shared/Buttons/Button';
import TableSectionHeader from '../../Shared/TableSectionHeader/TableSectionHeader';
import EditableTable from '../../Shared/EditableTable/EditableTable';
import {
  CREATE_ACTIVITY,
  DELETE_ACTIVITY,
  LIST_ACTIVITIES,
  UPDATE_ACTIVITY,
} from '../../../helpers/ActivityEndpoint';
import { GET_VERBS } from '../../../helpers/VerbsEndpoints';
import './Activities.scss';
import Input from '../../Shared/Inputs/Input';
import { CREATE_STRATEGY } from '../../../helpers/StrategiesEndpoints';

const Activities = () => {
  const queryClient = useQueryClient();
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
  const [formStatus, setFormStatus] = useState({
    title: '',
    description: '',
  });
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

  const onChange = async (e) => {
    const { value } = e.target;
    setFormStatus((prev) => ({
      ...prev,
      [e.target.id]: value,
    }));
  };

  const saveActivity = async () => {
    try {
      await CREATE_ACTIVITY(formStatus);
      toast.success('Estrategia creada correctamente');
      queryClient.invalidateQueries(['activities']);
      setFormStatus({
        title: '',
        description: '',
      });
      // eslint-disable-next-line no-shadow
    } catch (e) {
      console.log(e);
      toast.error('Ocurrió un error al crear la estrategia');
    }
  };

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
        {newActivity && (
          <div className="new-verb flex justify-between items-center">
            <Input
              placeholder="Actividad"
              type="borderless"
              small
              value={formStatus?.title}
              id="title"
              onChange={onChange}
              className="first-input"
            />
            <Input
              id="description"
              placeholder="Producto esperado"
              type="borderless"
              small
              value={formStatus?.description}
              onChange={onChange}
            />
            <Button
              style={{ maxWidth: 'max-content' }}
              secondary
              xs
              onClick={saveActivity}
            >
              Crear
            </Button>
          </div>
        )}
        <EditableTable
          queryKey="activities"
          sectionKey="actividad"
          columns={columns}
          data={data}
          deleteMethod={DELETE_ACTIVITY}
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
