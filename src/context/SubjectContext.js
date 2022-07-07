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
    totalHours: 0,
    theorySemester: 0,
    practiceSemester: 0,
    autonomousLearning: 0,
  });
  const [tempHours, setTempHours] = useState({
    totalHours: 0,
    theorySemester: 0,
    practiceSemester: 0,
    autonomousLearning: 0,
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
      setHours({
        totalHours: subject.totalHours,
        theorySemester: subject.theorySemester,
        practiceSemester: subject.practiceSemester,
        autonomousLearning: subject.autonomousLearning,
      });
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
      units.forEach(({ topics, ...other }, index) => {
        console.log('TOPIC: ', topics, other);
        if (topics) {
          let practice = 0;
          let practiceAcc = 0;
          let locaPracticeAcc = 0;
          topics.forEach(({ P }) => {
            practice = parseFloat(parseFloat(P || 0).toFixed(1));
            console.log('practice: ', practice);
            practiceAcc += practice;
            locaPracticeAcc = 0;
            // eslint-disable-next-line no-shadow
            units[index]?.practices?.forEach(({ hours, name }) => {
              console.log('Práctica: ', name);
              console.log('Horas: ', hours);
              locaPracticeAcc += parseFloat(
                parseFloat(hours).toFixed(1)
              );
            });
            console.log('auxC', locaPracticeAcc);
          });
          console.log(
            'Practice: ',
            practice,
            practiceAcc,
            locaPracticeAcc
          );
          setPracticeHour((prev) => {
            const aux = [...prev];
            aux[index] = practiceAcc - locaPracticeAcc;
            return aux;
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
        tempHours,
        setTempHours,
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
