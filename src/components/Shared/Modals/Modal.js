import React from 'react';
import ReactDOM from 'react-dom';
import styled, { withTheme } from 'styled-components';
import { Modal } from 'react-overlays';
import { useModal } from '@ebay/nice-modal-react';
import closeIcon from '../../../assets/svgs/close.svg';

const Backdrop = styled.div`
  position: fixed;
  z-index: 1040;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: #ffffff;
  backdrop-filter: blur(100px);
  opacity: 0.7;
`;

const TeamentModal = styled(Modal)`
  position: fixed;
  min-width: 400px;
  max-width: 80%;
  max-height: 80vh;
  ${(props) => (props.width ? `width: ${props.width};` : '')}
  ${(props) => (props.height ? `height: ${props.height};` : '')}
  z-index: 1040;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border: 1px solid #f2f2f2;
  border-radius: 5px;
  background-color: #ffffff;
  box-shadow: 0px 0px 50px #3d4b5c26;
  padding: 5rem 136px 6rem 136px;
  overflow: auto;
`;

const ModalGeneric = ({ children, open = true, ...modalProps }) => {
  const renderBackdrop = (props) => <Backdrop {...props} />;
  const modal = useModal();
  return (
    <TeamentModal
      show={modal.visible}
      onHide={() => modal.hide()}
      autoFocus={false}
      enforceFocus={false}
      renderBackdrop={renderBackdrop}
      aria-labelledby="modal-label"
      {...modalProps}
    >
      <>
        <div
          onClick={() => modal.remove()}
          className="close cursor-pointer absolute"
          style={{ top: '2rem', right: '2rem', zIndex: 10 }}
        >
          <img src={closeIcon} alt="Cerrar" />
        </div>
        {children}
      </>
    </TeamentModal>
  );
};

export default withTheme(ModalGeneric);
