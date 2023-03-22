import React, { useState, useEffect } from 'react';
import {
  Stack,
  Box,
  Grid,
  Typography,
  Button,
  TableContainer,
  Table,
  TableRow,
  TableCell,
  TableBody,
  IconButton
} from '@mui/material';
import { EditOutlined, DeleteOutlined } from '@mui/icons-material';
import {
  addCategory,
  addGroup,
  addSubCategory,
  getCategories,
  getGroups,
  getSubCategories
} from '../../api/adminApi';
import ProgressDialog from '../ProgressDialog';
import ImageSelectNPreview from '../ImageSelectNPreview';
import AlertBox from '../AlertBox';
import TextField from '../TextField';
import { storage } from '../../firebase';
import { validateAddCategory } from '../../validations';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { SEV_ERROR, SEV_SUCCESS } from '../../constants/severities';
import { PROP_DATA, PROP_MESSAGE, PROP_RESPONSE } from '../../constants/properties';
import Category from './Category';
import { isEmpty } from 'lodash';

function Categories() {
  const [progress, setProgress] = useState(false);
  const [alert, setAlert] = useState(false);
  const [severity, setSeverity] = useState('');
  const [message, setMessage] = useState('');
  const [catName, setCatName] = useState('');
  const [catNameErr, setCatNameErr] = useState(false);
  const [catNameHelper, setCatNameHelper] = useState('');
  const [catInputErr, setCatInputErr] = useState(false);
  const [catInputHelper, setCatInputHelper] = useState('');
  const [catImage, setCatImage] = useState({
    src: '',
    file: null,
    modFile: null,
    lastModFile: null,
    crop: { x: 0, y: 0 },
    zoom: 1
  });
  const [cats, setCats] = useState([]);
  const [prodCategory, setProdCategory] = useState('');
  const [subCatName, setSubCatName] = useState('');
  const [subCatNameErr, setSubCatNameErr] = useState(false);
  const [subCatNameHelper, setSubCatNameHelper] = useState('');
  const [subCatInputErr, setSubCatInputErr] = useState(false);
  const [subCatInputHelper, setSubCatInputHelper] = useState('');
  const [subCatImage, setSubCatImage] = useState({
    src: '',
    file: null,
    modFile: null,
    lastModFile: null,
    crop: { x: 0, y: 0 },
    zoom: 1
  });
  const [subCatAot, setSubCatAot] = useState(false);
  const [subCats, setSubCats] = useState([]);
  const [prodSubCategory, setProdSubCategory] = useState('');
  const [groupName, setGroupName] = useState('');
  const [groupNameErr, setGroupNameErr] = useState(false);
  const [groupNameHelper, setGroupNameHelper] = useState('');
  const [groupInputErr, setGroupInputErr] = useState(false);
  const [groupInputHelper, setGroupInputHelper] = useState('');
  const [groupImage, setGroupImage] = useState({
    src: '',
    file: null,
    modFile: null,
    lastModFile: null,
    crop: { x: 0, y: 0 },
    zoom: 1
  });
  const [groupAot, setGroupAot] = useState(false);
  const [groups, setGroups] = useState([]);
  const [prodGroup, setProdGroup] = useState('');
  const [openCat, setOpenCat] = useState(false);
  const [category, setCategory] = useState({});
  const [modCat, setModCat] = useState({});
  const [modSubCat, setModSubCat] = useState({});
  const [modGroup, setModGroup] = useState({});
  const [fetchedCats, setFetchedCats] = useState([]);
  const [fltSubCats, setFltSubCats] = useState([]);
  const [fetchedSubCats, setFetchedSubCats] = useState([]);
  const [fltGroups, setFltGroups] = useState([]);

  const getProdCats = async () => {
    try {
      const res = await getCategories();
      setCats(res.data.prodCats);
      const firstCat = res.data.prodCats.length ? res.data.prodCats[0]._id : '';
      setProdCategory(firstCat ? firstCat : '');
      setFetchedCats(firstCat ? [...fetchedCats, firstCat] : fetchedCats);

      setSubCats(res.data.prodSubCats);
      setFltSubCats(res.data.prodSubCats);
      const firstSubCat = res.data.prodSubCats.length ? res.data.prodSubCats[0]._id : null;
      setProdSubCategory(firstSubCat ? firstSubCat : '');
      setFetchedSubCats(firstSubCat ? [...fetchedSubCats, firstSubCat] : fetchedSubCats);

      setGroups(res.data.prodGroups);
      setFltGroups(res.data.prodGroups);
      setProdGroup(res.data.prodGroups.length ? res.data.prodGroups[0]._id : '');
      console.log('getProdCats');
    } catch (err) {
      console.log(err);
    }
  };

  const getProdSubCats = async (id = prodCategory) => {
    try {
      setProdCategory(id);
      setProdSubCategory('');
      setFltSubCats([]);
      setProdGroup('');
      setFltGroups([]);

      const fetched = fetchedCats.some((c) => c === id);

      if (fetched) {
        console.log('getProdSubCats already fetched');
        const filteredSubCats = subCats.filter((c) => c.prodCategory === id);

        setFltSubCats(filteredSubCats);

        if (filteredSubCats.length) {
          console.log('have subcats');
          setProdSubCategory(filteredSubCats[0]._id);
          const filteredGroups = groups.filter((c) => c.prodSubCategory === filteredSubCats[0]._id);
          setFltGroups(filteredGroups);
          if (filteredGroups.length) {
            console.log('have groups');
            setProdGroup(filteredGroups[0]._id);
          }
        }
      } else {
        console.log('getProdSubCats fetching....');
        const res = await getSubCategories(id);
        setFltSubCats(res.data.prodSubCats);
        setFltGroups(res.data.prodGroups);

        if (res.data.prodSubCats.length) {
          console.log('have subcats');
          setProdSubCategory(res.data.prodSubCats.length);
          let combinedSubCats = subCats.concat(res.data.prodSubCats);
          combinedSubCats = [...new Map(combinedSubCats.map((s) => [s._id, s])).values()];
          setSubCats(combinedSubCats);
          setFetchedSubCats([...fetchedSubCats, res.data.prodSubCats[0]._id]);
          setProdSubCategory(res.data.prodSubCats[0]._id);
        }

        if (res.data.prodGroups.length) {
          console.log('have groups');
          setProdGroup(res.data.prodGroups[0]._id);
          let combinedGroups = groups.concat(res.data.prodGroups);
          combinedGroups = [...new Map(combinedGroups.map((s) => [s._id, s])).values()];
          console.log(combinedGroups);
          setGroups(combinedGroups);
        }

        setFetchedCats([...fetchedCats, id]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getProdGroups = async (id = prodSubCategory) => {
    try {
      setProdSubCategory(id);
      setProdGroup('');

      const fetched = fetchedSubCats.some((c) => c === id);

      if (fetched) {
        console.log('getProdGroups already fetched');
        const filteredGroups = groups.filter((c) => c.prodSubCategory === id);
        setFltGroups(filteredGroups);
        if (filteredGroups.length) {
          console.log('have groups');
          setProdGroup(filteredGroups[0]._id);
        }
      } else {
        console.log('getProdGroups fetching....');
        const res = await getGroups(id);
        setFltGroups(res.data);

        if (res.data.length) {
          console.log('have groups');
          setProdGroup(res.data[0]._id);
          let combinedGroups = groups.concat(res.data);
          combinedGroups = [...new Map(combinedGroups.map((s) => [s._id, s])).values()];
          setGroups(combinedGroups);
        }
      }

      setFetchedSubCats([...fetchedSubCats, id]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getProdCats();
  }, []);

  function updateCats() {
    if (isEmpty(modCat)) return;

    const cloneCats = [...cats];
    const foundIndex = cloneCats.findIndex((r) => r._id === modCat._id);

    if (!isNaN(foundIndex)) {
      cloneCats[foundIndex] = modCat;
      setCats(cloneCats);
    }
  }

  useEffect(() => {
    updateCats();
  }, [modCat]);

  function updateSubCats() {
    if (isEmpty(modSubCat)) return;

    const cloneRows = [...subCats];
    const foundIndex = cloneRows.findIndex((r) => r._id === modSubCat._id);

    if (!isNaN(foundIndex)) {
      cloneRows[foundIndex] = modSubCat;
      setSubCats(cloneRows);
    }

    const cloneFltSubCats = [...fltSubCats];
    const subCatIndex = cloneFltSubCats.findIndex((r) => r._id === modSubCat._id);

    if (!isNaN(subCatIndex)) {
      cloneFltSubCats[subCatIndex] = modSubCat;
      setFltSubCats(cloneFltSubCats);
    }
  }

  useEffect(() => {
    updateSubCats();
  }, [modSubCat]);

  function updateGroups() {
    if (isEmpty(modGroup)) return;

    const cloneRows = [...groups];
    const foundIndex = cloneRows.findIndex((r) => r._id === modGroup._id);

    if (!isNaN(foundIndex)) {
      cloneRows[foundIndex] = modGroup;
      setGroups(cloneRows);
    }

    const cloneFltGroups = [...fltGroups];
    const groupIndex = cloneFltGroups.findIndex((r) => r._id === modGroup._id);

    if (!isNaN(groupIndex)) {
      cloneFltGroups[groupIndex] = modGroup;
      setFltGroups(cloneFltGroups);
    }
  }

  useEffect(() => {
    updateGroups();
  }, [modGroup]);

  const _handleCatNameChange = (e) => {
    if (catNameErr && catNameHelper.length) {
      setCatNameErr(false);
      setCatNameHelper('');
    }
    setCatName(e.target.value);
  };

  const addProdCat = async () => {
    try {
      setProgress(true);
      const error = validateAddCategory(
        catName,
        setCatNameErr,
        setCatNameHelper,
        catImage,
        setCatInputErr,
        setCatInputHelper
      );
      if (error) return;

      const storageRef = ref(storage, `buy-asia-admin/${catImage.modFile.name}`);
      const uploadResult = await uploadBytes(storageRef, catImage.modFile);
      const imageUrl = await getDownloadURL(uploadResult.ref);

      const body = {
        name: catName,
        imageUrl
      };

      const res = await addCategory(body);

      setMessage(`New product category added successfully`);
      setSeverity(SEV_SUCCESS);
      setAlert(true);
      setCatName('');
      setCatImage({
        src: '',
        file: null,
        modFile: null,
        lastModFile: null,
        crop: { x: 0, y: 0 },
        zoom: 1
      });
      setCats([...cats, res.data]);
      getProdSubCats(res.data._id);
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

  const _handleSubCatNameChange = (e) => {
    if (subCatNameErr && subCatNameHelper.length) {
      setSubCatNameErr(false);
      setSubCatNameHelper('');
    }
    setSubCatName(e.target.value);
  };

  const addProdSubCat = async () => {
    try {
      setProgress(true);
      const error = validateAddCategory(
        subCatName,
        setSubCatNameErr,
        setSubCatNameHelper,
        subCatImage,
        setSubCatInputErr,
        setSubCatInputHelper
      );
      if (error) return;

      const storageRef = ref(storage, `buy-asia-admin/${subCatImage.modFile.name}`);
      const uploadResult = await uploadBytes(storageRef, subCatImage.modFile);
      const imageUrl = await getDownloadURL(uploadResult.ref);

      const body = {
        prodCategory,
        name: subCatName,
        imageUrl
      };

      const res = await addSubCategory(body);

      setMessage(`New product sub-category added successfully`);
      setSeverity(SEV_SUCCESS);
      setAlert(true);
      setSubCatName('');
      setSubCatImage({
        src: '',
        file: null,
        modFile: null,
        lastModFile: null,
        crop: { x: 0, y: 0 },
        zoom: 1
      });
      //await getProdSubCats();
      setSubCats([...subCats, res.data]);
      setFltSubCats([...fltSubCats, res.data]);
      getProdGroups(res.data._id);
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

  const _handleGroupNameChange = (e) => {
    if (groupNameErr && groupNameHelper.length) {
      setGroupNameErr(false);
      setGroupNameHelper('');
    }
    setGroupName(e.target.value);
  };

  const addProdGroup = async () => {
    try {
      setProgress(true);
      const error = validateAddCategory(
        groupName,
        setGroupNameErr,
        setGroupNameHelper,
        groupImage,
        setGroupInputErr,
        setGroupInputHelper
      );
      if (error) return;

      const storageRef = ref(storage, `buy-asia-admin/${groupImage.modFile.name}`);
      const uploadResult = await uploadBytes(storageRef, groupImage.modFile);
      const imageUrl = await getDownloadURL(uploadResult.ref);

      const body = {
        prodSubCategory,
        name: groupName,
        imageUrl
      };

      const res = await addGroup(body);

      setMessage(`New product group added successfully`);
      setSeverity(SEV_SUCCESS);
      setAlert(true);
      setGroupName('');
      setGroupImage({
        src: '',
        file: null,
        modFile: null,
        lastModFile: null,
        crop: { x: 0, y: 0 },
        zoom: 1
      });
      //await getProdGroups();
      setGroups([...groups, res.data]);
      setFltGroups([...fltGroups, res.data]);
      setProdGroup(res.data._id);
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

  const _handleCatClick = (id) => {
    if (prodCategory !== id) {
      getProdSubCats(id);
    }
  };

  const _handleSubCatClick = async (id) => {
    if (prodSubCategory !== id) {
      getProdGroups(id);
    }
  };

  const _handleGroupClick = async (id) => {
    setProdGroup(id);
  };

  const openEditCatDialog = (cat) => {
    setCategory(cat);
    setOpenCat(true);
  };

  return (
    <Stack p={{ sm: 30, xs: 5 }} position="relative">
      <AlertBox
        open={alert}
        severity={severity}
        message={message}
        setOpen={setAlert}
        top={90}
        left={0}
        right={0}
      />
      <Box overflow="hidden" borderRadius={{ sm: 5, xs: 0 }}>
        <Grid
          container
          p={{ sm: 30, xs: 5 }}
          rowSpacing={30}
          columnSpacing={{ md: 30, xs: 15 }}
          bgcolor="white">
          <Grid item xs={12}>
            <Box fontWeight={700}>Categories</Box>
          </Grid>
          <Grid item lg={4} sm={6} xs={12}>
            <Stack borderRadius={5} border="1px solid #9F9F9F" gap={20} pb={15}>
              <Box
                bgcolor="background.default"
                px={20}
                py={15}
                sx={{ borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}>
                <Typography fontWeight={700}>Categories</Typography>
              </Box>
              <Stack px={20} pt={20} gap={15}>
                <TextField
                  id="catName"
                  placeholder="category name"
                  type="text"
                  value={catName}
                  onChange={_handleCatNameChange}
                  error={catNameErr}
                  helperText={catNameHelper}
                />
                <ImageSelectNPreview
                  image={catImage}
                  setImage={setCatImage}
                  err={catInputErr}
                  setErr={setCatInputErr}
                  helper={catInputHelper}
                  setHelper={setCatInputHelper}
                />
                <Stack alignItems="end">
                  <Button onClick={addProdCat} variant="contained">
                    Add
                  </Button>
                </Stack>
              </Stack>
              <Box px={20}>
                <TableContainer>
                  <Table aria-label="simple table">
                    <TableBody>
                      {Array.isArray(cats) && cats.length ? (
                        cats.map((row) => (
                          <TableRow
                            key={row._id}
                            onClick={() => _handleCatClick(row._id)}
                            sx={{
                              '& td': { border: 0 },
                              backgroundColor:
                                row._id === prodCategory ? 'action.hover' : 'inherit',
                              cursor: row._id === prodCategory ? 'default' : 'pointer'
                            }}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>
                              <Stack direction="row" gap={5} justifyContent="end">
                                <IconButton
                                  size="small"
                                  color="primary"
                                  onClick={() => openEditCatDialog(row)}>
                                  <EditOutlined fontSize="small" />
                                </IconButton>
                                <IconButton size="small" color="primary">
                                  <DeleteOutlined fontSize="small" />
                                </IconButton>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow sx={{ '& td': { border: 0 } }}>
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
              </Box>
            </Stack>
          </Grid>
          <Grid item lg={4} sm={6} xs={12}>
            <Stack borderRadius={5} border="1px solid #9F9F9F" gap={20} pb={15}>
              <Box
                bgcolor="background.default"
                px={20}
                py={15}
                sx={{ borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}>
                <Typography fontWeight={700}>Sub Categories</Typography>
              </Box>
              <Stack px={20} pt={20} gap={15}>
                <TextField
                  id="subCatName"
                  placeholder="sub-category name"
                  type="text"
                  value={subCatName}
                  onChange={_handleSubCatNameChange}
                  error={subCatNameErr}
                  helperText={subCatNameHelper}
                />
                <ImageSelectNPreview
                  image={subCatImage}
                  setImage={setSubCatImage}
                  err={subCatInputErr}
                  setErr={setSubCatInputErr}
                  helper={subCatInputHelper}
                  setHelper={setSubCatInputHelper}
                />
                <Stack alignItems="end">
                  <Button onClick={addProdSubCat} variant="contained">
                    Add
                  </Button>
                </Stack>
              </Stack>
              <Box px={20}>
                <TableContainer>
                  <Table aria-label="simple table">
                    <TableBody>
                      {Array.isArray(fltSubCats) && fltSubCats.length ? (
                        fltSubCats.map((row) => (
                          <TableRow
                            onClick={() => _handleSubCatClick(row._id)}
                            key={row._id}
                            sx={{
                              '& td': { border: 0 },
                              backgroundColor:
                                row._id === prodSubCategory ? 'action.hover' : 'inherit',
                              cursor: row._id === prodSubCategory ? 'default' : 'pointer'
                            }}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>
                              <Stack direction="row" gap={5} justifyContent="end">
                                <IconButton
                                  size="small"
                                  color="primary"
                                  onClick={() => openEditCatDialog(row)}>
                                  <EditOutlined fontSize="small" />
                                </IconButton>
                                <IconButton size="small" color="primary">
                                  <DeleteOutlined fontSize="small" />
                                </IconButton>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow sx={{ '& td': { border: 0 } }}>
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
              </Box>
            </Stack>
          </Grid>
          <Grid item lg={4} sm={6} xs={12}>
            <Stack borderRadius={5} border="1px solid #9F9F9F" gap={20} pb={15}>
              <Box
                bgcolor="background.default"
                px={20}
                py={15}
                sx={{ borderTopLeftRadius: '5px', borderTopRightRadius: '5px' }}>
                <Typography fontWeight={700}>Groups</Typography>
              </Box>
              <Stack px={20} pt={20} gap={15}>
                <TextField
                  id="groupName"
                  placeholder="group name"
                  type="text"
                  value={groupName}
                  onChange={_handleGroupNameChange}
                  error={groupNameErr}
                  helperText={groupNameHelper}
                />
                <ImageSelectNPreview
                  image={groupImage}
                  setImage={setGroupImage}
                  err={groupInputErr}
                  setErr={setGroupInputErr}
                  helper={groupInputHelper}
                  setHelper={setGroupInputHelper}
                />
                <Stack alignItems="end">
                  <Button onClick={addProdGroup} variant="contained">
                    Add
                  </Button>
                </Stack>
              </Stack>
              <Box px={20}>
                <TableContainer>
                  <Table aria-label="simple table">
                    <TableBody>
                      {Array.isArray(fltGroups) && fltGroups.length ? (
                        fltGroups.map((row) => (
                          <TableRow
                            onClick={() => _handleGroupClick(row._id)}
                            key={row._id}
                            sx={{
                              '& td': { border: 0 },
                              backgroundColor: row._id === prodGroup ? 'action.hover' : 'inherit',
                              cursor: row._id === prodGroup ? 'default' : 'pointer'
                            }}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>
                              <Stack direction="row" gap={5} justifyContent="end">
                                <IconButton
                                  size="small"
                                  color="primary"
                                  onClick={() => openEditCatDialog(row)}>
                                  <EditOutlined fontSize="small" />
                                </IconButton>
                                <IconButton size="small" color="primary">
                                  <DeleteOutlined fontSize="small" />
                                </IconButton>
                              </Stack>
                            </TableCell>
                          </TableRow>
                        ))
                      ) : (
                        <TableRow sx={{ '& td': { border: 0 } }}>
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
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Box>
      <Category
        open={openCat}
        setOpen={setOpenCat}
        category={category}
        setCategory={setCategory}
        setAlert={setAlert}
        setMessage={setMessage}
        setSeverity={setSeverity}
        setModCat={setModCat}
        setModSubCat={setModSubCat}
        setModGroup={setModGroup}
        setShowProgress={setProgress}
      />
      <ProgressDialog open={progress} />
    </Stack>
  );
}

export default Categories;
