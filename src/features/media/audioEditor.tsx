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
import React, { useEffect, useRef, useState } from 'react';
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
  VideoPlayIcon,
} from '../../components/icon';
import { bytesToSize, numberToDuration } from '../../utils/numberUtil';
import { DateTime } from 'luxon';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import TagSelector from '../../components/TagSelector';
import { Cropper } from 'react-cropper';
import { Guid } from 'guid-typescript';
import CheckIcon from '@material-ui/icons/Check';
import VideoSlider from '../../components/VideoSlider';
import ReactPlayer from 'react-player';
import Waveform from '../../components/Waveform';
import { AppState, finishLoading, startLoading } from '../../app/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import { cropMedia, saveMediaInfo } from './mediaSlice';
import { MediaType } from '../../types/commonTypes';
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

interface AudioEditorProps {
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

interface AudioEditorState {
  fileName: string;
  tags: string[];
  tagOptions: string[];
  visibility: boolean;
  mode: EditorMode;
  audioLoaded: boolean;
  fileUploadId: string;
  sliderValue: number[];
  audioLength: number;
  playing: boolean;
}

const initialState: AudioEditorState = {
  fileName: '',
  tags: [],
  tagOptions: [],
  visibility: true,
  mode: EditorMode.View,
  audioLoaded: false,
  fileUploadId: Guid.create().toString(),
  sliderValue: [0, 10],
  audioLength: 10,
  playing: true,
};

export default function AudioEditor(props: AudioEditorProps) {
  const classes = useStyles();
  const dispatch = useDispatch();
  const uploadTime = DateTime.fromISO(props.uploadedTime);
  const [state, setState] = useState<AudioEditorState>({
    ...initialState,
    fileName: props.fileName,
    tags: props.tags,
    tagOptions: props.tagOptions,
    visibility: props.visibility,
    sliderValue: [0, props.originalDuration],
    audioLength: props.originalDuration,
  });

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
      saveMediaInfo(props.memberId, props.mediaId, MediaType.AUDIO, state.fileName, state.visibility, state.tags),
    );
  };

  const appState: AppState = useSelector((state: RootState) => state.app);

  const handleCutMedia = () => {
    setState({ ...state, playing: false });
    if (state.audioLoaded) {
      const sliderValue = state.sliderValue;
      const from = Math.round(sliderValue[0]);
      const to = Math.round(sliderValue[1]);
      dispatch(cropMedia(appState.memberId, from, to, props.mediaId, MediaType.AUDIO));
    }
  };

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    const valueNumber = newValue as number[];
    const oldValues = state.sliderValue;
    setState({ ...state, sliderValue: valueNumber });
  };

  useEffect(() => {
    dispatch(startLoading());
  }, []);

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
                <IconButton onClick={() => setState({ ...state, mode: EditorMode.Edit, audioLoaded: false })}>
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
                <Button
                  color="primary"
                  variant="contained"
                  style={{ marginLeft: 12 }}
                  disabled={!state.audioLoaded}
                  onClick={() => setState({ ...state, playing: !state.playing })}
                >
                  {state.playing ? 'Pause' : 'Play'}
                </Button>
              </Box>
            </Box>
            <Box className={classes.imageContainer} style={{ display: 'flex', alignItems: 'center' }}>
              <Waveform
                url={props.fileUrl}
                play={state.playing}
                audioReady={() => {
                  setState({ ...state, audioLoaded: true });
                  dispatch(finishLoading());
                }}
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
              {numberToDuration(props.duration)}
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
                  <Switch checked={props.visibility} />
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
              <Box style={{ marginTop: 150 }}>
                <Waveform
                  url={props.originalFileUrl}
                  play={true}
                  audioReady={() => {
                    setState({ ...state, audioLoaded: true });
                  }}
                />
              </Box>
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
                  max={state.audioLength}
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
