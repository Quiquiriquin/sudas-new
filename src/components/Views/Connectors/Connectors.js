import React, {
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import './Connectors.scss';
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
import {
  CREATE_CONNECTOR,
  DELETE_CONNECTOR,
  GET_CONNECTORS,
  UPDATE_CONNECTOR,
} from '../../../helpers/ConnectorsEndpoints';

const Connectors = () => {
  const queryClient = useQueryClient();
  const { register, watch, getValues, formState, ...form } =
    useForm();
  const { user, dispatch } = useContext(GeneralContext);
  const { data: dataService } = useQuery(
    ['connectors'],
    GET_CONNECTORS
  );
  const { mutateAsync: createConnector } = useMutation((body) =>
    CREATE_CONNECTOR(body)
  );
  const { mutateAsync: updateConnector } = useMutation((body) =>
    UPDATE_CONNECTOR(body)
  );
  const { mutateAsync: deleteMethod } = useMutation((body) =>
    DELETE_CONNECTOR(body)
  );

  const [data, setData] = useState([]);
  const [newConnector, setNewConnector] = useState(false);
  const [columns] = useState([
    {
      Header: 'Conector',
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
      const aux = verbs.map(({ id, description }) => ({
        id,
        description,
        actions: 'EDIT, SAVE',
      }));
      setData(aux);
    }
  }, [dataService]);

  const toggleNew = () => setNewConnector((prev) => !prev);
  const newVerbRef = useRef();

  const saveNewVerb = async () => {
    try {
      const description = newVerbRef.current.value;
      const ans = await createConnector({ description });
      console.log(ans);
      queryClient.invalidateQueries(['connectors']);
      toast.success('Verbo creado correctamente');
      newVerbRef.current.value = '';
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
          <p className="text-lg sofia-bold">Conectores</p>
          <Button
            onClick={toggleNew}
            xs
            primary
            style={{ maxWidth: 'max-content' }}
          >
            {newConnector ? 'Cerrar' : 'Agregar conector'}
          </Button>
        </div>
        {newConnector && (
          <div className="new-verb flex justify-between items-center">
            <Input
              placeholder="Escribe el nuevo conector"
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
          }}
          columns={columns}
          data={data}
          deleteMethod={deleteMethod}
          save={updateConnector}
          sectionKey="conector"
          queryKey="connectors"
        />
      </div>
    </div>
  );
};

export default Connectors;
