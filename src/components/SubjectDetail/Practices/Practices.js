/* eslint-disable no-shadow */
import React, { useContext, useEffect, useState } from 'react';
import NiceModal from '@ebay/nice-modal-react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import NewTematicUnitModal from '../../Shared/Modals/NewTematicUnitModal';
import {
  GET_COMPETENCES,
  GET_CONTENT_SUBJECT,
  UPDATE_COMPETENCE,
  UPDATE_SUBJECT,
} from '../../../helpers/SubjectEndpoints';
import UnitItemPractices from './UnitItemPractice';
import SelectFormInput from '../../Shared/FormInputs/SelectFormInput';
import FormWrapper from '../../Forms/FormWrapper';
import PracticeForm from '../../Forms/PracticeForm';
import 'boxicons';
import { SubjectContext } from '../../../context/SubjectContext';

const openModal = () => {
  NiceModal.show(NewTematicUnitModal);
};

const Practices = () => {
  const queryClient = useQueryClient();
  const {
    subject,
    hours,
    units,
    setHours,
    setUnits,
    practices,
    setPractices,
  } = useContext(SubjectContext);
  const { isLoading: isLoadingUnits, data: unitsResponse } = useQuery(
    ['competences', subject.id],
    GET_COMPETENCES
  );
  const { mutateAsync } = useMutation((body) => UPDATE_SUBJECT(body));
  const { mutateAsync: updatePractices } = useMutation((body) =>
    UPDATE_COMPETENCE(body)
  );

  console.log(subject, '<---');
  console.log(practices);

  const onSubmit = async (values) => {
    console.log(values);
    try {
      const { samePlacePractices, practicePlace } = values;
      console.log(practices);
      const body = {
        data: {
          samePlacePractices: samePlacePractices.value,
          practicePlace,
        },
        id: subject?.id,
      };
      await mutateAsync(body);
      const provBodysToUpdate = [];
      units.forEach((un, index) => {
        const auxBody = {
          id: un?.id,
          data: {
            practices: practices[index].practices,
          },
        };
        provBodysToUpdate.push(updatePractices(auxBody));
      });
      const ans = await Promise.all(provBodysToUpdate);
      console.log(ans);
      queryClient.invalidateQueries({
        predicate: ({ queryKey }) => queryKey.includes('subject'),
      });
      toast.success(
        'Se ha actualizado la información general de las prácticas'
      );
    } catch (e) {
      console.log(e);
      toast.error('Ocurrió un error al actualizar las prácticas');
    }
  };

  const options = [
    {
      value: false,
      label: 'No',
    },
    {
      value: true,
      label: 'Sí',
    },
  ];

  useEffect(() => {
    if (unitsResponse) {
      setUnits(unitsResponse.data);
      // eslint-disable-next-line no-shadow
      console.log(unitsResponse.data);
      setPractices(
        unitsResponse?.data?.map(({ practices }) => ({
          practices: practices || [],
        }))
      );
    }
  }, [unitsResponse]);

  if (isLoadingUnits) return <p>Cargando...</p>;

  return (
    <>
      <p>
        En esta sección se agregarán las prácticas de cada unidad
        temática
      </p>
      <FormWrapper onSubmit={onSubmit}>
        <div>
          <p className="font-bold">
            ¿Las prácticas se realizarán en un solo lugar?
          </p>
          <SelectFormInput
            options={options}
            name="samePlacePractices"
            defaultValue={
              !subject?.samePlacePractices ? options[0] : options[1]
            }
            placeholder="Selecciona una opción"
            className="w-96 flex-none"
          />
          <div>
            <PracticeForm />
          </div>
        </div>
      </FormWrapper>
      <div>
        <ul>
          {units.map((unit, index) => (
            <UnitItemPractices
              key={unit.id}
              unitName={unit.description}
              unitIndex={index + 1}
              unitCompetence={unit.unitCompetence}
              samePlacePractices={subject?.samePlacePractices}
              practicePlace={subject?.practicePlace}
            />
          ))}
        </ul>
      </div>
    </>
  );
};

export default Practices;
