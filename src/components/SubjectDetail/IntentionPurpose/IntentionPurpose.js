import React, { useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { SubjectContext } from '../../../context/SubjectContext';
import {
  UPDATE_EDU_INTENTION,
  UPDATE_PURPOSE,
} from '../../../helpers/SubjectEndpoints';
import FormWrapper from '../../Forms/FormWrapper';
import Button from '../../Shared/Buttons/Button';
import EducationalIntention from '../EducationalIntention';
import PreviewPurposeIntetion from '../PreviewPurposeIntetion';
import Purpose from '../Purpose';
import RelatedUnits from '../RelatedUnits';
import SubjectDetailItem from '../SubjectDetailItem';
import 'react-toastify/dist/ReactToastify.css';

const IntentionPurpose = () => {
  const queryClient = useQueryClient();
  const { subject, verbs, connectors } = useContext(SubjectContext);

  const notify = () =>
    toast.success('Información actualizada', {
      position: 'top-center',
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const notifyError = () =>
    toast.error('Ocurrio un error!', {
      position: 'top-center',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  const {
    formState: { isValid },
  } = useForm();

  const { mutateAsync: updateEduIntention } = useMutation(
    UPDATE_EDU_INTENTION,
    {
      onSuccess: () => {
        queryClient.invalidateQueries('subject');
      },
    }
  );

  const { mutateAsync: updatePurpose } = useMutation(UPDATE_PURPOSE, {
    onSuccess: () => {
      queryClient.invalidateQueries('subject');
    },
  });

  const onSubmit = async (data) => {
    const { educationalIntention, verb, object, connector, quality } =
      data;
    const isVerbId = (element) => element === verb;
    const isConnectorId = (element) => element === connector;
    const verbId = verbs.findIndex(isVerbId) + 1;
    const connectorId = connectors.findIndex(isConnectorId) + 1;
    try {
      const ans = await updateEduIntention({
        id: subject.id,
        data: {
          id: subject.id,
          educationalIntention,
        },
      });
      // console.log(ans);
      const ans2 = await updatePurpose({
        id: subject.id,
        data: {
          subjectId: subject.id,
          object,
          quality,
          connectorId,
          verbId,
        },
      });
      notify();
    } catch (e) {
      notifyError();
      console.log(e);
    }
  };

  return (
    <>
      <FormWrapper onSubmit={onSubmit}>
        <div>
          <SubjectDetailItem
            title="Intención educativa"
            component={<EducationalIntention />}
          />
          <SubjectDetailItem
            title="Unidades de aprendizaje relacionadas"
            component={<RelatedUnits />}
          />
          <SubjectDetailItem
            title="Propósito"
            component={<Purpose />}
          />
          <SubjectDetailItem
            title="Vista Previa"
            component={<PreviewPurposeIntetion />}
          />
          <div className="flex flex-row-reverse">
            <div className="w-44">
              <Button type="submit" secondary disabled={!isValid}>
                Guardar
              </Button>
            </div>
          </div>
        </div>
      </FormWrapper>
    </>
  );
};

export default IntentionPurpose;
