import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Dialog, Button, Typography, Stack } from '@mui/material';
import {
  PROP_DATA,
  PROP_MESSAGE,
  PROP_PROD_CAT,
  PROP_PROD_SUBCAT,
  PROP_RESPONSE
} from '../../constants/properties';
import { isEmpty, isEqual } from 'lodash';
import ImageSelectNPreview from '../ImageSelectNPreview';
import TextField from '../TextField';
import { validateAddCategory } from '../../validations';
import { modifyCategory, modifyGroup, modifySubCategory } from '../../api/adminApi';
import { SEV_ERROR, SEV_SUCCESS } from '../../constants/severities';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import { storage } from '../../firebase';
import CheckBox from '../CheckBox';

function Category({
  open,
  setOpen,
  category,
  setCategory,
  setAlert,
  setMessage,
  setSeverity,
  setModCat,
  setModSubCat,
  setModGroup,
  setShowProgress
}) {
  const [name, setName] = useState('');
  const [nameErr, setNameErr] = useState(false);
  const [nameHelper, setNameHelper] = useState('');
  const [image, setImage] = useState({
    src: '',
    file: null,
    modFile: null,
    lastModFile: null,
    crop: {
      x: 0,
      y: 0
    },
    zoom: 1
  });
  const [inputErr, setInputErr] = useState(false);
  const [inputHelper, setInputHelper] = useState('');

  useEffect(() => {
    setName(category.name ? category.name : name);
    setImage(
      category.imageUrl
        ? { ...image, src: category.imageUrl }
        : {
            src: '',
            file: null,
            modFile: null,
            lastModFile: null,
            crop: {
              x: 0,
              y: 0
            },
            zoom: 1
          }
    );
  }, [category]);

  const _handleNameChange = (e) => {
    setNameErr(false);
    setNameHelper('');
    setName(e.target.value);
  };

  const _handleCancel = () => {
    setNameErr(false);
    setNameHelper('');
    setInputErr(false);
    setInputHelper('');
    setCategory({});
    setOpen(false);
  };

  const modifyProdCat = async () => {
    try {
      setShowProgress(true);
      const error = validateAddCategory(
        name,
        setNameErr,
        setNameHelper,
        image,
        setInputErr,
        setInputHelper
      );
      if (error) return;

      let imageUrl = image.src;

      if (!imageUrl) {
        console.log('uploading image...');
        const storageRef = ref(storage, `buy-asia-admin/${image.modFile.name}`);
        const uploadResult = await uploadBytes(storageRef, image.modFile);
        imageUrl = await getDownloadURL(uploadResult.ref);
      }

      const body = {
        id: category._id,
        upBody: {
          name,
          imageUrl
        }
      };

      if (PROP_PROD_SUBCAT in category) {
        console.log('Upadating product group...');
        const res = await modifyGroup(body);
        setModGroup(res.data);
        setMessage(`Product group modified successfully`);
        setSeverity(SEV_SUCCESS);
        setAlert(true);
        setOpen(false);
      } else if (PROP_PROD_CAT in category) {
        console.log('Upadating product sub category...');
        const res = await modifySubCategory(body);
        setModSubCat(res.data);
        setMessage(`Sub category modified successfully`);
        setSeverity(SEV_SUCCESS);
        setAlert(true);
        setOpen(false);
      } else {
        console.log('Upadating product category...');
        const res = await modifyCategory(body);
        setModCat(res.data);
        setMessage(`Category modified successfully`);
        setSeverity(SEV_SUCCESS);
        setAlert(true);
        setOpen(false);
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
    } finally {
      setShowProgress(false);
    }
  };
  function isCategoryModified() {
    const originCategory = {
      name: category.name,
      imageUrl: category.imageUrl
    };

    const modCategory = {
      name,
      imageUrl: image.src
    };

    console.log(`isCategoryModified:${!isEqual(originCategory, modCategory)}`);

    return !isEqual(originCategory, modCategory);
  }

  return (
    <Dialog open={open} PaperProps={{ style: { borderRadius: 5 } }}>
      {!isEmpty(category) ? (
        <Stack width={400} bgcolor="white" p={30} gap={30}>
          <Typography fontWeight={700}>{category.name}</Typography>
          <TextField
            id="name"
            label="name"
            placeholder="name"
            type="text"
            value={name}
            onChange={_handleNameChange}
            error={nameErr}
            helperText={nameHelper}
          />
          <ImageSelectNPreview
            image={image}
            setImage={setImage}
            err={inputErr}
            setErr={setInputErr}
            helper={inputHelper}
            setHelper={setInputHelper}
          />
          {PROP_PROD_CAT in category || PROP_PROD_SUBCAT in category ? (
            <CheckBox label="aot" value={category.aot} disabled={true} size="small" />
          ) : null}
          <Stack direction="row" justifyContent="end" gap={30}>
            <Button onClick={_handleCancel} variant="outlined">
              Cancel
            </Button>
            <Button
              onClick={modifyProdCat}
              variant="contained"
              disabled={!isCategoryModified() ? true : false}>
              Save
            </Button>
          </Stack>
        </Stack>
      ) : null}
    </Dialog>
  );
}

Category.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  category: PropTypes.object.isRequired,
  setCategory: PropTypes.func.isRequired,
  setAlert: PropTypes.func.isRequired,
  setMessage: PropTypes.func.isRequired,
  setSeverity: PropTypes.func.isRequired,
  setModCat: PropTypes.func.isRequired,
  setModSubCat: PropTypes.func.isRequired,
  setModGroup: PropTypes.func.isRequired,
  setShowProgress: PropTypes.func.isRequired
};

export default Category;
