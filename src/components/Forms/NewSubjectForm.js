import React, { useEffect } from 'react';
import { useFormContext, useWatch } from 'react-hook-form';
import { useQuery } from 'react-query';
import FormInput from '../Shared/FormInputs/FormInput';
import SelectFormInput from '../Shared/FormInputs/SelectFormInput';
import Button from '../Shared/Buttons/Button';
import { GET_ACADEMIC_PLANS } from '../../helpers/AcademicPlanEndpoints';

const NewSubjectForm = ({ academicPlanId }) => {
  const { setValue, watch } = useFormContext();
  const { data: academicPlans } = useQuery(
    ['subject', 'plans'],
    GET_ACADEMIC_PLANS
  );
  const autonomous = watch('autonomousLearning');
  const theoryWeek = watch('theoryWeek');
  const practiceWeek = watch('practiceWeek');
  const theorySemester = watch('theorySemester');
  const practiceSemester = watch('practiceSemester');
  const inputs = [
    {
      label: 'Nombre*',
      name: 'name',
      placeholder: 'Bioestadística',
      rules: {
        required: 'Ingresa el nombre de la materia',
      },
    },
    {
      label: 'Semestre*',
      name: 'semester',
      placeholder: '8',
      rules: {
        required: 'Ingresa el semestre',
      },
    },
    {
      label: 'Modalidad*',
      name: 'modality',
      placeholder: 'Selecciona',
      rules: {
        required: 'Selecciona la modalidad',
      },
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
    },
    {
      label: 'Tipo',
      name: 'type',
      placeholder: 'Obligatoria',
      rules: {
        required: 'Ingresa el tipo',
      },
      options: [
        {
          value: 'OBLIGATORIA',
          label: 'Obligatoria',
        },
        {
          value: 'OPTATIVA',
          label: 'Optativa',
        },
      ],
    },
    {
      label: 'Horas de teoría a la semana',
      name: 'theoryWeek',
      placeholder: '15',
      rules: {
        required: 'Ingresa el no. de horas a la semana',
      },
      defaultValue: '0',
    },
    {
      label: 'Horas de práctica a la semana',
      name: 'practiceWeek',
      placeholder: '15',
      defaultValue: '0',
    },
    {
      label: 'Área de formación',
      name: 'trainingArea',
      placeholder: 'Selecciona',
      options: [
        {
          value: 'INSTITUTIONAL',
          label: 'Institucional',
        },
        {
          value: 'BASICSCIENCE',
          label: 'Ciencias básicas',
        },
        {
          value: 'PROFESSIONAL',
          label: 'Profesional',
        },
        {
          value: 'TERMINAL',
          label: 'Terminal y de integración',
        },
      ],
    },
    {
      label: 'Horas de teoría al semestre',
      name: 'theorySemester',
      placeholder: '15',
      disabled: true,
    },
    {
      label: 'Horas de práctica al semestre',
      name: 'practiceSemester',
      placeholder: '15',
      disabled: true,
    },
    {
      label: 'Horas totales',
      name: 'totalHours',
      placeholder: '100',
      disabled: true,
    },
    {
      label: 'SATCA',
      name: 'satca',
      placeholder: '0',
      disabled: true,
    },
    {
      label: 'TEPIC',
      name: 'tepic',
      placeholder: '0',
      disabled: true,
    },
    {
      label: 'Programa académico*',
      name: 'academicPlanId',
      placeholder: 'Selecciona',
      rules: {
        required: 'Ingresa el nombre de la materia',
      },
    },
    {
      label: 'Linea curricular*',
      name: 'curricularLine',
      placeholder: 'Escribe la línea curricular...',
      rules: {
        required: 'Ingresa la línea curricular',
      },
    },
    {
      label: 'Optativa para trayectoria',
      name: 'optionalLine',
      placeholder: 'Escribe la trayectoria...',
    },
  ];

  useEffect(() => {
    if (theoryWeek) {
      setValue('theorySemester', parseFloat(theoryWeek) * 18);
    }
  }, [theoryWeek]);

  useEffect(() => {
    if (practiceWeek) {
      setValue('practiceSemester', parseFloat(practiceWeek) * 18);
    }
  }, [practiceWeek]);

  useEffect(() => {
    if (theorySemester) {
      const autonomousValue =
        autonomous && autonomous > 0 ? autonomous : 0;
      const autoNom =
        autonomousValue > 0 ? parseFloat(autonomousValue) / 20 : 0;
      const satca =
        (parseFloat(theorySemester) + parseFloat(practiceSemester)) /
          16 +
        autoNom;
      setValue('satca', satca);
      setValue(
        'tepic',
        parseFloat(theoryWeek) * 2 + parseFloat(practiceWeek || 0)
      );
    }
    /* Horas de teoría - Semestre 108 texpic - Practicas 1 x hora */
  }, [practiceSemester, theorySemester]);

  useEffect(() => {
    if (theorySemester) {
      const total =
        parseFloat(theorySemester) + parseFloat(practiceSemester);
      setValue('totalHours', total);
    }
  }, [practiceSemester, theorySemester]);

  return (
    <div>
      <div className="flex gap-4">
        <div className="w-full">
          <FormInput {...inputs[0]} />
        </div>
        {academicPlans && !academicPlanId && (
          <div className="w-full">
            <SelectFormInput
              {...inputs[12]}
              options={academicPlans.data.map(({ id, name }) => ({
                value: id,
                label: name,
              }))}
            />
          </div>
        )}
      </div>
      <div className="flex gap-4">
        <div className="w-full">
          <FormInput {...inputs[1]} />
        </div>
        <div className="w-full">
          <SelectFormInput {...inputs[2]} />
        </div>
        <div className="w-full">
          <SelectFormInput {...inputs[3]} />
        </div>
      </div>
      {watch('type')?.value === 'OPTATIVA' && (
        <div className="flex gap-4">
          <div className="w-full">
            <FormInput {...inputs[13]} />
          </div>
          <div className="w-full">
            <FormInput {...inputs[14]} />
          </div>
        </div>
      )}
      <div className="grid grid-cols-3 gap-4">
        <div className="w-full">
          <FormInput {...inputs[4]} />
        </div>
        <div className="w-full">
          <FormInput {...inputs[5]} />
        </div>
        <div className="w-full">
          <SelectFormInput {...inputs[6]} />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="w-full">
          <FormInput
            {...inputs[7]}
            value={theoryWeek ? parseFloat(theoryWeek) * 18 : 0}
          />
        </div>
        <div className="w-full">
          <FormInput {...inputs[8]} />
        </div>
        <div className="w-full">
          <FormInput {...inputs[9]} />
        </div>
      </div>
      <div className="flex gap-4">
        {/* <div className="w-full"> */}
        {/*  <FormInput {...inputs[10]} /> */}
        {/* </div> */}
        <div className="w-full">
          <FormInput {...inputs[11]} />
        </div>
      </div>
      <div className="w-full">
        <Button primary type="submit">
          Crear unidad de aprendizaje
        </Button>
      </div>
    </div>
  );
};

export default NewSubjectForm;
