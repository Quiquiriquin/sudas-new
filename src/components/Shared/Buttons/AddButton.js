/* eslint-disable no-nested-ternary */
import React, { useEffect, useContext } from 'react';
import styled from 'styled-components';
import addPlus from '../../../assets/svgs/add_plus.svg';
import { GeneralContext } from '../../../context/GeneralContext';

const AddContainer = styled.div`
  ${(props) =>
    props.theme.primary
      ? `background: ${props.theme.primary};`
      : '#81C5ED'}
  border-radius: 50%;
  width: 18px;
  max-width: 18px;
  min-height: 18px;
  max-height: 18px;
  padding: 0.125rem;
`;

const AddButton = ({ styles, ...props }) => {
  return (
    <AddContainer
      {...props}
      style={styles}
      className="flex justify-center items-center inline mr-2 cursor-pointer"
    >
      {/* <AddIcon style={{ height: '24px', width: '24px', display: 'inline' }} className={'mr-2.5'} /> */}
      <img src={addPlus} alt="Añadir" />
    </AddContainer>
  );
};

export default AddButton;
