import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { useQuery } from 'react-query';
import { Popover } from 'antd';
import { SessionContext } from '../../../context/SessionContext';
import { GET_DASHBOARD } from '../../../helpers/DashboardEndpoints';
import {
  GET_BIBLIO,
  GET_SUBJECT,
} from '../../../helpers/SubjectEndpoints';
import Button from '../../Shared/Buttons/Button';
import AddButton from '../../Shared/Buttons/AddButton';
import ProfilePic from '../../Shared/ProfilePic/ProfilePic';
import { GET_AVAILABLE_TEACHERS } from '../../../helpers/EnpointsUser';
import TeacherSelector from '../../Shared/Popover/TeacherSelector';

const SectionCard = styled.div`
  width: 100%;
  border-radius: 5px;
  background: #fff;
  padding: 20px;
  box-shadow: 0px 3px 6px #3d4b5c26;
  margin-bottom: 0.5rem;
`;

const SectionTitle = styled.div`
  font-weight: bold;
  margin-bottom: 1.5rem;
`;

const SectionBody = styled.div`
  text-align: justify;
  .button {
    background: #e0e0e0;
    color: #828282;
    text-align: center;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
  }
  .active {
    background: #fff;
    color: #000;
    font-weight: bold;
    border: 1px solid #ccc;
  }
`;

const BibliographicCard = styled.div`
  width: 20rem !important;
  border: 1px solid #ccc;
  border-radius: 5px;
  background: #fff;
  padding: 10px;
  box-shadow: 0px 3px 6px #3d4b5c26;
`;

const TabButton = styled.div`
  max-width: 220px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  border-top: 1px solid #b3b3b3;
  border-left: 1px solid #b3b3b3;
  border-right: 1px solid #b3b3b3;
  border-top-right-radius: 5px;
  border-top-left-radius: 5px;
  padding: 0.5rem;

  ${(props) =>
    props.isActive
      ? 'background: #66CCCC; color: #FFF; font-weight: 900;'
      : ''}
`;

