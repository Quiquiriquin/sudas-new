import React, { useState } from 'react';
import './Bibliographies.scss';
import UserHeader from '../../Shared/UserHeader/UserHeader';
import TableSectionHeader from '../../Shared/TableSectionHeader/TableSectionHeader';
import Authors from './Authors/Authos';
import Editorials from './Editorials/Editorials';
import Resources from './Resources/Resources';

const Bibliographies = () => {
  const [activeTab, setActiveTab] = useState(1);
  return (
    <div className="h-full">
      <UserHeader />
      <div className="px-6 py-4 bibliographies-container mt-6">
        <TableSectionHeader title="Bibliografías" />
        <div className="information-container">
          <div className="tabs-content">
            <Resources />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bibliographies;
