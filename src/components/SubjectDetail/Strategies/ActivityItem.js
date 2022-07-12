import React, { useContext, useEffect, useState } from 'react';
import NiceModal from '@ebay/nice-modal-react';
import NewActivityModal from '../../Shared/Modals/NewActivityModal';
import DeleteActivityModal from '../../Shared/Modals/DeleteActivityModal';
import { SubjectContext } from '../../../context/SubjectContext';
import 'boxicons';

const ActivityItem = ({
  activityName,
  unitIndex,
  activityIndex,
  unitStrategies,
  setUnitStrategies,
  description,
  id,
}) => {
  const openModal = () => {
    NiceModal.show(DeleteActivityModal, {
      unitStrategies,
      setUnitStrategies,
      unitIndex,
      activityIndex,
      id,
    });
  };

  const [hidden, setHidden] = useState(true);

  return (
    <li className="content-list flex justify-between items-center">
      <div className="w-3/6">
        <p className="text-xs">Actividad</p>
        <p className="font-bold">{activityName}</p>
      </div>
      <div className="w-2/6">
        <p className="text-xs">Producto esperado</p>
        <p className="font-bold">{description}</p>
      </div>
      <div className="flex w-1/6 justify-end">
        <div
          className="icon-btn flex items-center justify-center"
          onClick={openModal}
        >
          <box-icon type="solid" name="trash" />
        </div>
      </div>
    </li>
  );
};

export default ActivityItem;
