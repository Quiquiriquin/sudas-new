import React, { useEffect } from 'react';
import Avatar from 'boring-avatars';
import { useFormContext } from 'react-hook-form';
import styled from 'styled-components';
import FormInput from '../Shared/FormInputs/FormInput';
import SelectFormInput from '../Shared/FormInputs/SelectFormInput';
import userLess from '../../assets/icons/user-check.svg';
import userLessW from '../../assets/svgs/user-check_w.svg';
import userCommon from '../../assets/svgs/user_w.svg';
import zapW from '../../assets/svgs/zap_w.svg';
import deleteB from '../../assets/svgs/trash.svg';
import deleteW from '../../assets/svgs/trash_white.svg';

import userPlus from '../../assets/svgs/user-plus.svg';
import userPlusW from '../../assets/svgs/user-plus_w.svg';
import Button from '../Shared/Buttons/Button';

const ActionCard = styled.div`
  border-radius: 5px;
  height: 9.3rem;
  width: 9.3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  ${(props) =>
    // eslint-disable-next-line no-nested-ternary
    props?.status === 'ACTIVE'
      ? 'background: #34be44'
      : props?.status === 'INACTIVE'
      ? 'background: #ff5858; color: #fff'
      : 'background: #f2d146'};
  ${(props) =>
    // eslint-disable-next-line no-nested-ternary
    props?.status === 'ACTIVE'
      ? 'background: #34be44'
      : props?.status === 'INACTIVE'
      ? 'background: #ff5858'
      : 'background: #f2d146'};
  ${(props) =>
    // eslint-disable-next-line no-nested-ternary
    props?.role === 'ADMIN'
      ? 'background: #343554'
      : props?.role === 'USER'
      ? 'background: #81C5ED'
      : '#f2d146'};
  ${(props) =>
    // eslint-disable-next-line no-nested-ternary
    props?.delete ? 'background: #f2f2f2' : ''};
  & img.white {
    ${(props) =>
      props.status === 'INACTIVE'
        ? `opacity: 1;
    display: block;`
        : `opacity: 0;
    display: none;`}
  }
  & img.black {
    ${(props) =>
      props.status === 'INACTIVE'
        ? `opacity: 0;
    display: none;`
        : `opacity: 1;
    display: block;`}
  }
  &:hover {
    cursor: pointer;
    transition: all 0.2s ease-in-out;
    ${(props) =>
      // eslint-disable-next-line no-nested-ternary
      props?.status === 'ACTIVE' || props.delete
        ? 'background: #34be44; color: #FFF'
        : props?.status === 'INACTIVE'
        ? 'background: #ff5858; color: #FFF'
        : 'background: #f2d146; color: #FFF'};
    ${(props) =>
      // eslint-disable-next-line no-nested-ternary
      props?.role === 'ADMIN'
        ? 'background: #343554'
        : props?.role === 'USER'
        ? 'background: #81C5ED'
        : '#f2d146'};
    & img.white {
      opacity: 1;
      display: block;
    }
    & img.black {
      opacity: 0;
      display: none;
    }
  }

  ${(props) =>
    // eslint-disable-next-line no-nested-ternary
    props?.delete ? 'background: #f2f2f2' : ''};
  & img {
    width: 3.3rem;
  }
`;

