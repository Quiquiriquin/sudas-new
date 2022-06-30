import React, { useEffect, useState } from 'react';
import './Teacher.scss';
import { toast } from 'react-toastify';
import { useQuery, useQueryClient } from 'react-query';
import { useForm } from 'react-hook-form';
import UserHeader from '../../Shared/UserHeader/UserHeader';
import TableSectionHeader from '../../Shared/TableSectionHeader/TableSectionHeader';
import Input from '../../Shared/Inputs/Input';
import Button from '../../Shared/Buttons/Button';
import {
  CREATE_STRATEGY,
  DELETE_STRATEGY,
} from '../../../helpers/StrategiesEndpoints';
import {
  CREATE_SKILL,
  DELETE_SKILL,
  GET_SKILLS,
  UPDATE_SKILL,
} from '../../../helpers/SkillsEndpoints';
import EditableTable from '../../Shared/EditableTable/EditableTable';
import {
  CREATE_ATTITUDE,
  DELETE_ATTITUDE,
  GET_ATTITUDES,
  UPDATE_ATTITUDE,
} from '../../../helpers/AttitudesEndpoints';

const Teacher = () => {
  const queryClient = useQueryClient();
  const {
    register,
    watch,
    getValues,
    formState,
    unregister,
    ...form
  } = useForm();
  const [newAbility, setNewAbility] = useState(false);
  const [activeTab, setTab] = useState(1);
  const [formStatus, setFormStatus] = useState({
    name: '',
  });
  const { data: dataSkills } = useQuery(['skills'], GET_SKILLS);
  const { data: dataAttitudes } = useQuery(
    ['attitudes'],
    GET_ATTITUDES
  );

  const onChange = async (e) => {
    const { value } = e.target;
    setFormStatus((prev) => ({
      ...prev,
      [e.target.id]: value,
    }));
  };

  const save = async () => {
    try {
      if (activeTab === 1) {
        await CREATE_SKILL(formStatus);
        toast.success('Estrategia creada correctamente');
        queryClient.invalidateQueries(['skills']);
      }

      if (activeTab === 2) {
        await CREATE_ATTITUDE(formStatus);
        toast.success('Estrategia creada correctamente');
        queryClient.invalidateQueries(['attitudes']);
      }
      setFormStatus({
        name: '',
      });

      // eslint-disable-next-line no-shadow
    } catch (e) {
      console.log(e);
      toast.error('Ocurrió un error al crear la estrategia');
    }
  };
  const [data, setData] = useState([]);
  const [data_, setData_] = useState([]);
  const [columns] = useState([
    {
      Header: 'Aptitudes',
      accessor: 'name',
    },
    {
      Header: 'Acciones',
      accessor: 'actions',
    },
  ]);

  const updateResource = async (body) => {
    try {
      if (activeTab === 1) {
        await UPDATE_SKILL(body);
      }
      if (activeTab === 2) {
        await UPDATE_ATTITUDE(body);
      }
    } catch (e) {
      console.log(e);
    }
  };
  const deleteResouce = async (id) => {
    try {
      if (activeTab === 1) {
        await DELETE_SKILL(id);
        queryClient.invalidateQueries(['skills']);
      }
      if (activeTab === 2) {
        await DELETE_ATTITUDE(id);
        queryClient.invalidateQueries(['attitudes']);
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    if (dataSkills) {
      const { data: skills } = dataSkills;
      const auxSkills = skills.map(({ id, name }) => ({
        id,
        name,
      }));
      setData(auxSkills);
    }
  }, [dataSkills]);

  useEffect(() => {
    if (dataAttitudes) {
      const { data: attitudes } = dataAttitudes;
      const auxAttitudes = attitudes.map(({ id, name }) => ({
        id,
        name,
      }));
      setData_(auxAttitudes);
    }
  }, [dataAttitudes]);

  return (
    <div>
      <UserHeader />
      <div className="techer-container px-6 py-4 mt-6">
        <div className="tab-container ">
          <div className="tabs-elements">
            <div
              className={`tab ${activeTab === 1 ? 'active' : ''}`}
              onClick={() => setTab(1)}
            >
              Aptitudes
            </div>
            <div
              className={`tab ${activeTab === 2 ? 'active' : ''}`}
              onClick={() => setTab(2)}
            >
              Habilidades
            </div>
          </div>
          <div className="tab-content">
            {activeTab === 1 && (
              <div className="">
                <TableSectionHeader
                  label="Agregar aptitud"
                  newElement={newAbility}
                  setNewElement={setNewAbility}
                />
                {newAbility && (
                  <div
                    style={{ background: '#fff' }}
                    className="new-verb flex justify-between items-center"
                  >
                    <Input
                      placeholder="Nueva aptitud"
                      type="borderless"
                      small
                      value={formStatus?.name}
                      id="name"
                      onChange={onChange}
                    />
                    <Button
                      style={{ maxWidth: 'max-content' }}
                      secondary
                      xs
                      onClick={save}
                    >
                      Crear
                    </Button>
                  </div>
                )}
                <EditableTable
                  queryKey="skills"
                  sectionKey="skills"
                  columns={columns}
                  data={data}
                  save={updateResource}
                  deleteMethod={deleteResouce}
                  {...{
                    ...form,
                    register,
                    watch,
                    getValues,
                    formState,
                    unregister,
                  }}
                />
              </div>
            )}
            {activeTab === 2 && (
              <div className="">
                <TableSectionHeader
                  label="Agregar habilidad"
                  newElement={newAbility}
                  setNewElement={setNewAbility}
                />
                {newAbility && (
                  <div
                    style={{ background: '#fff' }}
                    className="new-verb flex justify-between items-center"
                  >
                    <Input
                      placeholder="Nueva habilidad"
                      type="borderless"
                      small
                      value={formStatus?.name}
                      id="name"
                      onChange={onChange}
                    />
                    <Button
                      style={{ maxWidth: 'max-content' }}
                      secondary
                      xs
                      onClick={save}
                    >
                      Crear
                    </Button>
                  </div>
                )}
                <EditableTable
                  queryKey="attitudes"
                  sectionKey="aptitudes"
                  columns={columns}
                  data={data_}
                  save={updateResource}
                  deleteMethod={deleteResouce}
                  {...{
                    ...form,
                    register,
                    watch,
                    getValues,
                    formState,
                    unregister,
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Teacher;
