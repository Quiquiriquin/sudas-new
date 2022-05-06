import React, { useContext, useState } from 'react';
import './Verbs.scss';
import { useTable } from 'react-table';
import { toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import users from '../../../assets/svgs/users.svg';
import UserHome from '../Home/UserHome/UserHome';
import { GeneralContext } from '../../../context/GeneralContext';
import { SessionContext } from '../../../context/SessionContext';
import Button from '../../Shared/Buttons/Button';
import Input from '../../Shared/Inputs/Input';

const Verbs = () => {
  const { register, watch } = useForm();
  const { user, dispatch } = useContext(GeneralContext);
  const { session } = useContext(SessionContext);
  const { name, firstSurname } = session;
  const [data] = useState([
    {
      description: 'Agarrar',
      actions: 'EDIT, SAVE',
      id: 1,
    },
    {
      description: 'Correr',
      actions: 'EDIT, SAVE',
      id: 2,
    },
    {
      description: 'Comer',
      actions: 'EDIT, SAVE',
      id: 3,
    },
  ]);
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
      const input = document.getElementById(`verbo-${id}`);
      const { value } = input;
      console.log(value);
      toast.success('Cambios guardados correctamente');
    } catch (e) {
      console.log(e);
      toast.error('Ocurrió un error al intentar guardar los cambios');
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
                      <th {...column.getHeaderProps()}>
                        {
                          // Render the heade
                          column.render('Header')
                        }
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
                        // Apply the cell prop
                        const { row: innerRow } = cell;
                        console.log(cell);
                        const currentDesc = watch(
                          `verbo-${innerRow.values.id}`
                        );
                        let isEditing = false;
                        if (cell.column.Header === 'Acciones') {
                          return (
                            <td>
                              <div className="flex gap-2">
                                <Button
                                  onClick={() =>
                                    save(innerRow.values.id)
                                  }
                                  disabled={
                                    currentDesc !==
                                    data[index].description
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
                            <form>
                              <Input
                                id={`verbo-${innerRow.values.id}`}
                                small
                                type="borderless"
                                defaultValue={
                                  innerRow.values.description
                                }
                                {...register(
                                  `verbo-${innerRow.values.id}`
                                )}
                                onFocus={() => {
                                  isEditing = true;
                                }}
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
