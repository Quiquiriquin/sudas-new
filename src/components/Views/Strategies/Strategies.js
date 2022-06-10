import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
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
import {
  CREATE_STRATEGY,
  DELETE_STRATEGY,
  GET_STRATEGIES,
  UPDATE_STRATEGY,
} from '../../../helpers/StrategiesEndpoints';
import Input from '../../Shared/Inputs/Input';

const Strategies = () => {
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
    UPDATE_STRATEGY(info)
  );
  const { data: dataService } = useQuery(
    ['strategies'],
    GET_STRATEGIES
  );
  const [formStatus, setFormStatus] = useState({
    label: '',
    description: '',
  });
  const [newStrategy, setNewStrategy] = useState(false);
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

  const saveStrategy = async () => {
    try {
      await CREATE_STRATEGY(formStatus);
      toast.success('Estrategia creada correctamente');
      queryClient.invalidateQueries(['strategies']);
      setFormStatus({
        label: '',
        description: '',
      });
      // eslint-disable-next-line no-shadow
    } catch (e) {
      console.log(e);
      toast.error('Ocurrió un error al crear la estrategia');
    }
  };

  const onChange = async (e) => {
    const { value } = e.target;
    setFormStatus((prev) => ({
      ...prev,
      [e.target.id]: value,
    }));
  };

  const deleteStrategy = async (id) => {
    try {
      await DELETE_STRATEGY(id);
      toast.success('Estrategia eliminada correctamente');
      queryClient.invalidateQueries(['strategies']);
    } catch (e) {
      toast.error('Ocurrió un error al crear la estrategia');
    }
  };

  return (
    <div className="">
      <UserHeader />
      <div className="px-6 py-4 activities-container mt-6">
        <TableSectionHeader
          title="Estrategias"
          label="Agregar estrategia"
          newElement={newStrategy}
          setNewElement={setNewStrategy}
        />
        {newStrategy && (
          <div className="new-verb flex justify-between items-center">
            <Input
              placeholder="Estrategia"
              type="borderless"
              small
              value={formStatus?.label}
              id="label"
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
              onClick={saveStrategy}
            >
              Crear
            </Button>
          </div>
        )}
        <EditableTable
          queryKey="strategies"
          sectionKey="strategias"
          columns={columns}
          data={data}
          save={updateActivity}
          deleteMethod={DELETE_STRATEGY}
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
