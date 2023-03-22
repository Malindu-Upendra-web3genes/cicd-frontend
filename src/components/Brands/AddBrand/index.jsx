import React from 'react';
import PropTypes from 'prop-types';
import { Box, Stack, Grid, IconButton, Button } from '@mui/material';
import TextField from '../../TextField';
import { useFormik } from 'formik';
import { validateAdd } from '../../../validations/brand_validations';
import { ChevronLeft } from '@mui/icons-material';
import ChipDropdown from './ChipDropdown';
import ImageSelectNPreview from '../../ImageSelectNPreview';
import { PROP_DATA, PROP_MESSAGE, PROP_RESPONSE } from '../../../constants/properties';
import { SEV_ERROR, SEV_SUCCESS } from '../../../constants/severities';
import { storage } from '../../../firebase';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { add } from '../../../api/brand_api';

function AddBrand({
  setView,
  categories,
  setProgress,
  setAlert,
  setSeverity,
  setMessage,
  setNewBrand
}) {
  const navToPrevious = () => {
    setView('');
  };

  const formik = useFormik({
    initialValues: {
      name: '',
      categories: [],
      image: {
        src: '',
        file: null,
        modFile: null,
        lastModFile: null,
        crop: { x: 0, y: 0 },
        zoom: 1
      }
    },
    validate: validateAdd,
    onSubmit: async (values, { resetForm }) => {
      try {
        setProgress(true);
        const storageRef = ref(storage, `buy-asia-admin/${values.image.modFile.name}`);
        const uploadResult = await uploadBytes(storageRef, values.image.modFile);
        const imageUrl = await getDownloadURL(uploadResult.ref);

        const body = {
          name: values.name,
          categories: values.categories,
          imageUrl
        };

        const res = await add(body);

        setMessage(`New brand added successfully`);
        setSeverity(SEV_SUCCESS);
        setAlert(true);
        setNewBrand(res.data);
        resetForm({ values: '' });
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
    }
  });

  const _handleNameChange = (e) => {
    formik.setFieldError('name', '');
    formik.setFieldValue('name', e.target.value, false);
  };

  const _handleAddCategory = (e) => {
    formik.setFieldError('categories', '');

    const lastIndex = e.target.value.length;

    const isExist = formik.values.categories.find((c) => c === e.target.value[lastIndex]);

    if (isExist) {
      console.log('isExist', e.target.value[lastIndex]);
      formik.setValues(
        'categories',
        formik.values.categories.filter((ac) => ac !== e.target.value[lastIndex]),
        false
      );
    } else {
      formik.setFieldValue('categories', e.target.value, false);
    }
  };

  const setImage = (value) => {
    formik.setFieldValue('image', value, false);
  };

  const setInputErr = (value) => {
    console.log(value);
  };

  const setInputHelper = (value) => {
    formik.setFieldError('image', value);
  };

  return (
    <Stack
      borderRadius={{ sm: 5, xs: 0 }}
      width={{ lg: 900, md: 750, sm: 400, xs: '100%' }}
      bgcolor="white"
      gap={{ md: 40, xs: 15 }}>
      <Stack
        direction="row"
        gap={5}
        alignItems="center"
        px={{ lg: 30, sm: 10, xs: 5 }}
        pt={{ lg: 30, sm: 20, xs: 15 }}>
        <Box lineHeight={0}>
          <IconButton size="small" color="primary" onClick={navToPrevious} disableRipple>
            <ChevronLeft fontSize="16px" />
          </IconButton>
        </Box>
        <Box fontWeight={700} fontStyle="normal" color="black">
          Add a New Brand
        </Box>
      </Stack>
      <form onSubmit={formik.handleSubmit}>
        <Grid
          container
          px={{ lg: 60, sm: 30, xs: 10 }}
          pb={{ lg: 30, sm: 20, xs: 15 }}
          rowSpacing={{ lg: 30, xs: 10 }}
          columnSpacing={{ lg: 50, xs: 30 }}>
          <Grid
            item
            display="flex"
            flexDirection="column"
            md={6}
            xs={12}
            gap={{ md: 30, xs: 10 }}
            alignItems="center">
            <TextField
              id="name"
              placeholder="Brand name"
              type="text"
              value={formik.values.name}
              onChange={_handleNameChange}
              error={formik.errors.name ? true : false}
              helperText={formik.errors.name}
            />
            <ChipDropdown
              id="categories"
              label="Categories"
              data={categories}
              values={formik.values.categories}
              onChange={_handleAddCategory}
              error={formik.errors.categories ? true : false}
              helperText={formik.errors.categories}
            />
          </Grid>
          <Grid item md={6} xs={12}>
            <ImageSelectNPreview
              image={formik.values.image}
              setImage={setImage}
              err={formik.errors.image ? true : false}
              setErr={setInputErr}
              helper={formik.errors.image}
              setHelper={setInputHelper}
            />
          </Grid>
          <Grid item display="flex" xs={12} justifyContent="end">
            <Button type="submit" variant="contained">
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </Stack>
  );
}

AddBrand.propTypes = {
  setView: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired,
  setProgress: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  setSeverity: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  setNewBrand: PropTypes.func.isRequired
};

export default AddBrand;
