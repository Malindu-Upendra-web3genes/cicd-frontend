import React from 'react';
import PropTypes from 'prop-types';

function DatePicker({ title, label, value, onChange, error, helperText, disabled }) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        width: '100%'
      }}>
      {label ? (
        <div
          style={{ fontSize: '14px', color: error ? '#d32f2f' : disabled ? '#AAAAAA' : 'black' }}>
          {label}
        </div>
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
          borderColor: error ? '#d32f2f' : disabled ? '#AAAAAA' : 'black'
        }}>
        <input
          disabled={disabled ? disabled : false}
          title={title}
          style={{
            width: '100%',
            background: 'transparent',
            borderWidth: 0,
            outline: 'none',
            padding: 0,
            margin: 0
          }}
          value={value}
          type="date"
          onChange={onChange}
        />
      </div>
      {error ? <div style={{ fontSize: '14px', color: '#d32f2f' }}>{helperText}</div> : null}
    </div>
  );
}

DatePicker.propTypes = {
  title: PropTypes.string.isRequired,
  label: PropTypes.string,
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  error: PropTypes.bool,
  helperText: PropTypes.string,
  disabled: PropTypes.bool
};

export default DatePicker;
