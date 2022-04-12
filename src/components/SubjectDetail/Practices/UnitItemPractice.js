import React, { useContext, useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import NiceModal from '@ebay/nice-modal-react';
import FormWrapper from '../../Forms/FormWrapper';
import MethodsForm from '../../Forms/MethodsForm';
import { GeneralContext } from '../../../context/GeneralContext';
import NewActivityModal from '../../Shared/Modals/NewActivityModal';
import NewPracticeModal from '../../Shared/Modals/NewPracticeModal';
import PracticeItem from './PracticeItem';
import PracticeForm from '../../Forms/PracticeForm';
import romanize from '../../../helpers/Romanize';
import { SubjectContext } from '../../../context/SubjectContext';
import 'boxicons';

const UnitItemPractices = ({ unitName, unitIndex }) => {
  const { handleSubmit } = useForm();
  const { practices, setPractices, practiceHour, setPracticeHour } =
    useContext(SubjectContext);
  const [hidden, setHidden] = useState(true);
  const openModal = () => {
    NiceModal.show(NewPracticeModal, {
      unitIndex,
      type: 'new',
      practices,
      setPractices,
      practiceHour,
      setPracticeHour,
    });
  };
  const onSubmit = (values) => {
    console.log(values);
    // const id = new Date();
    // const unit = { id, name: 'asdasd', competence: '' };
    // setTematicUnits([...tematicUnits, unit]);
  };

  return (
    <li>
      <div className="unit-item flex justify-between">
        <p>
          {romanize(unitIndex)}. {unitName}
        </p>
        <div className="flex">
          <div className="icon-btn">
            Horas disponibles: {practiceHour[unitIndex - 1]}{' '}
          </div>
          <div
            className="icon-btn flex items-center justify-center"
            onClick={openModal}
          >
            <box-icon type="solid" name="file-plus" />
            <p>Agregar Práctica</p>
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
            <div>
              <ul>
                {practices[unitIndex - 1].practices.map(
                  (practice, i) => {
                    return (
                      <PracticeItem
                        // eslint-disable-next-line no-undef
                        key={practice.name + unitIndex}
                        practiceIndex={i}
                        unitIndex={unitIndex}
                        practice={practice}
                      />
                    );
                  }
                )}
              </ul>
            </div>
          </div>
        ) : (
          <span />
        )}
      </div>
    </li>
  );
};

export default UnitItemPractices;
