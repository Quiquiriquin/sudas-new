import React from 'react';
import styled from 'styled-components';
import { GeneralInput } from './GeneralInput';

export const BorderlessInput = styled(GeneralInput)`
  background: none;
  border: none;
  color: #000000;
  font-size: 12px;
  padding: 0;
  &:hover {
    border: none;
    box-shadow: none;
  }

  &:focus {
    border: none;
    outline: none;
    box-shadow: none;
  }
`;
