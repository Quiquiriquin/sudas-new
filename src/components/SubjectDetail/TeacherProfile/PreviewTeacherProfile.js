import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';

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

const PreviewTeacherProfile = () => {
  const { watch } = useFormContext();
  const [profile, experience, knowledge, skill = [], attitude = []] =
    watch([
      'profile',
      'experience',
      'knowledge',
      'skills',
      'attitudes',
    ]);

  const skillOptions = skill.reduce(
    (a, e, i) => (e ? a.concat(i) : a),
    []
  );
  const attitudeOptions = attitude.reduce(
    (a, e, i) => (e ? a.concat(i) : a),
    []
  );

  return (
    <>
      <div>
        <p className="font-bold text-xl text-center">
          Perfil Docente
        </p>
        <p>{profile}</p>
        <table className="border-collapse border border-black w-full my-10">
          <thead>
            <tr>
              <th className="border border-black w-1/4 p-2">
                Experiencia Profesional
              </th>
              <th className="border border-black w-1/4 p-2">
                Conocimientos
              </th>
              <th className="border border-black w-1/4 p-2">
                Habilidades didácticas
              </th>
              <th className="border border-black w-1/4 p-2">
                Actitudes
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border border-black p-2">
                {experience}
              </td>
              <td className="border border-black p-2">{knowledge}</td>
              <td className="border border-black p-2">
                {skillOptions.map((skll) => (
                  <p>{skills[skll].name}</p>
                ))}
              </td>
              <td className="border border-black p-2">
                {attitudeOptions.map((attd) => (
                  <p>{attitudes[attd].name}</p>
                ))}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default PreviewTeacherProfile;
