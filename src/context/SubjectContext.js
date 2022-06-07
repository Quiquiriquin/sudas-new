import React, { useEffect, useState } from 'react';
import { useQuery } from 'react-query';
import { GET_COMPETENCES } from '../helpers/SubjectEndpoints';

const SubjectContext = React.createContext();
const { Provider, Consumer } = SubjectContext;

const SubjectProvider = ({ children }) => {
  const [verbs, setVerbs] = useState([]);
  const [subject, setSubject] = useState({});
  const [connectors, setConnectors] = useState([]);
  const [relatedUnits, setRelatedUnits] = useState([]);
  const [units, setUnits] = useState([]);
  const [competencies, setCompetencies] = useState([]);
  const [strategy, setStrategy] = useState({});
  const [unitActivities, setUnitActivities] = useState([]);
  const [unitStrategies, setUnitStrategies] = useState([]);
  const [practices, setPractices] = useState([
    {
      practices: [],
    },
    {
      practices: [],
    },
    {
      practices: [],
    },
    {
      practices: [],
    },
    {
      practices: [],
    },
  ]);
  const [practiceHour, setPracticeHour] = useState([0, 0, 0, 0, 0]);
  const [hours, setHours] = useState({
    totalHours: 108,
    theorySemester: 54,
    practiceSemester: 36,
    autonomousLearning: 18,
  });

  const { data: competencesData } = useQuery(
    ['competences', subject?.id],
    GET_COMPETENCES,
    {
      enabled: !!subject?.id,
    }
  );

  useEffect(() => {
    if (subject) {
      console.log('EL SUBJECT: ', subject);
      // eslint-disable-next-line no-shadow
      const { strategy } = subject;
      if (strategy) {
        setStrategy({
          value: strategy.id,
          label: strategy.label,
          description: strategy.description,
        });
      }
    }
  }, [subject]);

  useEffect(() => {
    if (
      competencesData &&
      competencesData.status !== 204 &&
      competencesData?.data
    ) {
      // eslint-disable-next-line no-shadow
      const { data: competencesInfo } = competencesData;
      if (competencesInfo) {
        console.log('Competencias: ', competencesInfo);
        const auxCompetences = competencesInfo.map(
          ({ id, method, activities }) => ({
            id,
            method: {
              value: method?.id,
              label: method?.label,
              description: method?.description,
            },
            activities,
          })
        );
        setUnitStrategies(auxCompetences);
        console.log(competencesInfo);
      }
    }
  }, [competencesData]);

  useEffect(() => {
    if (units && competencies) {
      units.forEach(({ topics }, index) => {
        if (topics) {
          topics.forEach(({ P }) => {
            const auxP = parseInt(P, 10);
            let auxC = 0;
            // eslint-disable-next-line no-shadow
            units[index]?.practices?.forEach(({ hours }) => {
              auxC += parseInt(hours, 10);
            });
            console.log('auxC', auxC);
            setPracticeHour((prev) => {
              const aux = [...prev];
              aux[index] = auxP - auxC;
              return aux;
            });
          });
        }
      });
    }
  }, [units]);

  console.log(units);

  return (
    <Provider
      value={{
        verbs,
        setVerbs,
        connectors,
        setConnectors,
        setSubject,
        subject,
        relatedUnits,
        setRelatedUnits,
        units,
        setUnits,
        competencies,
        setCompetencies,
        hours,
        setHours,
        unitActivities,
        setUnitActivities,
        strategy,
        setStrategy,
        practices,
        setPractices,
        unitStrategies,
        setUnitStrategies,
        practiceHour,
        setPracticeHour,
      }}
    >
      {children}
    </Provider>
  );
};

export {
  SubjectProvider,
  Consumer as SubjectConsumer,
  SubjectContext,
};
