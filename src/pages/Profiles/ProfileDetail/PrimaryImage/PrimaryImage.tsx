import {
  Box,
  Card,
  CardContent,
  CardMedia,
  Grid,
  InputBase,
  TextField,
  Typography,
  InputAdornment,
  OutlinedInputProps,
  Chip,
  Button,
  Snackbar,
} from '@material-ui/core';
import { Alert, Autocomplete, createFilterOptions } from '@material-ui/lab';
import { FileUploadDialog, ImageCropper } from 'components';

import { RemoveIcon, SearchIcon } from 'components/Icons';
import { Guid } from 'guid-typescript';
import React, { useState } from 'react';
import { ImageQuanlityLevel } from 'shared/enums/ImageQualityLevel';
import { Input } from 'themes/elements';
import { useDebounce } from 'use-debounce';
import { useStyles } from './PrimaryImage.styles';

const PrimaryImage = () => {
  const classes = useStyles();
  const [tags, setTags] = useState<string[]>([]);
  const [autocompleteKey, setAutoCompleteKey] = useState<string>('');
  const [isFileDialogOpen, setIsFileDialogOpen] = useState<boolean>(false);
  const [autoCompleteValue] = useDebounce(autocompleteKey, 500);
  const [cropData, setCropData] = useState<string>('https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png');
  const [cropper, setCropper] = useState<any>();
  const [image, setImage] = useState<string>('');
  const [isValidImage, setIsValidImage] = useState<string | null>(null);
  const [qualityLevel, setQualityLevel] = useState<ImageQuanlityLevel>(ImageQuanlityLevel.None);

  const onSelectTag = (newTag: string) => {
    if (!tags.includes(newTag)) {
      setTags((tags) => [...tags, newTag]);
    }
  };
  const onDeleteTag = (tag: string) => {
    const filteredTag = tags.filter((t) => t !== tag);
    setTags(filteredTag);
  };
  const filter = createFilterOptions<string>();

  const closeFileDialog = () => setIsFileDialogOpen(false);
  const openFileDialog = () => setIsFileDialogOpen(true);

  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      setCropData(cropper.getCroppedCanvas().toDataURL());
    }
  };

  const onFileSelected = (name: string, type: string, image: string) => {
    setImage(image);
    closeFileDialog();
  };

  return (
    <Grid container spacing={0}>
      <Grid item md={12} lg={4} xl={3}>
        <Typography variant="h6" gutterBottom>
          Preview
        </Typography>

        <Card className={classes.card}>
          <CardMedia image={cropData} className={classes.card__media} />
          <CardContent className={classes.card__content}>
            <InputBase placeholder="Enter name here" fullWidth />
            <Typography className={classes.card__text__pixels}>200 x 300 pixels</Typography>
            <Typography className={classes.card__text__primaryImage}>PRIMARY IMAGE</Typography>
          </CardContent>
        </Card>

        <Box>
          <Typography variant="h6" style={{ marginTop: '24px' }}>
            Settings
          </Typography>
          <Typography variant="h6" gutterBottom style={{ marginTop: '24px', fontSize: '14px' }}>
            Image Tags
          </Typography>
          <Autocomplete
            options={tags}
            freeSolo={true}
            clearOnBlur={true}
            key={autoCompleteValue}
            classes={{
              root: classes.autocomplete__tagSelect,
              option: classes.autocomplete__listBoxOption,
            }}
            onChange={(_, newValue) => {
              if (newValue) {
                const regValue = newValue.replace(/"/g, '').replace(/Add\s/g, '');
                onSelectTag(regValue);
                setAutoCompleteKey(Guid.create().toString());
              }
            }}
            renderOption={(option) => option}
            filterOptions={(options, params) => {
              const filtered = filter(options, params);
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
        </Box>

        <Box className={classes.tag}>
          {tags &&
            tags.map((tag) => (
              <Chip
                key={tag}
                className={classes.tag__chip}
                deleteIcon={<RemoveIcon width="20" height="20" viewBox="0 0 20 20" fill="none" />}
                onDelete={() => onDeleteTag(tag)}
                variant="outlined"
                label={tag}
              />
            ))}
        </Box>
      </Grid>
      <Grid item md={12} lg={8} xl={9}>
        <Box className={classes.action}>
          <Typography variant="h6" gutterBottom>
            Edit Photo
          </Typography>
          <Box className={classes.action__buttonContainer}>
            <Button variant="outlined" onClick={openFileDialog}>
              Upload New Image
            </Button>
            <Button variant="contained" disabled={qualityLevel === ImageQuanlityLevel.Reject}>
              Save
            </Button>
          </Box>
        </Box>
        <Box className={classes.cropperContainer}>
          <ImageCropper
            src={image}
            cropper={cropper}
            setCropper={setCropper}
            handleCrop={getCropData}
            qualityLevel={qualityLevel}
            setQualityLevel={setQualityLevel}
          />
          <Typography variant="body2" gutterBottom style={{ marginTop: '24px', textAlign: 'center' }}>
            Move and scale the image until it fits within the recommended crop
          </Typography>
        </Box>
      </Grid>
      <FileUploadDialog open={isFileDialogOpen} onClose={closeFileDialog} onFileSelected={onFileSelected} />

      <Snackbar open={qualityLevel === ImageQuanlityLevel.Reject} autoHideDuration={6000 * 10}>
        <Alert variant="filled" severity="error">
          The image you have selected/uploaded is below the 800 pixel size height requirement, you cannot use this
          image. Please select another image.
        </Alert>
      </Snackbar>

      <Snackbar open={qualityLevel === ImageQuanlityLevel.Bad} autoHideDuration={6000 * 10}>
        <Alert variant="filled" severity="warning">
          The image you have selected/uploaded is below the 1500 pixel size height requirement. You may proceed however
          quality will be compromised
        </Alert>
      </Snackbar>
    </Grid>
  );
};

export default PrimaryImage;