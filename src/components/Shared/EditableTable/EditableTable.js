import React from 'react';
import { useTable } from 'react-table';
import { toast } from 'react-toastify';
import { useQueryClient } from 'react-query';
import Button from '../Buttons/Button';
import Input from '../Inputs/Input';
import './EditableTable.scss';

const EditableTable = ({
  columns,
  data,
  sectionKey,
  deleteMethod,
  save: saveMethod,
  register,
  watch,
  formState,
  getValues,
  queryKey,
  ...form
}) => {
  const queryClient = useQueryClient();
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
      const newElement = getValues();
      const body = {
        id,
      };
      Object.keys(newElement).forEach((key) => {
        const [, field, innerId] = key.split('-');
        if (parseInt(innerId, 10) === id) {
          body[field] = newElement[key];
        }
      });
      await saveMethod(body);
      toast.success('Cambios guardados correctamente');
      queryClient.invalidateQueries([queryKey]);
    } catch (e) {
      console.log(e);
      toast.error('Ocurrió un error al intentar guardar los cambios');
    }
  };

  const deleteFunction = async (id) => {
    try {
      form.unregister(`${sectionKey}-${id}`);
      await deleteMethod(id);
      queryClient.invalidateQueries([queryKey]);
      toast.success('Verbo eliminado correctamente');
    } catch (e) {
      console.log(e);
      toast.error('Ocurrió un error al eliminar el verbo');
    }
  };

  console.log(Object.keys(formState.dirtyFields));

  return (
    <table className="editable-table" {...getTableProps()}>
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
                    console.log(row.cells);
                    const { row: innerRow } = cell;
                    console.log(innerRow, cell);
                    if (cell.column.Header === 'Acciones') {
                      return (
                        <td>
                          <div className="flex gap-2">
                            <Button
                              onClick={() =>
                                save(innerRow.original.id)
                              }
                              // disabled={
                              //   !Object.keys(
                              //     formState.dirtyFields
                              //   ).includes(
                              //     `${sectionKey}-${cell.column.id}-${innerRow.original.id}`
                              //   )
                              // }
                              style={{
                                maxWidth: 'max-content',
                              }}
                              secondary
                              xs
                            >
                              Guardar
                            </Button>
                            <Button
                              onClick={() =>
                                deleteFunction(innerRow.original.id)
                              }
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
                            id={`${sectionKey}-${innerRow.original.id}`}
                            small
                            type="borderless"
                            defaultValue={
                              innerRow.values[cell.column.id]
                            }
                            {...register(
                              `${sectionKey}-${cell.column.id}-${innerRow.original.id}`
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
  );
};

export default EditableTable;