const UpdateUserAdminForm = ({ user }) => {
  const {
    setValue,
    watch,
    formState: { isDirty },
  } = useFormContext();
  const {
    name,
    firstSurname,
    secondSurname,
    email,
    status,
    academicGrade,
    department,
    role,
  } = user;
  useEffect(() => {
    if (user) {
      setValue('status', status);
      setValue('role', role);
    }
  }, []);
  const watchRole = watch('role');
  const watchStatus = watch('status');

  const changeStatus = () => {
    const currStatus = watch('status');
    console.log(currStatus);
    if (currStatus === 'ACTIVE') {
      setValue('status', 'INACTIVE', {
        shouldDirty: true,
      });
    } else {
      setValue('status', 'ACTIVE', {
        shouldDirty: true,
      });
    }
  };

  const changeRole = () => {
    const currRole = watch('role');
    let auxRole = '';
    if (currRole === 'ADMIN') {
      auxRole = 'USER';
    } else if (currRole === 'USER') {
      auxRole = 'STUDENT';
    } else {
      auxRole = 'ADMIN';
    }
    setValue('role', auxRole, {
      shouldDirty: true,
    });
  };

  return (
    <div className="gap-6 mx-auto" style={{ maxWidth: '632px' }}>
      <div className="flex items-center justify-center gap-4 mb-4">
        <div className="flex items-center justify-center">
          {user?.profilePic ? (
            <img src={user.profilePic} alt={name} />
          ) : (
            <Avatar
              name={name}
              colors={[
                '#343554',
                '#81C5ED',
                '#5CC8BF',
                '#F2F2F2',
                '#343554',
              ]}
              variant="beam"
              size="120px"
            />
          )}
        </div>
        <p style={{ color: '#757575', fontSize: '1.5rem' }}>
          {name || email} | {role}
        </p>
        <div className="hidden">
          <FormInput name="role" defaultValue={role} label="Role" />
        </div>
      </div>
      <div className="w-full flex justify-center gap-4 mb-4">
        <ActionCard
          onClick={changeStatus}
          status={watchStatus || 'INACTIVE'}
        >
          {watchStatus === 'ACTIVE' ? (
            <>
              <img
                src={userPlusW}
                alt="Desactivar"
                className="white"
              />
              <img
                src={userPlus}
                alt="Desactivar"
                className="black"
              />
            </>
          ) : (
            <>
              <img
                src={userLessW}
                alt="Desactivar"
                className="white"
              />
              <img
                src={userLess}
                alt="Desactivar"
                className="black"
              />
            </>
          )}
          {watchStatus === 'ACTIVE' ? (
            <p className="text-sm mt-1">Activar</p>
          ) : (
            <p className="text-sm mt-1">Desactivar</p>
          )}
          <div className="hidden">
            <FormInput
              name="status"
              defaultValue={status}
              label="Role"
            />
          </div>
        </ActionCard>
        <ActionCard onClick={changeRole} role={watchRole || 'ADMIN'}>
          {watchRole === 'ADMIN' ? (
            <img src={zapW} alt="Desactivar" />
          ) : (
            <img src={userCommon} alt="Desactivar" />
          )}
          <p className="text-sm mt-1" style={{ color: '#FFF' }}>
            {/* eslint-disable-next-line no-nested-ternary */}
            {watchRole === 'ADMIN'
              ? 'Administrador'
              : watchRole === 'USER'
              ? 'Profesor'
              : 'Alumno'}{' '}
          </p>
        </ActionCard>
        <ActionCard delete>
          <img src={deleteB} className="black" alt="Desactivar" />
          <img src={deleteW} alt="Desactivar" className="white" />
          <p className="text-sm mt-1">Eliminar</p>
        </ActionCard>
      </div>

      <div className="flex gap-4 w-full mt-4">
        <div className="w-full">
          <FormInput
            name="name"
            label="Nombre"
            defaultValue={name || ''}
            placeholder="Juan"
          />
        </div>
        <div className="w-full">
          <FormInput
            name="firstSurname"
            label="Apellido paterno"
            defaultValue={firstSurname || ''}
            placeholder="Sánchez"
          />
        </div>
        <div className="w-full">
          <FormInput
            name="secondSurname"
            label="Apellido materno"
            defaultValue={secondSurname || ''}
            placeholder="Sánchez"
          />
        </div>
      </div>
      <div className="flex gap-4 w-full mt-2">
        <div className="w-full">
          <FormInput
            name="email"
            label="Correo electrónico"
            defaultValue={email || ''}
            placeholder="john@doe.com"
          />
        </div>
        <div className="w-full">
          <SelectFormInput
            options={[
              {
                value: 'ing',
                label: 'Ing',
              },
              {
                value: 'qbp',
                label: 'QBP',
              },
              {
                value: 'qfi',
                label: 'QFI',
              },
              {
                value: 'ibq',
                label: 'IBQ',
              },
              {
                value: 'mc',
                label: 'M. en C.',
              },
              {
                value: 'me',
                label: 'M. en E.',
              },
              {
                value: 'dr',
                label: 'Dr',
              },
              {
                value: 'dra',
                label: 'Dra',
              },
              {
                value: 'lic',
                label: 'Lic',
              },
            ]}
            name="academicGrade"
            label="Grado académico"
            defaultValue={academicGrade || ''}
            placeholder="Licenciatura"
          />
        </div>
      </div>
      <div className="flex gap-4 w-full mt-2">
        <div className="w-full">
          <SelectFormInput
            options={[
              {
                value: 'cienciasBasicas',
                label: 'Ciencias Básicas',
              },
              {
                value: 'electronica',
                label: 'Electronica',
              },
            ]}
            name="department"
            label="Departamento"
            defaultValue={department || ''}
            placeholder="Ciencias básicas"
          />
        </div>
      </div>
      <div className="flex justify-end">
        <div style={{ maxWidth: '220px' }}>
          <Button secondary disabled={!isDirty}>
            Guardar cambios
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UpdateUserAdminForm;
