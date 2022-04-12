import React from 'react';
import { useHistory } from 'react-router-dom';
import { Tooltip } from 'antd';
import chevron from '../../../assets/svgs/ChevronRight.svg';
import './SubjectCard.scss';

const SubjectCard = ({
  id,
  name,
  semester,
  loading,
  all,
  academicPlan = null,
}) => {
  const history = useHistory();
  if (loading) {
    return (
      <div className="user-card">
        <div className="flex gap-4 items-center">
          <div className="">
            <div
              style={{ height: '12px', width: '50px' }}
              className="block mb-1 truncate animated-background"
            />
            <div
              style={{ height: '16px', width: '160px' }}
              className="block mb-1 truncate animated-background"
            />
          </div>
        </div>
        <div className="mt-6 flex justify-end">
          <div
            style={{ height: '24px', width: '24px' }}
            className="block mb-1 truncate animated-background"
          />
        </div>
      </div>
    );
  }

  const goToUserProfile = () => {
    history.push(`/materia/${id}/${name}`);
  };

  return (
    <div className="user-card">
      <div className="flex gap-4 items-center justify-between">
        <div className="cursor-pointer" onClick={goToUserProfile}>
          <label
            style={{ color: '#757575' }}
            className="block text-xs"
          >
            Materia
          </label>
          <Tooltip title={name}>
            <label
              style={{ maxWidth: '150px' }}
              className="block text-base sofia-bold mb-1 truncate"
            >
              {name}
            </label>
          </Tooltip>
        </div>
        {all && (
          <div className="cursor-pointer" onClick={goToUserProfile}>
            <label
              style={{ color: '#757575' }}
              className="block text-xs"
            >
              Programa
            </label>
            <Tooltip title={name}>
              <label
                style={{ maxWidth: '150px' }}
                className="block text-base sofia-bold mb-1 truncate"
              >
                {academicPlan.shortName}
              </label>
            </Tooltip>
          </div>
        )}
      </div>
      <div className="mt-4 flex items-center justify-between">
        <div className="cursor-pointer" onClick={goToUserProfile}>
          <label
            style={{ color: '#757575' }}
            className="block text-xs"
          >
            Semestre
          </label>
          <label
            style={{ maxWidth: '150px' }}
            className="block text-base sofia-bold mb-1 truncate"
          >
            {semester}
          </label>
        </div>
        <div className="cursor-pointer" onClick={goToUserProfile}>
          <img
            src={chevron}
            alt="Derecha"
            className="cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
};

export default SubjectCard;
