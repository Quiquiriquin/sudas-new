import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import ProfilePic from '../ProfilePic/ProfilePic';

const TeacherItem = ({
  name,
  selectUser,
  firstSurname,
  role,
  id,
  assignedMembers,
  selected,
}) => {
  // const [selected, setSelected] = useState(false);

  // useEffect(() => {
  //   if (assignedMembers) {
  //     console.log(assignedMembers.has(id));
  //     if (assignedMembers.has(id)) {
  //       setSelected(true);
  //     } else {
  //       setSelected(false);
  //     }
  //   }
  // }, [assignedMembers]);

  return (
    <div
      onClick={selectUser}
      key={nanoid(6)}
      className={`teacher-option flex gap-4 p-4 items-center cursor-pointer ${
        selected ? 'active-teacher' : ''
      }`}
    >
      <ProfilePic
        size={40}
        name={`${name} ${firstSurname}`}
        id={id}
      />
      <div className="flex flex-col">
        <label className="inline-block sofia-bold">
          {`${name} ${firstSurname}`}
        </label>
        <label className="color gray _75">
          {role === 'USER' ? 'Profesor' : 'Administrador'}
        </label>
      </div>
    </div>
  );
};

export default TeacherItem;
