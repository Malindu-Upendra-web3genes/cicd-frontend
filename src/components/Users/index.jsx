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
import { VisibilityOutlined } from '@mui/icons-material';
import { getUsers } from '../../api/adminApi';
import StyledTableRow from '../StyledTableRow';
import User from './User';
import ProgressDialog from '../ProgressDialog';
import AlertBox from '../AlertBox';

function Users({ rowsPerPage }) {
  const [progress, setProgress] = useState(false);
  const [alert, setAlert] = useState(false);
  const [severity, setSeverity] = useState('');
  const [message, setMessage] = useState('');
  const [view, setView] = useState(0);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [response, setResponse] = useState({});
  const [user, setUser] = useState({});
  const [search, setSearch] = useState('');

  async function getData(currPage, reset) {
    try {
      const res = await getUsers(
        currPage * rowsPerPage,
        currPage * rowsPerPage + rowsPerPage,
        search
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
  }, [response]);

  const handleChangePage = async (event, newPage) => {
    setPage(newPage);
    if (newPage * rowsPerPage + rowsPerPage > Math.ceil(rows.length / rowsPerPage) * rowsPerPage) {
      await getData(newPage, false);
    }
  };

  const viewUser = (user) => {
    setUser(user);
    setView(1);
  };

  return (
    <Stack p={{ sm: 30, xs: 5 }} position="relative">
      {(() => {
        switch (view) {
          case 1:
            return (
              <User
                user={user}
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
                    <Box fontWeight={700}>Admin List</Box>
                  </Grid>
                  <Grid item xs={12}>
                    <TableContainer>
                      <Table aria-label="simple table">
                        <TableHead>
                          <TableRow>
                            <TableCell>First Name</TableCell>
                            <TableCell>Last Name</TableCell>
                            <TableCell>Contact Number</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>View</TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {Array.isArray(rows) && rows.length ? (
                            rows
                              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                              .map((row) => (
                                <StyledTableRow key={row._id}>
                                  <TableCell>{row.firstName}</TableCell>
                                  <TableCell>{row.lastName}</TableCell>
                                  <TableCell>{row.mobile}</TableCell>
                                  <TableCell>{row.email}</TableCell>
                                  <TableCell>{row.status}</TableCell>
                                  <TableCell>
                                    <IconButton
                                      size="small"
                                      color="primary"
                                      onClick={() => viewUser(row)}>
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

Users.propTypes = {
  rowsPerPage: PropTypes.number.isRequired
};

export default Users;
