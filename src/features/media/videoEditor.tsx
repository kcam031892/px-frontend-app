import {
  Box,
  Button,
  CircularProgress,
  createStyles,
  Fade,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Menu,
  MenuItem,
  Switch,
  TextField,
  Theme,
  Typography,
} from '@material-ui/core';
import clsx from 'clsx';
import React, { useRef, useState } from 'react';
import {
  EditorBackIcon,
  EditorDeleteIcon,
  EditorDownloadIcon,
  EditorEditIcon,
  EditorRatioIcon,
  EditorShareIcon,
  FlipIcon,
  ImageCancelIcon,
  ResetIcon,
  RotateLeftIcon,
  RotateRightIcon,
} from '../../components/Icons';
import { bytesToSize, numberToDuration } from '../../utils/numberUtil';
import { DateTime } from 'luxon';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import TagSelector from '../../components/TagSelector';
import { Guid } from 'guid-typescript';
import VideoSlider from '../../components/VideoSlider';
import ReactPlayer, { ReactPlayerProps } from 'react-player';
import { useDispatch, useSelector } from 'react-redux';
import { MediaType } from '../../types';
import { cropMedia, saveMediaInfo, setMediaThumbnail } from './mediaSlice';
import { AppState } from '../../app/appSlice';
import { RootState } from '../../app/rootReducer';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      height: 840,
      overflow: 'hidden',
      justifyContent: 'center',
    },
    editorPanel: {
      background: '#25282A',
      width: 1136,
      padding: '24px 12px',
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
    },
    toolbar: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    imageContainer: {
      flex: 1,
      backgroundRepeat: 'no-repeat',
      backgroundSize: 'contain',
      backgroundPosition: 'center',
      marginTop: 34,
      marginBottom: 24,
    },
    infoPanel: {
      width: 296,
      padding: '20px 16px',
      backgroundColor: '#fff',
      display: 'flex',
      flexDirection: 'column',
    },
    detailGroupTitle: {
      fontSize: 20,
      fontWeight: 700,
    },
    detailGroupSubTitle: {
      fontSize: 14,
      fontWeight: 700,
    },
    fileInfoContent: {
      color: '#25282A',
      fontWeight: 400,
      fontSize: 14,
      marginTop: 16,
    },
    fileInfoTitle: {
      color: '#707372',
      fontWeight: 400,
      fontSize: 12,
    },
    settings: {
      '& .MuiListItemText-primary': {
        fontSize: 14,
      },
      '& .MuiListItem-root': {
        paddingLeft: '0 !important',
      },
    },
    hidden: {
      display: 'none !important',
    },
    loadingPanel: {
      height: 840,
      width: '100%',
      zIndex: 2,
      background: '#000',
      position: 'absolute',
      top: 0,
      left: 0,
      display: 'flex',
      alignItems: 'center',
      flexDirection: 'column',
      justifyContent: 'center',
      '& svg': {
        color: '#fff',
      },
    },
    orientation: {
      '& .MuiListItemText-primary': {
        fontSize: 12,
      },
    },
  }),
);

interface VideoEditorProps {
  mediaId: number;
  memberId: string;
  fileName: string;
  fileUrl: string;
  originalFileUrl: string;
  fileType: string;
  uploadedTime: string;
  duration: number;
  originalDuration: number;
  size: number;
  tags: string[];
  tagOptions: string[];
  visibility: boolean;
  onClose: () => void;
}

enum EditorMode {
  View,
  Edit,
}

interface VideoEditorState {
  fileName: string;
  tags: string[];
  tagOptions: string[];
  visibility: boolean;
  mode: EditorMode;
  imageLoaded: boolean;
  fileUploadId: string;
  sliderValue: number[];
  videoLength: number;
  playing: boolean;
}

const initialState: VideoEditorState = {
  fileName: '',
  tags: [],
  tagOptions: [],
  visibility: true,
  mode: EditorMode.View,
  imageLoaded: false,
  fileUploadId: Guid.create().toString(),
  sliderValue: [0, 10],
  videoLength: 10,
  playing: false,
};

