import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';
import logo from '../assets/images/buy-asia-logo.png';

const Card = styled.div`
  position: relative;
  &::before {
    content: '';
    display: block;
    padding-top: 121.15%;
  }
`;

function Logo({ width }) {
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
        alt="BuyAsia logo"
        src={logo}
      />
    </Card>
  );
}

Logo.propTypes = {
  width: PropTypes.string.isRequired
};

export default Logo;
