import React, { useEffect, useState } from 'react';
import './Users.scss';
import NiceModal from '@ebay/nice-modal-react';
import { useQuery } from 'react-query';
import styled from 'styled-components';
import { useTable } from 'react-table';
import { nanoid } from 'nanoid';
import AddButton from '../../Shared/Buttons/AddButton';
import NewUserModal from '../../Shared/Modals/NewUserModal';
import { GET_USERS } from '../../../helpers/EnpointsUser';
import UserCard from '../../Shared/UserCard/UserCard';

const Users = () => {
  const [filterStatus, setFilterStatus] = useState();
  const { data: usersResponse, isLoading: isLoadingUsers } = useQuery(
    ['users', 'users', filterStatus || null],
    GET_USERS
  );
  const [data, setData] = useState([]);
  useEffect(() => {
    if (usersResponse) {
      setData(usersResponse.data);
    }
  }, [usersResponse]);
  const openModal = () => {
    NiceModal.show(NewUserModal);
  };

  const updateFilters = (current) => {
    console.log(current);
    if (filterStatus) {
      console.log(filterStatus);
      const activeFilters = filterStatus.split(',');
      const newFilters = [];
      activeFilters.forEach((elem) => {
        if (elem !== current) newFilters.push(elem);
      });
      if (!activeFilters.find((elem) => elem === current)) {
        newFilters.push(current);
      }
      setFilterStatus(
        newFilters.length > 0 ? newFilters.join(',') : null
      );
    } else {
      setFilterStatus(`${current}`);
    }
  };

  return (
    <div className="h-full users-view">
      <div className="bg-white rounded px-6 py-4 shadow flex-initial">
        <span className="text-lg">Usuarios</span>
      </div>
      <div
        className="bg-white px-6 py-4 rounded mt-4 shadow h-full"
        style={{ maxHeight: 'calc(100vh - 168px)' }}
      >
        <div className="flex items-center">
          <div
            onClick={openModal}
            className="flex items-center cursor-pointer"
          >
            <AddButton className="cursor-pointer" />{' '}
            <label
              className="block sofia-bold cursor-pointer"
              style={{ marginTop: '1px', fontSize: '14px' }}
            >
              Añadir usuario
            </label>
          </div>
        </div>
        <div className="mt-2">
          <p className="text-sm" style={{ color: '#757575' }}>
            Filtrar
          </p>
          <div className="filters flex gap-4 mt-2">
            <div
              onClick={() => updateFilters('ACTIVE')}
              className={`chip-filter ${
                filterStatus && filterStatus.includes('ACTIVE')
                  ? 'green'
                  : ''
              }`}
            >
              Activos
            </div>
            <div
              onClick={() => updateFilters('INACTIVE')}
              className={`chip-filter ${
                filterStatus && filterStatus.includes('INACTIVE')
                  ? 'red'
                  : ''
              }`}
            >
              Desactivados
            </div>
            <div
              onClick={() => updateFilters('PENDING')}
              className={`chip-filter ${
                filterStatus && filterStatus.includes('PENDING')
                  ? 'yellow'
                  : ''
              }`}
            >
              Pendientes
            </div>
          </div>
        </div>
        {/* <Styles> */}
        {/*  <Table data={data} columns={columns} /> */}
        {/* </Styles> */}
        <div className="mt-6 grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 users-container gap-6">
          {isLoadingUsers && (
            <>
              <UserCard loading={isLoadingUsers} key={nanoid(6)} />
              <UserCard loading={isLoadingUsers} key={nanoid(6)} />
              <UserCard loading={isLoadingUsers} key={nanoid(6)} />
              <UserCard loading={isLoadingUsers} key={nanoid(6)} />
            </>
          )}
          {!isLoadingUsers && (
            <>
              {data &&
                data.map((elem) => (
                  <UserCard {...elem} key={nanoid(6)} />
                ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Users;
