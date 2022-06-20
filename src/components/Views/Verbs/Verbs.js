import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import './Verbs.scss';
import { useTable } from 'react-table';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import users from '../../../assets/svgs/users.svg';
import UserHome from '../Home/UserHome/UserHome';
import { GeneralContext } from '../../../context/GeneralContext';
import { SessionContext } from '../../../context/SessionContext';
import Button from '../../Shared/Buttons/Button';
import Input from '../../Shared/Inputs/Input';
import {
  CREATE_VERB,
  DELETE_VERB,
  GET_VERBS,
  UPDATE_VERB,
} from '../../../helpers/VerbsEndpoints';
import EditableTable from '../../Shared/EditableTable/EditableTable';
import UserHeader from '../../Shared/UserHeader/UserHeader';

const Verbs = () => {
  const queryClient = useQueryClient();
  const {
    register,
    watch,
    getValues,
    formState,
    unregister,
    ...form
  } = useForm();
  const { user, dispatch } = useContext(GeneralContext);
  const { data: dataService } = useQuery(['verbs'], GET_VERBS);
  const { mutateAsync: createVerb } = useMutation((body) =>
    CREATE_VERB(body)
  );
  const { mutateAsync: updateVerb } = useMutation((body) =>
    UPDATE_VERB(body)
  );
  const { mutateAsync: deleteMethod } = useMutation((body) =>
    DELETE_VERB(body)
  );

  const [data, setData] = useState([]);
  const [newVerb, setNewVerb] = useState(false);
  const [columns] = useState([
    {
      Header: 'Verbo',
      accessor: 'description',
    },
    {
      Header: 'Nivel',
      accessor: 'level',
    },
    {
      Header: 'Acciones',
      accessor: 'actions',
    },
  ]);
  // const save = async (id) => {
  //   try {
  //     const values = getValues();
  //     const newVerbToSave = values[`verbo-${id}`];
  //     console.log(values);
  //     console.log(newVerbToSave);
  //     const body = {
  //       id,
  //       description: newVerbToSave,
  //     };
  //     await updateVerb(body);
  //     toast.success('Cambios guardados correctamente');
  //   } catch (e) {
  //     console.log(e);
  //     toast.error('Ocurrió un error al intentar guardar los cambios');
  //   }
  // };

  useEffect(() => {
    if (dataService) {
      const { data: verbs } = dataService;
      const aux = verbs.map(({ id, description, level }) => ({
        id,
        description,
        level,
        actions: 'EDIT, SAVE',
      }));
      setData(aux);
    }
  }, [dataService]);

  const toggleNew = () => setNewVerb((prev) => !prev);
  const newVerbRef = useRef();

  const saveNewVerb = async () => {
    try {
      const description = newVerbRef.current.value;
      const ans = await createVerb({ description });
      console.log(ans);
      queryClient.invalidateQueries(['verbs']);
      toast.success('Verbo creado correctamente');
    } catch (e) {
      console.log(e);
      toast.error('Ocurrió un error al crear el verbo');
    }
  };

  // const deleteVerb = async (id) => {
  //   try {
  //     unregister(`verbo-${id}`);
  //     await deleteMethod(id);
  //     queryClient.invalidateQueries(['verbs']);
  //     toast.success('Verbo eliminado correctamente');
  //   } catch (e) {
  //     console.log(e);
  //     toast.error('Ocurrió un error al eliminar el verbo');
  //   }
  // };

  return (
    <div className="flex flex-col flex-1 bg-platinum space-y-10">
      <UserHeader />
      <div className="px-6 py-4 verbs-container">
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg sofia-bold">Verbos</p>
          <Button
            onClick={toggleNew}
            xs
            primary
            style={{ maxWidth: 'max-content' }}
          >
            {newVerb ? 'Cerrar' : 'Agregar verbo'}
          </Button>
        </div>
        {newVerb && (
          <div className="new-verb flex justify-between items-center">
            <Input
              placeholder="Escribe el nuevo verbo"
              type="borderless"
              small
              ref={newVerbRef}
            />
            <Button
              style={{ maxWidth: 'max-content' }}
              secondary
              xs
              onClick={saveNewVerb}
            >
              Crear
            </Button>
          </div>
        )}
        <EditableTable
          {...{
            ...form,
            register,
            watch,
            getValues,
            formState,
            unregister,
          }}
          columns={columns}
          data={data}
          deleteMethod={deleteMethod}
          save={updateVerb}
          sectionKey="verbo"
          queryKey="verbs"
        />
      </div>
    </div>
  );
};

export default Verbs;
