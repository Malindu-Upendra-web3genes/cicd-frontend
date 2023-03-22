import React, { useState } from 'react';
import './styles.scss';
import PropTypes from 'prop-types';
import { MdCheck, MdOutlineClose } from 'react-icons/md';

function StaticAlert({ message }) {
  const [open, setOpen] = useState(true);

  const close = () => {
    setOpen(false);
  };

  return (
    <div className={open ? 'static-alert' : 'static-alert-dissapear'}>
      <div className="alert">
        <div className="alert-icon ">
          <MdCheck />
        </div>
        <div className="message">{message}</div>
        <div className="close-icon" onClick={close}>
          <MdOutlineClose />
        </div>
      </div>
    </div>
  );
}

StaticAlert.propTypes = {
  message: PropTypes.string.isRequired
};

export default StaticAlert;
