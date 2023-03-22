import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router';
import { Stack, Box, Link } from '@mui/material';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import { login } from '../../api/adminApi';
import { SEV_ERROR } from '../../constants/severities';
import { PROP_DATA, PROP_MESSAGE, PROP_RESPONSE, PROP_VERIFYKEY } from '../../constants/properties';
import AlertBox from '../../components/AlertBox';
import { setSession } from '../../functions/session';
import StaticAlert from '../../components/StaticAlert';

function Welcome() {
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState(false);
  const [emailHelper, setEmailHelper] = useState('');
  const [password, setPassword] = useState('');
  const [passErr, setPassErr] = useState(false);
  const [passHelper, setPassHelper] = useState('');
  const [staticAlert, setStaticAlert] = useState(false);
  const [staticMsg, setStaticMsg] = useState('');
  const [alert, setAlert] = useState(false);
  const [severity, setSeverity] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();
  const location = useLocation();

  function initAlertView() {
    if (location.state && PROP_MESSAGE in location.state) {
      setStaticAlert(true);
      setStaticMsg(location.state.message);
      //setTimeout(() => window.history.replaceState({}, document.title), 3000);
    }
  }

  useEffect(() => {
    initAlertView();
  }, []);

  const _handleEmailChange = (e) => {
    if (emailErr && emailHelper.length) {
      setEmailErr(false);
      setEmailHelper('');
    }
    setEmail(e.target.value);
  };

  const _handlePassChange = (e) => {
    if (passErr) {
      setPassErr(false);
      setPassHelper('');
    }
    setPassword(e.target.value);
  };

  const validateEmail = () => {
    let isErr = false;
    let errText = '';
    if (!email.trim().length) {
      isErr = true;
      errText = 'Required';
    }
    setEmailErr(isErr);
    setEmailHelper(errText);
    return !isErr;
  };

  const validatePass = () => {
    let isErr = false;
    let errText = '';
    if (!password.trim().length) {
      isErr = true;
      errText = 'Required';
    }
    setPassErr(isErr);
    setPassHelper(errText);
    return !isErr;
  };

  const signIn = async () => {
    try {
      const isValidEmail = validateEmail();
      const isValidPass = validatePass();

      if (isValidEmail && isValidPass) {
        const res = await login({ email, password });

        if (PROP_VERIFYKEY in res.data) {
          navigate(`/verify-otp/${res.data.verifyKey}`);
        } else {
          setSession(res.data, res.headers['x-authtoken']);
          navigate('/', {
            state: {
              message: 'Successfully logged in'
            }
          });
          window.location.reload();
        }
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
      <AlertBox open={alert} severity={severity} message={message} setOpen={setAlert} top={10} />
      <Logo width="52px" />
      <Stack
        bgcolor="white"
        width={400}
        p={40}
        borderRadius={5}
        gap={30}
        borderBottom={4}
        borderColor="secondary.main">
        <Stack gap={40}>
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
          <Stack alignItems="end" gap={10}>
            <Box width="100%">
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
            </Box>
            <Link fontSize={12} fontWeight={700}>
              Forgot your password?
            </Link>
          </Stack>
        </Stack>
        <Button label="Login" onClick={signIn} />
      </Stack>
      {staticAlert ? <StaticAlert message={staticMsg} /> : null}
    </Stack>
  );
}

export default Welcome;
