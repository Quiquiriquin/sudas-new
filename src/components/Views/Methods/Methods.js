import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import UserHeader from '../../Shared/UserHeader/UserHeader';
import Button from '../../Shared/Buttons/Button';
import TableSectionHeader from '../../Shared/TableSectionHeader/TableSectionHeader';
import EditableTable from '../../Shared/EditableTable/EditableTable';
import './Methods.scss';
import Input from '../../Shared/Inputs/Input';
import {
  CREATE_METHOD,
  DELETE_METHOD,
  GET_METHODS,
  UPDATE_METHOD,
} from '../../../helpers/MethodsEndpoints';

const Methods = () => {
  const queryClient = useQueryClient();
  const {
    register,
    watch,
    getValues,
    formState,
    unregister,
    ...form
  } = useForm();
  const { mutateAsync: updateMethod } = useMutation((info) =>
    UPDATE_METHOD(info)
  );
  const { data: dataService } = useQuery(['methods'], GET_METHODS);
  const [formStatus, setFormStatus] = useState({
    label: '',
    description: '',
  });
  const [newMethod, setNewMethod] = useState(false);
  const [data, setData] = useState([]);
  const [columns] = useState([
    {
      Header: 'Método',
      accessor: 'label',
    },
    {
      Header: 'Descripción',
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
      await CREATE_METHOD(formStatus);
      toast.success('Méotod creado correctamente');
      queryClient.invalidateQueries(['methods']);
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

  return (
    <div className="">
      <UserHeader />
      <div className="px-6 py-4 activities-container mt-6">
        <TableSectionHeader
          title="Métodos"
          label="Agregar método"
          newElement={newMethod}
          setNewElement={setNewMethod}
        />
        {newMethod && (
          <div className="new-verb flex justify-between items-center">
            <Input
              placeholder="Método"
              type="borderless"
              small
              value={formStatus?.label}
              id="label"
              onChange={onChange}
              className="first-input"
            />
            <Input
              id="description"
              placeholder="Descripción"
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
          queryKey="methods"
          sectionKey="metodos"
          columns={columns}
          data={data}
          save={updateMethod}
          deleteMethod={DELETE_METHOD}
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

export default Methods;
