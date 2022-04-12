import React, { useContext, useEffect, useState } from 'react';
import NiceModal from '@ebay/nice-modal-react';
import ContentItem from './ContentItem';
import NewContentModal from '../../Shared/Modals/NewContentModal';
import romanize from '../../../helpers/Romanize';
import { SubjectContext } from '../../../context/SubjectContext';
import 'boxicons';

const UnitItemContent = ({
  topics = [],
  unitName = '',
  unitIndex,
  subject,
}) => {
  const {
    hours,
    setHours,
    units,
    setUnits,
    practiceHour,
    setPracticeHour,
  } = useContext(SubjectContext);
  const openModal = () => {
    NiceModal.show(NewContentModal, {
      type: 'new',
      unitIndex,
      units,
      hours,
      setHours,
      subject,
      practiceHour,
      setPracticeHour,
    });
  };

  const [hidden, setHidden] = useState(true);

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
            <p>Agregar contenido</p>
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
      <div>
        <ul>
          {hidden && topics ? (
            topics.map((topic, index) => (
              <ContentItem
                // eslint-disable-next-line react/no-array-index-key
                key={`content${index}${unitName}`}
                topic={topic}
                topicIndex={index}
                unitIndex={unitIndex}
                units={units}
              />
            ))
          ) : (
            <span />
          )}
        </ul>
      </div>
    </li>
  );
};

export default UnitItemContent;
