import React from 'react';
import { withTheme } from 'styled-components';
import cross from '../../../assets/svgs/close_w.svg';

const CloseButton = ({ closeToast, ...props }) => {
  return (
    <div
      className="notification-close"
      onClick={closeToast}
      style={{
        ...(props.theme ? { background: props.theme.terciary } : {}),
      }}
    >
      <img
        src={cross}
        alt="cerrar"
        style={{ width: '14px', height: '14px' }}
      />
    </div>
  );
};

export default withTheme(CloseButton);
