import styled from 'styled-components';
import { rgba, opacify } from 'polished';
import { GeneralButton } from './GeneralButton';

export const SecondaryButton = styled(GeneralButton)`
  background: ${(props) => {
    if (props.background) {
      return `${props.background} !important`;
    }
    return `${props.theme.secondary}`;
  }};
  &:hover {
    box-shadow: 0 6px 12px
      ${(props) => {
        const color = props.theme.secondary;
        const isHex = props.theme.secondary.includes('#');
        if (props.background) {
          return `${rgba(props.background, 0.33)} !important;`;
        }
        if (isHex) {
          return `${rgba(color, 0.33)} !important;`;
        }
        const [auxPrimary, secondary, auxTerciary] =
          props.theme.secondary.split(',');
        const primary = auxPrimary.replace('rgb(', '');
        const terciary = auxTerciary.replace(')', '');
        return `${rgba(
          parseInt(primary, 10),
          parseInt(secondary, 10),
          parseInt(terciary, 10),
          0.33
        )}`;
      }};
  }
  &:disabled {
    ${(props) => {
      const color = props.theme.secondary;
      const isHex = props.theme.secondary.includes('#');

      if (props.background) {
        return `background: ${rgba(
          props.background,
          0.5
        )} !important;`;
      }
      if (isHex) {
        return `background: ${rgba(color, 0.5)};`;
      }
      const [auxPrimary, secondary, auxTerciary] =
        props.theme.secondary.split(',');
      const primary = auxPrimary.replace('rgb(', '');
      const terciary = auxTerciary.replace(')', '');
      return `background: ${rgba(
        parseInt(primary, 10),
        parseInt(secondary, 10),
        parseInt(terciary, 10),
        0.5
      )}`;
    }}
`;
