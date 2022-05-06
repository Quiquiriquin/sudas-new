import React, { useContext } from 'react';
import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { useQuery } from 'react-query';
import { GeneralContext } from '../../../context/GeneralContext';
import menuSVG from '../../../assets/icons/menu.svg';
import users from '../../../assets/svgs/users.svg';
import types from '../../../types/types';
import unidades from '../../../assets/icons/graduation-cap.png';
import openBook from '../../../assets/icons/open-book.png';
import education from '../../../assets/icons/education.png';
import onlineCourse from '../../../assets/icons/online-course.png';
import onlineLearning from '../../../assets/icons/online-learning.png';
import calendar from '../../../assets/svgs/Calendar.svg';

import './Home.scss';
import Navbar from '../../Navbar/Navbar';
import { SessionContext } from '../../../context/SessionContext';
import { GET_DASHBOARD } from '../../../helpers/DashboardEndpoints';
import UserHome from './UserHome/UserHome';

const StatusCards = styled.div`
  width: 100%;
  max-width: 250px;
  height: 150px;
  border-radius: 5px;
  border: 1px solid #f2f2f2;
  box-shadow: 0px 6px 12px #3d4b5c1a;
  padding: 1.5rem;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &.in_process {
    background: #5cc8bf0d;
    color: #5cc8bf;
  }
  &.done {
    background: #34be440d;
    color: #34be44;
  }
  &.error {
    background: #ff58580d;
    color: #ff5858;
  }
  &.stopped {
    background: #f2d1460d;
  }
`;

const SectionCard = styled(NavLink)`
  width: 100%;
  height: 140px;
  border-radius: 10px;
  background: #ffffff;
  border: 1px solid #f2f2f2;
  box-shadow: 0px 3px 6px #3d4b5c26;
  color: #000;
  padding: 1.5rem;
  display: flex;
  align-items: center;
  gap: 1rem;
  & img {
    height: 60px;
    filter: invert(100%);
    filter: hue-rotate(180deg);
  }
  &:hover {
    cursor: pointer;
    color: #243a62;
    box-shadow: 0px 6px 12px #3d4b5c1a;
    border: 1px solid #243a62;
  }
`;

const Home = () => {
  const { user, dispatch } = useContext(GeneralContext);
  const { session } = useContext(SessionContext);
  console.log(session);
  const { name, firstSurname } = session;
  const { data: dashboardResponse } = useQuery(
    ['dashboard'],
    GET_DASHBOARD
  );
  console.log(dashboardResponse);
  // const handleLogout = () => {
  //   dispatch({
  //     type: types.logout,
  //   });
  // };

  return (
    // eslint-disable-next-line react/jsx-no-comment-textnodes
    // <div className="p-4">
    //   <p>
    //     {name} {firstSurname}
    //   </p>
    //   <button type="button" className="p-2" onClick={handleLogout}>
    //     Logout
    //   </button>
    // </div>

    <div className="flex flex-col border-white flex-1 bg-platinum space-y-10">
      <div className="bg-white rounded px-6 py-4 shadow flex-initial">
        <h1 className="text-lg">
          Hola, {name} {firstSurname}
        </h1>
      </div>
      {user && user.role === 'ADMIN' && (
        <div
          className="bg-white rounded p-6 shadow flex-auto grid grid-cols-4 gap-6 dashboard-cards-container"
          style={{ maxHeight: 'calc(100vh - 180px)' }}
        >
          <div
            className="col-span-4 flex justify-center gap-6"
            style={{ maxHeight: 'calc(100vh - 180px)' }}
          >
            <StatusCards className="in_process">
              <label style={{ fontSize: '2.5rem' }}>17</label>
              <p className="text-xl">En proceso</p>
            </StatusCards>
            <StatusCards className="done">
              <label style={{ fontSize: '2.5rem' }}>17</label>
              <p className="text-xl">Aprobadas</p>
            </StatusCards>
            <StatusCards className="error">
              <label style={{ fontSize: '2.5rem' }}>17</label>
              <p className="text-xl">Con observaciones</p>
            </StatusCards>
            {/* <StatusCards className="stopped" /> */}
          </div>
          <div
            className="col-span-4 grid grid-cols-4 gap-6 overflow-auto"
            style={{
              marginRight: '-0.75rem',
              paddingRight: '0.75rem',
              maxHeight: 'calc(100vh - 402px)',
            }}
          >
            <SectionCard to="/usuarios">
              <img src={users} alt="Usuarios" />
              <div className="flex flex-col justify-between h-full py-2">
                <label className="text-lg">Usuarios</label>
                <label className="text-sm ">
                  Cantidad: {dashboardResponse?.data?.users || 0}
                </label>
              </div>
            </SectionCard>
            <SectionCard to="/unidades-aprendizaje">
              <img src={users} alt="Usuarios" />
              <div className="flex flex-col justify-between h-full py-2">
                <label
                  className="text-lg"
                  style={{
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    maxWidth: '165px',
                  }}
                >
                  Unidades de Aprendizaje
                </label>
                <label className="text-sm">
                  Cantidad: {dashboardResponse?.data?.subjects || 0}
                </label>
              </div>
            </SectionCard>
            <SectionCard to="/verbos">
              <img src={users} alt="Usuarios " />
              <div className="flex flex-col justify-between h-full py-2">
                <label
                  className="text-lg"
                  style={{
                    whiteSpace: 'nowrap',
                    textOverflow: 'ellipsis',
                    overflow: 'hidden',
                    maxWidth: '165px',
                  }}
                >
                  Verbos
                </label>
                <label className="text-sm ">
                  Cantidad: {dashboardResponse?.data?.verbs || 0}
                </label>
              </div>
            </SectionCard>
          </div>
        </div>
      )}
      {user && user.role === 'USER' && <UserHome />}
    </div>
  );
};

export default Home;
