import { Box, createStyles, makeStyles, Paper, Theme } from '@material-ui/core';
import React, { useEffect } from 'react';
import 'cropperjs/dist/cropper.css';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { PrimaryImageState } from './primaryImageTypes';
import { RootState } from '../../../app/rootReducer';
import {
  cropImage,
  deleteTag,
  fetchPrimaryImage,
  nameChange,
  postPrimaryImage,
  selectImage,
  selectTag,
} from './primaryImageSlice';
import NoPrimaryImage from './noPrimaryImage';
import PrimaryImageContent from './primaryImageContent';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    defaultUploadContainer: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      height: 'calc(100vh - 170px)',
    },
    defaultUploadPanel: {
      width: '512px',
      height: '328px',
      borderRadius: '24px',
    },
    primaryImageHead: {
      marginTop: '22px',
      display: 'flex',
      justifyContent: 'flex-end',
    },
    buttonUploadNew: {
      marginRight: '9px',
      backgroundColor: '#212121',
      color: '#fff',
      textTransform: 'none',
    },
    buttonSelectNew: {
      textTransform: 'none',
      borderColor: '#2962FF',
      color: '#2962FF',
    },
    cardRoot: {
      padding: '17px 27px 0px 16px',
      maxWidth: '370px',
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
      width: '256px',
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
      marginRight: '24px',
    },
    cropperContainer: {
      width: '839px',
    },
    cropperButtonContainer: {
      display: 'flex',
      justifyContent: 'flex-end',
      marginTop: '20px',
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

export default function PrimaryImage() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { profileId } = useParams() as { profileId: string };
  const primaryImage: PrimaryImageState = useSelector((state: RootState) => state.primaryImage);

  useEffect(() => {
    dispatch(fetchPrimaryImage(profileId));
  }, [dispatch, profileId]);

  const handleSelectedFile = (name: string, type: string, image: string) => {
    handleSelectImage(image);
  };

  const handleSelectImage = (image: string) => {
    dispatch(selectImage(image));
  };

  const handleSelectTag = (tag: string) => {
    dispatch(selectTag(tag));
  };

  const handleDeleteTag = (tag: string) => {
    dispatch(deleteTag(tag));
  };

  const handleCropImage = (cropData: string) => {
    dispatch(cropImage(cropData));
  };

  const handleNameChange = (photoName: string) => {
    dispatch(nameChange(photoName));
  };

  const handleSaveImage = (newImage: string) => {
    if (newImage) {
      dispatch(
        postPrimaryImage({
          ...primaryImage.model,
          image: newImage,
        }),
      );
    } else {
      dispatch(postPrimaryImage(primaryImage.model));
    }
  };

  return (
    <>
      {primaryImage.loadComplete && !primaryImage.model.originalImage && (
        <Box className={classes.defaultUploadContainer}>
          <Paper className={classes.defaultUploadPanel} elevation={3}>
            <NoPrimaryImage onFileSelected={handleSelectedFile} showDefaultText={true}></NoPrimaryImage>
          </Paper>
        </Box>
      )}

      {primaryImage.loadComplete && primaryImage.model.originalImage && (
        <Box style={{ marginTop: '32px' }}>
          <PrimaryImageContent
            image={primaryImage.model.image}
            originalImage={primaryImage.model.originalImage}
            photoName={primaryImage.model.photoName}
            tagOptions={primaryImage.model.tagOptions}
            tags={primaryImage.model.photoTags}
            onNameChange={handleNameChange}
            onSelectTag={handleSelectTag}
            onDeleteTag={handleDeleteTag}
            onCropImage={handleCropImage}
            onSelectFile={handleSelectImage}
            onSave={handleSaveImage}
          />
        </Box>
      )}
    </>
  );
}
