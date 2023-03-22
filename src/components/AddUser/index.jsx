import React, { useState } from 'react';
import { Stack, Box, Grid } from '@mui/material';
import TextField from '../TextField';
import Button from '../Button';
import { PROP_DATA, PROP_MESSAGE, PROP_RESPONSE } from '../../constants/properties';
import { SEV_ERROR, SEV_SUCCESS } from '../../constants/severities';
import { validateAddUser } from '../../validations';
import { add } from '../../api/adminApi';
import AlertBox from '../AlertBox';
import ProgressDialog from '../ProgressDialog';

function AddUser() {
  const [progress, setProgress] = useState(false);
  const [alert, setAlert] = useState(false);
  const [severity, setSeverity] = useState('');
  const [message, setMessage] = useState('');
  const [firstName, setFirstName] = useState('');
  const [firstNameErr, setFirstNameErr] = useState(false);
  const [firstNameHelper, setFirstNameHelper] = useState('');
  const [lastName, setLastName] = useState('');
  const [lastNameErr, setLastNameErr] = useState(false);
  const [lastNameHelper, setLastNameHelper] = useState('');
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState(false);
  const [emailHelper, setEmailHelper] = useState('');
  const [mobile, setMobile] = useState('');
  const [mobileErr, setMobileErr] = useState(false);
  const [mobileHelper, setMobileHelper] = useState('');

  const resetForm = () => {
    setFirstName('');
    setFirstNameErr(false);
    setFirstNameHelper('');
    setLastName('');
    setLastNameErr(false);
    setLastNameHelper('');
    setEmail('');
    setEmailErr(false);
    setEmailHelper('');
    setMobile('');
    setMobileErr(false);
    setMobileHelper('');
  };

  const _handleFirstNameChange = (e) => {
    if (firstNameErr && firstNameHelper.length) {
      setFirstNameErr(false);
      setFirstNameHelper('');
    }
    setFirstName(e.target.value);
  };

  const _handleLastNameChange = (e) => {
    if (lastNameErr && lastNameHelper.length) {
      setLastNameErr(false);
      setLastNameHelper('');
    }
    setLastName(e.target.value);
  };

  const _handleEmailChange = (e) => {
    if (emailErr && emailHelper.length) {
      setEmailErr(false);
      setEmailHelper('');
    }
    setEmail(e.target.value);
  };

  const _handleMobileChange = (e) => {
    if (mobileErr && mobileHelper.length) {
      setMobileErr(false);
      setMobileHelper('');
    }
    setMobile(e.target.value);
  };

  const addNewUser = async () => {
    try {
      setProgress(true);
      const error = validateAddUser(
        firstName,
        setFirstNameErr,
        setFirstNameHelper,
        lastName,
        setLastNameErr,
        setLastNameHelper,
        email,
        setEmailErr,
        setEmailHelper
      );

      if (error) return;

      const body = {
        firstName,
        lastName,
        email,
        mobile
      };

      const res = await add(body);

      setMessage(`New user: ${res.data.email} added successfully`);
      setSeverity(SEV_SUCCESS);
      setAlert(true);
      resetForm();
    } catch (err) {
      if (PROP_RESPONSE in err)
        if (PROP_DATA in err.response)
          if (PROP_MESSAGE in err.response.data) {
            setMessage(err.response.data.message);
            setSeverity(SEV_ERROR);
            setAlert(true);
          }
      console.log(err);
    } finally {
      setProgress(false);
    }
  };

  return (
    <Stack p={{ sm: 30, xs: 5 }} alignItems="center" position="relative">
      <Stack
        bgcolor="white"
        borderRadius={{ sm: 5, xs: 0 }}
        p={{ sm: 30, xs: 5 }}
        width="100%"
        maxWidth={{ md: 1000, sm: 400 }}
        gap={40}>
        <Box fontWeight={700}>Add User</Box>
        <Grid container columnSpacing={{ md: 60, sm: 30 }} rowSpacing={30}>
          <Grid item xs={12} md={6}>
            <TextField
              id="firstName"
              label="First name"
              placeholder="first name"
              type="text"
              value={firstName}
              onChange={_handleFirstNameChange}
              error={firstNameErr}
              helperText={firstNameHelper}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="lastName"
              label="Last name"
              placeholder="last name"
              type="text"
              value={lastName}
              onChange={_handleLastNameChange}
              error={lastNameErr}
              helperText={lastNameHelper}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="email"
              label="Email"
              placeholder="email"
              type="text"
              value={email}
              onChange={_handleEmailChange}
              error={emailErr}
              helperText={emailHelper}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <TextField
              id="mobile"
              label="Contact number"
              placeholder="contact number"
              type="text"
              value={mobile}
              onChange={_handleMobileChange}
              error={mobileErr}
              helperText={mobileHelper}
            />
          </Grid>
          <Grid item xs={12} md={9} display={{ md: 'block', xs: 'none' }}></Grid>
          <Grid item xs={12} md={3}>
            <Button label="Add User" onClick={addNewUser} />
          </Grid>
        </Grid>
      </Stack>
      <AlertBox
        open={alert}
        message={message}
        setOpen={setAlert}
        severity={severity}
        minWidth={{ sm: '400px', xs: '100%' }}
      />
      <ProgressDialog open={progress} />
    </Stack>
  );
}

export default AddUser;
