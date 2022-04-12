import React, { useContext, useEffect, useState } from 'react';
import { useFormContext, useForm } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import {
  CREATE_TEACHER_PROFILE,
  GET_PROFILE_FORM,
  UPDATE_EDU_INTENTION,
  UPDATE_TEACHER_PROFILE,
} from '../../../helpers/SubjectEndpoints';
import FormWrapper from '../../Forms/FormWrapper';
import Button from '../../Shared/Buttons/Button';
import SubjectDetailItem from '../SubjectDetailItem';
import PreviewTeacherProfile from './PreviewTeacherProfile';
import Profile from './Profile';
import SkillsActtitudes from './SkillsAttitudes';
import { SubjectContext } from '../../../context/SubjectContext';

const TeacherProfile = () => {
  const { subject } = useContext(SubjectContext);
  const [isPost, setIsPost] = useState(true);
  const [profileData, setProfileData] = useState();
  const { data: profileInfo } = useQuery(
    ['subject', 'teacher-profile', subject?.id],
    GET_PROFILE_FORM,
    {
      enabled: !!subject,
    }
  );

  const { mutateAsync: mutateProfile } = useMutation((info) =>
    isPost
      ? CREATE_TEACHER_PROFILE(info)
      : UPDATE_TEACHER_PROFILE(info)
  );

  const skills = [
    {
      type: 'skills.0',
      id: 'skill1',
      name: 'Coordinar grupos de aprendizaje',
    },
    {
      type: 'skills.1',
      id: 'skill2',
      name: 'Organizar grupos de aprendizaje',
    },
    {
      type: 'skills.2',
      id: 'skill3',
      name: 'Planificación de la enseñanza',
    },
    {
      type: 'skills.3',
      id: 'skill4',
      name: 'Manejo de estrategias didácticas centradas en el aprendizaje',
    },
    {
      type: 'skills.4',
      id: 'skill5',
      name: 'Manejo de TIC en la enseñanza y para el aprendizaje',
    },
    {
      type: 'skills.5',
      id: 'skill6',
      name: 'Comunicación multidireccional',
    },
    {
      type: 'skills.6',
      id: 'skill7',
      name: 'Manejo de técnicas de evaluación formativa',
    },
  ];

  const attitudes = [
    {
      type: 'attitudes.0',
      id: 'attitude1',
      name: 'Compromiso con la enseñanza',
    },
    {
      type: 'attitudes.1',
      id: 'attitude2',
      name: 'Congruencia',
    },
    {
      type: 'attitudes.2',
      id: 'attitude3',
      name: 'Disponibilidad al cambio',
    },
    {
      type: 'attitudes.3',
      id: 'attitude4',
      name: 'Empatía',
    },
    {
      type: 'attitudes.4',
      id: 'attitude5',
      name: 'Generosidad',
    },
    {
      type: 'attitudes.5',
      id: 'attitude6',
      name: 'Honestidad',
    },
    {
      type: 'attitudes.6',
      id: 'attitude7',
      name: 'Proactividad',
    },
    {
      type: 'attitudes.7',
      id: 'attitude8',
      name: 'Respeto',
    },
    {
      type: 'attitudes.8',
      id: 'attitude9',
      name: 'Responsabilidad',
    },
    {
      type: 'attitudes.9',
      id: 'attitude10',
      name: 'Solidaridad',
    },
    {
      type: 'attitudes.10',
      id: 'attitude11',
      name: 'Tolerancia',
    },
    {
      type: 'attitudes.11',
      id: 'attitude12',
      name: 'Vocación de servicio',
    },
    {
      type: 'attitudes.12',
      id: 'attitude13',
      name: 'Liderazgo',
    },
  ];
  //   const {
  //     formState: { isValid },
  //   } = useForm();
  //   const { mutateAsync: updateEduIntention } = useMutation(
  //     UPDATE_EDU_INTENTION
  //   );

  const buildFinalArray = (arrForm, arrToGetValues) => {
    const res = [];
    arrForm.forEach((value, index) => {
      if (value) {
        res.push(arrToGetValues[index].name);
      }
    });
    return res;
  };

  const onSubmit = async (data) => {
    try {
      const {
        attitudes: attitudesForm,
        experience,
        knowledge,
        profile,
        skills: skillsForm,
      } = data;
      const finalSkillsArr = buildFinalArray(skillsForm, skills).join(
        ','
      );
      const finalAttitudesArr = buildFinalArray(
        attitudesForm,
        attitudes
      ).join(',');

      const body = {
        skills: finalSkillsArr,
        attitudes: finalAttitudesArr,
        experience,
        knowledge,
        profile,
      };
      await mutateProfile({
        id: profileData?.id || subject?.id,
        data: body,
      });
      toast.success(
        isPost
          ? 'Perfil docente creado correctamente'
          : 'Perfil docente actualizado correctamente'
      );
    } catch (e) {
      console.log(e);
      toast.error('Ocurrió un error al actualizar el perfil docente');
    }
  };

  useEffect(() => {
    if (profileInfo && profileInfo.status !== 204) {
      console.log(profileInfo);
      setIsPost(false);
      setProfileData(profileInfo?.data);
    } else {
      console.log('No hay');
    }
  }, [profileInfo]);

  return (
    <>
      <FormWrapper onSubmit={onSubmit}>
        <div>
          <SubjectDetailItem
            title="Perfil docente"
            component={
              <Profile attitudesArr={attitudes} skillsArr={skills} />
            }
          />
          <SubjectDetailItem
            title="Unidades de aprendizaje relacionadas"
            component={
              <SkillsActtitudes
                skills={skills}
                attitudes={attitudes}
              />
            }
          />
          <SubjectDetailItem
            title="Vista previa"
            component={<PreviewTeacherProfile />}
          />
          <div className="flex flex-row-reverse">
            <div className="w-44">
              <Button type="submit" secondary>
                Guardar
              </Button>
            </div>
          </div>
        </div>
      </FormWrapper>
    </>
  );
};

export default TeacherProfile;
