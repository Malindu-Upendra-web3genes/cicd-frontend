import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { Stack, Box } from '@mui/material';
import TextField from '../../components/TextField';
import Button from '../../components/Button';
import Logo from '../../components/Logo';
import { OTP_REGEX } from '../../constants/regex';
import { PROP_DATA, PROP_MESSAGE, PROP_RESPONSE } from '../../constants/properties';
import { SEV_ERROR, SEV_SUCCESS } from '../../constants/severities';
import { verifyOtp } from '../../api/adminApi';
import StaticAlert from '../../components/StaticAlert';
import AlertBox from '../../components/AlertBox';
import { setSession } from '../../functions/session';

function VerifyOtp() {
  const [otp, setOtp] = useState('');
  const [otpErr, setOtpErr] = useState(false);
  const [otpHelper, setOtpHelper] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [severity, setSeverity] = useState('');
  const [message, setMessage] = useState('');

  const navigate = useNavigate();

  const { verifyKey } = useParams();

  const _handleOtpChange = (e) => {
    const currVal = e.target.value;

    if (otpErr) {
      setOtpErr(false);
      setOtpHelper('');
    }
    if (!currVal.length || OTP_REGEX.test(currVal)) {
      setOtp(currVal);
    }
  };

  const validateOtp = () => {
    let isErr = false;
    let errText = '';

    if (!otp.trim().length) {
      isErr = true;
      errText = 'Required';
    }

    setOtpErr(isErr);
    setOtpHelper(errText);
    return !isErr;
  };

  const proceed = async () => {
    try {
      const isValidOtp = validateOtp();

      if (isValidOtp) {
        const reqBody = {
          verifyKey,
          otp
        };
        const res = await verifyOtp(reqBody);
        setSession(res.data, res.headers['x-authtoken']);
        navigate('/', {
          state: {
            message: 'Successfully logged in'
          }
        });
      }
    } catch (err) {
      if (PROP_RESPONSE in err)
        if (PROP_DATA in err.response)
          if (PROP_MESSAGE in err.response.data) {
            setMessage(err.response.data.message);
            setSeverity(SEV_ERROR);
            setAlertOpen(true);
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
        borderBottom={4}
        borderRadius={5}
        borderColor="secondary.main"
        px={40}
        py={70}
        gap={50}>
        <Stack gap={10}>
          <Stack alignItems="end" gap={10}>
            <Box width="100%">
              <TextField
                id="otp"
                label="OTP"
                placeholder="OTP"
                type="text"
                value={otp}
                onChange={_handleOtpChange}
                error={otpErr}
                helperText={otpHelper}
              />
            </Box>
            <Box color="text.secondary" fontSize={12}>
              02:00min Time remaining
            </Box>
          </Stack>
        </Stack>
        <Stack alignItems="center" gap={20}>
          <Button label="Verify OTP" onClick={proceed} />
          <Box display="inline-block" fontSize={12} color="text.secondary">
            Didn&apos;t receive code?&nbsp;
            <Box display="inline-block" color="black" fontWeight={700} sx={{ cursor: 'pointer' }}>
              Request again
            </Box>
          </Box>
        </Stack>
      </Stack>
      <AlertBox
        open={alertOpen}
        setOpen={setAlertOpen}
        severity={severity}
        message={message}
        minWidth="465px"
      />
    </Stack>
  );
}

export default VerifyOtp;
