import React from 'react';
import PropTypes from 'prop-types';
import { Box, Stack, Grid, IconButton, Button } from '@mui/material';
import { useFormik } from 'formik';
import { ChevronLeft } from '@mui/icons-material';
import ChipDropdown from './AddBrand/ChipDropdown';
import ImageSelectNPreview from '../ImageSelectNPreview';
import TextField from '../TextField';
import { validateModify } from '../../validations/brand_validations';
import { isEqual } from 'lodash';
import { PROP_DATA, PROP_MESSAGE, PROP_RESPONSE } from '../../constants/properties';
import { SEV_ERROR, SEV_SUCCESS } from '../../constants/severities';
import { storage } from '../../firebase';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { modify } from '../../api/brand_api';

function ModifyBrand({
  brand,
  setAlert,
  setMessage,
  setSeverity,
  setView,
  setModBrand,
  setProgress,
  categories
}) {
  const navToPrevious = () => {
    setView('');
  };

  const formik = useFormik({
    initialValues: {
      name: brand.name,
      categories: brand.categories,
      image: {
        src: brand.imageUrl,
        file: null,
        modFile: null,
        lastModFile: null,
        crop: { x: 0, y: 0 },
        zoom: 1
      }
    },
    validate: validateModify,
    onSubmit: async (values, { resetForm }) => {
      try {
        setProgress(true);

        let imageUrl = values.image.src;

        if (values.image.modFile) {
          const storageRef = ref(storage, `buy-asia-admin/${values.image.modFile.name}`);
          const uploadResult = await uploadBytes(storageRef, values.image.modFile);
          imageUrl = await getDownloadURL(uploadResult.ref);
        }

        const reqBody = {
          id: brand._id,
          upBody: {
            name: values.name,
            imageUrl
          }
        };

        const res = await modify(reqBody);
        setMessage('Brand updated successfully!');
        setSeverity(SEV_SUCCESS);
        setAlert(true);
        setModBrand(res.data);
        setView('');
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

  function isBrandModified() {
    const originProduct = {
      name: brand.name,
      categories: brand.categories,
      imageUrl: brand.imageUrl
    };

    const modProduct = {
      name: formik.values.name,
      categories: formik.values.categories,
      imageUrl: formik.values.image.src || ''
    };

    return !isEqual(originProduct, modProduct);
  }

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
              disabled={true}
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
            <Button type="submit" variant="contained" disabled={!isBrandModified()}>
              Save
            </Button>
          </Grid>
        </Grid>
      </form>
    </Stack>
  );
}

ModifyBrand.propTypes = {
  brand: PropTypes.object.isRequired,
  setAlert: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  setSeverity: PropTypes.func.isRequired,
  setView: PropTypes.func.isRequired,
  setModBrand: PropTypes.func.isRequired,
  setProgress: PropTypes.func.isRequired,
  categories: PropTypes.array.isRequired
};

export default ModifyBrand;
