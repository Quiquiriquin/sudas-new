import React, { useState } from 'react';
import { useFormContext } from 'react-hook-form';
import Button from '../Shared/Buttons/Button';
import FormInput from '../Shared/FormInputs/FormInput';
import SelectFormInput from '../Shared/FormInputs/SelectFormInput';

const NewActivityForm = () => {
  // const {
  //   formState: { isValid, isSubmitting },
  // } = useFormContext();

  const [hidden, setHidden] = useState(true);

  const options = [
    {
      value: 'Reporte de indagación bibliográfica',
      label: 'Indagación bibliográfica',
    },
    {
      value: 'Protocolo de investigación',
      label: 'Problemas resueltos',
    },
    {
      value: 'Elaboración de glosario',
      label: 'Glosario',
    },
    {
      value: 'Elaboración de cuadro comparativo',
      label: 'Cuadro comparativo',
    },
    {
      value: 'Solución de cuestionario',
      label: 'Cuestionario resuelto',
    },
    {
      value: 'Seminario',
      label: 'Exposición',
    },
    {
      value: 'Cartel',
      label: 'Poster',
    },
    {
      value: 'Debate',
      label: 'Conclusiones del debate',
    },
    {
      value: 'Resumen de material bibliográfico',
      label: 'Resumen',
    },
    {
      value: 'Elaboración de diagrama',
      label: 'Diagrama',
    },
    {
      value: 'Elaboración de Diario de campo',
      label: 'Diario de campo',
    },
    {
      value: 'Construcción de mapas de restricción',
      label: 'Mapas de restricción',
    },
    {
      value: 'Presentación',
      label: 'Exposición',
    },
    // {
    //   value: '',
    //   label: '',
    // },
  ];

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
