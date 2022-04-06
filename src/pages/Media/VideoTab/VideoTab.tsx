import {
  Box,
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
  Radio,
  RadioGroup,
  Typography,
} from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import { useWindowSize } from '@react-hook/window-size';
import { VideoEditor } from 'components';
import { ImageSliderLargeIcon, ImageSliderSmallIcon, MediaUploadIcon, SearchIcon } from 'components/Icons';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router';
import { EditorMode } from 'shared/enums/EditorMode';
import { Button, Input } from 'themes/elements';
import { ENDPOINTS } from 'shared/constants/ENDPOINTS';
import { authToken } from 'shared/utils/authToken';
import { useAxios } from 'shared/hooks/useAxios';
import qs from 'query-string';
import IMedia, { IMediaResponse } from 'shared/interfaces/utils/IMedia';

import { ImageSizeSlider } from '../ImagesTab/ImageSizeSlider';
import VideoItem from './VideoItem/VideoItem';
import { useStyles } from './VideoTab.styles';

interface VideoListState {
  imageCol: number;
  imageHeight: number;
  imageSlider: number;
  ratio: number;
}
const VideoTab = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [width] = useWindowSize();
  const IMAGE_COL = Math.floor(((width - 240) * 8) / 12 / 180);
  const IMAGE_HEIGHT = Math.floor(180 * 1.25);
  const initialVideoListState: VideoListState = {
    imageSlider: 6,
    ratio: 1,
    imageCol: Math.floor(((width - 240) * 8) / 12 / 180),
    imageHeight: Math.floor(180 * 1.25),
  };
  const { getAuthToken } = authToken();
  const { GET } = useAxios();

  const [videoListState, setVideoListState] = useState<VideoListState>(initialVideoListState);
  const [sliderValue, setSliderValue] = useState<number>(6);
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [videos, setVideos] = useState<IMedia[]>([]);

  const handleSliderValueChange = (event: React.ChangeEvent<{}>, value: number | number[]) => {
    if (typeof value === 'number') {
      if (sliderValue !== value) {
        if (value !== videoListState.imageSlider) {
          const fact = value > videoListState.imageSlider ? 2 : 0.5;
          const ratio = fact * videoListState.ratio;

          setVideoListState({ ...videoListState, imageSlider: value, ratio });
        }
        setSliderValue(value);
      }
    }
  };

  const getVideos = async () => {
    const params = qs.stringify({
      file_type: 'video',
    });

    const response = await GET<IMediaResponse>({
      url: `${ENDPOINTS.MEDIA}?${params}`,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    return response.data;
  };

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

  useEffect(() => {
    if (location.search) {
      if (location.search === '?edit' || location.search === '?view') {
        setIsEditorOpen(true);
      }
    }
  }, [location.search]);

  useEffect(() => {
    getVideos().then((videos) => {
      if (!videos?.data.length) return;

      setVideos(videos.data);
    });
  }, []); // eslint-disable-line

  return (
    <Box>
      {/* Top */}
      <Grid container>
        {/* Header */}
        <Grid item xs={12} lg={8}>
          <Box className={classes.header}>
            <Typography className={classes.header__title}>Videos</Typography>
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
          <ImageList rowHeight={IMAGE_HEIGHT} cols={IMAGE_COL} gap={8} className={classes.videoList}>
            {videos.map((video: IMedia) => (
              <ImageListItem cols={1 * videoListState.ratio} key={video.id}>
                <video width="100%" height="auto" src={video.attributes.attachment_url} controls />
              </ImageListItem>
            ))}
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
          {/* <ImageEditor onCloseEditor={() => setIsEditorOpen(false)} /> */}
          <VideoEditor
            onCloseEditor={() => handleOnCloseEditor()}
            url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default VideoTab;
