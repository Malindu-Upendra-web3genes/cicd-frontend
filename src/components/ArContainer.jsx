import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import { Box } from '@mui/material';

const Container = styled.div`
  position: relative;
  max-width: ${({ maxWidth }) => (maxWidth ? maxWidth : 'none')};

  &:before {
    content: '';
    display: block;
    padding-top: ${({ pt }) => pt};
  }
`;

function ArContainer({ pt, maxWidth, children }) {
  return (
    <Container pt={pt} maxWidth={maxWidth}>
      <Box position="absolute" right={0} top={0} left={0} bottom={0}>
        {children}
      </Box>
    </Container>
  );
}

ArContainer.propTypes = {
  pt: PropTypes.string.isRequired,
  maxWidth: PropTypes.string,
  children: PropTypes.element.isRequired
};

export default ArContainer;