const AcademicUnit = () => {
  const { id, name: subjectName } = useParams();
  const { session } = useContext(SessionContext);
  const [subject, setSubject] = useState();
  const [usersList, setUsersList] = useState();
  const [bibliohraphies, setBibliographies] = useState();
  const [topics, setTopics] = useState();
  const [selectedContent, setSelectedContent] = useState(0);
  const { data: subjectDetail } = useQuery(
    ['subject', id],
    GET_SUBJECT
  );

  const { data: teachersData } = useQuery(
    ['subject', 'teachers'],
    GET_AVAILABLE_TEACHERS
  );

  const { data: bibliographyDetail } = useQuery(
    ['subject-biblio', id],
    GET_BIBLIO
  );
  const [selectedEvaluation] = useState(
    'Diagnóstica,Solución de casos,Problemas resyeltos'
  );
  const [selectedOrientacion] = useState('Analógico');
  const [selectedEstrategias] = useState(
    'Estudio de casos,Cooperativo-colaborativo'
  );

  const [orientacion] = useState([
    'Inductivo',
    'Deductivo',
    'Analógico',
  ]);
  const [estrategias] = useState([
    'Estudio de casos',
    'Aprendizaje basado en problemas',
    'Aprendizaje orientado a proyectos',
    'Cooperativo-colaborativo',
  ]);
  const [evaluation] = useState([
    'Diagnóstica',
    'Solución de casos',
    'Problemas resueltos',
    'Reporte de proyectos',
    'Reportes de indagación',
    'Reportes de prácticas',
    'Evaluaciones escritas',
    'Saberes Previamente Adquiridos',
    'Organizadores gráficos',
    'Problemarios',
    'Exposiciones',
  ]);

  useEffect(() => {
    if (subjectDetail) {
      setSubject(subjectDetail.data);
    }
  }, [subjectDetail]);

  useEffect(() => {
    if (bibliographyDetail) {
      setBibliographies(bibliographyDetail.data);
    }
  }, [bibliographyDetail]);

  useEffect(() => {
    if (teachersData) {
      setUsersList(teachersData.data);
    }
  }, [teachersData]);

  console.log(id);

  return (
    <div className="flex flex-col border-white flex-1 bg-platinum space-y-6 overflow-scroll">
      <div className="bg-white flex justify-between rounded px-6 py-4 shadow flex-initial mb-8">
        <h1 className="text-lg font-bold">
          Unidad de aprendizaje: {subjectName}
        </h1>
        <div className="flex gap-4">
          <div className="flex gap-2">
            <div className="">Coordinador</div>
            {subject?.Coordinator.length === 0 ? (
              <TeacherSelector
                subjectId={id}
                keyUpdate="coordinator"
                updateTitle="Actualizar coordinador"
                selectedUsers={subject?.Coordinator.map(
                  ({ id: userId }) => userId
                )}
                title="Coordinador"
              />
            ) : (
              subject?.Coordinator.map(
                ({ name, firstSurname, id: userId }) => (
                  <ProfilePic
                    size={24}
                    name={`${name} ${firstSurname}`}
                    id={userId}
                  />
                )
              )
            )}
          </div>
          <div className="flex">
            <div className="mr-2">Colaborador</div>
            <div className="flex gap-2">
              <TeacherSelector
                subjectId={id}
                keyUpdate="collaborators"
                updateTitle="Actualizar colaboradores"
                selectedUsers={subject?.Collaborator.map(
                  ({ id: userId }) => userId
                )}
                title="Colaboradores"
              />
              {subject?.Collaborator.length > 0 &&
                subject?.Collaborator.map(
                  ({ name, firstSurname, id: userId }) => (
                    <ProfilePic
                      size={24}
                      name={`${name} ${firstSurname}`}
                      id={userId}
                    />
                  )
                )}
            </div>
          </div>
        </div>
      </div>
      <SectionCard>
        <div className="flex gap-6">
          <div className="w-1/2">
            <div className="flex text-base flex-row justify-around space-x-4">
              <div className="flex-grow-0 font-bold w-40 truncate">
                Unidad Academica
              </div>
              <div className="flex-grow">
                Escuela Nacional de Ciencias Biológicas
              </div>
            </div>
            <div className="flex text-base flex-row justify-around space-x-4">
              <div className="flex-grow-0 font-bold w-40 truncate">
                Programa Académico
              </div>
              <div className="flex-grow">
                {subject?.academicPlan?.name}
              </div>
            </div>
            <div className="flex text-base flex-row justify-around space-x-4">
              <div className="flex-grow-0 font-bold w-40 truncate">
                Semestre
              </div>
              <div className="flex-grow">{subject?.semester}</div>
            </div>
            <div className="flex text-base flex-row justify-around space-x-4">
              <div className="flex-grow-0 font-bold w-40 truncate">
                Tipo
              </div>
              <div className="flex-grow">{subject?.type}</div>
            </div>
          </div>
          <div className="w-1/2">
            <div className="flex text-base flex-row justify-around space-x-4">
              <div className="flex-grow-0 font-bold w-40 truncate">
                TEPIC/SATCA
              </div>
              <div className="flex-grow">
                {`${subject?.tepic} / ${subject?.satca}`}
              </div>
            </div>
            <div className="flex text-base flex-row justify-around space-x-4">
              <div className="flex-grow-0 font-bold w-40 truncate">
                Modalidad
              </div>
              <div className="flex-grow">
                {subject?.modality === 'FACE2FACE'
                  ? 'Presencial'
                  : 'En línea'}
              </div>
            </div>
            <div className="flex text-base flex-row justify-around space-x-4">
              <div className="flex-grow-0 font-bold w-40 truncate">
                Horas de práctica
              </div>
              <div className="flex-grow">
                {subject?.practiceSemester}
              </div>
            </div>
            <div className="flex text-base flex-row justify-around space-x-4">
              <div className="flex-grow-0 font-bold w-40 truncate">
                Horas de teoría
              </div>
              <div className="flex-grow">
                {subject?.theorySemester || 0}
              </div>
            </div>
          </div>
        </div>
      </SectionCard>
      <SectionCard>
        <SectionTitle>
          Propósito de la unidad de aprendizaje
        </SectionTitle>
        <SectionBody>{subject?.objective?.description}</SectionBody>
      </SectionCard>
      <SectionCard>
        <SectionTitle>Contenidos</SectionTitle>
        <SectionBody>
          <ul
            className="m-5"
            style={{ listStyleType: 'upper-roman' }}
          >
            {subject?.contents?.map(({ name }) => (
              <li>{name}</li>
            ))}
          </ul>
        </SectionBody>
      </SectionCard>
      <div className="w-full flex gap-6">
        <SectionCard>
          <SectionTitle>Orientación didáctica</SectionTitle>
          <SectionBody>
            <div className="flex w-full flex-wrap gap-4">
              {orientacion?.map((elem) => (
                <div style={{ maxWidth: '25%' }}>
                  <Button
                    small
                    toggle
                    type="secondary"
                    isActive={selectedOrientacion.includes(elem)}
                    disabled={!selectedOrientacion.includes(elem)}
                  >
                    {elem}
                  </Button>
                </div>
              ))}
            </div>
          </SectionBody>
        </SectionCard>
        <SectionCard>
          <SectionTitle>Contenidos 2</SectionTitle>
          <SectionBody>
            <div className="flex w-full flex-wrap gap-4">
              {estrategias?.map((elem) => (
                <div style={{ maxWidth: '50%' }}>
                  <Button
                    small
                    toggle
                    type="secondary"
                    isActive={selectedEstrategias.includes(elem)}
                    disabled={!selectedEstrategias.includes(elem)}
                  >
                    {elem}
                  </Button>
                </div>
              ))}
            </div>
          </SectionBody>
        </SectionCard>
      </div>
      <SectionCard>
        <SectionTitle>Evaluación y acreditación</SectionTitle>
        <SectionBody className="flex flex-wrap gap-4">
          {evaluation?.map((elem) => (
            <div style={{ maxWidth: '25%' }}>
              <Button
                small
                toggle
                type="secondary"
                isActive={selectedEvaluation.includes(elem)}
                disabled={!selectedEvaluation.includes(elem)}
              >
                {elem}
              </Button>
            </div>
          ))}
        </SectionBody>
      </SectionCard>
      <SectionCard>
        <SectionTitle>Bibliografía básica</SectionTitle>
        <SectionBody className="flex flex-row flex-nowrap space-x-5 overflow-scroll">
          {bibliohraphies &&
            bibliohraphies.map(
              ({ authors, name, year, editorial }) => (
                <BibliographicCard>
                  <div className="flex flex-row space-x-4">
                    <div className="flex-grow-1 flex flex-col">
                      <div className="flex flex-col">
                        <p>Autores</p>
                        <p className="font-bold">
                          {/* eslint-disable-next-line no-shadow */}
                          {authors.map(({ name }) => name).join(', ')}
                        </p>
                        <p>Título del documento</p>
                        <p className="font-bold">{name}</p>
                        <p>Editorial/ISBN</p>
                        <p className="font-bold">{editorial.name}</p>
                      </div>
                    </div>
                    <div className="flex-grow-0 flex flex-col">
                      <div>Year</div>
                      <div className="font-bold">{year}</div>
                    </div>
                  </div>
                </BibliographicCard>
              )
            )}
          {(!bibliohraphies || bibliohraphies?.length === 0) &&
            'Aún no hay bibliografía para mostrar'}
        </SectionBody>
      </SectionCard>
      <SectionCard>
        <SectionTitle>Intención educativa</SectionTitle>
        <SectionBody>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
          do eiusmod tempor incididunt ut labore et dolore magna
          aliqua. Ut enim ad minim veniam, quis nostrud exercitation
          ullamco laboris nisi ut aliquip ex ea commodo consequat.
          Duis aute irure dolor in reprehenderit in voluptate velit
          esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
          occaecat cupidatat non proident, sunt in culpa qui officia
          deserunt mollit anim id est laborum
        </SectionBody>
      </SectionCard>
      <div className="flex gap-4">
        {subject &&
          subject?.contents &&
          subject?.contents?.length > 0 &&
          subject.contents.map(({ name }, index) => (
            <Popover
              content={() => {
                <div>{name}</div>;
              }}
            >
              <TabButton
                toggle
                isActive={index === selectedContent}
                background="#f2f2f2"
                onClick={() => setSelectedContent(index)}
              >
                {name}
              </TabButton>
            </Popover>
          ))}
      </div>
      <div
        style={{
          marginTop: '0',
          padding: '1rem',
          border: '1px solid #b3b3b3',
        }}
      >
        <div className="flex gap-6">
          <div
            className="w-full sofia-bold"
            style={{ maxWidth: '75%' }}
          >
            <label>Contenido</label>
          </div>
          <div
            className="w-full text-center sofia-bold"
            style={{ maxWidth: '15%' }}
          >
            <label>Horas con docente</label>
          </div>
          <div
            className="w-full text-center sofia-bold"
            style={{ maxWidth: '10%' }}
          >
            <label>Horas AA</label>
          </div>
        </div>

        {subject && subject?.contents && subject.contents.length > 0 && (
          <div className="flex gap-6" style={{ marginTop: '0.5rem' }}>
            <SectionCard
              className="w-full"
              style={{ maxWidth: '75%' }}
            >
              <label className="block mb-1 sofia-bold">
                {subject?.contents[selectedContent].name}
              </label>
              <SectionBody>
                <ul
                  style={{
                    listStyleType: 'none',
                    listStylePosition: 'inside',
                  }}
                >
                  {Object.keys(
                    subject?.contents[selectedContent].topics
                  ).map((key, index) => (
                    <li>
                      {`${index + 1} `}
                      {
                        subject?.contents[selectedContent].topics[key]
                          .title
                      }
                      <ul
                        className="pl-4"
                        style={{
                          listStyleType: 'none',
                          listStylePosition: 'inside',
                        }}
                      >
                        {subject?.contents[selectedContent].topics[
                          key
                        ].subTopics.length > 0 &&
                          subject?.contents[selectedContent].topics[
                            key
                          ].subTopics.map((elem, secIndex) => (
                            <li>
                              {`${index + 1}.${secIndex + 1} `}
                              {elem}
                            </li>
                          ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </SectionBody>
            </SectionCard>
            <SectionCard
              className="w-full"
              style={{ maxWidth: '15%' }}
            >
              <div className="flex justify-between sofia-bold">
                <div className="w-full text-center">T</div>
                <div className="w-full text-center">P</div>
              </div>
              <div>
                <ul
                  style={{
                    listStyleType: 'none',
                    listStylePosition: 'inside',
                  }}
                >
                  {Object.keys(
                    subject?.contents[selectedContent].topics
                  ).map((key, index) => (
                    <li>
                      <div className="flex justify-between">
                        <div className="text-center w-full">
                          {
                            subject?.contents[selectedContent].topics[
                              key
                            ].T
                          }
                        </div>
                        <div className="text-center w-full">
                          {
                            subject?.contents[selectedContent].topics[
                              key
                            ].P
                          }
                        </div>
                      </div>
                      <ul
                        className="pl-4"
                        style={{
                          listStyleType: 'none',
                          listStylePosition: 'inside',
                        }}
                      >
                        {subject?.contents[selectedContent].topics[
                          key
                        ].subTopics.length > 0 &&
                          subject?.contents[selectedContent].topics[
                            key
                          ].subTopics.map((elem, secIndex) => (
                            <li>&nbsp;</li>
                          ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            </SectionCard>
            <SectionCard
              className="w-full"
              style={{ maxWidth: '10%' }}
            >
              <label className="block text-center mb-1 sofia-bold">
                AA
              </label>
              <div>
                <ul
                  style={{
                    listStyleType: 'none',
                    listStylePosition: 'inside',
                  }}
                >
                  {Object.keys(
                    subject?.contents[selectedContent].topics
                  ).map((key, index) => (
                    <li>
                      <div className="text-center w-full">
                        {
                          subject?.contents[selectedContent].topics[
                            key
                          ].AA
                        }
                      </div>
                      <ul
                        className="pl-4"
                        style={{
                          listStyleType: 'none',
                          listStylePosition: 'inside',
                        }}
                      >
                        {subject?.contents[selectedContent].topics[
                          key
                        ].subTopics.length > 0 &&
                          subject?.contents[selectedContent].topics[
                            key
                          ].subTopics.map((elem, secIndex) => (
                            <li>&nbsp;</li>
                          ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            </SectionCard>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademicUnit;
