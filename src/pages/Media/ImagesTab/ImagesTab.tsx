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
import { ImageEditor } from 'components';
import { ImageSliderLargeIcon, ImageSliderSmallIcon, MediaUploadIcon, SearchIcon } from 'components/Icons';
import React, { useState, useEffect } from 'react';
import { Button, Input } from 'themes/elements';
import { ENDPOINTS } from 'shared/constants/ENDPOINTS';
import { authToken } from 'shared/utils/authToken';
import { useAxios } from 'shared/hooks/useAxios';
import qs from 'query-string';
import IMedia, { IMediaResponse } from 'shared/interfaces/utils/IMedia';

import ImageItem from './ImageItem/ImageItem';
import { ImageSizeSlider } from './ImageSizeSlider';
import { useStyles } from './ImagesTab.styles';

interface ImageListState {
  imageCol: number;
  imageHeight: number;
  imageSlider: number;
  ratio: number;
}

const ImagesTab = () => {
  const classes = useStyles();
  const [width] = useWindowSize();
  const IMAGE_COL = Math.floor(((width - 240) * 8) / 12 / 180);
  const IMAGE_HEIGHT = Math.floor(180 * 1.25);
  const initialImageListState: ImageListState = {
    imageSlider: 6,
    ratio: 1,
    imageCol: Math.floor(((width - 240) * 8) / 12 / 180),
    imageHeight: Math.floor(180 * 1.25),
  };
  const { getAuthToken } = authToken();
  const { GET } = useAxios();

  const [imageSliderValue, setImageSliderValue] = useState<number>(6);
  const [imageListState, setImageListState] = useState<ImageListState>(initialImageListState);
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [images, setImages] = useState<IMedia[]>([]);

  const handleImageSliderChange = (event: React.ChangeEvent<{}>, value: number | number[]) => {
    if (typeof value === 'number') {
      if (imageSliderValue !== value) {
        if (value !== imageListState.imageSlider) {
          const fact = value > imageListState.imageSlider ? 2 : 0.5;
          const ratio = fact * imageListState.ratio;

          setImageListState({ ...imageListState, imageSlider: value, ratio });
        }
        setImageSliderValue(value);
      }
    }
  };

  const getImages = async () => {
    const params = qs.stringify({
      file_type: 'image',
    });

    const response = await GET<IMediaResponse>({
      url: `${ENDPOINTS.MEDIA}?${params}`,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });

    return response.data;
  };

  useEffect(() => {
    getImages().then((images) => {
      if (!images?.data.length) return;

      setImages(images.data);
    });
  }, []); // eslint-disable-line

  return (
    <Box>
      {/* Top */}
      <Grid container>
        {/* Header */}
        <Grid item xs={12} lg={8}>
          <Box className={classes.header}>
            <Typography className={classes.header__title}>Images</Typography>
            <Box className={classes.header__sliderContainer}>
              <ImageSliderSmallIcon width="16" height="16" viewBox="0 0 16 16" style={{ fontSize: 16 }} />
              <ImageSizeSlider
                aria-labelledby="continuous-slider"
                style={{ width: 96, margin: '0 16px' }}
                step={2}
                min={2}
                max={10}
                value={imageSliderValue}
                onChange={handleImageSliderChange}
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
        {/* Image List */}
        <Grid item xs={12} lg={8}>
          <ImageList rowHeight={IMAGE_HEIGHT} cols={IMAGE_COL} gap={8} className={classes.imageList}>
            {images.map((image: IMedia) => (
              <ImageListItem cols={2 * imageListState.ratio} key={image.id}>
                <ImageItem src={image.attributes.attachment_url} handleEditImage={() => setIsEditorOpen(true)} />
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
          <ImageEditor onCloseEditor={() => setIsEditorOpen(false)} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ImagesTab;
