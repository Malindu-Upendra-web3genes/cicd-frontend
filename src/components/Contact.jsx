import React from 'react';
import PropTypes from 'prop-types';
import { Stack, Box } from '@mui/material';
import { AddOutlined, DeleteOutlined } from '@mui/icons-material';
import TextField from './TextField';

function Contact({ contactNums, onChange, cNumErrs, cNumHelpers, add, remove }) {
  return (
    <Stack gap={30}>
      {Array.isArray(contactNums) && contactNums.length
        ? contactNums.map((c, i) => (
            <Stack width="100%" direction="row" key={i} alignItems="center">
              <Stack width="100%" gap={5}>
                {i === 0 ? (
                  <Box fontSize={14} color={cNumErrs[i] ? 'error.main' : 'black'}>
                    Contact number
                  </Box>
                ) : null}
                <Stack direction="row" gap={15} alignItems="center">
                  <Stack
                    height={35}
                    bgcolor="white"
                    justifyContent="center"
                    borderRadius={2}
                    px={10}
                    border={`1px solid ${cNumErrs[i] ? '#d32f2f' : 'black'}`}
                    width="100%">
                    <input
                      id={`contactNumber${i}`}
                      style={{
                        width: '100%',
                        background: 'transparent',
                        borderWidth: 0,
                        outline: 'none',
                        padding: 0,
                        margin: 0
                      }}
                      placeholder="contact number"
                      value={c}
                      type="text"
                      onChange={(e) => onChange(e, i)}
                    />
                  </Stack>
                  {i < 2 && contactNums.length === i + 1 ? (
                    <div onClick={add}>
                      <AddOutlined />
                    </div>
                  ) : null}
                  {i !== 0 && contactNums.length === i + 1 ? (
                    <div onClick={remove}>
                      <DeleteOutlined />
                    </div>
                  ) : null}
                </Stack>
                {cNumErrs[i] ? (
                  <Box
                    fontSize={14}
                    color={cNumErrs[i] ? '#d32f2f' : 'black'}
                    style={{ fontSize: '14px', color: '#d32f2f' }}>
                    {cNumHelpers[i]}
                  </Box>
                ) : null}
              </Stack>
            </Stack>
          ))
        : null}
    </Stack>
  );
}

Contact.propTypes = {
  contactNums: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  cNumErrs: PropTypes.array.isRequired,
  cNumHelpers: PropTypes.array.isRequired,
  add: PropTypes.func.isRequired,
  remove: PropTypes.func.isRequired
};

export default Contact;
