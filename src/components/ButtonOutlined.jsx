import React from 'react';
import PropTypes from 'prop-types';

function ButtonOutlined({ label, onClick, color, width, height }) {
  return (
    <div
      style={{
        display: 'flex',
        backgroundColor: 'white',
        borderStyle: 'solid',
        borderWidth: '1px',
        borderColor: color ? color : '#363636',
        color: color ? color : '#363636',
        width: width ? width : '100%',
        height: height ? height : '43px',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: '3px',
        cursor: 'pointer',
        fontWeight: 700
      }}
      onClick={onClick}>
      {label}
    </div>
  );
}

ButtonOutlined.propTypes = {
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  color: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string
};

export default ButtonOutlined;
