import React from 'react';
import PropTypes from 'prop-types';

function Button({ label, onClick, backgroundColor, color, width, height }) {
  return (
    <div
      style={{
        display: 'flex',
        backgroundColor: backgroundColor ? backgroundColor : '#363636',
        color: color ? color : 'white',
        width: width ? width : '100%',
        height: height ? height : '43px',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '3px',
        cursor: 'pointer',
        fontWeight: 700,
        paddingLeft: '30px',
        paddingRight: '30px'
      }}
      onClick={onClick}>
      {label}
    </div>
  );
}

Button.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  backgroundColor: PropTypes.string,
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
};

export default Button;
