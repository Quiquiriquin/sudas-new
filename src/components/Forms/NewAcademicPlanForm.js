import React, { useEffect, useState } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import FormInput from '../Shared/FormInputs/FormInput';
import SelectFormInput from '../Shared/FormInputs/SelectFormInput';
import Button from '../Shared/Buttons/Button';
import Input from '../Shared/Inputs/Input';
import Select from '../Shared/Inputs/Select';

const NewAcademicPlanForm = ({ information = null, submit }) => {
  const {
    control,
    watch,
    register,
    getValues,
    setValue,
    formState: { isValid, isSubmitting },
  } = useFormContext();
  const [step, setStep] = useState(0);
  const [options, setOptions] = useState([]);
  const { fields, append, remove, swap, move, insert } =
    useFieldArray({
      control,
      name: 'subjects',
    });

  useEffect(() => {
    if (!information) {
      append({
        name: '',
        semester: 1,
      });
    }
  }, []);

  const inputs = [
    {
      name: 'name',
      placeholder: 'Químico Farmacéutico Industrial',
      label: 'Nombre del plan académico',
      rules: {
        required: 'Inserta el nombre del plan académico',
      },
    },
    {
      name: 'shortName',
      placeholder: 'QFI',
      label: 'Siglas',
      rules: {
        required: 'Inserta las siglas',
      },
    },
    {
      name: 'semesters',
      placeholder: '8',
      label: 'No. de semestres',
      rules: {
        required: 'Inserta el número de semestres',
      },
    },
    {
      name: 'modality',
      placeholder: 'Selecciona',
      label: 'Modalidad',
      options: [
        {
          value: 'FACE2FACE',
          label: 'Escolarizada',
        },
        {
          value: 'ONLINE',
          label: 'En línea',
        },
        {
          value: 'MIX',
          label: 'Mixto',
        },
      ],
      rules: {
        required: 'Selecciona la modalidad',
      },
    },
    {
      name: 'period',
      placeholder: '2020/1',
      label: 'Periodo',
      rules: {
        required: 'Inserta el periodo',
      },
    },
  ];

  const optionsKeys = {
    FACE2FACE: 'Escolarizada',
    ONLINE: 'En línea',
    MIX: 'Mixto',
  };

  useEffect(() => {
    if (watch('semesters')) {
      const semesters = parseInt(watch('semesters'), 10);
      const auxOptions = [];
      // eslint-disable-next-line no-plusplus
      for (let i = 0; i < semesters; i++) {
        auxOptions.push({
          value: i + 1,
          label: i + 1,
        });
      }
      setOptions(auxOptions);
    }
  }, [watch('semesters')]);

  const handleKeyPress = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.key === 'ArrowDown' && e.shiftKey) {
      append({
        name: '',
        semester: fields[fields.length - 1].semester,
      });
    }
  };

  useEffect(() => {
    if (information) {
      const {
        name,
        shortName,
        period,
        modality,
        semesters,
        subjects,
      } = information;
      setValue('name', name);
      setValue('shortName', shortName);
      setValue('period', period);
      setValue(
        'modality',
        modality
          ? { value: modality, label: optionsKeys[modality] }
          : null
      );
      setValue('semesters', semesters);
    }
  }, []);

  useEffect(() => {
    if (step === 1) {
      const { subjects } = information;
      if (subjects && subjects.length > 0) {
        subjects.forEach(({ id, name: subjectName, semester }) => {
          console.log('Apendeando');
          append({
            name: subjectName,
            semester,
            id,
          });
        });
      }
    }
  }, [step]);

  return (
    <div>
      {step === 0 && (
        <>
          <div className="w-full">
            <FormInput {...inputs[0]} />
          </div>
          <div className="flex gap-4">
            <div className="w-full">
              <FormInput {...inputs[1]} />
            </div>
            <div className="w-full">
              <FormInput {...inputs[2]} />
            </div>
          </div>
          <div className="flex gap-4">
            <div className="w-full">
              <SelectFormInput {...inputs[3]} />
            </div>
            <div className="w-full">
              <FormInput {...inputs[4]} />
            </div>
          </div>
        </>
      )}
      {step === 1 && options && (
        <table className="catalog-subject-form">
          {/* eslint-disable-next-line array-callback-return */}
          <thead>
            <tr>
              <th className="subject">Unidad de aprendizaje</th>
              <th className="semester">Semestre</th>
            </tr>
          </thead>
          <tbody>
            {fields.map(({ name, id, semester }, index) => (
              <tr key={`${id}`}>
                <td className="body">
                  <Input
                    type="borderless"
                    small
                    placeholder="Escribe la unidad de aprendizaje"
                    {...register(`subjects.${index}.name`)}
                    onKeyUp={handleKeyPress}
                  />
                </td>
                <td className="body">
                  <select
                    onKeyUp={handleKeyPress}
                    placeholder="Selecciona"
                    {...register(`subjects.${index}.semester`)}
                  >
                    {options.map(({ value, label }) => (
                      <option value={value}>{label}</option>
                    ))}
                    ;
                  </select>
                </td>
              </tr>
            ))}

            <tr>
              <td style={{ padding: '4px 12px', color: '#b3b3b3' }}>
                Presiona Shift + Flecha hacia abajo para agregar una
                nueva unidad de aprendizaje
              </td>
            </tr>
          </tbody>
        </table>
      )}
      <div className="flex justify-end mt-6">
        {step === 0 && (
          <Button
            onClick={() => setStep((prev) => prev + 1)}
            disabled={!isValid || isSubmitting}
            style={{ maxWidth: '130px' }}
            type="button"
            primary
          >
            Siguiente
          </Button>
        )}
        {step === 1 && (
          <Button
            onClick={() => submit(getValues())}
            disabled={!isValid || isSubmitting}
            style={{ maxWidth: '130px' }}
            type="submit"
            primary
          >
            {information ? 'Guardar' : 'Crear'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default NewAcademicPlanForm;
