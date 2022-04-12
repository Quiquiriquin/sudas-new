import styled from 'styled-components';
import { rgba } from 'polished';
import { GeneralButton } from './GeneralButton';

export const DeleteButton = styled(GeneralButton)`
  background: ${(props) => props.theme.error};
  color: #FFFFFF;
  &:hover {
    box-shadow: 0 6px 12px
    ${(props) => {
      const color = props.theme.error;
      const isHex = color.includes('#');
      if (isHex) {
        return `${rgba(color, 0.33)} !important;`;
      }
      const [auxPrimary, secondary, auxTerciary] = color.split(',');
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
      const color = props.theme.error;
      const isHex = color.includes('#');

      if (isHex) {
        return `background: ${rgba(color, 0.5)};`;
      }
      const [auxPrimary, secondary, auxTerciary] = color.split(',');
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
