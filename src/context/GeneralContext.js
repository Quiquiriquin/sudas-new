import React, { useState } from 'react';
import { getSessionCookie } from '../helpers/Sessions';

const GeneralContext = React.createContext();
const { Provider, Consumer } = GeneralContext;

const GeneralProvider = ({ children }) => {
  const [user, setUser] = useState(getSessionCookie());
  const [verbs, setVerbs] = useState([]);
  const [connectors, setConnectors] = useState([]);
  const [tematicUnits, setTematicUnits] = useState([
    {
      id: '1',
      unitName: 'Unidad Temática 1',
      competence: 'asd asdas a  kjasd kasdkj',
      activities: ['1. Actividad', '2. Actividad', '3. Actividad'],
    },
    {
      id: '2',
      unitName: 'Unidad Temática 2',
      competence: 'asd asdas a  kjasd kasdkj',
      activities: ['1. Actividad', '2. Actividad'],
    },
  ]);
  const updateUser = (value) => setUser(() => value);
  const [planInformation, setPlanInformation] = useState(null);
  const updatePlanInformation = (value) => setPlanInformation(value);
  const [filtersTask, setFiltersTasks] = useState({});
  const updateFiltersTasks = (value) => setFiltersTasks(value);

  const [stateFilters, setStateFilters] = useState({});
  const updateStateFilters = (value) => setStateFilters(value);

  const [appSection, setAppSection] = useState(null);
  const updateAppSection = (value) => setAppSection(value);

  const [selectedTheme, setSelectedTheme] = useState('teament');
  const updateSelectedTheme = (value) => setSelectedTheme(value);

  const theme = require('sass-extract-loader?{"plugins":' +
    ' ["sass-extract-js"]}!../assets/styles/colors.scss');
  const completeTheme = {
    teament: {
      ...theme,
      primary: '#677c88',
      secondary: '#81C5ED',
      terciary: '#5CC8BF',
    },
    neutral: {
      ...theme,
      primary: '#d3d3d3',
      secondary: '#b3b3b3',
      terciary: '#606060',
    },
  };
  const [themes, setThemes] = useState(completeTheme);
  const updateThemes = (value) =>
    setThemes({
      ...completeTheme,
      suggested: value,
    });
  return (
    <Provider
      value={{
        user,
        updateUser,
        planInformation,
        updatePlanInformation,
        filtersTask,
        updateFiltersTasks,
        stateFilters,
        updateStateFilters,
        appSection,
        updateAppSection,
        selectedTheme,
        updateSelectedTheme,
        themes,
        updateThemes,
        tematicUnits,
        setTematicUnits,
        verbs,
        setVerbs,
        connectors,
        setConnectors,
      }}
    >
      {children}
    </Provider>
  );
};

export {
  GeneralProvider,
  Consumer as GeneralConsumer,
  GeneralContext,
};
