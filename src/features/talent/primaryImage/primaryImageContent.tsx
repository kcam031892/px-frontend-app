import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Chip,
  createStyles,
  Grid,
  IconButton,
  InputAdornment,
  InputBase,
  makeStyles,
  OutlinedInputProps,
  Snackbar,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { useState } from 'react';
import { Cropper } from 'react-cropper';
import 'cropperjs/dist/cropper.css';
import ImageSlider from '../../../components/ImageSlider';
import Autocomplete, { createFilterOptions } from '@material-ui/lab/Autocomplete';
import clsx from 'clsx';
import {
  CropIcon,
  FlipIcon,
  RemoveIcon,
  ResetIcon,
  RotateLeftIcon,
  RotateRightIcon,
  SearchIcon,
} from '../../../components/Icons';
import _ from 'lodash';
import FileUploadDialog from './fileUploadDialog';
import { Alert } from '@material-ui/lab';
import { ImageQuanlityLevel } from '../../../types';
import { Guid } from 'guid-typescript';

const standardHeightPixel = 1500;
const standardWidthPixel = 1125;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    primaryImageHead: {
      marginTop: '22px',
      display: 'flex',
      justifyContent: 'flex-end',
    },
    primaryImageRightHead: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    buttonSelectNew: {
      textTransform: 'none',
      marginRight: '16px',
    },
    buttonSave: {
      textTransform: 'none',
    },
    cardRoot: {
      padding: '16px',
      width: '296px',
      height: '456px',
      borderRadius: '8px',
    },
    cardContent: {
      padding: '20px 0px',
      minHeight: '100px',
    },
    cardInfo: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    cardMedia: {
      height: 0,
      paddingTop: '125%',
    },
    miniPic: {
      width: '117px',
    },
    imageSlider: {
      marginTop: '15px',
    },
    tagSelect: {
      width: '310px',
      marginTop: '24px',
      '& .MuiAutocomplete-inputRoot': {
        paddingTop: '8px',
        paddingBottom: '8px',
      },
      '& .MuiInputBase-input': {
        paddingTop: '3px !important',
        paddingBottom: '2px !important',
        fontSize: '14px',
      },
      '& .MuiInputBase-root.Mui-focused': {
        boxShadow: 'none !important',
      },
    },
    listBoxOption: {
      fontSize: '12px',
    },
    chip: {
      marginRight: '8px',
      marginBottom: '8px',
      background: 'rgba(41, 98, 255, 0.08)',
      border: '1.5px solid rgba(41, 98, 255, 0.4)',
      color: '#2962FF',
      fontWeight: 500,
    },
    photoEditor: {
      background: '#212121',
      padding: '0px 40px 0px 40px',
      borderRadius: '8px',
    },
    cropperContainer: {
      height: '488px',
      display: 'flex',
      justifyContent: 'center',
      marginTop: '40px',
    },
    cropperButtonContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: '20px',
    },
    editorActionContainer: {
      position: 'relative',
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: '0px 12px 12px 12px',
    },
    actionButtonActive: {
      color: '#fff',
    },
    actionButtonDisable: {
      color: '#D9D9D9 !important',
    },
    hidden: {
      display: 'none',
    },
    mainDropContainer: {
      width: '839px',
      height: '531px',
      background: '#C4C4C4',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
    },
    sliderContainer: {
      paddingTop: '12px',
      display: 'flex',
      justifyContent: 'center',
    },
    saveButtonActive: {
      backgroundColor: '#2962FF',
      color: '#fff',
    },
  }),
);

interface PrimaryProps {
  image: string;
  originalImage: string;
  photoName: string;
  tags: string[];
  tagOptions: string[];
  onNameChange: (name: string) => void;
  onSelectTag: (tag: string) => void;
  onDeleteTag: (tag: string) => void;
  onCropImage: (cropData: string) => void;
  onSelectFile: (image: string) => void;
  onSave: (image: string) => void;
}

const rejectWidthQuanlity = 600;
const rejectHeightQuanlity = 800;
const acceptWidthQuanlity = 1125;
const acceptHeightQuanlity = 1500;

