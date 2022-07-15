import styled from 'styled-components';

export const GeneralButton = styled.button`
  ${(props) =>
    // eslint-disable-next-line no-nested-ternary
    props.small
      ? 'min-height: 36px; max-height: 36px; font-size: 0.875rem;'
      : props.xs
      ? 'min-height: 24px; max-height: 24px; font-size: 0.75rem;'
      : 'min-height: 48px; max-height: 48px; font-size: 1rem;'}
  //display: flex;
  //align-items: center;
  //justify-content: center;
  border-radius: 5px;
  ${(props) =>
    props.small || props.xs
      ? `padding-left: 1rem; padding-right: 1rem;`
      : `padding-left: 2rem; padding-right: 2rem;`}
  outline: none;
  width: 100%;
  ${(props) =>
    props.background
      ? `background: ${props.background};`
      : `background: ${props.theme.white};`}
  border: 1px solid #b3b3b30f;
  ${(props) =>
    props.color ? `color: ${props.color};` : `color: #000;`}
  box-shadow: 0px 3px 6px #3D4B5C26;
  &:hover {
    box-shadow: 0px 6px 12px #3d4b5c26;
    cursor: pointer;
  }
  &:disabled,
  &.disabled {
    cursor: not-allowed !important;
    opacity: 0.5 !important;
  }
`;
