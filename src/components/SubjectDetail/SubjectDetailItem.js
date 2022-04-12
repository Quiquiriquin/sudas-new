import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const SectionCard = styled.div`
  margin: 20px 0;
  padding: 1.25rem;
  border-radius: 0.25rem;
  box-shadow: 0px 3px 6px #3d4b5c26;
`;

const HeaderCard = styled.div`
  padding: 0.5rem;
  font-size: 1.125rem;
  line-height: 1.75rem;
  border-radius: 0.25rem;
  color: white;
  background: #243a62;
`;

const BodyCard = styled.div`
  padding: 1.25rem;
`;

const SubjectDetailItem = ({
  title,
  children,
  component: Component,
}) => (
  <SectionCard>
    <HeaderCard>{title}</HeaderCard>
    <BodyCard>{Component}</BodyCard>
  </SectionCard>
);

export default SubjectDetailItem;

// SubjectDetailItem.propTypes = {
//   title: PropTypes.string.isRequired,
//   component: PropTypes.element.isRequired,
// };