export default function PrimaryImageContent(props: PrimaryProps) {
  const classes = useStyles();
  const { tagOptions, tags, onSelectTag, onDeleteTag, onCropImage, onSelectFile, onSave } = props;
  const [cropper, setCropper] = useState<any>();
  const [imageName, setImageName] = useState('');
  const [fileUploadDialogOpen, setFileUploadDialogOpen] = useState(false);
  const [minZoomRatio, setMinZoomRatio] = useState(0);
  const [maxZoomRatio, setMaxZoomRatio] = useState(1);
  const [imageData, setImageData] = useState<Cropper.ImageData | undefined>(undefined);
  const [sliderDefaultValue, setSliderDefaultValue] = useState(0.2);
  const [quanlityLevel, setQuanlityLevel] = useState<ImageQuanlityLevel>(ImageQuanlityLevel.None);
  const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
  const [warningSnackbarOpen, setWarningSnackbarOpen] = useState(false);
  const [autoCompleteKey, setAutoCompleteKey] = React.useState<string>('');

  const [cropped, setCropped] = useState(false);

  const filter = createFilterOptions<string>();

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    const valueNumber = newValue as number;
    setSliderDefaultValue(valueNumber);
    cropper.zoomTo(valueNumber);
  };
  //image ready
  const handleImageReady = (e: Cropper.ReadyEvent<HTMLImageElement>) => {
    const imageData = e.currentTarget.cropper.getImageData();
    const minSliderZoom = imageData.width / imageData.naturalWidth;
    const maxSliderZoom =
      _.min([imageData.naturalWidth / standardWidthPixel, imageData.naturalHeight / standardHeightPixel]) || 1;

    setMaxZoomRatio(maxSliderZoom);
    setMinZoomRatio(minSliderZoom);
    setImageData(imageData);

    if (imageData.naturalWidth < rejectWidthQuanlity || imageData.naturalHeight < rejectHeightQuanlity) {
      setQuanlityLevel(ImageQuanlityLevel.Reject);
      setErrorSnackbarOpen(true);
    } else if (imageData.naturalWidth < acceptWidthQuanlity || imageData.naturalHeight < acceptHeightQuanlity) {
      setQuanlityLevel(ImageQuanlityLevel.Bad);
      setWarningSnackbarOpen(true);
    } else {
      setQuanlityLevel(ImageQuanlityLevel.Accept);
    }
  };

  const [fileUploadId] = useState<string>('fileUpload');

  const hanldeCrop = () => {
    if (typeof cropper !== 'undefined') {
      onCropImage(cropper.getCroppedCanvas().toDataURL());
      setCropped(true);
    }
  };

  const handleFlip = () => {
    const cropperData = cropper.getData();
    cropper.scaleX(-cropperData.scaleX);
  };

  const handleRotateRight = () => {
    cropper.rotate(45);
  };

  const handleRotateLeft = () => {
    cropper.rotate(-45);
  };

  const handleReset = () => {
    cropper.reset();
  };

  const handleSelectedFile = (name: string, type: string, image: string) => {
    setImageName(name);
    onSelectFile(image);
    setFileUploadDialogOpen(false);
  };

  const handleUploadNew = () => {
    setFileUploadDialogOpen(true);
  };

  const handleSave = () => {
    let image = '';
    if (!cropped) {
      if (typeof cropper !== 'undefined') {
        image = cropper.getCroppedCanvas().toDataURL();
        onCropImage(image);
      }
    }

    onSave(image);
  };

  return (
    <>
      <Grid container spacing={2}>
        <Grid item md={12} lg={4} style={{ paddingLeft: '30px' }}>
          <Typography variant="h6" gutterBottom>
            Preview
          </Typography>
          <Box style={{ display: 'flex', flexDirection: 'column', marginTop: '24px' }}>
            <Card className={classes.cardRoot}>
              <CardMedia className={classes.cardMedia} image={props.image || props.originalImage} title="" />
              <CardContent className={classes.cardContent}>
                <Box className={classes.cardInfo}>
                  <Box>
                    <Typography variant="subtitle1">
                      <InputBase
                        placeholder="Enter Name here ..."
                        value={props.photoName}
                        className={''}
                        onChange={(event: React.ChangeEvent<{ value: unknown }>) => {
                          props.onNameChange(event.target.value as string);
                        }}
                      />
                    </Typography>
                    <Typography style={{ fontSize: '12px' }}>
                      {imageData?.naturalWidth} x {imageData?.naturalHeight} pixels
                    </Typography>
                    <Typography style={{ marginTop: '10px', fontWeight: 'bold', fontSize: '12px', color: 'blue' }}>
                      PRIMARY IMAGE
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Box>
          <Typography variant="h6" style={{ marginTop: '24px' }}>
            Settings
          </Typography>
          <Typography variant="h6" gutterBottom style={{ marginTop: '24px', fontSize: '14px' }}>
            Image Tags
          </Typography>
          {
            <Autocomplete
              id={'country-select-demo'}
              key={autoCompleteKey}
              options={tagOptions}
              classes={{
                root: classes.tagSelect,
                option: classes.listBoxOption,
              }}
              freeSolo={true}
              clearOnBlur={true}
              getOptionLabel={(option) => option}
              onChange={(event, newValue) => {
                if (newValue) {
                  onSelectTag(newValue.replace(/"/g, '').replace(/Add\s/g, ''));
                  setTimeout(() => {
                    setAutoCompleteKey(Guid.create().toString());
                    console.log('test');
                  }, 500);
                }
              }}
              renderOption={(option) => <React.Fragment>{option}</React.Fragment>}
              filterOptions={(options, params) => {
                const filtered = filter(options, params);

                // Suggest the creation of a new value
                if (params.inputValue !== '') {
                  filtered.push(`Add "${params.inputValue}"`);
                }

                return filtered;
              }}
              renderInput={(params) => {
                return (
                  <TextField
                    {...params}
                    placeholder="Type and select all that apply"
                    variant="outlined"
                    InputProps={
                      {
                        ...params.InputProps,
                        disableUnderline: true,
                        endAdornment: null,
                        startAdornment: (
                          <InputAdornment position="start">
                            <SearchIcon width="24" height="24" viewBox="0 0 24 24" />
                          </InputAdornment>
                        ),
                      } as Partial<OutlinedInputProps>
                    }
                    InputLabelProps={{ shrink: true }}
                    inputProps={{
                      ...params.inputProps,
                      autoComplete: 'off',
                    }}
                  />
                );
              }}
            />
          }
          <Box style={{ marginTop: '22px' }}>
            {tags &&
              tags.map((tag: string) => {
                return (
                  <Chip
                    key={tag}
                    className={clsx(classes.chip)}
                    deleteIcon={<RemoveIcon width="20" height="20" viewBox="0 0 20 20" fill="none" />}
                    onDelete={() => onDeleteTag(tag)}
                    variant="outlined"
                    label={tag}
                  />
                );
              })}
          </Box>
        </Grid>
        <Grid item md={12} lg={8}>
          <Box className={classes.primaryImageRightHead}>
            <Typography variant="h6" gutterBottom>
              Edit Photo
            </Typography>
            <Box>
              <Button variant="outlined" className={classes.buttonSelectNew} onClick={handleUploadNew}>
                Upload New Image
              </Button>
              <Button
                variant="contained"
                disabled={quanlityLevel === ImageQuanlityLevel.Reject}
                className={clsx(classes.buttonSave, {
                  [classes.saveButtonActive]: quanlityLevel !== ImageQuanlityLevel.Reject,
                })}
                onClick={handleSave}
              >
                Save
              </Button>
            </Box>
          </Box>
          <Box style={{ marginTop: '16px' }}>
            <Card className={classes.photoEditor}>
              <CardContent>
                <Box className={classes.cropperContainer}>
                  <Cropper
                    key={fileUploadId + imageName}
                    style={{ height: 440, width: '100%' }}
                    zoomTo={0}
                    preview=".img-preview"
                    src={props.originalImage}
                    minCropBoxHeight={440}
                    initialAspectRatio={0.75}
                    aspectRatio={0.75}
                    viewMode={1}
                    guides={false}
                    modal={true}
                    autoCrop={true}
                    responsive={true}
                    background={false}
                    wheelZoomRatio={0.1}
                    cropBoxResizable={false}
                    ready={handleImageReady}
                    checkCrossOrigin={true}
                    zoomOnWheel={true}
                    onInitialized={(instance) => {
                      setCropper(instance);
                    }}
                  />
                </Box>
              </CardContent>
              <CardActions className={classes.editorActionContainer}>
                <Box style={{ zIndex: 3 }}>
                  <IconButton
                    aria-label="upload picture"
                    disabled={quanlityLevel === ImageQuanlityLevel.Reject}
                    className={clsx(classes.actionButtonActive, {
                      [classes.actionButtonDisable]: quanlityLevel === ImageQuanlityLevel.Reject,
                    })}
                    onClick={handleReset}
                  >
                    <ResetIcon width="24" height="24" viewBox="0 0 24 24" />
                    <span style={{ marginLeft: '5px', fontSize: '10px' }}>RESET</span>
                  </IconButton>
                </Box>
                <Box
                  style={{
                    flex: 1,
                    display: 'flex',
                    justifyContent: 'center',
                    position: 'absolute',
                    bottom: 20,
                    width: '100%',
                    zIndex: 2,
                  }}
                >
                  <ImageSlider
                    key={'slider_' + fileUploadId + imageName}
                    min={minZoomRatio}
                    step={0.0001}
                    value={sliderDefaultValue}
                    max={1}
                    disabled={quanlityLevel === ImageQuanlityLevel.Reject || maxZoomRatio <= minZoomRatio}
                    onChange={handleSliderChange}
                  />
                </Box>
                <Box style={{ zIndex: 3 }}>
                  <IconButton
                    aria-label="upload picture"
                    disabled={quanlityLevel === ImageQuanlityLevel.Reject}
                    className={clsx(classes.actionButtonActive, {
                      [classes.actionButtonDisable]: quanlityLevel === ImageQuanlityLevel.Reject,
                    })}
                    onClick={hanldeCrop}
                  >
                    <CropIcon width="24" height="24" viewBox="0 0 24 24" />
                  </IconButton>
                  <IconButton
                    aria-label="flip picture"
                    disabled={quanlityLevel === ImageQuanlityLevel.Reject}
                    className={clsx(classes.actionButtonActive, {
                      [classes.actionButtonDisable]: quanlityLevel === ImageQuanlityLevel.Reject,
                    })}
                    onClick={handleFlip}
                  >
                    <FlipIcon width="24" height="24" viewBox="0 0 24 24" />
                  </IconButton>
                  <IconButton
                    aria-label="rotate left picture"
                    disabled={quanlityLevel === ImageQuanlityLevel.Reject}
                    className={clsx(classes.actionButtonActive, {
                      [classes.actionButtonDisable]: quanlityLevel === ImageQuanlityLevel.Reject,
                    })}
                    onClick={handleRotateLeft}
                  >
                    <RotateLeftIcon width="24" height="24" viewBox="0 0 24 24" />
                  </IconButton>
                  <IconButton
                    aria-label="rotate right picture"
                    disabled={quanlityLevel === ImageQuanlityLevel.Reject}
                    className={clsx(classes.actionButtonActive, {
                      [classes.actionButtonDisable]: quanlityLevel === ImageQuanlityLevel.Reject,
                    })}
                    onClick={handleRotateRight}
                  >
                    <RotateRightIcon width="24" height="24" viewBox="0 0 24 24" />
                  </IconButton>
                </Box>
              </CardActions>
            </Card>
            <Typography variant="body2" gutterBottom style={{ marginTop: '24px', textAlign: 'center' }}>
              Move and scale the image until it fits within the recommended crop
            </Typography>
          </Box>
        </Grid>
      </Grid>

      <FileUploadDialog
        open={fileUploadDialogOpen}
        onClose={() => setFileUploadDialogOpen(false)}
        onFileSelected={handleSelectedFile}
      />

      <Snackbar
        open={errorSnackbarOpen}
        autoHideDuration={6000 * 10}
        onClose={(event, reason) => {
          if (reason !== 'clickaway') setErrorSnackbarOpen(false);
        }}
      >
        <Alert onClose={() => setErrorSnackbarOpen(false)} variant="filled" severity="error">
          The image you have selected/uploaded is below the 800 pixel size height requirement, you cannot use this
          image. Please select another image.
        </Alert>
      </Snackbar>

      <Snackbar
        open={warningSnackbarOpen}
        autoHideDuration={6000 * 10}
        onClose={(event, reason) => {
          if (reason !== 'clickaway') setWarningSnackbarOpen(false);
        }}
      >
        <Alert onClose={() => setWarningSnackbarOpen(false)} variant="filled" severity="warning">
          The image you have selected/uploaded is below the 1500 pixel size height requirement. You may proceed however
          quality will be compromised
        </Alert>
      </Snackbar>
    </>
  );
}
