/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import NiceModal from '@ebay/nice-modal-react';
import DeleteSubtopicModal from '../../Shared/Modals/DeleteSubtopicModal';
import NewSubContentModal from '../../Shared/Modals/NewSubContentModal';
import 'boxicons';

const SubcontentItem = ({
  subtopic,
  subtopicIndex,
  index,
  topicIndex,
  unitIndex,
  units,
}) => {
  const openModal = () => {
    NiceModal.show(DeleteSubtopicModal, {
      unitIndex,
      units,
      topicIndex,
      subtopicIndex,
    });
  };
  const editModal = () => {
    NiceModal.show(NewSubContentModal, {
      type: 'edit',
      unitIndex,
      units,
      topicIndex,
      subtopicIndex,
      subtopic,
    });
  };

  return (
    <li>
      <div className="content-list subcontent flex justify-between">
        <p>
          {index} {subtopic}
        </p>
        <div className="flex">
          <div
            className="icon-btn flex items-center justify-center"
            onClick={openModal}
          >
            <box-icon type="solid" name="trash" />
          </div>
          <div
            className="icon-btn flex items-center justify-center"
            onClick={editModal}
          >
            <box-icon type="solid" name="edit" />
          </div>
        </div>
      </div>
    </li>
  );
};

export default SubcontentItem;
