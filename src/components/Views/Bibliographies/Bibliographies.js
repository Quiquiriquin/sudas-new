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
          <div className="tabs">
            <div
              onClick={() => setActiveTab(1)}
              className={`tab ${activeTab === 1 ? 'selected' : ''}`}
            >
              <label>Autores</label>
            </div>
            <div
              onClick={() => setActiveTab(2)}
              className={`tab ${activeTab === 2 ? 'selected' : ''}`}
            >
              <label>Editoriales</label>
            </div>
            <div
              onClick={() => setActiveTab(3)}
              className={`tab ${activeTab === 3 ? 'selected' : ''}`}
            >
              <label>Ejemplares</label>
            </div>
          </div>
          <div className="tabs-content">
            {activeTab === 1 && <Authors />}
            {activeTab === 2 && <Editorials />}
            {activeTab === 3 && <Resources />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Bibliographies;
