import React, { useContext } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import Home from '../components/Views/Home/Home';
import Navbar from '../components/Navbar/Navbar';
import unidades from '../assets/icons/graduation-cap.png';
import openBook from '../assets/icons/open-book.png';
import calendar from '../assets/svgs/Calendar.svg';
import users from '../assets/svgs/users.svg';
import Users from '../components/Views/Users/Users';
import AcademicUnit from '../components/Views/AcademicUnit/AcademicUnit';
import UnitsManagement from '../components/Views/UnitsManagement/UnitsManagement';
import UserDetailAdmin from '../components/Views/UserDetailAdmin/UserDetailAdmin';
import AcademicPlanDetail from '../components/Views/AcademicPlanDetail/AcademicPlanDetail';
import Subjects from '../components/Views/Subjects/Subjects';
import SubjectDetail from '../components/Views/SubjetcDetail/SubjectDetail';
import { SubjectProvider } from '../context/SubjectContext';
import { GeneralContext } from '../context/GeneralContext';
import Verbs from '../components/Views/Verbs/Verbs';
import Activities from '../components/Views/Activities/Activities';
import Strategies from '../components/Views/Strategies/Strategies';
import Bibliographies from '../components/Views/Bibliographies/Bibliographies';
import Connectors from '../components/Views/Connectors/Connectors';
import Methods from '../components/Views/Methods/Methods';

const DashboardRouter = () => {
  const { user } = useContext(GeneralContext);
  return (
    <div className="flex flex-row w-screen h-screen">
      <div className=" bg-prusian-blue p-2 flex-initial">
        <Navbar />
      </div>
      <div
        style={{
          maxWidth: 'calc(100vw - 78px)',
          marginLeft: 'auto',
        }}
        className="flex flex-col border-white p-10 flex-1 bg-platinum space-y-10"
      >
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/usuarios" exact component={Users} />
          <Route
            path="/planes-academicos"
            exact
            component={UnitsManagement}
          />
          <Route
            path="/materia/:id/:name"
            exact
            component={AcademicUnit}
          />
          <Route
            path="/usuarios/gestion/:id/:name"
            exact
            component={UserDetailAdmin}
          />
          <Route
            path="/plan-academico/:id/:name"
            exact
            component={AcademicPlanDetail}
          />
          <Route
            path="/unidades-aprendizaje"
            exact
            component={Subjects}
          />
          <Route path="/verbos" exact component={Verbs} />
          <Route path="/actividades" exact component={Activities} />
          <Route path="/estrategias" exact component={Strategies} />
          <Route path="/conectores" exact component={Connectors} />
          <Route path="/metodos" exact component={Methods} />
          <Route
            path="/bibliografias"
            exact
            component={Bibliographies}
          />
          <Route path="/detalle-unidad-aprendizaje/:id" exact>
            <SubjectProvider>
              <SubjectDetail />
            </SubjectProvider>
          </Route>
          <Redirect to="/" />
        </Switch>
      </div>
    </div>
  );
};

export default DashboardRouter;
