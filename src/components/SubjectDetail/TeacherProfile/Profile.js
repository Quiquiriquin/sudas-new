import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import ProfileForm from '../../Forms/ProfileForm';

const Profile = ({ ...props }) => {
  return (
    <>
      <p>
        En esta sección se describe el grado académico del Perfil
        docente.
      </p>
      <p>
        Ejemplo: Licenciado en Biología de preferencia con Maestría
        y/o Doctorado en área afín.
      </p>
      <ProfileForm {...props} />
    </>
  );
};

export default Profile;
