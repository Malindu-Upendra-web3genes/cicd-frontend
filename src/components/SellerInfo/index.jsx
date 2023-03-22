import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Stack, Grid, Box } from '@mui/material';
import { ref, getDownloadURL, uploadBytes } from 'firebase/storage';
import ChevronArrow from '../ChevronArrow';
import TextField from '../TextField';
import TextArea from '../TextArea';
import Button from '../Button';
import Contact from '../Contact';
import AlertDialog from '../AlertDialog';
import ProgressDialog from '../ProgressDialog';
import { VARIANT_ERROR, VARIANT_INFO } from '../../constants/variants';
import { PROP_DATA, PROP_MESSAGE, PROP_RESPONSE } from '../../constants/properties';
import { addInfo } from '../../api/sellerApi';
import Confetti from '../../assets/images/confetti.png';
import Dropdown from '../Dropdown';
import ImageUpload from '../ImageUpload';
import { storage } from '../../firebase';

function SellerInfo({ setUser }) {
  const [companyName, setCname] = useState('');
  const [cNameErr, setCnameErr] = useState(false);
  const [cNameHelper, setCnameHelper] = useState('');
  const [inputErr, setInputErr] = useState(false);
  const [inputHelper, setInputHelper] = useState('');
  const [files, setFiles] = useState([]);
  const [isCropped, setIsCropped] = useState(false);
  const [type, setType] = useState('');
  const [typeErr, setTypeErr] = useState(false);
  const [typeHelper, setTypeHelper] = useState('');
  const [brno, setBrno] = useState('');
  const [brnoErr, setBrnoErr] = useState(false);
  const [brnoHelper, setBrnoHelper] = useState('');
  const [tradeName, setTname] = useState('');
  const [tNameErr, setTnameErr] = useState(false);
  const [tNameHelper, setTnameHelper] = useState('');
  const [description, setDesc] = useState('');
  const [descErr, setDescErr] = useState(false);
  const [descHelper, setDescHelper] = useState('');
  const [page, setPage] = useState(0);
  const [firstBtnDisabled, setFirstBtnDisabled] = useState(true);
  const [secondBtnDisabled, setSecondBtnDisabled] = useState(true);
  const [lastBtnDisabled, setLastBtnDisabled] = useState(true);
  const [contactNums, setContactNums] = useState(['']);
  const [cNumErrs, setCnumErrs] = useState([false]);
  const [cNumHelpers, setCnumHelpers] = useState(['']);
  const [contactEmail, setCemail] = useState('');
  const [cEmailErr, setCemailErr] = useState(false);
  const [cEmailHelper, setCemailHelper] = useState('');
  const [addLine1, setAddLine1] = useState('');
  const [addLine1Err, setAddLine1Err] = useState(false);
  const [addLine1Helper, setAddLine1Helper] = useState('');
  const [addLine2, setAddLine2] = useState('');
  const [addLine2Err, setAddLine2Err] = useState(false);
  const [addLine2Helper, setAddLine2Helper] = useState('');
  const [city, setCity] = useState('');
  const [cityErr, setCityErr] = useState(false);
  const [cityHelper, setCityHelper] = useState('');
  const [zip, setZip] = useState('');
  const [zipErr, setZipErr] = useState(false);
  const [zipHelper, setZipHelper] = useState('');
  const countries = [
    { id: 'LK', label: 'Sri Lanka' },
    { id: 'GB', label: 'United Kingdom' }
  ];
  const [country, setCountry] = useState('');
  const [countryErr, setCountryErr] = useState(false);
  const [countryHelper, setCountryHelper] = useState('');
  const [cpName, setCpName] = useState('');
  const [cpNameErr, setCpNameErr] = useState(false);
  const [cpNameHelper, setCpNameHelper] = useState('');
  const [cpDesignation, setCpDesig] = useState('');
  const [cpDesigErr, setCpDesigErr] = useState(false);
  const [cpDesigHelper, setCpDesigHelper] = useState('');
  const [cpContactNum, setCpContact] = useState('');
  const [cpContactErr, setCpContactErr] = useState(false);
  const [cpContactHelper, setCpContactHelper] = useState('');
  const [alertOpen, setAlertOpen] = useState(false);
  const [variant, setVariant] = useState(VARIANT_INFO);
  const [message, setMessage] = useState('');
  const [progress, setProgress] = useState(false);

  const navigate = useNavigate();

  const _handleCnameChange = (e) => {
    if (cNameErr && cNameHelper.length) {
      setCnameErr(false);
      setCnameHelper('');
    }
    setCname(e.target.value);
  };

  const _handleTypeChange = (e) => {
    if (typeErr && typeHelper.length) {
      setTypeErr(false);
      setTypeHelper('');
    }
    setType(e.target.value);
  };

  const _handleBrnoChange = (e) => {
    if (brnoErr && brnoHelper.length) {
      setBrnoErr(false);
      setBrnoHelper('');
    }
    setBrno(e.target.value);
  };

  const _handleTnameChange = (e) => {
    if (tNameErr && tNameHelper.length) {
      setTnameErr(false);
      setTnameHelper('');
    }
    setTname(e.target.value);
  };

  const _handleDescChange = (e) => {
    if (descErr && descHelper.length) {
      setDescErr(false);
      setDescHelper('');
    }
    setDesc(e.target.value);
  };

  const _handleCnumsChange = (e, i) => {
    if (cNumErrs[i] && cNumHelpers[i].length) {
      let cloneCnumErrs = [...cNumErrs];
      let cloneCnumHelpers = [...cNumHelpers];

      cloneCnumErrs[i] = false;
      cloneCnumHelpers[i] = '';

      setCnumErrs(cloneCnumErrs);
      setCnumHelpers(cloneCnumHelpers);
    }
    let cloneCnums = [...contactNums];

    cloneCnums[i] = e.target.value;

    setContactNums(cloneCnums);
  };

  const _handleCemailChange = (e) => {
    if (cEmailErr && cEmailHelper.length) {
      setCemailErr(false);
      setCemailHelper('');
    }
    setCemail(e.target.value);
  };

  const _handleAddLine1Change = (e) => {
    if (addLine1Err && addLine1Helper.length) {
      setAddLine1Err(false);
      setAddLine1Helper('');
    }
    setAddLine1(e.target.value);
  };

  const _handleAddLine2Change = (e) => {
    if (addLine2Err && addLine2Helper.length) {
      setAddLine2Err(false);
      setAddLine2Helper('');
    }
    setAddLine2(e.target.value);
  };

  const _handleCityChange = (e) => {
    if (cityErr && cityHelper.length) {
      setCityErr(false);
      setCityHelper('');
    }
    setCity(e.target.value);
  };

  const _handleZipChange = (e) => {
    if (zipErr && zipHelper.length) {
      setZipErr(false);
      setZipHelper('');
    }
    setZip(e.target.value);
  };

  const _handleCountryChange = (e) => {
    if (countryErr && countryHelper.length) {
      setCountryErr(false);
      setCountryHelper('');
    }
    setCountry(e.target.value);
  };

  const _handleCpNameChange = (e) => {
    if (cpNameErr && cpNameHelper.length) {
      setCpNameErr(false);
      setCpNameHelper('');
    }
    setCpName(e.target.value);
  };

  const _handleCpDesigChange = (e) => {
    if (cpDesigErr && cpDesigHelper.length) {
      setCpDesigErr(false);
      setCpDesigHelper('');
    }
    setCpDesig(e.target.value);
  };

  const _handleCpContactChange = (e) => {
    if (cpContactErr && cpContactHelper.length) {
      setCpContactErr(false);
      setCpContactHelper('');
    }
    setCpContact(e.target.value);
  };

  const addNewContact = () => {
    let cloneCnums = [...contactNums];
    let cloneCnumErrs = [...cNumErrs];
    let cloneCnumHelpers = [...cNumHelpers];
    cloneCnums.push('');
    cloneCnumErrs.push(false);
    cloneCnumHelpers.push('');

    setContactNums(cloneCnums);
    setCnumErrs(cloneCnumErrs);
    setCnumHelpers(cloneCnumHelpers);
  };

  const removeContact = () => {
    let cloneCnums = [...contactNums];
    let cloneCnumErrs = [...cNumErrs];
    let cloneCnumHelpers = [...cNumHelpers];

    cloneCnums.pop();
    cloneCnumErrs.pop();
    cloneCnumHelpers.pop();

    setContactNums(cloneCnums);
    setCnumErrs(cloneCnumErrs);
    setCnumHelpers(cloneCnumHelpers);
  };

  const validateCname = () => {
    let isErr = false;
    let errText = '';
    if (!companyName.trim().length) {
      isErr = true;
      errText = 'Required';
    }
    setCnameErr(isErr);
    setCnameHelper(errText);
    return !isErr;
  };

  const validateFile = () => {
    let isErr = false;
    let errText = '';
    if (!files.length) {
      isErr = true;
      errText = 'Must select a file';
    } else if (!isCropped) {
      isErr = true;
      errText = 'save changes';
    }
    setInputErr(isErr);
    setInputHelper(errText);
    return !isErr;
  };

  const validateType = () => {
    let isErr = false;
    let errText = '';
    if (!type.trim().length) {
      isErr = true;
      errText = 'Required';
    }
    setTypeErr(isErr);
    setTypeHelper(errText);
    return !isErr;
  };

  const validateBrno = () => {
    let isErr = false;
    let errText = '';
    if (!brno.trim().length) {
      isErr = true;
      errText = 'Required';
    }
    setBrnoErr(isErr);
    setBrnoHelper(errText);
    return !isErr;
  };

  const validateTname = () => {
    let isErr = false;
    let errText = '';
    if (!tradeName.trim().length) {
      isErr = true;
      errText = 'Required';
    }
    setTnameErr(isErr);
    setTnameHelper(errText);
    return !isErr;
  };

  const validateDesc = () => {
    let isErr = false;
    let errText = '';
    if (!description.trim().length) {
      isErr = true;
      errText = 'Required';
    }
    setDescErr(isErr);
    setDescHelper(errText);
    return !isErr;
  };

  const validateCnums = () => {
    let isErr = false;
    let cloneCnumErrs = [...cNumErrs];
    let cloneCnumHelpers = [...cNumHelpers];

    for (let i = contactNums.length - 1; i >= 0; i--) {
      if (!contactNums[i].trim().length) {
        cloneCnumErrs[i] = true;
        cloneCnumHelpers[i] = 'Required';
        isErr = true;
      }
    }

    setCnumErrs(cloneCnumErrs);
    setCnumHelpers(cloneCnumHelpers);
    return !isErr;
  };

  const validateCemail = () => {
    let isErr = false;
    let errText = '';
    if (!contactEmail.trim().length) {
      isErr = true;
      errText = 'Required';
    }
    setCemailErr(isErr);
    setCemailHelper(errText);
    return !isErr;
  };

  const validateAddLine1 = () => {
    let isErr = false;
    let errText = '';
    if (!addLine1.trim().length) {
      isErr = true;
      errText = 'Required';
    }

    setAddLine1Err(isErr);
    setAddLine1Helper(errText);
    return !isErr;
  };

  const validateAddLine2 = () => {
    let isErr = false;
    let errText = '';
    if (!addLine2.trim().length) {
      isErr = true;
      errText = 'Required';
    }
    setAddLine2Err(isErr);
    setAddLine2Helper(errText);
    return !isErr;
  };

  const validateCity = () => {
    let isErr = false;
    let errText = '';
    if (!city.trim().length) {
      isErr = true;
      errText = 'Required';
    }
    setCityErr(isErr);
    setCityHelper(errText);
    return !isErr;
  };

  const validateZip = () => {
    let isErr = false;
    let errText = '';
    if (!zip.trim().length) {
      isErr = true;
      errText = 'Required';
    }
    setZipErr(isErr);
    setZipHelper(errText);
    return !isErr;
  };

  const validateCountry = () => {
    let isErr = false;
    let errText = '';
    if (!country.trim().length) {
      isErr = true;
      errText = 'Required';
    }
    setCountryErr(isErr);
    setCountryHelper(errText);
    return !isErr;
  };

  const validateCpName = () => {
    let isErr = false;
    let errText = '';
    if (!cpName.trim().length) {
      isErr = true;
      errText = 'Required';
    }
    setCpNameErr(isErr);
    setCpNameHelper(errText);
    return !isErr;
  };

  const validateCpDesig = () => {
    let isErr = false;
    let errText = '';
    if (!cpDesignation.trim().length) {
      isErr = true;
      errText = 'Required';
    }
    setCpDesigErr(isErr);
    setCpDesigHelper(errText);
    return !isErr;
  };

  const validateCpContact = () => {
    let isErr = false;
    let errText = '';
    if (!cpContactNum.trim().length) {
      isErr = true;
      errText = 'Required';
    }
    setCpContactErr(isErr);
    setCpContactHelper(errText);
    return !isErr;
  };

  const validateFirstStep = () => {
    const isValidCname = validateCname();
    const isValidFiles = validateFile();
    const isValidType = validateType();
    const isValidBrno = validateBrno();
    const isValidTname = validateTname();
    const isValidDesc = validateDesc();
    let isValidated = false;

    if (isValidCname && isValidFiles && isValidType && isValidBrno && isValidTname && isValidDesc) {
      isValidated = true;
    }

    return isValidated;
  };

  const validateSecondStep = () => {
    const isValidCnums = validateCnums();
    const isValidCemail = validateCemail();
    const isValidAddLine1 = validateAddLine1();
    const isValidAddLine2 = validateAddLine2();
    const isValidCity = validateCity();
    const isValidZip = validateZip();
    const isValidCountry = validateCountry();

    let isValidated = false;

    if (
      isValidCnums &&
      isValidCemail &&
      isValidAddLine1 &&
      isValidAddLine2 &&
      isValidCity &&
      isValidZip &&
      isValidCountry
    ) {
      isValidated = true;
    }
    return isValidated;
  };

  const validateFinalStep = () => {
    const isValidCpName = validateCpName();
    const isValidCpDesig = validateCpDesig();
    const isValidCpContact = validateCpContact();
    let isValidated = false;

    if (isValidCpName && isValidCpDesig && isValidCpContact) {
      isValidated = true;
    }
    return isValidated;
  };

  const navToBasicInfo = () => {
    let isValid = true;
    if (page === 1) {
      setSecondBtnDisabled(false);
      isValid = validateSecondStep();
      if (!isValid) return;
    } else {
      setLastBtnDisabled(false);
    }

    setFirstBtnDisabled(true);
    setPage(0);
  };

  const navToContInfo = () => {
    if (secondBtnDisabled) return;
    let isValid = true;
    if (page === 0) {
      setFirstBtnDisabled(false);
      isValid = validateFirstStep();
      if (!isValid) return;
    } else {
      setLastBtnDisabled(false);
    }

    setSecondBtnDisabled(true);
    setPage(1);
  };

  const navToCp = () => {
    if (lastBtnDisabled) return;
    let isValid = true;
    if (page === 1) {
      setSecondBtnDisabled(false);
      isValid = validateSecondStep();
      if (!isValid) return;
    } else {
      setFirstBtnDisabled(false);
      isValid = validateFirstStep();
      if (!isValid) return;
    }

    setLastBtnDisabled(true);
    setPage(2);
  };

  const firstStep = () => {
    const isValid = validateFirstStep();
    if (isValid) {
      console.log('isValidFirstStep');
      setFirstBtnDisabled(false);
      setSecondBtnDisabled(false);
      setPage(1);
    }

    console.log('first step');
  };

  const secondStep = () => {
    const isValid = validateSecondStep();
    if (!isValid) return;
    setSecondBtnDisabled(false);
    setLastBtnDisabled(false);
    setPage(2);
  };

  const finalStep = async () => {
    try {
      const isValid = validateFinalStep();

      if (isValid) {
        setProgress(true);
        const storageRef = ref(storage, `buy-asia-seller/${files[0].name}`);
        const uploadResult = await uploadBytes(storageRef, files[0]);
        const logo = await getDownloadURL(uploadResult.ref);

        console.log(logo);

        const reqBody = {
          basic: {
            companyName,
            logo,
            type,
            brno,
            tradeName,
            description
          },
          contact: {
            regAddress: {
              addLine1,
              addLine2,
              city,
              zip,
              country
            },
            contactNums,
            contactEmail
          },
          cp: {
            cpName,
            cpDesignation,
            cpContactNum
          }
        };

        const res = await addInfo(reqBody);
        localStorage.setItem('user', JSON.stringify(res.data));
        navigate('/', {
          state: {
            message:
              'Thank you for the information. We will review your details before activating your Seller account.'
          }
        });
        window.location.reload();
      }
    } catch (err) {
      if (PROP_RESPONSE in err)
        if (PROP_DATA in err.response)
          if (PROP_MESSAGE in err.response.data) {
            setMessage(err.response.data.message);
            setVariant(VARIANT_ERROR);
            setAlertOpen(true);
          }
      console.log(err);
    } finally {
      setProgress(false);
    }
  };

  return (
    <Stack py={10} gap={40}>
      <Stack p={{ sm: 30, xs: 5 }} gap={20} bgcolor="white" alignItems="center">
        <Stack direction="row" gap={30} alignItems="center">
          <Box fontWeight={700}>Welcome to your new journey affiliated with BuyAsia!</Box>
          <Box width={34} height={34}>
            <img style={{ width: '100%', height: '100%' }} src={Confetti} alt="confetti" />
          </Box>
        </Stack>
        <Box>
          Please provide the below details to initiate your Seller Account. We hope it all goes well
          !!!
        </Box>
      </Stack>
      <Stack
        px={{ sm: 30, xs: 5 }}
        direction={{ md: 'row-reverse', xs: 'column-reverse' }}
        justifyContent="center"
        alignItems="center"
        gap={15}>
        <ChevronArrow
          text="Contact Person"
          selected={page === 2}
          onClick={navToCp}
          borderLeftColor="#EBEBEB"
          width="200px"
          disabled={lastBtnDisabled}
        />
        <ChevronArrow
          text="Contact Information"
          selected={page === 1}
          onClick={navToContInfo}
          borderLeftColor="#EBEBEB"
          width="200px"
          disabled={secondBtnDisabled}
        />
        <ChevronArrow
          text="Basic Information"
          selected={page === 0}
          onClick={navToBasicInfo}
          borderLeftColor="#EBEBEB"
          width="200px"
          disabled={firstBtnDisabled}
        />
      </Stack>
      <Stack px={{ sm: 30, xs: 5 }} alignItems="center">
        <Box
          bgcolor="white"
          borderRadius={{ sm: 5, xs: 0 }}
          boxSizing="border-box"
          p={{ sm: 30, xs: 5 }}
          width="100%"
          maxWidth={{ md: 1000, sm: 400 }}>
          {(() => {
            switch (page) {
              case 1:
                return (
                  <Grid container columnSpacing={{ md: 60, sm: 30 }} rowSpacing={30}>
                    <Grid item xs={12} md={6} display="flex" flexDirection="column" gap={30}>
                      <Contact
                        contactNums={contactNums}
                        onChange={_handleCnumsChange}
                        cNumErrs={cNumErrs}
                        cNumHelpers={cNumHelpers}
                        add={addNewContact}
                        remove={removeContact}
                      />
                      <TextField
                        id="contactEmail"
                        label="E-mail to contact (by BuyAsia team)"
                        placeholder="contact email"
                        type="email"
                        value={contactEmail}
                        onChange={_handleCemailChange}
                        error={cEmailErr}
                        helperText={cEmailHelper}
                      />
                    </Grid>
                    <Grid item xs={12} md={6} display="flex" flexDirection="column" gap={30}>
                      <TextField
                        id="addLine1"
                        label="Registered office address"
                        placeholder="address line 1"
                        type="text"
                        value={addLine1}
                        onChange={_handleAddLine1Change}
                        error={addLine1Err}
                        helperText={addLine1Helper}
                      />
                      <TextField
                        id="addLine2"
                        placeholder="address line 2"
                        type="text"
                        value={addLine2}
                        onChange={_handleAddLine2Change}
                        error={addLine2Err}
                        helperText={addLine2Helper}
                      />
                      <TextField
                        id="city"
                        placeholder="city"
                        type="text"
                        value={city}
                        onChange={_handleCityChange}
                        error={cityErr}
                        helperText={cityHelper}
                      />
                      <TextField
                        id="zip"
                        placeholder="zip code"
                        type="text"
                        value={zip}
                        onChange={_handleZipChange}
                        error={zipErr}
                        helperText={zipHelper}
                      />
                      <Dropdown
                        title="country"
                        defaultValue="country"
                        value={country}
                        data={countries}
                        onChange={_handleCountryChange}
                        error={countryErr}
                        helperText={countryHelper}
                      />
                    </Grid>
                    <Grid item xs={12} md={9}></Grid>
                    <Grid item xs={12} md={3}>
                      <Button label="Continue" onClick={secondStep} />
                    </Grid>
                  </Grid>
                );
              case 2:
                return (
                  <Grid container columnSpacing={{ md: 60, sm: 30 }} rowSpacing={30}>
                    <Grid item xs={12} md={6}>
                      <TextField
                        id="cpName"
                        label="Contact person name"
                        placeholder="contact person name"
                        type="text"
                        value={cpName}
                        onChange={_handleCpNameChange}
                        error={cpNameErr}
                        helperText={cpNameHelper}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        id="cpDesignation"
                        label="Designation"
                        placeholder="designation"
                        type="text"
                        value={cpDesignation}
                        onChange={_handleCpDesigChange}
                        error={cpDesigErr}
                        helperText={cpDesigHelper}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        id="cpContactNum"
                        label="Contact number"
                        placeholder="contact number"
                        type="text"
                        value={cpContactNum}
                        onChange={_handleCpContactChange}
                        error={cpContactErr}
                        helperText={cpContactHelper}
                      />
                    </Grid>
                    <Grid item xs={12} md={9} display={{ md: 'block', xs: 'none' }}></Grid>
                    <Grid item xs={12} md={3}>
                      <Button label="Continue" onClick={finalStep} />
                    </Grid>
                  </Grid>
                );
              default:
                return (
                  <Grid
                    container
                    columnSpacing={{ md: 60, sm: 30 }}
                    rowSpacing={{ md: 30, xs: 15 }}>
                    <Grid item xs={12} md={6} display="flex" flexDirection="column" gap={30}>
                      <TextField
                        id="companyName"
                        label="Company name"
                        placeholder="company name"
                        type="text"
                        value={companyName}
                        onChange={_handleCnameChange}
                        error={cNameErr}
                        helperText={cNameHelper}
                      />
                      <TextField
                        id="type"
                        label="Type"
                        placeholder="type"
                        type="text"
                        value={type}
                        onChange={_handleTypeChange}
                        error={typeErr}
                        helperText={typeHelper}
                      />
                      <TextField
                        id="brno"
                        label="Business registration number"
                        placeholder="business registration number"
                        type="text"
                        value={brno}
                        onChange={_handleBrnoChange}
                        error={brnoErr}
                        helperText={brnoHelper}
                      />
                      <TextField
                        id="tradeName"
                        label="Business / Trade name"
                        placeholder="business or trade name"
                        type="text"
                        value={tradeName}
                        onChange={_handleTnameChange}
                        error={tNameErr}
                        helperText={tNameHelper}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <ImageUpload
                        label="Logo image"
                        error={inputErr}
                        setError={setInputErr}
                        helperText={inputHelper}
                        setHelperText={setInputHelper}
                        maxSize={104857600}
                        files={files}
                        setFiles={setFiles}
                        isCropped={isCropped}
                        setIsCropped={setIsCropped}
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextArea
                        id="description"
                        title="Description"
                        label="Description"
                        placeholder="description"
                        value={description}
                        onChange={_handleDescChange}
                        error={descErr}
                        helperText={descHelper}
                      />
                    </Grid>
                    <Grid item xs={12}></Grid>
                    <Grid item xs={12} md={9}></Grid>
                    <Grid item xs={12} md={3}>
                      <Button label="Continue" onClick={firstStep} />
                    </Grid>
                  </Grid>
                );
            }
          })()}
        </Box>
      </Stack>
      <AlertDialog
        open={alertOpen}
        variant={variant}
        message={message}
        onClose={() => setAlertOpen(false)}
      />
      <ProgressDialog open={progress} />
    </Stack>
  );
}

SellerInfo.propTypes = {
  setUser: PropTypes.func.isRequired
};

export default SellerInfo;
