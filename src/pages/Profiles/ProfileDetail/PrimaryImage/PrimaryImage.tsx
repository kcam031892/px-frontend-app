import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  InputAdornment,
  InputBase,
  LinearProgress,
  OutlinedInputProps,
  Snackbar,
  TextField,
  Typography,
} from '@material-ui/core';
import { Alert, Autocomplete, createFilterOptions } from '@material-ui/lab';
import { FileUploadDialog, ImageCropper } from 'components';
import { RemoveIcon, SearchIcon } from 'components/Icons';
import { ImageGallery } from 'components/ImageGallery';
import { Guid } from 'guid-typescript';
import React, { useEffect, useMemo, useState } from 'react';
import { useParams } from 'react-router';
import { ImageQuanlityLevel } from 'shared/enums/ImageQualityLevel';
import { profileService } from 'shared/services/profileService';
import { Backdrop, Input } from 'themes/elements';
import { useDebounce } from 'use-debounce';

import { useStyles } from './PrimaryImage.styles';
import b64toBlob from 'b64-to-blob';
import { base64ToBlob, blobToBase64 } from 'base64-blob';
import { dataUrlToFile } from 'shared/utils/dataUrlToFile';
import { useQueryClient } from 'react-query';

const { getProfilePrimaryImage, setProfilePrimaryImage } = profileService();
const PrimaryImage = () => {
  const { profileId } = useParams() as { profileId: string };
  const classes = useStyles();
  const [tags, setTags] = useState<string[]>([]);
  const [autocompleteKey, setAutoCompleteKey] = useState<string>('');
  const [isFileDialogOpen, setIsFileDialogOpen] = useState<boolean>(false);
  const [autoCompleteValue] = useDebounce(autocompleteKey, 500);
  const [cropData, setCropData] = useState<string>('/no-image-placeholder.svg');
  const [cropper, setCropper] = useState<any>(null);
  const [hasImage, setIsHasImage] = useState<boolean>(false);
  const [image, setImage] = useState<string>('');
  const [fileImage, setFileImage] = useState<File | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [qualityLevel, setQualityLevel] = useState<ImageQuanlityLevel>(ImageQuanlityLevel.None);
  const [isImageGalleryOpen, setIsImageGalleryOpen] = useState<boolean>(false);
  const { data, isError, isLoading: isLoadingPrimaryImage } = getProfilePrimaryImage(profileId);
  const { mutate, isLoading: isSaving } = setProfilePrimaryImage();
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const queryClient = useQueryClient();

  const onSelectTag = (newTag: string) => {
    if (!tags.includes(newTag)) {
      setTags((tags) => [...tags, newTag]);
    }
  };
  const onDeleteTag = (tag: string) => {
    const filteredTag = tags.filter((t) => t !== tag);
    setTags(filteredTag);
  };

  useEffect(() => {
    if (data) {
      setCropData(data.data.attributes.attachment);
      setFileName(data.data.attributes.medium_name);
    }
  }, [data]);

  const filter = createFilterOptions<string>();

  const closeFileDialog = () => setIsFileDialogOpen(false);
  const openFileDialog = () => setIsFileDialogOpen(true);

  const getCropData = () => {
    if (typeof cropper !== 'undefined') {
      setCropData(cropper.getCroppedCanvas().toDataURL('image/jpeg', 0.9));
      setIsHasImage(true);
    }
  };

  const onFileSelected = (name: string, type: string, image: string, file?: File) => {
    setImage(image);
    if (file) {
      setFileName(name);
      setFileImage(file);
    }
    closeFileDialog();
  };

  const handleImageGalleryClose = () => {
    setIsImageGalleryOpen(false);
  };
  const handleImageGalleryOpen = () => {
    setIsImageGalleryOpen(true);
  };

  const handleSave = async (mediaId?: string) => {
    const formData = new FormData();

    if (fileImage) {
      const width = Math.floor(cropper.canvasData.width);
      const height = Math.floor(cropper.canvasData.height);
      const convertedFile = await base64ToBlob(cropData);
      const fileSize = convertedFile.size;

      formData.set('attachment', convertedFile);
      formData.set('file_width', width.toString());
      formData.set('file_height', height.toString());
      formData.set('file_name', fileName);
      formData.set('file_size', fileSize.toString());
    } else if (mediaId) {
      formData.set('medium_id', mediaId);
    }
    setIsImageGalleryOpen(false);
    setIsFileDialogOpen(false);
    mutate(
      { profileId, formData, onProgress: (number) => setUploadProgress(number) },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['profile_primary_image', profileId]);

          setUploadProgress(0);
        },
      },
    );
  };

  const isLoading = useMemo(() => {
    return isSaving || isLoadingPrimaryImage;
  }, [isSaving, isLoadingPrimaryImage]);

  return (
    <Grid container spacing={0}>
      {uploadProgress > 0 && (
        <Grid item md={12} lg={12} xl={12} style={{ marginBottom: 16 }}>
          <LinearProgress variant="determinate" value={uploadProgress} />
        </Grid>
      )}
      {!isLoadingPrimaryImage && (
        <>
          <Grid item md={12} lg={4} xl={3}>
            <Typography variant="h6" gutterBottom>
              Preview
            </Typography>

            <Card className={classes.card}>
              <CardMedia image={cropData} className={classes.card__media} />
              {(data || hasImage) && (
                <CardContent className={classes.card__content}>
                  <InputBase
                    placeholder="Enter name here"
                    fullWidth
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                  />
                  <Typography className={classes.card__text__pixels}></Typography>
                  <Typography className={classes.card__text__primaryImage}>PRIMARY IMAGE</Typography>
                </CardContent>
              )}
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
                <Button
                  variant="contained"
                  disabled={qualityLevel === ImageQuanlityLevel.Reject || isSaving || !hasImage}
                  onClick={() => handleSave()}
                >
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
          <FileUploadDialog
            open={isFileDialogOpen}
            onClose={closeFileDialog}
            onFileSelected={onFileSelected}
            handleSelectFromMedia={handleImageGalleryOpen}
          />
          <ImageGallery handleSave={handleSave} open={isImageGalleryOpen} handleClose={handleImageGalleryClose} />

          <Snackbar open={qualityLevel === ImageQuanlityLevel.Reject} autoHideDuration={6000 * 10}>
            <Alert variant="filled" severity="error">
              The image you have selected/uploaded is below the 800 pixel size height requirement, you cannot use this
              image. Please select another image.
            </Alert>
          </Snackbar>

          <Snackbar open={qualityLevel === ImageQuanlityLevel.Bad} autoHideDuration={6000 * 10}>
            <Alert variant="filled" severity="warning">
              The image you have selected/uploaded is below the 1500 pixel size height requirement. You may proceed
              however quality will be compromised
            </Alert>
          </Snackbar>
        </>
      )}
    </Grid>
  );
};

export default PrimaryImage;
