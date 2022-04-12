import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
  box-sizing: border-box;
  ${(props) => props.height && `height: ${props.height};`}
  ${(props) => props.width && `width: ${props.width};`}
  ${(props) => props.maxHeight && `max-height: ${props.maxHeight};`}
  ${(props) => props.maxWidth && `max-width: ${props.maxWidth};`}
  ${(props) => props.minWidth && `min-width: ${props.minWidth};`}
  ${(props) => props.background && `background: ${props.background};`}
  ${(props) => props.overflow && `overflow: ${props.overflow};`}
  position: relative;
  border-radius: 5px;
  border: ${(props) =>
    props.border ? props.border : '1px solid #F2F2F2'};
  /* box-shadow: ${(props) =>
    props.boxShadow ? props.boxShadow : '0px 10px 20px #00000029'}; */
  box-shadow: ${(props) =>
    props.boxShadow ? props.boxShadow : '0px 6px 12px #3D4B5C1A'};
  padding: ${(props) => (props.padding ? props.padding : '1.5rem')};
  margin-top: ${(props) => (props.marginTop ? props.marginTop : '0')};
  margin-bottom: ${(props) =>
    props.marginBottom ? props.marginBottom : '0'};
`;

const RoundedCard = ({ children, ...props }) => {
  return <Box {...props}>{children}</Box>;
};

export default RoundedCard;
