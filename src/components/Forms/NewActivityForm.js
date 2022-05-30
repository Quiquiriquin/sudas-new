import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useQuery } from 'react-query';
import Button from '../Shared/Buttons/Button';
import FormInput from '../Shared/FormInputs/FormInput';
import SelectFormInput from '../Shared/FormInputs/SelectFormInput';
import { LIST_ACTIVITIES } from '../../helpers/ActivityEndpoint';

const NewActivityForm = () => {
  // const {
  //   formState: { isValid, isSubmitting },
  // } = useFormContext();

  const { data: activitiesData } = useQuery(
    ['activites', 'form'],
    LIST_ACTIVITIES
  );
  const [hidden, setHidden] = useState(true);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    if (activitiesData) {
      const { data } = activitiesData;
      const aux = data.map(({ id, title }) => ({
        value: id,
        label: title,
      }));
      setOptions(aux);
    }
  }, [activitiesData]);

  return (
    <div className="w-full flex p-8 mx-auto flex-col">
      <div className="mb-2">
        {hidden ? (
          <SelectFormInput
            options={options}
            name="actividad"
            label="Actividad"
            defaultValue=""
            placeholder="Elige un método de enseñanza"
            className="w-96 flex-none"
          />
        ) : (
          <div>
            <FormInput
              name="activity"
              label="Actividad"
              defaultValue=""
              placeholder="Escribe la actividad.."
              rules={{
                required: 'Ingresa la actividad',
              }}
            />
            <FormInput
              name="evidence"
              label="Evidencia"
              defaultValue=""
              placeholder="Escribe la evidencia.."
              rules={{
                required: 'Ingresa la evidencia',
              }}
            />
          </div>
        )}
        <p className="text-right font-bold p-2">
          {hidden
            ? '¿No esta tu actividad?'
            : '¿Ver actividades propuestas?'}
        </p>
        <div className="flex flex-row-reverse mb-10">
          <div className="w-60">
            <Button onClick={() => setHidden(!hidden)} secondary>
              {hidden ? 'Nueva Activdad' : 'Seleccionar Actividad'}
            </Button>
          </div>
        </div>
      </div>
      <div>
        <Button type="submit" primary>
          Añadir actividad
        </Button>
      </div>
    </div>
  );
};

export default NewActivityForm;
