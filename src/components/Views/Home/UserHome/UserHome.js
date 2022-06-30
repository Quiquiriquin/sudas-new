import React, { useContext, useEffect, useState } from 'react';
import './UserHome.scss';
import { useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { GeneralContext } from '../../../../context/GeneralContext';
import { GET_USER_SUBJECTS } from '../../../../helpers/SubjectEndpoints';
import chevronRight from '../../../../assets/svgs/ChevronRight.svg';

const UserHome = () => {
  const history = useHistory();
  const { user } = useContext(GeneralContext);
  const [coordinatorSubjects, setCoordinatorSubjects] = useState([]);
  const [collaboratorSubjects, setCollaboratorSubjects] = useState(
    []
  );
  const { data: userSubjects } = useQuery(
    ['user', 'subjects', user.id],
    GET_USER_SUBJECTS
  );

  useEffect(() => {
    if (userSubjects) {
      const { data } = userSubjects;
      if (data && data.length > 0) {
        const auxCoor = [];
        const auxColla = [];
        data.forEach((subject, index) => {
          console.log(subject);
          if (
            subject?.Coordinator &&
            subject?.Coordinator?.length > 0 &&
            subject?.Coordinator[0].id === user?.id
          ) {
            console.log('Es coordinador');
            auxCoor.push(data[index]);
          } else {
            auxColla.push(data[index]);
          }
        });
        setCollaboratorSubjects(auxColla);
        setCoordinatorSubjects(auxCoor);
      }
    }
  }, [userSubjects]);

  const goToDetail = (id) => {
    history.push(`/detalle-unidad-aprendizaje/${id}`);
  };

  return (
    <div className="user-dashboard">
      <div className="coordinator-container">
        <div className="title sofia-bold text-xl">
          Eres coordinador
        </div>
        <div className="flex gap-4 flex-nowrap subjects-container">
          {coordinatorSubjects &&
            coordinatorSubjects.map(
              ({ id, name, semester, modality, academicPlan }) => (
                <div className="subject-card">
                  <div
                    onClick={() => goToDetail(id)}
                    className="header"
                  >
                    <div className="title text-lg">
                      <span className="block sofia-bold">{name}</span>
                      <span className="text-sm">
                        {academicPlan?.name}
                      </span>
                    </div>
                    <div className="">
                      <img src={chevronRight} alt="detalle" />
                    </div>
                  </div>
                  <div className="information">
                    <div>
                      <div className="label">Modalidad</div>
                      <div className="answer">
                        {modality === 'FACE2FACE'
                          ? 'Presencial'
                          : 'En línea'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="label">Semestre</div>
                      <div className="answer">{semester}</div>
                    </div>
                  </div>
                </div>
              )
            )}
        </div>
      </div>
      <div className="coordinator-container mt-4">
        <div className="title sofia-bold text-xl">
          Eres colaborador
        </div>
        <div className="flex gap-4 flex-nowrap subjects-container">
          {collaboratorSubjects &&
            collaboratorSubjects.map(
              ({ id, name, semester, modality, academicPlan }) => (
                <div className="subject-card">
                  <div
                    className="header"
                    onClick={() => goToDetail(id)}
                  >
                    <div className="title text-lg">
                      <span className="block sofia-bold">{name}</span>
                      <span className="text-sm">
                        {academicPlan?.name}
                      </span>
                    </div>
                    <div className="">
                      <img src={chevronRight} alt="detalle" />
                    </div>
                  </div>
                  <div className="information">
                    <div>
                      <div className="label">Modalidad</div>
                      <div className="answer">
                        {modality === 'FACE2FACE'
                          ? 'Presencial'
                          : 'En línea'}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="label">Semestre</div>
                      <div className="answer">{semester}</div>
                    </div>
                  </div>
                </div>
              )
            )}
        </div>
      </div>
    </div>
  );
};

export default UserHome;
