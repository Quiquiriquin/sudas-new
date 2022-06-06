import React, { useContext } from 'react';
import { SessionContext } from '../../../context/SessionContext';

const UserHeader = () => {
  const { session } = useContext(SessionContext);
  const { name, firstSurname } = session;
  return (
    <div className="bg-white rounded box-shadow px-6 py-4 flex-initial">
      <h1 className="text-lg">
        Hola, {name} {firstSurname}
      </h1>
    </div>
  );
};

export default UserHeader;