export default function VideoEditor(props: VideoEditorProps) {
  const classes = useStyles();

  const dispatch = useDispatch();
  const uploadTime = DateTime.fromISO(props.uploadedTime);
  const [state, setState] = useState<VideoEditorState>({
    ...initialState,
    fileName: props.fileName,
    tags: props.tags,
    tagOptions: props.tagOptions,
    visibility: props.visibility,
  });
  const player = useRef<any>(null);

  const appState: AppState = useSelector((state: RootState) => state.app);

  const handleSetThumbnail = () => {
    setState({ ...state, playing: false });
    if (player && player.current) {
      const seek = Math.round(player.current.getCurrentTime());
      dispatch(setMediaThumbnail(appState.memberId, seek, props.mediaId));
    }
  };

  const handleCutMedia = () => {
    setState({ ...state, playing: false });
    if (player && player.current) {
      const sliderValue = state.sliderValue;
      const from = Math.round(sliderValue[0]);
      const to = Math.round(sliderValue[1]);
      dispatch(cropMedia(appState.memberId, from, to, props.mediaId, MediaType.VIDEO));
    }
  };

  const handlePlay = () => {
    setState({ ...state, playing: true });
  };

  const handleVideoReady = () => {
    if (player && player.current) {
      const duartion = player.current.getDuration();
      setState({ ...state, sliderValue: [0, Math.floor(duartion)], videoLength: Math.floor(duartion) });
    }
  };

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    const valueNumber = newValue as number[];
    const oldValues = state.sliderValue;
    if (oldValues[0] !== valueNumber[0]) {
      player!.current!.seekTo(valueNumber[0]);
    } else if (oldValues[1] !== valueNumber[1]) {
      player!.current!.seekTo(valueNumber[1]);
    }

    setState({ ...state, sliderValue: valueNumber });
  };

  const handleDeleteTag = (tag: string) => {
    if (state.tags.findIndex((x) => x === tag) > -1) {
      setState({ ...state, tags: state.tags.filter((x) => x !== tag) });
    }
  };

  const handleSelectTag = (tag: string) => {
    if (state.tags.findIndex((x) => x === tag) < 0) {
      setState({ ...state, tags: [...state.tags, tag] });
    }
  };

  const handleSaveChange = () => {
    dispatch(
      saveMediaInfo(props.memberId, props.mediaId, MediaType.VIDEO, state.fileName, state.visibility, state.tags),
    );
  };

  return (
    <>
      {state.mode === EditorMode.View && (
        <Grid container className={classes.container}>
          <Grid item className={classes.editorPanel}>
            <Box className={classes.toolbar}>
              <Box>
                <IconButton onClick={() => props.onClose()}>
                  <EditorBackIcon width="24" height="24" viewBox="0 0 24 24"></EditorBackIcon>
                </IconButton>
              </Box>
              <Box>
                <Button
                  variant="outlined"
                  style={{ color: '#B6B7B7', border: '1px solid rgba(182, 183, 183, 0.4)' }}
                  onClick={handleSetThumbnail}
                >
                  Set Thumbnail
                </Button>
                <IconButton onClick={() => setState({ ...state, mode: EditorMode.Edit, imageLoaded: false })}>
                  <EditorEditIcon width="24" height="24" viewBox="0 0 24 24"></EditorEditIcon>
                </IconButton>
                <IconButton>
                  <EditorShareIcon width="24" height="24" viewBox="0 0 24 24"></EditorShareIcon>
                </IconButton>
                <IconButton>
                  <EditorDownloadIcon width="24" height="24" viewBox="0 0 24 24"></EditorDownloadIcon>
                </IconButton>
                <IconButton>
                  <EditorDeleteIcon width="24" height="24" viewBox="0 0 24 24"></EditorDeleteIcon>
                </IconButton>
              </Box>
            </Box>
            <Box className={classes.imageContainer}>
              <ReactPlayer
                ref={player}
                className="react-player"
                url={props.fileUrl || ''}
                width="100%"
                height="100%"
                controls={true}
                playing={state.playing}
                onPlay={handlePlay}
              />
            </Box>
          </Grid>
          <Grid item className={classes.infoPanel}>
            <Typography variant="h6" className={classes.detailGroupTitle}>
              Details
            </Typography>
            <Typography variant="subtitle2" className={classes.detailGroupSubTitle} style={{ marginTop: 10 }}>
              File Name
            </Typography>
            <TextField
              placeholder={''}
              margin={'normal'}
              fullWidth
              value={state.fileName}
              InputProps={{ disableUnderline: true }}
              InputLabelProps={{ shrink: true }}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                setState({ ...state, fileName: event.target.value })
              }
            />
            <Typography variant="body2" className={classes.fileInfoContent} style={{ marginTop: 10 }}>
              {props.fileType}
            </Typography>
            <Typography variant="body2" className={classes.fileInfoTitle}>
              File Type
            </Typography>
            <Typography variant="body2" className={classes.fileInfoContent}>
              {`${uploadTime.toFormat('cccc')}, ${uploadTime.toFormat('dd MMM yyyy')} at ${uploadTime.toFormat(
                'hh:mm a',
              )}`}
            </Typography>
            <Typography variant="body2" className={classes.fileInfoTitle}>
              Uploaded
            </Typography>
            <Typography variant="body2" className={classes.fileInfoContent}>
              {bytesToSize(props.size)}
            </Typography>
            <Typography variant="body2" className={classes.fileInfoTitle}>
              Size
            </Typography>
            <Typography variant="body2" className={classes.fileInfoContent}>
              {numberToDuration(props.duration)} Seconds
            </Typography>
            <Typography variant="body2" className={classes.fileInfoTitle}>
              Duration
            </Typography>
            <Typography variant="h6" className={classes.detailGroupTitle} style={{ marginTop: 32 }}>
              Tags
            </Typography>
            <TagSelector
              tags={state.tags}
              tagOptions={state.tagOptions}
              onSelectTag={(tag: string) => handleSelectTag(tag)}
              onDeleteTag={(tag: string) => handleDeleteTag(tag)}
            />
            <Typography variant="h6" className={classes.detailGroupTitle} style={{ marginTop: 32 }}>
              Settings
            </Typography>
            <List className={classes.settings}>
              <ListItem>
                <ListItemIcon>
                  {props.visibility ? <Visibility /> : <VisibilityOff style={{ color: '#D9D9D9' }} />}
                </ListItemIcon>
                <ListItemText primary="Image Visibility"></ListItemText>
                <ListItemSecondaryAction>
                  <Switch
                    checked={state.visibility}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
                      setState({ ...state, visibility: event.target.checked })
                    }
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
            <Button
              color="primary"
              variant="contained"
              style={{ marginTop: 16 }}
              fullWidth
              onClick={() => handleSaveChange()}
            >
              Save Changes
            </Button>
          </Grid>
        </Grid>
      )}

      {state.mode === EditorMode.Edit && (
        <Grid container className={classes.container}>
          <Grid item className={classes.editorPanel}>
            <Box className={classes.toolbar}>
              <Box>
                <IconButton onClick={() => setState({ ...state, mode: EditorMode.View })}>
                  <ImageCancelIcon width="16" height="16" viewBox="0 0 16 16" />
                  <span style={{ marginLeft: '12px', fontSize: '14px', color: '#B6B7B7' }}>Cancel</span>
                </IconButton>
              </Box>
              <Box>
                <IconButton aria-label="upload picture">
                  <ResetIcon width="24" height="24" viewBox="0 0 24 24" style={{ color: '#fff' }} />
                </IconButton>

                <Button color="primary" variant="contained" style={{ marginLeft: 12 }} onClick={handleCutMedia}>
                  Done
                </Button>
              </Box>
            </Box>
            <Box style={{ maxHeight: 700 }}>
              <ReactPlayer
                ref={player}
                className="react-player"
                url={props.originalFileUrl || ''}
                width="100%"
                height="100%"
                controls={false}
                playing={false}
                onReady={handleVideoReady}
              />
              <Box
                style={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  position: 'absolute',
                  bottom: 20,
                  left: 0,
                  width: '100%',
                  zIndex: 2,
                  padding: '0 20px',
                }}
              >
                <VideoSlider
                  key={'slider_' + state.fileUploadId}
                  min={0}
                  step={1}
                  value={state.sliderValue}
                  max={state.videoLength}
                  onChange={handleSliderChange}
                  style={{ width: '100%' }}
                  valueLabelDisplay="on"
                  valueLabelFormat={(value) => <div>{new Date(value * 1000).toISOString().substr(14, 5)}</div>}
                />
              </Box>
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
}
