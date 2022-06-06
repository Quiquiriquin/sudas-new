import React from 'react';
import Button from '../Buttons/Button';

const TableSectionHeader = ({
  title,
  label,
  newElement,
  setNewElement,
}) => {
  return (
    <div className="flex justify-between header">
      <p className="text-lg sofia-bold">{title}</p>
      <Button
        onClick={() => setNewElement((prev) => !prev)}
        xs
        primary
        style={{ maxWidth: 'max-content' }}
      >
        {newElement ? 'Cerrar' : label}
      </Button>
    </div>
  );
};

export default TableSectionHeader;
