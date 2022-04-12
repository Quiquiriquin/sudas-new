import React from 'react';
import { GeneralButton } from './GeneralButton';
import { PrimaryButton } from './PrimaryButton';
import { SecondaryButton } from './SecondaryButton';
import { TerciaryButton } from './TerciaryButton';
import { ToggleButton } from './ToggleButton';
import { DeleteButton } from './DeleteButton';

const Button = ({
  primary,
  secondary,
  terciary,
  children,
  toggle,
  isDelete,
  ...props
}) => {
  if (primary) {
    return <PrimaryButton {...props}>{children}</PrimaryButton>;
  }

  if (isDelete) {
    return <DeleteButton {...props}>{children}</DeleteButton>;
  }

  if (secondary) {
    return <SecondaryButton {...props}>{children}</SecondaryButton>;
  }

  if (terciary) {
    return <TerciaryButton {...props}>{children}</TerciaryButton>;
  }

  if (toggle) {
    return <ToggleButton {...props}>{children}</ToggleButton>;
  }

  return <GeneralButton {...props}>{children}</GeneralButton>;
};

export default Button;
