import React from 'react';
import { GeneralInput } from './GeneralInput';
import SearchInput from './SearchInput';
import { BorderlessInput } from './BorderlessInput';

const Input = ({ children, type = '', ...props }) => {
  if (type === 'search') {
    return <SearchInput {...props} />;
  }

  if (type === 'borderless') {
    return <BorderlessInput type="text" {...props} />;
  }

  return <GeneralInput type={type} {...props} />;
};

export default Input;
