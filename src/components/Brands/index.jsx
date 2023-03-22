import React, { useState, useEffect, Fragment } from 'react';
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
  IconButton,
  Typography,
  Button,
  TableSortLabel
} from '@mui/material';
import {
  VisibilityOutlined,
  DeleteOutlined,
  RestoreFromTrashOutlined,
  AddOutlined
} from '@mui/icons-material';
import { getWpgn } from '../../api/brand_api';
import { getCategories } from '../../api/adminApi';
import StyledTableRow from '../StyledTableRow';
import ModifyBrand from './ModifyBrand';
import ProgressDialog from '../ProgressDialog';
import AlertBox from '../AlertBox';
import { VIEW_ADD_BRAND, VIEW_BRAND } from '../../constants/views';
import ArContainer from '../ArContainer';
import Dropdown from '../Dropdown';
import TextField from '../TextField';
import { format } from '../../functions/date';
import DeterminateProgress from '../DeterminateProgress';
import { SEV_INFO } from '../../constants/severities';
import { isEmpty } from 'lodash';
import ModifyStatusDialog from './ModifyStatusDialog';
import { STATUS_ACTIVE, STATUS_INACTIVE } from '../../constants/statuses';
import AddBrand from './AddBrand';

function Brands({ rowsPerPage }) {
  const [showProgress, setShowProgress] = useState(false);
  const [alert, setAlert] = useState(false);
  const [severity, setSeverity] = useState(SEV_INFO);
  const [message, setMessage] = useState('');
  const [view, setView] = useState(0);
  const [rows, setRows] = useState([]);
  const [page, setPage] = useState(0);
  const [totalRecords, setTotalRecords] = useState(0);
  const [modBrand, setModBrand] = useState({});
  const [brand, setBrand] = useState({});
  const [search, setSearch] = useState('');
  const [showModify, setShowModify] = useState(false);
  const [cats, setCats] = useState(false);
  const [newBrand, setNewBrand] = useState({});

  async function getData(currPage, reset) {
    try {
      setShowProgress(true);
      let res = await getWpgn(currPage * rowsPerPage, currPage * rowsPerPage + rowsPerPage, search);
      let cloneRows = [...rows];

      if (reset) {
        cloneRows = [];
        setTotalRecords(res.data.numOfDocs);
      }
      const newRows = cloneRows.concat(res.data.data);
      setRows(newRows);
      res = await getCategories();

      const categories = res.data.prodCats;

      setCats(
        categories.map((c) => {
          return {
            id: c._id,
            label: c.name
          };
        })
      );
    } catch (err) {
      console.log(err);
    } finally {
      setShowProgress(false);
    }
  }

  useEffect(() => {
    getData(0, true);
  }, [search, newBrand]);

  function updateData() {
    console.log('updateDate running');
    if (isEmpty(modBrand)) return;

    const cloneRows = [...rows];
    const foundIndex = cloneRows.findIndex((r) => r._id === modBrand._id);

    if (!isNaN(foundIndex)) {
      cloneRows[foundIndex] = modBrand;
      setRows(cloneRows);
    }
  }

  useEffect(() => {
    updateData();
  }, [modBrand]);

  const handleChangePage = async (event, newPage) => {
    setPage(newPage);
    if (newPage * rowsPerPage + rowsPerPage > Math.ceil(rows.length / rowsPerPage) * rowsPerPage) {
      await getData(newPage, false);
    }
  };

  const _handleSearchChange = (e) => {
    setSearch(e.target.value);
  };

  const viewProduct = (prod) => {
    setBrand(prod);
    setView(VIEW_BRAND);
  };

  const openModifyDialog = (prod) => {
    setBrand(prod);
    setShowModify(true);
  };

  const viewAddBrand = () => {
    setView(VIEW_ADD_BRAND);
  };

  return (
    <Fragment>
      <AlertBox
        open={alert}
        severity={severity}
        message={message}
        setOpen={setAlert}
        top={90}
        left={0}
        right={0}
      />
      {(() => {
        switch (view) {
          case VIEW_ADD_BRAND:
            return (
              <Stack p={{ sm: 30, xs: 5 }} alignItems={{ sm: 'center', xs: 'start' }}>
                <AddBrand
                  setView={setView}
                  categories={cats}
                  setProgress={setShowProgress}
                  setAlert={setAlert}
                  setMessage={setMessage}
                  setSeverity={setSeverity}
                  setNewBrand={setNewBrand}
                />
              </Stack>
            );
          case VIEW_BRAND:
            return (
              <Stack p={{ sm: 30, xs: 5 }} alignItems={{ sm: 'center', xs: 'start' }}>
                <ModifyBrand
                  brand={brand}
                  setAlert={setAlert}
                  setMessage={setMessage}
                  setSeverity={setSeverity}
                  setView={setView}
                  setModBrand={setModBrand}
                  setProgress={setShowProgress}
                  categories={cats}
                />
              </Stack>
            );
          default:
            return (
              <Stack p={{ sm: 30, xs: 5 }}>
                <Box overflow="hidden" borderRadius={{ sm: 5, xs: 0 }}>
                  <Grid
                    container
                    p={{ sm: 30, xs: 5 }}
                    rowSpacing={40}
                    columnSpacing={{ lg: 30, sm: 15, xs: 5 }}
                    bgcolor="white"
                    alignItems="end">
                    <Grid item xs={12}>
                      <Typography fontWeight={700}>Brands</Typography>
                      <Typography fontSize={14} color="text.secondary">
                        {totalRecords}&nbsp;brand{totalRecords > 1 ? 's' : null}
                      </Typography>
                    </Grid>
                    <Grid item lg={3} md={4} sm={6} xs={10}>
                      <TextField
                        id="search"
                        placeholder="search"
                        type="text"
                        value={search}
                        onChange={_handleSearchChange}
                      />
                    </Grid>
                    <Grid item lg={3} md={4} sm={6} xs={2}>
                      <Box display="flex" height={35} alignItems="center">
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={viewAddBrand}
                          disableRipple>
                          <AddOutlined fontSize="inherit" />
                        </IconButton>
                      </Box>
                    </Grid>
                    <Grid item xs={12}>
                      <TableContainer>
                        <Table>
                          <TableHead>
                            <TableRow>
                              <TableCell></TableCell>
                              <TableCell>Name</TableCell>
                              <TableCell align="center">Actions</TableCell>
                            </TableRow>
                          </TableHead>
                          <TableBody>
                            {Array.isArray(rows) && rows.length ? (
                              rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => (
                                  <TableRow
                                    key={row._id}
                                    sx={{
                                      '&:last-child td': { border: 0 },
                                      '& td': {
                                        color:
                                          row.status === STATUS_ACTIVE ? 'black' : 'disabled.main'
                                      }
                                    }}>
                                    <TableCell>
                                      <Box width={{ xs: 80 }}>
                                        <img
                                          width="100%"
                                          height="100%"
                                          alt="Product Image"
                                          src={row.imageUrl}
                                        />
                                      </Box>
                                    </TableCell>
                                    <TableCell>{row.name}</TableCell>
                                    <TableCell align="center">
                                      {(() => {
                                        switch (row.status) {
                                          case STATUS_ACTIVE:
                                            return (
                                              <Stack direction="row" justifyContent="center">
                                                <IconButton
                                                  size="small"
                                                  color="primary"
                                                  onClick={() => viewProduct(row)}>
                                                  <VisibilityOutlined fontSize="inherit" />
                                                </IconButton>
                                                <IconButton
                                                  size="small"
                                                  color="error"
                                                  onClick={() => openModifyDialog(row)}>
                                                  <DeleteOutlined fontSize="inherit" />
                                                </IconButton>
                                              </Stack>
                                            );
                                          case STATUS_INACTIVE:
                                            return (
                                              <IconButton
                                                size="small"
                                                color="success"
                                                onClick={() => openModifyDialog(row)}>
                                                <RestoreFromTrashOutlined fontSize="inherit" />
                                              </IconButton>
                                            );
                                        }
                                      })()}
                                    </TableCell>
                                  </TableRow>
                                ))
                            ) : (
                              <TableRow>
                                <TableCell colSpan={7}>
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
              </Stack>
            );
        }
      })()}
      <ModifyStatusDialog
        open={showModify}
        setOpen={setShowModify}
        brand={brand}
        setAlert={setAlert}
        setMessage={setMessage}
        setSeverity={setSeverity}
        setModBrand={setModBrand}
        setShowProgress={setShowProgress}
      />
      <ProgressDialog open={showProgress} />
    </Fragment>
  );
}

Brands.propTypes = {
  rowsPerPage: PropTypes.number
};

Brands.defaultProps = {
  rowsPerPage: 10
};

export default Brands;
