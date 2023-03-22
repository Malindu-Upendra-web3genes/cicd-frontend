import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Card = styled.div`
  position: relative;
  &::before {
    content: '';
    display: block;
    padding-top: 100%;
  }
`;

function SellerLogo({ width, src }) {
  return (
    <Card style={{ width }}>
      <img
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%'
        }}
        alt="Seller Logo"
        src={src}
      />
    </Card>
  );
}

SellerLogo.propTypes = {
  width: PropTypes.string.isRequired,
  src: PropTypes.string.isRequired
};

export default SellerLogo;
