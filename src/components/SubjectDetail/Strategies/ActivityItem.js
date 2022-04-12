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
}) => {
  const openModal = () => {
    NiceModal.show(DeleteActivityModal, {
      unitStrategies,
      setUnitStrategies,
      unitIndex,
      activityIndex,
    });
  };

  const [hidden, setHidden] = useState(true);

  return (
    <li className="content-list flex justify-between">
      <p className="font-bold">{activityName}</p>
      <div className="flex">
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
