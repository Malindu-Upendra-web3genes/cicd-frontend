import React from 'react';
import PropTypes from 'prop-types';

function TextField({
  id,
  label,
  placeholder,
  value,
  type,
  onChange,
  error,
  helperText,
  width,
  flexShrink
}) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        width,
        flexShrink
      }}>
      {label ? (
        <div style={{ fontSize: '14px', color: error ? '#d32f2f' : 'black' }}>{label}</div>
      ) : null}

      <div
        style={{
          display: 'flex',
          height: '35px',
          backgroundColor: 'white',
          alignItems: 'center',
          borderRadius: '2px',
          paddingLeft: '10px',
          paddingRight: '10px',
          borderStyle: 'solid',
          borderWidth: '1px',
          borderColor: error ? '#d32f2f' : 'black'
        }}>
        <input
          id={id}
          style={{
            width: '100%',
            background: 'transparent',
            borderWidth: 0,
            outline: 'none',
            padding: 0,
            margin: 0
          }}
          placeholder={placeholder}
          value={value}
          type={type}
          onChange={onChange}
        />
      </div>
      {error ? <div style={{ fontSize: '12px', color: '#d32f2f' }}>{helperText}</div> : null}
    </div>
  );
}

TextField.propTypes = {
  id: PropTypes.string.isRequired,
  label: PropTypes.string,
  placeholder: PropTypes.string.isRequired,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  type: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  flexShrink: PropTypes.number
};

TextField.defaultProps = {
  flexShrink: 1,
  width: '100%'
};

export default TextField;
