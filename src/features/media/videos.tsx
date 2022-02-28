import {
  Box,
  Button,
  Chip,
  Dialog,
  DialogContent,
  FormControlLabel,
  IconButton,
  Grid,
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
import { ImageSliderLargeIcon, ImageSliderSmallIcon, MediaUploadIcon, SearchIcon } from '../../components/Icons';
import MediaListItem from '../../components/MediaListItem';
import { MediaType } from '../../types';
import { queryTags } from './mediaSlice';
import { MediaFilterOption, MediaModel, MediaState } from './mediaTypes';
import VideoEditor from './videoEditor';
import ClearIcon from '@material-ui/icons/Clear';

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

interface VideoPageState {
  openEditor: boolean;
  mediaSlider: number;
  ratio: number;
  mediaHeight: number;
  selectedVideo?: MediaModel;
  searchName: string;
  searchTags: string[];
  searchOption: string;
}

const initialState: VideoPageState = {
  openEditor: false,
  mediaSlider: 6,
  ratio: 1,
  mediaHeight: 160,
  searchName: '',
  searchTags: [],
  searchOption: MediaFilterOption.ALL.toString(),
};

export default function Videos() {
  const classes = useStyles();
  const [state, setState] = useState<VideoPageState>(initialState);
  const media: MediaState = useSelector((state: RootState) => state.media);

  const appState: AppState = useSelector((state: RootState) => state.app);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(queryTags(MediaType.VIDEO));
  }, [dispatch]);

  const handleImageSliderChange = (event: React.ChangeEvent<{}>, newValue: number | number[]) => {
    const zoomValue = newValue as number;
    let mediaHeight = state.mediaHeight;
    let ratio = state.ratio;
    if (zoomValue === 2 || zoomValue === 6 || zoomValue === 10) {
      if (zoomValue !== state.mediaSlider) {
        let fac = zoomValue > state.mediaSlider ? 2 : 0.5;
        ratio = fac * ratio;
        mediaHeight = mediaHeight * fac;
      }
    }
    setState({ ...state, mediaSlider: zoomValue, ratio: ratio, mediaHeight: mediaHeight });
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

  const handleClearTagOption = () => {
    setState({ ...state, searchTags: [] });
  };

  const filterMedias = () => {
    return media.videos
      .filter((x) => state.searchName.trim().length === 0 || x.name.indexOf(state.searchName.trim()) > -1)
      .filter((x) => state.searchTags.length === 0 || _.intersection(x.tags, state.searchTags).length > 0)
      .filter(
        (x) =>
          state.searchOption !== MediaFilterOption.UNTAGGED.toString() ||
          (state.searchOption.toString() === MediaFilterOption.UNTAGGED.toString() && x.tags.length === 0),
      );
  };

  return (
    <Box className={classes.container}>
      <Grid container>
        <Grid item xs={12} lg={8} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography className={classes.header}>Videos</Typography>
          <Box style={{ display: 'flex', alignItems: 'center' }}>
            <ImageSliderSmallIcon width="16" height="16" viewBox="0 0 16 16" style={{ fontSize: 16 }} />
            <ImageSizeSlider
              aria-labelledby="continuous-slider"
              style={{ width: 96, margin: '0 16px' }}
              step={4}
              min={2}
              max={10}
              value={state.mediaSlider}
              onChange={handleImageSliderChange}
            />
            <ImageSliderLargeIcon width="24" height="24" viewBox="0 0 24 24" style={{ fontSize: 24 }} />
          </Box>
        </Grid>
        <Grid item xs={12} lg={4} style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center' }}>
          <Button variant="contained" startIcon={<MediaUploadIcon />} className={classes.newButton} onClick={() => {}}>
            Upload New File
          </Button>
        </Grid>
      </Grid>
      <Grid container spacing={10}>
        <Grid item xs={12} lg={8}>
          <ImageList rowHeight={state.mediaHeight} cols={8} gap={8} className={classes.imageList}>
            {filterMedias().map((item) => (
              <ImageListItem key={item.fileUrl} cols={2 * state.ratio}>
                <MediaListItem
                  id={item.mediaId}
                  mediaType={0}
                  size={item.size}
                  duration={item.duration}
                  src={item.thumbnail || '/artist.png'}
                  title={item.name}
                  tags={item.tags}
                  onPlay={() => setState({ ...state, openEditor: true, selectedVideo: item })}
                  onEditMedia={() => {
                    setState({ ...state, selectedVideo: item, openEditor: true });
                  }}
                ></MediaListItem>
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
              <FormControlLabel value={MediaFilterOption.ALL.toString()} control={<Radio />} label="Show all Videos" />
              <FormControlLabel
                value={MediaFilterOption.UNUSED.toString()}
                control={<Radio />}
                label="Show only unused Videos"
              />
              <FormControlLabel
                value={MediaFilterOption.UNTAGGED.toString()}
                control={<Radio />}
                label="Show only untagged Videos"
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
              {media.videoTags.map((item) => (
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
                8/15 files uploaded
              </Typography>
              <Typography variant="body2" style={{ color: '#707372' }}>
                53%
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
          <VideoEditor
            fileName={state?.selectedVideo?.name || ''}
            fileUrl={state.selectedVideo?.fileUrl || ''}
            originalFileUrl={state.selectedVideo?.originalFileUrl || ''}
            fileType="Video/MP4"
            uploadedTime={state?.selectedVideo?.createdTime?.toString() || ''}
            duration={state.selectedVideo?.duration || 0}
            originalDuration={state.selectedVideo?.originalDuration || 0}
            size={state.selectedVideo?.size || 0}
            tags={state.selectedVideo?.tags || []}
            tagOptions={media.videoTags}
            visibility={true}
            onClose={() => setState({ ...state, openEditor: false })}
            mediaId={state?.selectedVideo?.mediaId || 0}
            memberId={appState.memberId}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
}
