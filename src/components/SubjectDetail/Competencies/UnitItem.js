import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import NiceModal from '@ebay/nice-modal-react';
import FormWrapper from '../../Forms/FormWrapper';
import PurposeForm from '../../Forms/PurposeForm';
import NewTematicUnitModal from '../../Shared/Modals/NewTematicUnitModal';
import romanize from '../../../helpers/Romanize';
import PreviewCompetencies from './PreviewCompetencies';
import DeleteTematicUnitModal from '../../Shared/Modals/DeleteTematicUnitModal';
import { SubjectContext } from '../../../context/SubjectContext';
import 'boxicons';
import CompetenceForm from '../../Forms/CompetenceForm';

const UnitItem = ({ index, unitCompetence, unitName }) => {
  const { units, setUnits } = useContext(SubjectContext);
  const { handleSubmit } = useForm();
  const type = 'edit';

  // TODO: send real data
  const verbId = 1;
  const connectorId = 1;
  const objectText = '';
  const qualityText = '';
  const onSubmit = (values) => {
    console.log(values);
  };

  const openModal = () => {
    NiceModal.show(NewTematicUnitModal, {
      units,
      setUnits,
      type,
      index,
      unitName,
    });
  };

  const openDeleteModal = () => {
    NiceModal.show(DeleteTematicUnitModal, {
      units,
      setUnits,
      unitName,
      index,
    });
  };

  const [hidden, setHidden] = useState(true);

  return (
    <li>
      <div className="unit-item flex justify-between">
        <p>
          {romanize(index)}. {unitName}
        </p>
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
          <div className="icon-btn flex items-center justify-center">
            <box-icon
              type="solid"
              name={hidden ? 'chevrons-down' : 'chevrons-left'}
              onClick={() => setHidden(!hidden)}
            />
          </div>
        </div>
      </div>
    </li>
  );
};

export default UnitItem;
