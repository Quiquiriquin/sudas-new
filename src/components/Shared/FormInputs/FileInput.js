import React, { useRef } from 'react';
import styled from 'styled-components';
import { createFileUrl } from '../../../utils/GeneralFunctions';
import uploadIcon from '../../../assets/svgs/upload.svg';

const FileContainer = styled.div`
  width: 100%;
  min-width: 265px;
  max-width: 265px;
  height: 100%;
  //min-height: 124px;
  max-height: 124px;
  border: 4px solid ${(props) => props.theme.white};
  border-radius: 10px;
  display: flex;
  gap: 1.5rem;
  justify-content: center;
  align-items: center;
  padding: 2rem 2.5rem;

  background-color: #ffffff;
  color: #606060;
  &:hover {
    cursor: pointer;
  }
  & img.enterprise-signup-logo {
    padding: 0;
    max-height: 116px;
  }
`;

// eslint-disable-next-line consistent-return
const FileInput = ({ multiple = false, componentRef, ...props }) => {
  const fileRef = useRef(null);
  const onChangeFile = async (dragFile = null) => {
    if (dragFile && !dragFile.target) {
      const [file] = dragFile;
      const fileUrl = await createFileUrl(file);
      props.setFile((prev) => fileUrl);
    } else {
      const { files } = fileRef.current;
      if (files.length > 0) {
        const [file] = files;
        const fileUrl = await createFileUrl(file);
        props.setFile((prev) => fileUrl);
      }
    }
  };

  if (!multiple) {
    const { file, setFile } = props;
    return (
      <div>
        <input
          onChange={onChangeFile}
          type="file"
          ref={fileRef}
          className="hidden"
        />
        {!props.file && (
          <FileContainer onClick={() => fileRef.current.click()}>
            <div className="">
              <img width="56px" src={uploadIcon} alt="Adjuntar" />
            </div>
            <div className="text-center">
              <div className="">Sube tu logo</div>
              <div className="text-xs">Min 130x48px</div>
              <div className="text-xs">Max. 5MB</div>
            </div>
          </FileContainer>
        )}
        {props.file && (
          <FileContainer onClick={() => fileRef.current.click()}>
            <img
              className="enterprise-signup-logo"
              src={file.data_url}
              alt="Logo"
            />
          </FileContainer>
        )}
      </div>
    );
  }
};

export default FileInput;
