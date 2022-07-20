import React, { useContext, useEffect, useState } from 'react';
import NiceModal from '@ebay/nice-modal-react';
import { useQuery, useMutation, useQueryClient } from 'react-query';
import { useFieldArray, useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import NewTematicUnitModal from '../../Shared/Modals/NewTematicUnitModal';
import UnitItemStrategies from './UnitItemStrategies';
import FormWrapper from '../../Forms/FormWrapper';
import StrategiesForm from '../../Forms/StrategiesFrom';
import { SubjectContext } from '../../../context/SubjectContext';
import MethodsForm from '../../Forms/MethodsForm';
import Button from '../../Shared/Buttons/Button';
import 'boxicons';
import {
  GET_COMPETENCES,
  UPDATE_COMPETENCE,
  UPDATE_SUBJECT,
} from '../../../helpers/SubjectEndpoints';

const openModal = () => {
  NiceModal.show(NewTematicUnitModal);
};

const LearningStrategies = () => {
  const queryClient = useQueryClient();
  const {
    subject,
    setUnits,
    units,
    strategy,
    setStrategy,
    unitStrategies,
    setUnitStrategies,
  } = useContext(SubjectContext);
  const { isLoading: isLoadingUnits, data: unitsResponse } = useQuery(
    ['competences', subject.id],
    GET_COMPETENCES
  );
  const { mutateAsync } = useMutation((body) => UPDATE_SUBJECT(body));
  const { mutateAsync: updateCompetence } = useMutation((body) =>
    UPDATE_COMPETENCE(body)
  );

  const { control, setValue } = useForm();
  const { fields, append, remove, update, watch } = useFieldArray({
    control,
    name: 'methods',
  });

  const onSubmit = async ({ strategy: strategyValue, methods }) => {
    console.log(methods, '<- **');
    try {
      if (strategyValue) {
        mutateAsync({
          id: subject?.id,
          data: {
            strategyId: strategyValue.value,
          },
        })
          .then((res) => {
            console.log(res);
            // setStrategy(strategyValue);
          })
          .catch((err) => console.log(err));
      }
      console.log(methods);
      console.log(unitStrategies);
      const pushPromises = [];
      unitStrategies.forEach((unit, index) => {
        pushPromises.push(
          updateCompetence({
            id: unit?.id,
            data: {
              methodId: methods[index]?.method?.value,
              writing: methods[index]?.writing,
            },
          })
        );
      });
      const ans = await Promise.all(pushPromises);

      setUnitStrategies(
        unitStrategies.map((unit, index) => ({
          ...unit,
          method:
            methods[index]?.method !== undefined
              ? methods[index].method
              : unit.method,
        }))
      );
      toast.success('Cambios guardados correctamente');
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fields.map((index) => remove(index));
    units.map((unit, index) =>
      append({
        method: unit.method,
        unit,
      })
    );
  }, [units]);

  useEffect(() => {
    if (unitsResponse) {
      setUnits(unitsResponse.data);
    }
  }, [unitsResponse]);

  useEffect(() => {}, [unitStrategies]);

  if (isLoadingUnits) return <p>Cargando...</p>;

  console.log(units, '<----');

  return (
    <FormWrapper onSubmit={onSubmit}>
      <div>
        <p>
          En esta sección agregarán las los métodos de enseñanza,
          actividades y evaluación
        </p>
        <div>
          <p className="font-bold">
            Selecciona solamente una estrategia de aprendizaje para la
            unidad de aprendizaje
          </p>
          <StrategiesForm strategy={strategy} />
        </div>
        <div>
          <ul>
            {fields &&
              fields.map(({ id, unit }, index) => (
                <div key={`${unit.id}divunit`}>
                  <MethodsForm
                    index={index}
                    key={`${unit.id}strategiesForm`}
                    id={unit.id}
                    unitName={unit.description}
                    unitIndex={index + 1}
                    method={unitStrategies[index].method}
                    writing={unit.writing}
                  />
                  <UnitItemStrategies
                    index={index}
                    key={unit.id}
                    id={unit.id}
                    unitName={unit.description}
                    unitIndex={index + 1}
                    activities={unitStrategies[index].activities}
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
        </div>
      </div>
    </FormWrapper>
  );
};

export default LearningStrategies;
