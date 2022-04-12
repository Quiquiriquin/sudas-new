import React from 'react';
import { useHistory } from 'react-router-dom';
import { Tooltip } from 'antd';
import chevron from '../../../assets/svgs/ChevronRight.svg';
import './UserCard.scss';

const UserCard = ({
  email,
  name,
  firstSurname,
  role,
  status,
  loading,
  id,
}) => {
  const history = useHistory();
  if (loading) {
    return (
      <div className="user-card">
        <div className="flex gap-4 items-center">
          <div
            className="animated-background"
            style={{
              height: '32px',
              width: '32px',
              borderRadius: '16px',
            }}
          />
          <div className="">
            <div
              style={{ height: '16px', width: '160px' }}
              className="block mb-1 truncate animated-background"
            />

            <div
              style={{ height: '14px', width: '100px' }}
              className="block mb-1 truncate animated-background"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-between">
          <div
            style={{ height: '16px', width: '50px' }}
            className=" truncate animated-background"
          />
          <div
            style={{ height: '24px', width: '24px' }}
            className="block mb-1 truncate animated-background"
          />
        </div>
      </div>
    );
  }

  const goToUserProfile = () => {
    history.push(
      `/usuarios/gestion/${id}/${
        name && firstSurname ? `${name}_${firstSurname}` : email
      }`
    );
  };

  return (
    <div className="user-card">
      <div className="flex gap-4 items-center">
        <div className="">
          <box-icon type="solid" name="user-circle" />
        </div>
        <div className="cursor-pointer" onClick={goToUserProfile}>
          <Tooltip title={name ? `${name} ${firstSurname}` : email}>
            <label
              style={{ maxWidth: '130px' }}
              className="block mb-1 truncate"
            >
              {name ? `${name} ${firstSurname}` : email}
            </label>
          </Tooltip>

          <label
            style={{ color: '#757575' }}
            className="block text-xs"
          >
            {role}
          </label>
        </div>
      </div>
      <div className="mt-6 flex justify-between">
        <div
          className="sofia-bold"
          style={{
            // eslint-disable-next-line no-nested-ternary
            ...(status === 'ACTIVE'
              ? { color: '#34be44' }
              : status === 'PENDING'
              ? { color: '#f2d146' }
              : { color: '#ff5858' }),
          }}
        >
          {/* eslint-disable-next-line no-nested-ternary */}
          {status === 'ACTIVE'
            ? 'Activo'
            : status === 'PENDING'
            ? 'Invitación pendiente'
            : 'Desactivado'}
        </div>
        <div className="cursor-pointer" onClick={goToUserProfile}>
          <img
            src={chevron}
            alt="Derecha"
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default UserCard;
