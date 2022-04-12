import React, { useEffect } from 'react';
import { useFormContext } from 'react-hook-form';
import { useQuery } from 'react-query';
import { useRouteMatch } from 'react-router-dom';
import Button from '../Shared/Buttons/Button';
import FormInput from '../Shared/FormInputs/FormInput';
import { GET_PROFILE_FORM } from '../../helpers/SubjectEndpoints';

const ProfileForm = ({ attitudesArr, skillsArr }) => {
  const { setValue, getValues } = useFormContext();
  const { params } = useRouteMatch('/detalle-unidad-aprendizaje/:id');
  const { data } = useQuery(
    ['subject', 'teacher-profile', params?.id],
    GET_PROFILE_FORM,
    {
      enabled: !!params?.id,
    }
  );

  const assignValues = (arr, arrToGetValues = []) => {
    arrToGetValues.forEach(({ name, type }) => {
      if (arr && arr.includes(name)) {
        setValue(type, true);
      }
    });
  };

  useEffect(() => {
    if (data?.data) {
      const { data: information } = data;
      const { experience, profile, knowledge, skills, attitudes } =
        information;
      setValue('experience', experience);
      setValue('profile', profile);
      setValue('knowledge', knowledge);
      console.log(getValues());
      assignValues(skills, skillsArr);
      assignValues(attitudes, attitudesArr);
    }
  }, [data]);

  const inputs = [
    {
      name: 'profile',
      placeholder: 'Licenciado en ...',
      label: 'Perfil docente',
      rules: {
        required: 'Ingresa el perfil docente',
      },
    },
    {
      name: 'experience',
      placeholder: 'Dos años en ...',
      label: 'Experiencia profesional',
      rules: {
        required: 'Inserta la experiencia profesional',
      },
    },
    {
      name: 'knowledge',
      placeholder: 'En termodinámica, ...',
      label: 'Conocimientos',
      rules: {
        required: 'Inserte los conocimientos',
      },
    },
  ];

  return (
    <div className="w-full flex p-8 mx-auto flex-col">
      <div className="mb-2">
        <FormInput {...inputs[0]} />
        <FormInput {...inputs[1]} />
        <FormInput {...inputs[2]} />
      </div>
    </div>
  );
};

export default ProfileForm;
