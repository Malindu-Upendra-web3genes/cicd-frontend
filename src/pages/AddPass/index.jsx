import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Stack, Box } from '@mui/material';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import StaticAlert from '../../components/StaticAlert';
import { PASS_REGEX } from '../../constants/regex';
import { PROP_DATA, PROP_MESSAGE, PROP_RESPONSE } from '../../constants/properties';
import { SEV_ERROR } from '../../constants/severities';
import AlertBox from '../../components/AlertBox';
import { addPass } from '../../api/adminApi';

function AddPass() {
  const [password, setPassword] = useState('');
  const [passErr, setPassErr] = useState(false);
  const [passHelper, setPassHelper] = useState('');
  const [cPass, setCpass] = useState('');
  const [cPassErr, setCpassErr] = useState(false);
  const [cPassHelper, setCpassHelper] = useState('');
  const [alert, setAlert] = useState(false);
  const [severity, setSeverity] = useState('');
  const [message, setMessage] = useState('');

  const { token } = useParams();
  const navigate = useNavigate();

  const _handlePassChange = (e) => {
    if (passErr) {
      setPassErr(false);
      setPassHelper('');
    }
    setPassword(e.target.value);
  };

  const _handleCpassChange = (e) => {
    if (cPassErr && cPassHelper.length) {
      setCpassErr(false);
      setCpassHelper('');
    }
    setCpass(e.target.value);
  };

  const validatePass = () => {
    let isErr = false;
    let errText = '';
    if (!password.trim().length) {
      isErr = true;
      errText = 'Required';
    } else if (password.trim().length < 8) {
      isErr = true;
      errText = 'Must contain at least 8 characters';
    } else if (!PASS_REGEX.test(password)) {
      isErr = true;
      errText =
        'Must contain at least, 1 Uppercase letter, 1 lowercase letter, 1 special character, and 1 digit';
    }
    setPassErr(isErr);
    setPassHelper(errText);
    return !isErr;
  };

  const validateCpass = () => {
    let isErr = false;
    let errText = '';
    if (!cPass.trim().length) {
      isErr = true;
      errText = 'Required';
    } else if (cPass.trim() !== password.trim()) {
      isErr = true;
      errText = 'Cofirm password not mathced';
    }
    setCpassErr(isErr);
    setCpassHelper(errText);
    return !isErr;
  };

  const login = async () => {
    try {
      const isValidPass = validatePass();
      const isValidCpass = validateCpass();

      if (isValidPass && isValidCpass) {
        await addPass({ password }, token);

        navigate('/', {
          state: {
            message: 'Password added successfully! Log in by providing the new Password'
          }
        });
      }
    } catch (err) {
      if (PROP_RESPONSE in err)
        if (PROP_DATA in err.response)
          if (PROP_MESSAGE in err.response.data) {
            setMessage(err.response.data.message);
            setSeverity(SEV_ERROR);
            setAlert(true);
          }
      console.log(err);
    }
  };

  return (
    <Stack position="relative" alignItems="center" justifyContent="center" height="100vh" gap={50}>
      <Logo width="52px" />
      <Stack
        bgcolor="white"
        width={400}
        p={40}
        borderRadius={5}
        gap={40}
        borderBottom={4}
        borderColor="secondary.main">
        <Stack gap={20}>
          <Stack gap={10}>
            <TextField
              id="password"
              label="Password"
              placeholder="password"
              type="password"
              value={password}
              onChange={_handlePassChange}
              error={passErr}
              helperText={passHelper}
            />
            <Box color="text.secondary" fontSize={12}>
              Password must include: 8-12 Characters, at least one capital letter, at least one
              number, at least one special character.
            </Box>
          </Stack>
          <TextField
            id="cPass"
            label="Confirm password"
            placeholder="confirm password"
            type="password"
            value={cPass}
            onChange={_handleCpassChange}
            error={cPassErr}
            helperText={cPassHelper}
          />
        </Stack>
        <Button label="Continue" onClick={login} />
      </Stack>
      <StaticAlert message="Your e-mail has been verified. Please provide a new password to create an account." />
      <AlertBox
        open={alert}
        message={message}
        setOpen={setAlert}
        severity={severity}
        minWidth="400px"
      />
    </Stack>
  );
}

export default AddPass;
