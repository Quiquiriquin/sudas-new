import React, { useEffect, useRef, useState } from 'react';
import { Popover } from 'antd';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Avatar from 'boring-avatars';
import { nanoid } from 'nanoid';
import AddButton from '../Buttons/AddButton';
import { GET_AVAILABLE_TEACHERS } from '../../../helpers/EnpointsUser';
import ProfilePic from '../ProfilePic/ProfilePic';
import Button from '../Buttons/Button';
import TeacherItem from './TeacherItem';
import './TeacherSelector.scss';
import { useOutsideAlerter } from '../../../CustomHooks/useOutsideAlert';
import { UPDATE_EDU_INTENTION } from '../../../helpers/SubjectEndpoints';

const TeacherSelector = ({
  subjectId,
  selectedUsers = [],
  title,
  updateTitle,
  keyUpdate,
}) => {
  const queryClient = useQueryClient();
  const selectorRef = useRef();
  const [visible, setVisible] = useState(false);
  const [originalMembers] = useState(new Set(selectedUsers));
  const [newMembers, assignMember] = useState([]);
  const { data: teachersData } = useQuery(
    ['subject', 'teachers'],
    GET_AVAILABLE_TEACHERS
  );
  const { mutateAsync: updateSubjectKey } = useMutation((info) =>
    UPDATE_EDU_INTENTION(info)
  );
  const [usersList, setUsersList] = useState();

  useEffect(() => {
    if (teachersData) {
      setUsersList(teachersData.data);
    }
  }, [teachersData]);

  useEffect(() => {
    if (selectedUsers && selectedUsers.length > 0) {
      assignMember((prev) => [...prev, ...selectedUsers]);
    }
  }, [selectedUsers]);

  const selectUser = (id) => {
    const auxAssigned = [...newMembers];
    console.log(auxAssigned);
    const index = auxAssigned.findIndex((teacherId) => {
      console.log(teacherId === id, teacherId, id);
      return teacherId === id;
    });
    console.log(index);
    if (index === -1) {
      auxAssigned.push(id);
    } else {
      auxAssigned.splice(index, 1);
    }
    assignMember(auxAssigned);
  };

  const updateSubject = async () => {
    try {
      const users = [...newMembers];
      const body = {
        id: subjectId,
        data: {
          id: subjectId,
          [keyUpdate]: users,
        },
      };
      await updateSubjectKey(body);
      setVisible(false);
      queryClient.invalidateQueries(['subject', subjectId]);
      console.log('Hay que actualizarlo');
    } catch (e) {
      console.log(e);
    }
  };

  useOutsideAlerter(selectorRef, visible ? updateSubject : () => {});

  return (
    <Popover
      visible={visible}
      content={() => (
        <div ref={selectorRef}>
          <div className="text-base sofia-bold text-center">
            {title}
          </div>
          <div className="mb-4">
            {usersList &&
              usersList.map(({ ...teacher }) => (
                <TeacherItem
                  {...teacher}
                  assignedMembers={newMembers}
                  selectUser={() => selectUser(teacher?.id)}
                  selected={newMembers.includes(teacher.id)}
                />
              ))}
          </div>
          <Button onClick={updateSubject} primary>
            {updateTitle}
          </Button>
        </div>
      )}
    >
      <AddButton
        onClick={() => setVisible((prev) => !prev)}
        styles={{
          minHeight: '24px',
          maxHeight: '24px',
          minWidth: '24px',
          maxWidth: '24',
        }}
      />
    </Popover>
  );
};

export default TeacherSelector;
