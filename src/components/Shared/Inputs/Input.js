import React, { forwardRef } from 'react';
import { GeneralInput } from './GeneralInput';
import SearchInput from './SearchInput';
import { BorderlessInput } from './BorderlessInput';

const Input = forwardRef(({ children, type = '', ...props }, ref) => {
  if (type === 'search') {
    return <SearchInput ref={ref} {...props} />;
  }

  if (type === 'borderless') {
    return <BorderlessInput ref={ref} type="text" {...props} />;
  }

  return <GeneralInput ref={ref} type={type} {...props} />;
});

export default Input;
