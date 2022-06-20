import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import NiceModal from '@ebay/nice-modal-react';
import FormWrapper from '../../Forms/FormWrapper';
import MethodsForm from '../../Forms/MethodsForm';
import { GeneralContext } from '../../../context/GeneralContext';
import NewActivityModal from '../../Shared/Modals/NewActivityModal';
import ActivityItem from './ActivityItem';
import romanize from '../../../helpers/Romanize';
import 'boxicons';
import { SubjectContext } from '../../../context/SubjectContext';

const UnitItemStrategies = ({
  unitName,
  index,
  unitIndex,
  activities,
  id,
}) => {
  const { handleSubmit } = useForm();
  const { unitStrategies, setUnitStrategies } =
    useContext(SubjectContext);
  const [hidden, setHidden] = useState(true);
  const type = 'new';
  const openModal = () => {
    NiceModal.show(NewActivityModal, {
      unitStrategies,
      setUnitStrategies,
      type,
      unitIndex,
      id,
    });
  };

  return (
    <li>
      <div className="unit-item flex justify-between">
        <p>
          {romanize(unitIndex)}. {unitName}
        </p>
        <div className="flex">
          <div
            className="icon-btn flex items-center justify-center"
            onClick={openModal}
          >
            <box-icon type="solid" name="file-plus" />
            <p>Agregar Actividad</p>
          </div>
          <div className="icon-btn flex items-center justify-center">
            <box-icon
              type="solid"
              name={hidden ? 'chevrons-down' : 'chevrons-left'}
              onClick={() => setHidden(!hidden)}
            />
          </div>
        </div>
      </div>
      <div className="mb-10">
        {hidden ? (
          <div>
            <ul>
              {/* eslint-disable-next-line no-shadow */}
              {activities?.map(({ id, title, description }, i) => {
                return (
                  <ActivityItem
                    // eslint-disable-next-line react/no-array-index-key
                    key={title}
                    id={id}
                    description={description}
                    activityName={title}
                    activityIndex={i}
                    unitIndex={unitIndex}
                    unitStrategies={unitStrategies}
                    setUnitStrategies={setUnitStrategies}
                  />
                );
              })}
            </ul>
          </div>
        ) : (
          <span />
        )}
      </div>
    </li>
  );
};

export default UnitItemStrategies;
