import React from 'react';
import FormInput from '../Shared/FormInputs/FormInput';
import Button from '../Shared/Buttons/Button';

const AuthoritiesForm = ({ authorities }) => {
  console.log('Authorities', authorities);
  return (
    <div>
      <div
        className="grid grid-cols-2 gap-x-8"
        style={{
          maxHeight: '39vh',
          overflow: 'auto',
          paddingRight: '1rem',
          marginRight: '-1rem',
        }}
      >
        <FormInput
          name="reviewedBy"
          label="Revisado por"
          defaultValue={authorities?.reviewedBy || ''}
          placeholder="Juan Pérez"
        />
        <FormInput
          name="approvedBy"
          label="Aprobado por"
          defaultValue={authorities?.approvedBy || ''}
          placeholder="Juan Pérez"
        />
        <FormInput
          name="designedBy"
          label="Diseñado por"
          defaultValue={authorities?.designedBy || ''}
          placeholder="Juan Pérez"
        />
        <FormInput
          name="authorizedBy"
          label="Autorizado por"
          defaultValue={authorities?.authorizedBy || ''}
          placeholder="Juan Pérez"
        />
        <FormInput
          name="approvedBy2"
          label="Aprobado por"
          defaultValue={authorities?.approvedBy2 || ''}
          placeholder="Juan Pérez"
        />
        <FormInput
          name="principal"
          placeholder="Juan Pérez"
          label="Director"
          defaultValue={authorities?.principal || ''}
        />
        <FormInput
          placeholder="Juan Pérez"
          name="subPrincipal"
          label="Sub director"
          defaultValue={authorities?.subPrincipal || ''}
        />
      </div>
      <div className="mt-4 flex justify-end">
        <Button
          style={{ maxWidth: 'max-content' }}
          type="submit"
          primary
        >
          Guardar
        </Button>
      </div>
    </div>
  );
};

export default AuthoritiesForm;
