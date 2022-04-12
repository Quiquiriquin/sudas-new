import React, { useContext, useEffect, useState } from 'react';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import NewPracticeModal from '../../Shared/Modals/NewPracticeModal';
import 'boxicons';
import { SubjectContext } from '../../../context/SubjectContext';
import DeletePracticeModal from '../../Shared/Modals/DeletePracticeModal';

const PracticeItem = ({ practice, practiceIndex, unitIndex }) => {
  const onSubmit = (values) => {
    console.log(values);
  };
  const { practices, setPractices } = useContext(SubjectContext);

  const openModal = () => {
    NiceModal.show(NewPracticeModal, {
      unitIndex,
      type: 'edit',
      practices,
      setPractices,
      practiceIndex,
    });
  };

  const openDeleteModal = () => {
    NiceModal.show(DeletePracticeModal, {
      unitIndex,
      practices,
      setPractices,
      practiceIndex,
    });
  };

  const [hidden, setHidden] = useState(true);

  return (
    <li className="content-list flex justify-between">
      <p className="font-bold w-60">
        {practiceIndex + 1}. {practice.name}
      </p>
      <div>
        <p>{practice.hours} Horas</p>
      </div>
      <div>
        <p>{practice.place}</p>
      </div>
      <div className="flex">
        <div
          className="icon-btn flex items-center justify-center"
          onClick={openDeleteModal}
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
    </li>
  );
};

export default PracticeItem;
