import React, { useContext, useEffect, useState } from 'react';
import NiceModal from '@ebay/nice-modal-react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import {
  useFieldArray,
  useFormContext,
  useForm,
} from 'react-hook-form';
import { toast } from 'react-toastify';
import { SubjectContext } from '../../../context/SubjectContext';
import {
  CREATE_PURPOSE,
  GET_COMPETENCES,
  UPDATE_PURPOSE,
} from '../../../helpers/SubjectEndpoints';
import NewTematicUnitModal from '../../Shared/Modals/NewTematicUnitModal';
import AddButton from '../../Shared/Buttons/AddButton';
import Button from '../../Shared/Buttons/Button';
import UnitItem from './UnitItem';
import FormWrapper from '../../Forms/FormWrapper';
import CompetenceForm from '../../Forms/CompetenceForm';
import 'boxicons';

const Competencies = () => {
  const queryClient = useQueryClient();
  const { units, setUnits, subject, setSubject, verbs, connectors } =
    useContext(SubjectContext);
  const { control, setValue } = useForm();
  const { fields, append, remove, update } = useFieldArray({
    control,
    name: 'competencies',
  });

  const type = 'new';
  const openModal = () => {
    NiceModal.show(NewTematicUnitModal, {
      units,
      setUnits,
      type,
      subject: subject.id,
    });
  };

  const {
    isLoading: isLoadingCompetences,
    data: competencesResponse,
  } = useQuery(['competences', subject.id], GET_COMPETENCES);

  const { mutateAsync: createPurpose } = useMutation(CREATE_PURPOSE, {
    onSuccess: () => {
      queryClient.invalidateQueries('competences');
    },
  });

  const { mutateAsync: updatePurpose } = useMutation(UPDATE_PURPOSE, {
    onSuccess: () => {
      queryClient.invalidateQueries('competences');
    },
  });

  const onSubmit = async (data) => {
    const { competencies: competenciesValues } = data;
    await units.forEach(async (unit, index) => {
      const { verb, object, connector, quality } =
        competenciesValues[index];
      const isVerbId = (element) => element === verb;
      const isConnectorId = (element) => element === connector;
      const verbId = verb.value;
      const connectorId = connector.value;
      try {
        if (unit.purpose) {
          const ans = await updatePurpose({
            id: unit.purpose.id,
            data: {
              unitCompetenceId: unit.id,
              object,
              quality,
              connectorId,
              verbId,
            },
          });
          console.log(ans);
        } else {
          const ans = createPurpose({
            unitCompetenceId: unit.id,
            object,
            verbId,
            connectorId,
            quality,
          });
          console.log(ans);
        }
        toast.success('Cambios guardados correctamente');
      } catch (e) {
        console.log(e);
      }
    });
  };

  useEffect(() => {
    if (competencesResponse) {
      setUnits(competencesResponse.data);
      console.log('UNITS: ', units);
    }
  }, [competencesResponse]);

  useEffect(() => {
    fields.map((index) => remove(index));
    units.map((unit, index) =>
      append({
        verb: '',
        object: '',
        connector: '',
        quality: '',
        unit,
      })
    );
  }, [units]);

  if (isLoadingCompetences) return <p>Cargando...</p>;

  return (
    <>
      <p>
        En esta sección se agregarán las unidades temáticas, así como
        sus respectivas competencias
      </p>
      <div className="flex items-center">
        <div
          onClick={openModal}
          className="flex items-center cursor-pointer"
        >
          <AddButton className="cursor-pointer" />{' '}
          <label
            className="block sofia-bold cursor-pointer"
            style={{ marginTop: '1px', fontSize: '14px' }}
          >
            Añadir Unidad Temática
          </label>
        </div>
      </div>
      <div>
        <FormWrapper onSubmit={onSubmit}>
          <ul>
            {fields &&
              fields.map(({ id, unit }, index) => (
                <div key={`${unit.id}divunit`}>
                  <UnitItem
                    key={unit.id + unit.description}
                    index={index + 1}
                    unitName={unit.description}
                    unitCompetence={units.unitCompetence}
                  />
                  <CompetenceForm
                    index={index}
                    isLast={index + 1 === fields.length}
                    key={`${unit.id}competenceform`}
                    verbId={unit?.purpose?.verbId}
                    connectorId={unit?.purpose?.connectorId}
                    objectText={unit?.purpose?.object}
                    qualityText={unit?.purpose?.quality}
                  />
                </div>
              ))}
            <div className="flex flex-row-reverse">
              <div className="w-44">
                <Button type="submit" secondary>
                  Guardar
                </Button>
              </div>
            </div>
          </ul>
        </FormWrapper>
      </div>
    </>
  );
};

export default Competencies;
