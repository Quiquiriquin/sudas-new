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
