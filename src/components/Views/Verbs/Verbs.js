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
import { useQuery } from 'react-query';
import users from '../../../assets/svgs/users.svg';
import UserHome from '../Home/UserHome/UserHome';
import { GeneralContext } from '../../../context/GeneralContext';
import { SessionContext } from '../../../context/SessionContext';
import Button from '../../Shared/Buttons/Button';
import Input from '../../Shared/Inputs/Input';
import { GET_VERBS } from '../../../helpers/VerbsEndpoints';

const Verbs = () => {
  const { register, watch, getValues, formState, ...form } =
    useForm();
  const { user, dispatch } = useContext(GeneralContext);
  const { session } = useContext(SessionContext);
  const { name, firstSurname } = session;
  const { data: dataService } = useQuery(['verbs'], GET_VERBS);
  console.log(dataService);
  const [data, setData] = useState([]);
  const [newVerb, setNewVerb] = useState(false);
  const [columns] = useState([
    {
      Header: 'Verbo',
      accessor: 'description',
    },
    {
      Header: 'Acciones',
      accessor: 'actions',
    },
  ]);
  const tableInstance = useTable({ columns, data });
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
  } = tableInstance;
  const save = async (id) => {
    try {
      const values = getValues();
      console.log(values[`verbo-${id}`]);
      toast.success('Cambios guardados correctamente');
    } catch (e) {
      console.log(e);
      toast.error('Ocurrió un error al intentar guardar los cambios');
    }
  };

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

  const toggleNew = () => setNewVerb((prev) => !prev);
  const newVerbRef = useRef();
  const saveNewVerb = async () => {
    try {
      console.log(newVerbRef.current.value);
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className="flex flex-col flex-1 bg-platinum space-y-10">
      <div className="bg-white rounded box-shadow px-6 py-4 flex-initial">
        <h1 className="text-lg">
          Hola, {name} {firstSurname}
        </h1>
      </div>
      <div className="px-6 py-4 verbs-container">
        <div className="flex justify-between items-center mb-4">
          <p className="text-lg sofia-bold">Verbos</p>
          <Button
            onClick={toggleNew}
            xs
            primary
            style={{ maxWidth: 'max-content' }}
          >
            Agregar verbo
          </Button>
        </div>
        {newVerb && (
          <div className="new-verb flex justify-between items-center">
            <Input
              placeholder="Escribe el nuevo verbo"
              type="borderless"
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
        <table className="verbs-table" {...getTableProps()}>
          <thead>
            {
              // Loop over the header rows
              headerGroups.map((headerGroup) => (
                // Apply the header row props
                <tr {...headerGroup.getHeaderGroupProps()}>
                  {
                    // Loop over the headers in each row
                    headerGroup.headers.map((column) => (
                      // Apply the header cell props
                      <th
                        className={`${
                          column.Header === 'Acciones' ? 'short' : ''
                        }`}
                        {...column.getHeaderProps()}
                      >
                        {
                          // Render the heade
                          column.render('Header')
                        }
                        {console.log(column)}
                      </th>
                    ))
                  }
                </tr>
              ))
            }
          </thead>
          {/* Apply the table body props */}
          <tbody {...getTableBodyProps()}>
            {
              // Loop over the table rows
              rows.map((row) => {
                // Prepare the row for display
                prepareRow(row);
                return (
                  // Apply the row props
                  <tr {...row.getRowProps()}>
                    {
                      // Loop over the rows cells
                      row.cells.map((cell, index) => {
                        // Apply the cell pro
                        const { row: innerRow } = cell;
                        console.log(innerRow);
                        const currentDesc = watch(
                          `verbo-${innerRow.original.id}`
                        );
                        console.log(currentDesc);
                        if (cell.column.Header === 'Acciones') {
                          return (
                            <td>
                              <div className="flex gap-2">
                                <Button
                                  onClick={() =>
                                    save(innerRow.original.id)
                                  }
                                  disabled={
                                    !formState.dirtyFields[
                                      `verbo-${innerRow.original.id}`
                                    ]
                                  }
                                  style={{
                                    maxWidth: 'max-content',
                                  }}
                                  secondary
                                  xs
                                >
                                  Guardar
                                </Button>
                                <Button
                                  style={{
                                    maxWidth: 'max-content',
                                  }}
                                  isDelete
                                  xs
                                >
                                  Eliminar
                                </Button>
                              </div>
                            </td>
                          );
                        }
                        return (
                          <td {...cell.getCellProps()}>
                            <form {...form}>
                              <Input
                                id={`verbo-${innerRow.original.id}`}
                                small
                                type="borderless"
                                defaultValue={
                                  innerRow.values.description
                                }
                                {...register(
                                  `verbo-${innerRow.original.id}`
                                )}
                              />
                            </form>
                          </td>
                        );
                      })
                    }
                  </tr>
                );
              })
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Verbs;
