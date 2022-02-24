import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  FormControlLabel,
  Grid,
  IconButton,
  ImageList,
  ImageListItem,
  InputAdornment,
  LinearProgress,
  Paper,
  Radio,
  RadioGroup,
  Slider,
  TextField,
  Theme,
  Typography,
  withStyles,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import _ from 'lodash';
import React, { useEffect } from 'react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../app/appSlice';
import { RootState } from '../../app/rootReducer';
import { ImageSliderLargeIcon, ImageSliderSmallIcon, MediaUploadIcon, SearchIcon } from '../../components/icon';
import PhotoListItem from '../../components/PhotoListItem';
import { MediaType } from '../../types';
import ImageEditor from './imageEditor';
import { deleteOnePhoto, queryTags } from './mediaSlice';
import { MediaFilterOption, MediaState, PhotoModel } from './mediaTypes';
import ClearIcon from '@material-ui/icons/Clear';
import { Link } from 'react-router-dom';
import { useWindowSize } from '@react-hook/window-size';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      padding: '0 24px',
    },
    header: {
      margin: '32px 0px',
      fontWeight: 700,
      fontSize: 34,
    },
    pageHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    newButton: {
      background: '#FFFFFF',
      boxShadow:
        '0px 6px 8px rgba(37, 40, 42, 0.02), 0px 8px 16px rgba(37, 40, 42, 0.04), 0px 10px 24px rgba(37, 40, 42, 0.06)',
      borderRadius: '48px',
      color: '#25282A',
      fontWeight: 700,
      fontSize: 18,
      height: 48,
    },
    section: {
      marginBottom: 40,
    },
    sectionTitle: {
      fontWeight: 700,
      fontSize: 20,
      marginBottom: 16,
    },
    imageList: {
      '& .MuiImageListItem-item': {
        borderRadius: 6,
      },
    },
    progressBar: {
      marginTop: 16,
      marginBottom: 8,
      display: 'flex',
      justifyContent: 'space-between',
    },
    linearProgress: {
      backgroundColor: '#E1E1E1',
      '& .MuiLinearProgress-barColorPrimary': {
        backgroundColor: '#00C853',
      },
    },
    dialogPaper: {
      background: '#cfcfcf',
    },
    mainRadio: {
      '& .MuiRadio-colorSecondary.Mui-checked': {
        color: '#2962FF',
      },
    },
  }),
);

