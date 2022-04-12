/* eslint-disable react/destructuring-assignment */
import React, { useContext, useEffect, useState } from 'react';
import NiceModal from '@ebay/nice-modal-react';
import SubcontentItem from './SubcontentItem';
import NewContentModal from '../../Shared/Modals/NewContentModal';
import NewSubContentModal from '../../Shared/Modals/NewSubContentModal';
import { SubjectContext } from '../../../context/SubjectContext';
import DeleteTopicModal from '../../Shared/Modals/DeleteTopicModal';
import 'boxicons';

const ContentItem = ({ topic, topicIndex, unitIndex, units }) => {
  const { hours, setHours } = useContext(SubjectContext);
  const openModal = () => {
    NiceModal.show(NewContentModal, {
      unitIndex,
      type: 'edit',
      hours,
      setHours,
      units,
      topicIndex,
      topicName: topic.title,
      topicTeoric: topic.T,
      topicPractice: topic.P,
      topicAA: topic.AA,
    });
  };

  const openModalSubcontent = () => {
    NiceModal.show(NewSubContentModal, {
      type: 'new',
      unitIndex,
      topicIndex,
      units,
    });
  };

  const openModalDeleteTopic = () => {
    NiceModal.show(DeleteTopicModal, {
      unitIndex,
      hours,
      setHours,
      topicIndex,
      units,
    });
  };

  const { subTopics } = topic;

  const [hidden, setHidden] = useState(true);

  return (
    <li>
      <div className="content-list flex justify-between">
        <p className="font-bold">
          {unitIndex}.{topicIndex + 1} {topic.title}
        </p>
        <div className="p-2 text-gray-500 rounded">
          <p>Horas Teoría: {topic.T}</p>
          <p>Horas Practica {topic.P}</p>
          <p>Horas AA: {topic.AA}</p>
        </div>
        <div className="flex">
          <div
            className="icon-btn flex items-center justify-center"
            onClick={openModalSubcontent}
          >
            <box-icon type="solid" name="file-plus" />
            <p>Agregar subcontenido</p>
          </div>
          <div
            className="icon-btn flex items-center justify-center"
            onClick={openModalDeleteTopic}
          >
            <box-icon type="solid" name="trash" />
          </div>
          <div
            className="icon-btn flex items-center justify-center"
            onClick={openModal}
          >
            <box-icon type="solid" name="edit" />
          </div>
        </div>
      </div>
      <div>
        <ul>
          {subTopics.map((subTopic, i) => (
            <SubcontentItem
              // eslint-disable-next-line react/no-array-index-key
              key={topicIndex + i + subTopic.substr(0, 3)}
              subtopic={subTopic}
              subtopicIndex={i}
              index={`${unitIndex}.${topicIndex + 1}.${i + 1}`}
              topicIndex={topicIndex}
              unitIndex={unitIndex}
              units={units}
            />
          ))}
        </ul>
      </div>
    </li>
  );
};

export default ContentItem;
