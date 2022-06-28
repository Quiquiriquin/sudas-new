import React, { useContext, useEffect, useState } from 'react';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import styled from 'styled-components';
import { useQuery, useQueryClient } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { useParams } from 'react-router-dom';
import NiceModal from '@ebay/nice-modal-react';
import SubjectDetailItem from '../../SubjectDetail/SubjectDetailItem';
import Competencies from '../../SubjectDetail/Competencies/Competencies';
import {
  GET_CONNECTOR,
  GET_RELATED_UNITS,
  GET_SUBJECT,
  GET_VERB,
} from '../../../helpers/SubjectEndpoints';
import IntentionPurpose from '../../SubjectDetail/IntentionPurpose/IntentionPurpose';
import LearningStrategies from '../../SubjectDetail/Strategies/LearningStrategies';
import Contents from '../../SubjectDetail/Content/Contents';
import Practices from '../../SubjectDetail/Practices/Practices';
import TeacherProfile from '../../SubjectDetail/TeacherProfile/TeacherProfile';
import Bibliography from '../../SubjectDetail/Bibliography/Bibliography';
import { SubjectContext } from '../../../context/SubjectContext';
import 'boxicons';
import './SubjectDetail.scss';
import BibliographyModal from '../../Shared/Modals/BibliographyModal';
import Button from '../../Shared/Buttons/Button';

const PanelContent = styled.div`
  background: #fff;
  padding: 20px;
  padding-bottom: 60px;
  border-radius: 0px 0px 10px;
  height: 100%;
  overflow: auto;
  max-height: calc(100vh - 168px);
`;

const SectionCard = styled.div`
  margin: 20px 0;
  padding: 1.25rem;
  border-radius: 0.25rem;
  box-shadow: 0px 3px 6px #3d4b5c26;
`;
const SubjectDetail = () => {
  const {
    setRelatedUnits,
    setVerbs,
    setConnectors,
    setSubject,
    subject,
    relatedUnits,
  } = useContext(SubjectContext);
  const { id } = useParams();
  const { isLoading: isLoadingSubject, data: subjectResponse } =
    useQuery(['subject', id], GET_SUBJECT);

  const { isLoading: isLoadingVerbs, data: verbsResponse } = useQuery(
    'verbs',
    GET_VERB
  );

  const { isLoading: isLoadingConnectors, data: connectorsResponse } =
    useQuery('connectors', GET_CONNECTOR);

  const {
    isLoading: isLoadingRelatedUnits,
    data: relatedUnitsResponse,
  } = useQuery(
    ['relatedUnits', subject.semester, subject.academicPlanId],
    GET_RELATED_UNITS,
    {
      enabled: !!subject,
    }
  );

  useEffect(() => {
    if (subjectResponse) {
      console.log('EL SUBJECT: ', subjectResponse.data);
      setSubject(subjectResponse.data);
    }
  }, [subjectResponse]);

  useEffect(() => {
    if (verbsResponse && connectorsResponse) {
      const newVerbs = verbsResponse?.data.map(
        // eslint-disable-next-line no-shadow
        ({ id, description }) => ({
          value: id,
          label: description,
        })
      );
      const newConnectors = connectorsResponse.data.map(
        // eslint-disable-next-line no-shadow
        ({ id, description }) => ({
          value: id,
          label: description,
        })
      );
      setConnectors(newConnectors);
      setVerbs(newVerbs);
    }
  }, [verbsResponse, connectorsResponse]);

  useEffect(() => {
    if (relatedUnitsResponse) {
      setRelatedUnits(relatedUnitsResponse.data);
    }
  }, [relatedUnitsResponse]);

  if (
    isLoadingSubject ||
    isLoadingConnectors ||
    isLoadingVerbs ||
    isLoadingRelatedUnits
  )
    return <p>Cargando...</p>;

  return (
    <div className="flex flex-col border-white flex-1 bg-platinum overflow-hidden">
      <div className="bg-white rounded px-6 py-4 shadow flex justify-between flex-initial">
        <h1 className="text-lg font-bold">
          {subject.name} | Semestre {subject.semester}
        </h1>
        <a
          href={`https://main--mellifluous-sopapillas-f037f0.netlify.app/documento/${subject?.id}`}
          target="_blank"
          rel="noreferrer"
        >
          <Button
            style={{ maxWidth: 'max-content' }}
            type="button"
            primary
            small
          >
            Visualizar PDF
          </Button>
        </a>
      </div>

      <Tabs className="pb-10">
        <TabList className="flex flex-row pt-5 justify-between font-bold">
          <Tab className="bg-secondary basis-1/5 p-3 rounded-t">
            Intención educativa y propósito
          </Tab>
          <Tab className="bg-secondary basis-1/5 p-3 rounded-t">
            Competencias
          </Tab>
          <Tab className="bg-secondary basis-1/5 p-3 rounded-t">
            Contenidos
          </Tab>
          <Tab className="bg-secondary basis-1/5 p-3 rounded-t">
            Estrategias y métodos
          </Tab>
          <Tab className="bg-secondary basis-1/5 p-3 rounded-t">
            Prácticas
          </Tab>
          <Tab className="bg-secondary basis-1/5 p-3 rounded-t">
            Perfil docente
          </Tab>
          <Tab className="bg-secondary basis-1/5 p-3 rounded-t">
            Bibliografía
          </Tab>
        </TabList>

        <TabPanel>
          <PanelContent>
            <IntentionPurpose subject={subject} />
          </PanelContent>
        </TabPanel>
        <TabPanel>
          <PanelContent>
            <SubjectDetailItem
              title="Unidades de competencia"
              component={<Competencies />}
            />
          </PanelContent>
        </TabPanel>
        <TabPanel>
          <PanelContent>
            <SubjectDetailItem
              title="Contenidos"
              component={<Contents />}
            />
          </PanelContent>
        </TabPanel>
        <TabPanel>
          <PanelContent>
            <SubjectDetailItem
              title="Estrategias de aprendizaje y métodos de enseñanza"
              component={<LearningStrategies />}
            />
          </PanelContent>
        </TabPanel>
        <TabPanel>
          <PanelContent>
            <SubjectDetailItem
              title="Prácticas"
              component={<Practices />}
            />
          </PanelContent>
        </TabPanel>
        <TabPanel>
          <PanelContent>
            <TeacherProfile />
          </PanelContent>
        </TabPanel>
        <TabPanel>
          <PanelContent>
            <SubjectDetailItem
              title="Bibliografía, cibergrafía, recursos digitales"
              component={<Bibliography />}
            />
          </PanelContent>
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default SubjectDetail;
