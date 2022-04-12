import React, { useEffect } from 'react';
import { useFieldArray, useFormContext } from 'react-hook-form';
import FormInput from '../Shared/FormInputs/FormInput';
import Button from '../Shared/Buttons/Button';
import SelectFormInput from '../Shared/FormInputs/SelectFormInput';

const NewUserForm = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'users',
  });
  useEffect(() => {
    append({
      email: '',
      academicGrade: '',
      role: '',
    });
  }, []);
  const addUser = () => {
    append({
      email: '',
      academicGrade: '',
      role: '',
    });
  };
  const deleteUser = (index) => {
    remove(index);
  };
  return (
    <div className="relative">
      <div
        className="h-full overflow-auto"
        style={{ maxHeight: '270px', minHeight: '270px' }}
      >
        {fields &&
          fields.map(({ id, email, academicGrade, role }, index) => (
            <div key={id} className="flex justify-between gap-4">
              <div className="w-full">
                <FormInput
                  className="w-ful"
                  defaultValue=""
                  name={`users.${index}.email`}
                  label="Correo electrónico"
                  placeholder="ejemplo@sudas.com"
                />
              </div>
              <div className="w-full">
                <SelectFormInput
                  options={[
                    {
                      value: 'biofisica',
                      label: 'Biofísica',
                    },
                    {
                      value: 'bioquimica',
                      label: 'Bioquímica',
                    },
                    {
                      value: 'botanica',
                      label: 'Botánica',
                    },
                    {
                      value: 'farmacia',
                      label: 'Farmacia',
                    },
                    {
                      value: 'fisiologia',
                      label: 'Fisiología',
                    },
                    {
                      value: 'ingenierieaBioquimica',
                      label: 'Ingeniería Bioquímica',
                    },
                    {
                      value: 'ingenieriaEnSistemasAmbientales',
                      label: 'Ingenieria en Sistemas Ambientales',
                    },
                    {
                      value: 'inmunologia',
                      label: 'Inmunología',
                    },
                    {
                      value: 'microbiologia',
                      label: 'Microbiología',
                    },
                    {
                      value: 'morfologia',
                      label: 'Morfología',
                    },
                    {
                      value: 'parasitologia',
                      label: 'Parasitología',
                    },
                    {
                      value: 'quimicaInorganica',
                      label: 'Química Inorgánica',
                    },
                    {
                      value: 'quimicaOrganica',
                      label: 'Química Orgánica',
                    },
                    {
                      value: 'zoologia',
                      label: 'Zoologia',
                    },
                    {
                      value: 'innovacionEducativa',
                      label: 'Innovación Educativa',
                    },
                  ]}
                  name="department"
                  label="Departamento"
                  defaultValue=""
                  placeholder="Ciencias básicas"
                />
              </div>
              <div className="w-full">
                <SelectFormInput
                  label="Rol"
                  defaultValue=""
                  name={`users.${index}.role`}
                  className="w-full"
                  options={[
                    { value: 'ADMIN', label: 'Administrador' },
                    { value: 'USER', label: 'Profesor' },
                    { value: 'STUDENT', label: 'Alumno' },
                  ]}
                />
              </div>
            </div>
          ))}
      </div>
      <div className="w-full add-user-btn mt-4 mb-6">
        <Button
          type="button"
          onClick={addUser}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <box-icon name="plus" />
        </Button>
      </div>
      <div className="flex justify-between" style={{ bottom: 0 }}>
        <div>
          <Button>Regresar</Button>
        </div>
        <div>
          <Button type="submit" primary>
            Añadir usuarios
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewUserForm;
