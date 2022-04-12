/* eslint-disable react/destructuring-assignment */
import React, { useEffect, useState } from 'react';
import NiceModal from '@ebay/nice-modal-react';
import FormWrapper from '../../Forms/FormWrapper';
import PurposeForm from '../../Forms/PurposeForm';
import AddButton from '../../Shared/Buttons/AddButton';
import DeleteSubtopicModal from '../../Shared/Modals/DeleteSubtopicModal';
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
          <div className="icon-btn flex items-center justify-center">
            <box-icon type="solid" name="edit" />
          </div>
        </div>
      </div>
    </li>
  );
};

export default SubcontentItem;