const ImageSizeSlider = withStyles({
  root: {
    color: '#707372',
    height: 4,
  },
  thumb: {
    height: 20,
    width: 20,
    backgroundColor: '#707372',
    border: '2px solid currentColor',
    marginTop: -8,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {
    left: 'calc(-50% + 4px)',
  },
  track: {
    height: 4,
    borderRadius: 4,
  },
  rail: {
    height: 4,
    borderRadius: 4,
  },
})(Slider);

interface ImagePageState {
  openEditor: boolean;
  imageSlider: number;
  ratio: number;
  imageColl: number;
  imageHeight: number;
  selectedImage?: PhotoModel;
  searchName: string;
  searchTags: string[];
  searchOption: string;
}

const initialState: ImagePageState = {
  openEditor: false,
  imageSlider: 6,
  ratio: 1,
  imageColl: 8,
  imageHeight: 160,
  searchName: '',
  searchTags: [],
  searchOption: MediaFilterOption.ALL.toString(),
};

export default function Images() {
  const classes = useStyles();
  const [width, height] = useWindowSize();
  const [state, setState] = useState<ImagePageState>({
    ...initialState,
    imageColl: Math.floor(((width - 240) * 8) / 12 / 180),
    imageHeight: Math.floor(180 * 1.25),
  });
  const media: MediaState = useSelector((state: RootState) => state.media);

  const appState: AppState = useSelector((state: RootState) => state.app);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(queryTags(MediaType.IMAGE));
  }, [dispatch]);

  const handleImageSliderChange = (event: React.ChangeEvent<{}>, newValue: number | number[]) => {
    const zoomValue = newValue as number;
    let imageHeight = state.imageHeight;
    let ratio = state.ratio;
    if (zoomValue === 2 || zoomValue === 6 || zoomValue === 10) {
      if (zoomValue !== state.imageSlider) {
        let fac = zoomValue > state.imageSlider ? 2 : 0.5;
        ratio = fac * ratio;
        imageHeight = imageHeight * fac;
      }
    }
    setState({ ...state, imageSlider: zoomValue, ratio: ratio, imageHeight: imageHeight });
  };

  const handleChangeOption = (searchName: string, searchOption: string, searchTags: string[]) => {
    setState({ ...state, searchTags: searchTags, searchName: searchName, searchOption: searchOption });
  };

  const handleToggleTag = (tag: string) => {
    if (state.searchTags.findIndex((x) => x === tag) > -1) {
      setState({ ...state, searchTags: state.searchTags.filter((x) => x !== tag) });
    } else {
      setState({ ...state, searchTags: [...state.searchTags, tag] });
    }
  };

  const filterMedias = () => {
    return media.photos
      .filter((x) => state.searchName.trim().length === 0 || x.name.indexOf(state.searchName.trim()) > -1)
      .filter((x) => state.searchTags.length === 0 || _.intersection(x.tags, state.searchTags).length > 0)
      .filter(
        (x) =>
          state.searchOption !== MediaFilterOption.UNTAGGED.toString() ||
          (state.searchOption.toString() === MediaFilterOption.UNTAGGED.toString() && x.tags.length === 0),
      );
  };

  const handleClearTagOption = () => {
    setState({ ...state, searchTags: [] });
  };

  const handleDeletePhoto = (photo: PhotoModel) => {
    dispatch(deleteOnePhoto(photo.photoId, appState.memberId));
  };

  return (
    <Box className={classes.container}>
      <Grid container>
        <Grid item xs={12} lg={8} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography className={classes.header}>Images</Typography>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <ImageSliderSmallIcon width="16" height="16" viewBox="0 0 16 16" style={{ fontSize: 16 }} />
            <ImageSizeSlider
              aria-labelledby="continuous-slider"
              style={{ width: 96, margin: '0 16px' }}
              step={4}
              min={2}
              max={10}
              value={state.imageSlider}
              onChange={handleImageSliderChange}
            />
            <ImageSliderLargeIcon width="24" height="24" viewBox="0 0 24 24" style={{ fontSize: 24 }} />
          </Box>
        </Grid>
        <Grid item xs={12} lg={4} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Button
            variant="contained"
            startIcon={<MediaUploadIcon />}
            className={classes.newButton}
            component={Link}
            to="upload"
          >
            Upload New File
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={10}>
        <Grid item xs={12} lg={8}>
          <ImageList rowHeight={state.imageHeight} cols={state.imageColl} gap={8} className={classes.imageList}>
            {filterMedias().map((item) => (
              <ImageListItem
                key={item.fileUrl}
                cols={(item.croppedDimensionWidth >= item.croppedDimensionHeight ? 2 : 1) * state.ratio}
              >
                <PhotoListItem
                  id={item.photoId}
                  size={item.size}
                  width={item.dimensionWidth}
                  height={item.dimensionHeight}
                  src={item.fileUrl}
                  title={item.name}
                  tags={item.tags}
                  onDeleteImage={() => handleDeletePhoto(item)}
                  onEditImage={() => {
                    setState({ ...state, selectedImage: item, openEditor: true });
                  }}
                ></PhotoListItem>
              </ImageListItem>
            ))}
          </ImageList>
        </Grid>
        <Grid item xs={12} lg={4}>
          <TextField
            fullWidth
            placeholder={'search'}
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon width="24" height="24" viewBox="0 0 24 24" />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ shrink: true }}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              handleChangeOption(event.target.value, state.searchOption, state.searchTags)
            }
          />
          <Box style={{ marginTop: 32 }}>
            <Typography variant="h6">Filters</Typography>
            <RadioGroup
              aria-label="option"
              name="option"
              className={classes.mainRadio}
              value={state.searchOption.toString()}
              onChange={(event) => {
                handleChangeOption(state.searchName, event.target.value, state.searchTags);
              }}
            >
              <FormControlLabel value={MediaFilterOption.ALL.toString()} control={<Radio />} label="Show all Images" />
              <FormControlLabel
                value={MediaFilterOption.UNUSED.toString()}
                control={<Radio />}
                label="Show only unused Images"
              />
              <FormControlLabel
                value={MediaFilterOption.UNTAGGED.toString()}
                control={<Radio />}
                label="Show only untagged Images"
              />
            </RadioGroup>
          </Box>
          <Box style={{ marginTop: 32 }}>
            <Typography variant="h6">
              Tags
              {state.searchTags.length > 0 && (
                <IconButton onClick={() => handleClearTagOption()} title={'Clear Tags'} style={{ float: 'right' }}>
                  <ClearIcon style={{ fontSize: 14 }} />
                </IconButton>
              )}
            </Typography>
            <Box style={{ marginTop: 16 }}>
              {media.photoTags.map((item) => (
                <Chip
                  size="small"
                  style={{ color: '#707372', fontWeight: 400, fontSize: 12, marginRight: 10 }}
                  variant={state.searchTags.findIndex((x) => x === item) > -1 ? 'outlined' : 'default'}
                  label={item}
                  onClick={() => handleToggleTag(item)}
                />
              ))}
            </Box>
          </Box>
          <Box style={{ marginTop: 32 }}>
            <Typography variant="h6">Allowance</Typography>
            <Box className={classes.progressBar}>
              <Typography variant="subtitle2" style={{ fontWeight: 700, color: '#25282A' }}>
                {media.photos.length}/{media.photoPackageCount} files uploaded
              </Typography>
              <Typography variant="body2" style={{ color: '#707372' }}>
                {Math.floor((media.photos.length * 100) / media.photoPackageCount)}%
              </Typography>
            </Box>
            <LinearProgress variant="determinate" value={40} className={classes.linearProgress} />
          </Box>
        </Grid>
      </Grid>
      <Dialog
        open={state.openEditor}
        onClose={() => setState({ ...state, openEditor: !state.openEditor })}
        aria-labelledby="form-dialog-title"
        fullScreen
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogContent style={{ padding: '50px', margin: 'auto', overflow: 'visible' }}>
          <ImageEditor
            isPortrait={(state?.selectedImage?.dimensionHeight || 0) > (state?.selectedImage?.dimensionWidth || 0)}
            fileName={state?.selectedImage?.name || ''}
            fileUrl={state.selectedImage?.originalFileUrl || ''}
            fileType="Images/JPEG"
            uploadedTime={state?.selectedImage?.createdTime?.toString() || ''}
            width={state.selectedImage?.dimensionWidth || 0}
            height={state.selectedImage?.dimensionWidth || 0}
            size={state.selectedImage?.size || 0}
            tags={state.selectedImage?.tags || []}
            tagOptions={media.photoTags}
            visibility={true}
            onClose={() => setState({ ...state, openEditor: false })}
            mediaId={state?.selectedImage?.photoId || 0}
            memberId={appState.memberId}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
