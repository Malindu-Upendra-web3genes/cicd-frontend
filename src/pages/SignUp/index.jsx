import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Stack, Box, Link } from '@mui/material';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import ButtonOutlined from '../../components/ButtonOutlined';
import { init } from '../../api/sellerApi';
import AlertBox from '../../components/AlertBox';
import { SEV_ERROR } from '../../constants/severities';
import { PROP_DATA, PROP_MESSAGE, PROP_RESPONSE } from '../../constants/properties';

function SignUp() {
  const [mobile, setMobile] = useState('');
  const [mobileErr, setMobileErr] = useState(false);
  const [mobileHelper, setMobileHelper] = useState('');
  const [email, setEmail] = useState('');
  const [emailErr, setEmailErr] = useState(false);
  const [emailHelper, setEmailHelper] = useState('');
  const [alert, setAlert] = useState(false);
  const [severity, setSeverity] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const _handleMobileChange = (e) => {
    if (mobileErr && mobileHelper.length) {
      setMobileErr(false);
      setMobileHelper('');
    }
    setMobile(e.target.value);
  };

  const _handleEmailChange = (e) => {
    if (emailErr) {
      setEmailErr(false);
      setEmailHelper('');
    }
    setEmail(e.target.value);
  };

  const validateMobile = () => {
    let isErr = false;
    let errText = '';
    if (!mobile.trim().length) {
      isErr = true;
      errText = 'Required';
    }
    setMobileErr(isErr);
    setMobileHelper(errText);
    return !isErr;
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

  const proceed = async () => {
    try {
      const isValidMobile = validateMobile();
      const isValidEmal = validateEmail();
      if (isValidMobile && isValidEmal) {
        const reqBody = {
          mobile,
          email
        };

        const res = await init(reqBody);
        navigate(`/verify-otp/${res.data.verifyKey}`);
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

  const navToLogin = () => {
    navigate('/');
  };

  return (
    <Stack position="relative" alignItems="center" justifyContent="center" height="100vh" gap={50}>
      <Box
        bgcolor="white"
        width={465}
        borderBottom={4}
        borderRadius={5}
        borderColor="secondary.main">
        <Stack
          position="relative"
          alignItems="center"
          justifyContent="center"
          px={40}
          py={50}
          borderBottom={4}
          borderColor="secondary.main">
          <Box position="absolute" top={24} left={40}>
            <Logo width="52px" />
          </Box>
          <Box fontSize={20} fontWeight={700}>
            Seller Registration
          </Box>
        </Stack>
        <Stack px={75} py={20} gap={40}>
          <Stack gap={10}>
            <Stack alignItems="end" gap={10}>
              <Box width="100%">
                <TextField
                  id="mobile"
                  label="Phone number"
                  placeholder="phone number"
                  type="text"
                  value={mobile}
                  onChange={_handleMobileChange}
                  error={mobileErr}
                  helperText={mobileHelper}
                />
              </Box>
              <Box color="text.secondary" fontSize={12}>
                An OTP will be sent to the given mobile number
              </Box>
            </Stack>
            <TextField
              id="email"
              label="Email"
              placeholder="email"
              type="email"
              value={email}
              onChange={_handleEmailChange}
              error={emailErr}
              helperText={emailHelper}
            />
          </Stack>
          <Stack gap={5}>
            <Button label="Continue" onClick={proceed} />
            <Box display="inline-block" fontSize={12} color="black">
              By continuing, you agree to BuyAsia&apos;s&nbsp;
              <Link href="#" fontWeight={700}>
                Conditions of Use
              </Link>
              &nbsp;and&nbsp;
              <Link href="#" fontWeight={700}>
                Privacy Policy.
              </Link>
            </Box>
          </Stack>
          <Stack gap={5} alignItems="center">
            <Box display="inline-block" fontSize={12} color="text.secondary">
              Already a Seller?
            </Box>
            <ButtonOutlined label="Login" onClick={navToLogin} />
          </Stack>
        </Stack>
      </Box>
      <AlertBox
        open={alert}
        message={message}
        setOpen={setAlert}
        severity={severity}
        minWidth="465px"
      />
    </Stack>
  );
}

export default SignUp;
