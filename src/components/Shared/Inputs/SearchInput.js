import React from 'react';
import styled from 'styled-components';
import { GeneralInput } from './GeneralInput';
import searchIcon from '../../../assets/svgs/search.svg';

export const Search = styled(GeneralInput)`
  background: #e6e6e6;
  border-color: #b3b3b3;
  color: #606060;
  padding-left: 2.25rem;
  margin-top: -2px;
  display: block;
  &:hover {
    border: 1px solid
      ${(props) =>
        props.hasError ? props.theme.red : props.theme.secondary};
    box-shadow: 0 6px 12px #3d4b5c26;
  }

  &:focus {
    border: 1px solid
      ${(props) =>
        props.hasError ? props.theme.red : props.theme.secondary};
    outline-color: ${(props) =>
      props.hasError ? props.theme.red : props.theme.secondary};
    box-shadow: 0 6px 12px #3d4b5c26;
  }
`;

const SearchInput = (props) => {
  return (
    <div className="relative">
      <img
        style={{
          position: 'absolute',
          top: '50%',
          left: '1rem',
          transform: 'translateY(-50%)',
        }}
        src={searchIcon}
        alt="Buscar"
      />
      <Search placeholder="Buscar" {...props} />
    </div>
  );
};

export default SearchInput;
