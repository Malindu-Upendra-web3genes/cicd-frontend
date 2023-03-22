import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  Stack,
  Box,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TablePagination,
  IconButton
} from '@mui/material';
import { VisibilityOutlined, FilterAltOutlined, FilterAltOffOutlined } from '@mui/icons-material';
import DatePicker from '../DatePicker';
import Button from '../Button';
import { getSellers } from '../../api/adminApi';
import StyledTableRow from '../StyledTableRow';
import Seller from './Seller';
import ProgressDialog from '../ProgressDialog';
import AlertBox from '../AlertBox';
import { validateDateRange } from '../../validations/fields';

function Sellers({ rowsPerPage }) {
  const [progress, setProgress] = useState(false);
  const [alert, setAlert] = useState(false);
  const [severity, setSeverity] = useState('');
  const [message, setMessage] = useState('');
  const [view, setView] = useState(0);
  const [from, setFrom] = useState('');
  const [fromErr, setFromErr] = useState(false);
  const [fromHelper, setFromHelper] = useState('');
  const [to, setTo] = useState('');
  const [toErr, setToErr] = useState(false);
  const [toHelper, setToHelper] = useState('');
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [response, setResponse] = useState({});
  const [seller, setSeller] = useState({});
  const [filtered, setFiltered] = useState(false);

  async function getData(currPage, reset) {
    try {
      const res = await getSellers(
        currPage * rowsPerPage,
        currPage * rowsPerPage + rowsPerPage,
        from,
        to
      );
      let cloneRows = [...rows];

      if (reset) {
        cloneRows = [];
        setTotalRecords(res.data.numOfDocs);
      }
      const newRows = cloneRows.concat(res.data.data);
      setRows(newRows);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getData(0, true);
  }, [response, filtered]);

  const _handleFromChange = (e) => {
    if (fromErr && fromHelper.length) {
      setFromErr(false);
      setFromHelper('');
    }

    console.log(e.target.value);
    setFrom(e.target.value);
  };

  const _handleToChange = (e) => {
    if (toErr && toHelper.length) {
      setToErr(false);
      setToHelper('');
    }

    console.log(e.target.value);
    setTo(e.target.value);
  };

  const filter = async () => {
    try {
      if (!filtered) {
        const validated = validateDateRange(
          from,
          setFromErr,
          setFromHelper,
          to,
          setToErr,
          setToHelper
        );
        if (!validated) return;
        setFiltered(true);
      } else {
        setFrom('');
        setTo('');
        setFiltered(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleChangePage = async (event, newPage) => {
    setPage(newPage);
    if (newPage * rowsPerPage + rowsPerPage > Math.ceil(rows.length / rowsPerPage) * rowsPerPage) {
      await getData(newPage, false);
    }
  };

  const viewSeller = (seller) => {
    setSeller(seller);
    setView(1);
  };

  return (
    <Stack p={{ sm: 30, xs: 5 }} position="relative">
      {(() => {
        switch (view) {
          case 1:
            return (
              <Seller
                seller={seller}
                setProgress={setProgress}
                setMessage={setMessage}
                setSeverity={setSeverity}
                setAlert={setAlert}
                setView={setView}
                setResponse={setResponse}
              />
            );
          default:
            return (
              <Box overflow="hidden" borderRadius={{ sm: 5, xs: 0 }}>
                <Grid
                  container
                  p={{ sm: 30, xs: 5 }}
                  rowSpacing={40}
                  columnSpacing={50}
                  bgcolor="white">
                  <Grid item xs={12}>
                    <Box fontWeight={700}>View New Sellers</Box>
                  </Grid>
                  <Grid
                    item
                    md={3}
                    xs={12}
                    display="flex"
                    justifyContent={{ md: 'center', xs: 'start' }}
                    alignItems={fromErr || toErr ? 'center' : 'end'}>
                    <Box height={{ md: 35, xs: 0 }}>View by date</Box>
                  </Grid>
                  <Grid item md={3} sm={6} xs={12}>
                    <DatePicker
                      title="from"
                      label="From"
                      value={from}
                      onChange={_handleFromChange}
                      error={fromErr}
                      helperText={fromHelper}
                    />
                  </Grid>
                  <Grid item md={3} sm={6} xs={12}>
                    <DatePicker
                      title="to"
                      label="To"
                      value={to}
                      onChange={_handleToChange}
                      error={toErr}
                      helperText={toHelper}
                      disabled={from ? false : true}
                    />
                  </Grid>
                  <Grid
                    item
                    md={3}
                    xs={12}
                    display="flex"
                    justifyContent={{ md: 'start', xs: 'end' }}
                    alignItems={fromErr || toErr ? 'center' : 'end'}>
                    <IconButton
                      size="small"
                      color="primary"
                      onClick={filter}
                      disabled={from && to ? false : true}>
                      {!filtered ? (
                        <FilterAltOutlined fontSize="medium" />
                      ) : (
                        <FilterAltOffOutlined fontSize="medium" />
                      )}
                    </IconButton>
                  </Grid>
                  <Grid item xs={12}>
                    <TableContainer>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>Ref number</TableCell>
                            <TableCell>Company Name</TableCell>
                            <TableCell>CRN</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Trade Name</TableCell>
                            <TableCell>View</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Array.isArray(rows) && rows.length ? (
                            rows
                              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((row) => (
                                <StyledTableRow key={row._id}>
                                  <TableCell>{row.code}</TableCell>
                                  <TableCell>{row.basic.companyName}</TableCell>
                                  <TableCell>{row.basic.brno}</TableCell>
                                  <TableCell>{row.basic.type}</TableCell>
                                  <TableCell>{row.basic.tradeName}</TableCell>
                                  <TableCell>
                                    <IconButton
                                      size="small"
                                      color="primary"
                                      onClick={() => viewSeller(row)}>
                                      <VisibilityOutlined fontSize="small" />
                                    </IconButton>
                                  </TableCell>
                                </StyledTableRow>
                              ))
                          ) : (
                            <TableRow>
                              <TableCell colSpan={5}>
                                <Stack alignItems="center" color="text.secondary">
                                  <Box fontSize={14} fontStyle="italic">
                                    No available data
                                  </Box>
                                </Stack>
                              </TableCell>
                            </TableRow>
                          )}
                        </TableBody>
                      </Table>
                    </TableContainer>
                    <TablePagination
                      component="div"
                      count={totalRecords}
                      rowsPerPage={rowsPerPage}
                      page={page}
                      onPageChange={handleChangePage}
                      rowsPerPageOptions={[]}
                    />
                  </Grid>
                </Grid>
              </Box>
            );
        }
      })()}
      <ProgressDialog open={progress} />
      <AlertBox
        open={alert}
        message={message}
        setOpen={setAlert}
        severity={severity}
        minWidth={{ sm: '400px', xs: '100%' }}
      />
    </Stack>
  );
}

Sellers.propTypes = {
  rowsPerPage: PropTypes.number.isRequired
};

export default Sellers;
