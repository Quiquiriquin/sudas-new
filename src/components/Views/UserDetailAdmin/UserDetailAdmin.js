import React, { useEffect, useState } from 'react';
import { nanoid } from 'nanoid';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { useMutation, useQuery } from 'react-query';
import Avatar from 'boring-avatars';
import AddButton from '../../Shared/Buttons/AddButton';
import UserCard from '../../Shared/UserCard/UserCard';
import { GET_USER, UPDATE_USER } from '../../../helpers/EnpointsUser';
import FormWrapper from '../../Forms/FormWrapper';
import UpdateUserAdminForm from '../../Forms/UpdateUserAdminForm';

const UserDetailAdmin = () => {
  const history = useHistory();
  const { name, id } = useParams();
  const [user, setUser] = useState();
  const { data } = useQuery(['user', id], GET_USER, {
    enabled: !!id,
  });
  const { mutateAsync: updateRequest } = useMutation(UPDATE_USER);

  useEffect(() => {
    if (data) {
      if (data.data) {
        setUser(data.data);
      }
    }
  }, [data]);

  // eslint-disable-next-line no-shadow
  const updateUser = async (data) => {
    try {
      const ans = await updateRequest({
        data,
        id,
      });
      history.push('/usuarios');
    } catch (e) {
      console.log(e);
    }
  };

  if (user) {
    return (
      <div className="h-full users-view">
        <div className="bg-white rounded px-6 py-4 shadow flex-initial">
          <span className="text-lg">
            Gestionando a{' '}
            {!name.includes('@') ? name.split('_').join(' ') : name}
          </span>
        </div>
        <div
          className="bg-white p-8 rounded mt-4 shadow h-full"
          style={{ maxHeight: 'calc(100vh - 168px)' }}
        >
          <FormWrapper onSubmit={updateUser}>
            <UpdateUserAdminForm user={user} />
          </FormWrapper>
        </div>
      </div>
    );
  }

  return <div>No hay usuario</div>;
};

export default UserDetailAdmin;
