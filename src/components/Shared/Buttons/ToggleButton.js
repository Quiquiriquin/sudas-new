import styled from 'styled-components';
import { desaturate, opacify, rgba } from 'polished';
import { GeneralButton } from './GeneralButton';

export const ToggleButton = styled(GeneralButton)`
  background: ${(props) =>
    props.isActive ? props.theme[props.type] : '#F2F2F2'};
  &:hover {
    box-shadow: 0 6px 12px
      ${(props) => {
        return rgba(
          props.isActive && props.type
            ? props.theme[props.type]
            : '#3D4B5C26',
          0.33
        );
      }};
  }
  &:disabled {
    ${(props) =>
      props.background
        ? `background: ${rgba(props.background, 0.5)};`
        : `background: ${rgba(props.theme[props.type], 0.5)};`}
  }
`;
