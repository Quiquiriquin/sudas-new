import styled from 'styled-components';

export const TextArea = styled.textarea`
  width: 100%;
  font-size: 1rem;
  border-radius: 5px;
  //padding-right: 1.5rem;
  padding: 0.5rem 1.5rem;
  ${(props) => props.noResize && 'resize: none;'}
  ${(props) =>
    props.type === 'password'
      ? 'padding-right: 3rem;'
      : 'padding-right: 1.5rem;'}
  ${(props) =>
    props.search && `background: ${props.theme.borderLight};`}
  border: 1px solid
    ${(props) =>
    props.hasError ? props.theme.red : props.theme.borderDark};

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
  &:disabled {
    cursor: not-allowed !important;
    color: #b3b3b3 !important;
  }
`;
