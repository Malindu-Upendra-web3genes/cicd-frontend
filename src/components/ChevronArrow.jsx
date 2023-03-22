import React from 'react';
import PropTypes from 'prop-types';
import styled from '@emotion/styled';

const Chevron = styled.div(({ borderLeftColor }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  paddingLeft: '35px',
  paddingRight: '5px',
  height: '50px',
  position: 'relative',
  fontWeight: 700,
  color: 'white',

  '&:after': {
    content: '""',
    position: 'absolute',
    left: 0,
    bottom: 0,
    width: 0,
    height: 0,
    borderLeft: '25px',
    borderLeftColor,
    borderLeftStyle: 'solid',
    borderTop: '25px',
    borderTopColor: 'transparent',
    borderTopStyle: 'solid',
    borderBottom: '25px',
    borderBottomColor: 'transparent',
    borderBottomStyle: 'solid'
  },
  '&:before': {
    content: '""',
    position: 'absolute',
    right: '-25px',
    bottom: 0,
    width: 0,
    height: 0,
    borderLeft: '25px',
    borderLeftColor: 'inherit',
    borderLeftStyle: 'solid',
    borderTop: '25px',
    borderTopColor: 'transparent',
    borderTopStyle: 'solid',
    borderBottom: '25px',
    borderBottomColor: 'transparent',
    borderBottomStyle: 'solid'
  }
}));

function ChevronArrow({ text, selected, onClick, borderLeftColor, width, disabled }) {
  return (
    <Chevron
      borderLeftColor={borderLeftColor}
      style={{
        backgroundColor: selected ? '#363636' : '#A2A0A0',
        borderLeftColor: selected ? '#363636' : '#A2A0A0',
        width,
        cursor: disabled ? 'default' : 'pointer'
      }}
      onClick={onClick}>
      {text}
    </Chevron>
  );
}

ChevronArrow.propTypes = {
  text: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
  borderLeftColor: PropTypes.string.isRequired,
  width: PropTypes.string.isRequired,
  disabled: PropTypes.bool.isRequired
};

export default ChevronArrow;
