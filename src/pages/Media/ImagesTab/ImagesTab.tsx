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
import React, { useState } from 'react';
import { EditorMode } from 'shared/enums/EditorMode';
import { Button, Input } from 'themes/elements';
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
  const initialImageListState: ImageListState = {
    imageSlider: 6,
    ratio: 1,
    imageCol: Math.floor(((width - 240) * 8) / 12 / 180),
    imageHeight: Math.floor(180 * 1.25),
  };

  const [imageSliderValue, setImageSliderValue] = useState<number>(6);
  const [imageListState, setImageListState] = useState<ImageListState>(initialImageListState);
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);

  const handleImageSliderChange = (event: React.ChangeEvent<{}>, value: number | number[]) => {
    if (typeof value === 'number') {
      if (imageSliderValue !== value) {
        if (value !== imageListState.imageSlider) {
          const fact = value > imageListState.imageSlider ? 2 : 0.5;
          const ratio = fact * imageListState.ratio;
          const imageHeight = imageListState.imageHeight * fact;
          setImageListState({ ...imageListState, imageSlider: value, ratio, imageHeight });
        }
        setImageSliderValue(value);
      }
    }
  };

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
                step={4}
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
          <ImageList
            rowHeight={imageListState.imageHeight}
            cols={imageListState.imageCol}
            gap={8}
            className={classes.imageList}
          >
            <ImageListItem cols={1 * imageListState.ratio}>
              <ImageItem
                src="https://picsum.photos/200/300"
                isBadQuality
                handleEditImage={() => setIsEditorOpen(true)}
              />
            </ImageListItem>
            <ImageListItem cols={2 * imageListState.ratio}>
              <ImageItem src="https://picsum.photos/200/300" handleEditImage={() => setIsEditorOpen(true)} />
            </ImageListItem>
            <ImageListItem cols={2 * imageListState.ratio}>
              <ImageItem src="https://picsum.photos/200/300" handleEditImage={() => setIsEditorOpen(true)} />
            </ImageListItem>
            <ImageListItem cols={2 * imageListState.ratio}>
              <ImageItem src="https://picsum.photos/200/300" handleEditImage={() => setIsEditorOpen(true)} />
            </ImageListItem>
            <ImageListItem cols={2 * imageListState.ratio}>
              <ImageItem src="https://picsum.photos/200/300" handleEditImage={() => setIsEditorOpen(true)} />
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
          <ImageEditor mode={EditorMode.VIEW} onCloseEditor={() => setIsEditorOpen(false)} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ImagesTab;
