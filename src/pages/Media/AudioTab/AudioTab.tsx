import {
  Box,
  Grid,
  Typography,
  ImageList,
  ImageListItem,
  InputAdornment,
  RadioGroup,
  FormControlLabel,
  Radio,
  IconButton,
  Chip,
  LinearProgress,
  Dialog,
  DialogContent,
} from '@material-ui/core';
import { useWindowSize } from '@react-hook/window-size';
import { ImageSliderSmallIcon, ImageSliderLargeIcon, MediaUploadIcon, SearchIcon } from 'components/Icons';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { EditorMode } from 'shared/enums/EditorMode';
import { Button, Input } from 'themes/elements';
import { ImageSizeSlider } from '../ImagesTab/ImageSizeSlider';
import VideoItem from '../VideoTab/VideoItem/VideoItem';
import { useStyles } from './AudioTab.styles';
import ClearIcon from '@material-ui/icons/Clear';
import { AudioEditor } from 'components';

interface AudioListState {
  imageCol: number;
  imageHeight: number;
  imageSlider: number;
  ratio: number;
}

const AudioTab = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [width] = useWindowSize();
  const IMAGE_COL = Math.floor(((width - 240) * 8) / 12 / 180);
  const IMAGE_HEIGHT = Math.floor(180 * 1.25);
  const initialAudioListState: AudioListState = {
    imageSlider: 6,
    ratio: 1,
    imageCol: Math.floor(((width - 240) * 8) / 12 / 180),
    imageHeight: Math.floor(180 * 1.25),
  };
  const [audioListState, setAudioListState] = useState<AudioListState>(initialAudioListState);
  const [sliderValue, setSliderValue] = useState<number>(6);
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);

  const handleSliderValueChange = (event: React.ChangeEvent<{}>, value: number | number[]) => {
    if (typeof value === 'number') {
      if (sliderValue !== value) {
        if (value !== audioListState.imageSlider) {
          const fact = value > audioListState.imageSlider ? 2 : 0.5;
          const ratio = fact * audioListState.ratio;

          setAudioListState({ ...audioListState, imageSlider: value, ratio });
        }
        setSliderValue(value);
      }
    }
  };

  useEffect(() => {
    if (location.search) {
      if (location.search === '?edit' || location.search === '?view') {
        setIsEditorOpen(true);
      }
    }
  }, [location.search]);

  const handleEditVideo = (mode: EditorMode) => {
    if (mode === EditorMode.VIEW) {
      history.push({
        search: '?view',
      });
    } else {
      history.push({
        search: '?edit',
      });
    }
  };

  const handleOnCloseEditor = () => {
    history.push({
      search: '',
    });
  };
  return (
    <Box>
      {/* Top */}
      <Grid container>
        {/* Header */}
        <Grid item xs={12} lg={8}>
          <Box className={classes.header}>
            <Typography className={classes.header__title}>Audios</Typography>
            <Box className={classes.header__sliderContainer}>
              <ImageSliderSmallIcon width="16" height="16" viewBox="0 0 16 16" style={{ fontSize: 16 }} />
              <ImageSizeSlider
                aria-labelledby="continuous-slider"
                style={{ width: 96, margin: '0 16px' }}
                step={2}
                min={2}
                max={10}
                value={sliderValue}
                onChange={handleSliderValueChange}
              />
              <ImageSliderLargeIcon width="24" height="24" viewBox="0 0 24 24" style={{ fontSize: 24 }} />
            </Box>
          </Box>
        </Grid>
        {/* Button */}
        <Grid item xs={12} lg={4}>
          <Box className={classes.newButtonContainer}>
            <Button variant="contained" startIcon={<MediaUploadIcon />} customVariant="newButton">
              Upload New File
            </Button>
          </Box>
        </Grid>
      </Grid>

      {/* Bottom */}
      <Grid container spacing={10} style={{ marginTop: '2rem' }}>
        {/* Video List */}
        <Grid item xs={12} lg={8}>
          <ImageList rowHeight={IMAGE_HEIGHT} cols={IMAGE_COL} gap={8} className={classes.audioList}>
            <ImageListItem cols={1 * audioListState.ratio}>
              <VideoItem src="https://picsum.photos/200/300" handleEditVideo={() => handleEditVideo(EditorMode.VIEW)} />
            </ImageListItem>
            <ImageListItem cols={2 * audioListState.ratio}>
              <VideoItem src="https://picsum.photos/200/300" handleEditVideo={() => handleEditVideo(EditorMode.VIEW)} />
            </ImageListItem>
            <ImageListItem cols={2 * audioListState.ratio}>
              <VideoItem src="https://picsum.photos/200/300" handleEditVideo={() => handleEditVideo(EditorMode.VIEW)} />
            </ImageListItem>
            <ImageListItem cols={2 * audioListState.ratio}>
              <VideoItem src="https://picsum.photos/200/300" handleEditVideo={() => handleEditVideo(EditorMode.VIEW)} />
            </ImageListItem>
            <ImageListItem cols={2 * audioListState.ratio}>
              <VideoItem src="https://picsum.photos/200/300" handleEditVideo={() => handleEditVideo(EditorMode.VIEW)} />
            </ImageListItem>
          </ImageList>
        </Grid>
        {/* Filter / Searching */}
        <Grid item xs={12} lg={4}>
          {/* Search Input */}
          <Input
            fullWidth
            placeholder={'Search'}
            InputProps={{
              disableUnderline: true,
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon width="24" height="24" viewBox="0 0 24 24" />
                </InputAdornment>
              ),
            }}
            InputLabelProps={{ shrink: true }}
          />

          {/* Filters */}
          <Box style={{ marginTop: 24 }}>
            <Typography variant="h6">Filters</Typography>
            <RadioGroup aria-label="option" name="option" className={classes.filters__radio}>
              <FormControlLabel control={<Radio />} label="Show all Images" />
              <FormControlLabel control={<Radio />} label="Show only unused Images" />
              <FormControlLabel control={<Radio />} label="Show only untagged Images" />
            </RadioGroup>
          </Box>
          {/* Tags */}
          <Box className={classes.filters__tagContainer}>
            <Box className={classes.filters__tagHeader}>
              <Typography variant="h6">Tags</Typography>
              <IconButton title={'Clear Tags'}>
                <ClearIcon style={{ fontSize: 14 }} />
              </IconButton>
            </Box>
            <Box style={{ marginTop: 16 }}>
              <Chip label="actors" size="small" className={classes.filters__tag} />
            </Box>
          </Box>
          {/* Allowance Progress */}
          <Box style={{ marginTop: 24 }}>
            <Box className={classes.filters__progressBar}>
              <Typography variant="subtitle2" style={{ fontWeight: 700, color: '#25282A' }}>
                10/10 files uploaded
              </Typography>
              <Typography variant="body2" style={{ color: '#707372' }}>
                24%
              </Typography>
            </Box>
            <LinearProgress variant="determinate" value={40} className={classes.filters__linearProgress} />
          </Box>
        </Grid>
      </Grid>

      {/* Dialog / Edit Image */}
      <Dialog
        open={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        aria-labelledby="form-dialog-title"
        fullScreen
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogContent className={classes.dialogContent}>
          <AudioEditor
            onCloseEditor={handleOnCloseEditor}
            url="https://s3-ap-southeast-2.amazonaws.com/files.au.at2casting.com/uploads/audio/69/e7/ec/5c/69e7ec5c-9250-407b-8bdd-79784f405477.mp3?AWSAccessKeyId=AKIAJMR5PKKNFE5OPUSA&Expires=1650114331&Signature=yOPFa5s2OMSpzFl%2BNG0DkiI3GbY%3D&t=202203172305316768"
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AudioTab;
