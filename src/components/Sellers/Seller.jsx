import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  Stack,
  Box,
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button
} from '@mui/material';
import SellerLogo from '../SellerLogo';
import ConfirmDialog from '../ConfirmDialog';
import ProgressDialog from '../ProgressDialog';
import { PROP_DATA, PROP_MESSAGE, PROP_RESPONSE } from '../../constants/properties';
import { SEV_ERROR, SEV_SUCCESS } from '../../constants/severities';
import AlertBox from '../AlertBox';
import BackButton from '../BackButton';
import { STATUS_ACTIVE, STATUS_REJECTED } from '../../constants/statuses';
import { reviewSeller } from '../../api/adminApi';
import RejectDialog from '../RejectDialog';
import ArContainer from '../ArContainer';

function Seller({ seller, setProgress, setMessage, setSeverity, setAlert, setView, setResponse }) {
  const [accept, setAccept] = useState(false);
  const [reject, setReject] = useState(false);
  const [rejReason, setRejReason] = useState('');

  const navigateToPrevious = () => {
    setView(0);
  };

  const openAcceptDialog = () => {
    setAccept(true);
  };

  const openRejectDialog = () => {
    setReject(true);
  };

  const onAccept = async () => {
    try {
      setProgress(true);
      const body = {
        sellerId: seller._id,
        upSeller: {
          status: STATUS_ACTIVE,
          rejReason
        }
      };

      const res = await reviewSeller(body);

      setMessage('Seller approved!');
      setSeverity(SEV_SUCCESS);
      setAlert(true);
      setResponse(res.data);
      setView(0);
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

  const onReject = async () => {
    try {
      setProgress(true);
      const body = {
        sellerId: seller._id,
        upSeller: {
          status: STATUS_REJECTED,
          rejReason
        }
      };

      const res = await reviewSeller(body);

      setMessage('Seller rejected!');
      setSeverity(SEV_SUCCESS);
      setAlert(true);
      setResponse(res.data);
      setView(0);
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
    <Stack gap={40} borderRadius={{ sm: 5, xs: 0 }} p={{ sm: 30, xs: 5 }} bgcolor="white">
      <Stack direction="row" gap={15} alignItems="center">
        <BackButton action={navigateToPrevious} />
        <Box display="inline-block" fontWeight={700} fontStyle="normal" color="black">
          {seller.basic.companyName}
        </Box>
      </Stack>

      <Stack px={{ md: '100px', xs: 0 }} gap={30}>
        <TableContainer>
          <Table sx={{ '& td': { border: 0, verticalAlign: 'top' } }}>
            <TableHead>
              <TableRow>
                <TableCell colSpan={2}>
                  <Typography>Basic Information</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography fontSize={14} fontWeight={700}>
                    Logo :
                  </Typography>
                </TableCell>
                <TableCell>
                  <ArContainer pt="100%" maxWidth="130px">
                    <Box p={2} border={1} lineHeight={0}>
                      <img width="100%" alt="Seller Logo" src={seller.basic.logo} />
                    </Box>
                  </ArContainer>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography fontSize={14} fontWeight={700}>
                    Type of the business :
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontSize={14}>{seller.basic.type}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography
                    fontSize={14}
                    fontWeight={700}
                    whiteSpace={{ sm: 'nowrap', xs: 'normal' }}>
                    Business registration number :
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontSize={14}>{seller.basic.brno}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography fontSize={14} fontWeight={700}>
                    Business / Trade name :
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontSize={14}>{seller.basic.tradeName}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography fontSize={14} fontWeight={700}>
                    Description about the seller :
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontSize={14}>{seller.basic.description}</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
            <TableHead>
              <TableRow>
                <TableCell colSpan={2}>
                  <Typography>Contact Information</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Array.isArray(seller.contact.contactNums) && seller.contact.contactNums.length
                ? seller.contact.contactNums.map((c, i) => {
                    return (
                      <TableRow key={i}>
                        <TableCell>
                          <Typography fontSize={14} fontWeight={700}>
                            Contact number :
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Typography fontSize={14}>{c}</Typography>
                        </TableCell>
                      </TableRow>
                    );
                  })
                : null}
              <TableRow>
                <TableCell>
                  <Typography fontSize={14} fontWeight={700}>
                    E-mail to contact :
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontSize={14}>{seller.contact.contactEmail}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography fontSize={14} fontWeight={700}>
                    Registered office address :
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography
                    fontSize={
                      14
                    }>{`${seller.contact.regAddress.addLine1}, ${seller.contact.regAddress.addLine2}, ${seller.contact.regAddress.city}, ${seller.contact.regAddress.zip}, ${seller.contact.regAddress.country}.`}</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
            <TableHead>
              <TableRow>
                <TableCell colSpan={2}>
                  <Typography>Contact Person</Typography>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell>
                  <Typography fontSize={14} fontWeight={700}>
                    Contact person name :
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontSize={14}>{seller.cp.cpName}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography fontSize={14} fontWeight={700}>
                    Contact number :
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontSize={14}>{seller.cp.cpContactNum}</Typography>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>
                  <Typography fontSize={14} fontWeight={700}>
                    Designation :
                  </Typography>
                </TableCell>
                <TableCell>
                  <Typography fontSize={14}>{seller.cp.cpDesignation}</Typography>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
        <Stack direction="row" gap={30} justifyContent="end">
          <Button onClick={openAcceptDialog} variant="contained" color="primary">
            Approve
          </Button>
          <Button onClick={openRejectDialog} variant="contained" color="error">
            Reject
          </Button>
        </Stack>
      </Stack>
      <ConfirmDialog
        open={accept}
        setOpen={setAccept}
        title="Are you sure to approve this seller?"
        onConfirm={onAccept}
        okLabel="Approve"
        cancelLabel="Cancel"
      />
      <RejectDialog
        open={reject}
        setOpen={setReject}
        title="Are you sure to reject this seller?"
        onConfirm={onReject}
        rejReason={rejReason}
        setRejReason={setRejReason}
        message="Please mention your reasons for rejection. The Seller will get this reason."
        okLabel="Reject"
        cancelLabel="Cancel"
      />
    </Stack>
  );
}

Seller.propTypes = {
  seller: PropTypes.object.isRequired,
  setProgress: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  setSeverity: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  setView: PropTypes.func.isRequired,
  setResponse: PropTypes.func.isRequired
};

export default Seller;
