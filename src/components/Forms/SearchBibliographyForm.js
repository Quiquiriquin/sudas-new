import React, { useEffect, useState } from 'react';
import { useFormContext } from 'react-hook-form';
import { useQuery } from 'react-query';
import Button from '../Shared/Buttons/Button';
import FormInput from '../Shared/FormInputs/FormInput';

const SearchBibliographyForm = () => {
  const { watch } = useFormContext();
  const strategy = watch('place', '');
  return (
    <div className="w-full">
      <div className="w-full pt-4">
        <FormInput
          name="bibliography"
          label="Bibliogrfía"
          defaultValue=""
          placeholder="Busca la bibliografía o cibergrafía"
          className="w-96 flex-none"
        />
      </div>
      <div className="flex flex-row-reverse">
        <div className="w-44">
          <Button type="submit" secondary>
            Buscar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchBibliographyForm;
