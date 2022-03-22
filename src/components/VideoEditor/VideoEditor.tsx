import {
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Switch,
  Typography,
} from '@material-ui/core';
import { Visibility } from '@material-ui/icons';
import {
  EditorBackIcon,
  EditorDeleteIcon,
  EditorDownloadIcon,
  EditorEditIcon,
  EditorShareIcon,
  ImageCancelIcon,
  ResetIcon,
} from 'components/Icons';
import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactPlayer from 'react-player';
import { EditorMode } from 'shared/enums/EditorMode';
import { Button, Input, VideoSlider } from 'themes/elements';
import { useStyles } from './VideoEditor.styles';
type Props = {
  onCloseEditor: () => void;
  url: string;
};
const VideoEditor: React.FC<Props> = ({ onCloseEditor, url }) => {
  const classes = useStyles();
  const player = useRef<any>(null);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [mode, setMode] = useState<EditorMode>(EditorMode.VIEW);
  const [sliderValue, setSliderValue] = useState<number[]>([0, 0]);
  const [videoLength, setVideoLength] = useState<number>(0);

  const handlePlay = () => {
    setIsPlaying(true);
  };

  const handleVideoReady = () => {
    if (player && player.current) {
      const duration = Math.floor(player.current.getDuration());

      setVideoLength(duration);
      if (sliderValue[0] === 0 && sliderValue[1] === 0) {
        setSliderValue([0, duration]);
      }
    }
  };

  const handleSliderChange = (event: any, value: number | number[]) => {
    if (Array.isArray(value)) {
      const oldValues = sliderValue;
      if (oldValues[0] !== value[0]) {
        player.current.seekTo(value[0]);
      } else if (oldValues[1] !== value[1]) {
        player.current.seekTo(value[1]);
      }
      setSliderValue(value);
    }
  };

  return (
    <>
      {mode === EditorMode.VIEW && (
        // View MOde
        <Grid container className={classes.container}>
          {/* Editor Panel */}
          <Grid item className={classes.editorPanel} lg={9}>
            <Box className={classes.toolbar}>
              <Box>
                <IconButton onClick={() => onCloseEditor()}>
                  <EditorBackIcon width="24" height="24" viewBox="0 0 24 24" />
                </IconButton>
              </Box>
              <Box>
                <Button variant="outlined" style={{ color: '#B6B7B7', border: '1px solid rgba(182, 183, 183, 0.4)' }}>
                  Set Thumbnail
                </Button>
                <IconButton onClick={() => setMode(EditorMode.EDIT)}>
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
            <Box className={classes.editorPanel__imageContainer}>
              <ReactPlayer
                ref={player}
                className="react-player"
                url={url}
                width="100%"
                height="100%"
                controls={true}
                playing={isPlaying}
                onPlay={handlePlay}
                onReady={() => console.log('ready')}
              />
            </Box>
          </Grid>
          {/* Detail Panel */}
          <Grid item className={classes.detailPanel} lg={3}>
            <Box>
              <Typography variant="h6" className={classes.detailPanel__title}>
                Details
              </Typography>
              <Typography variant="subtitle2" className={classes.detailPanel__subTitle} style={{ marginTop: 16 }}>
                File Name
              </Typography>
            </Box>

            <Input
              placeholder={'Image Name'}
              margin={'normal'}
              fullWidth
              InputProps={{ disableUnderline: true }}
              InputLabelProps={{ shrink: true }}
            />
            <Box marginTop={2}>
              <Typography variant="body2" className={classes.detailPanel__infoContent}>
                JPEG
              </Typography>
              <Typography variant="body2" className={classes.detailPanel__infoTitle}>
                File Type
              </Typography>
            </Box>
            <Box marginTop={2}>
              <Typography variant="body2" className={classes.detailPanel__infoContent}>
                12:12:12
              </Typography>
              <Typography variant="body2" className={classes.detailPanel__infoTitle}>
                Uploaded
              </Typography>
            </Box>

            <Box marginTop={2}>
              <Typography variant="body2" className={classes.detailPanel__infoContent}>
                25x25
              </Typography>
              <Typography variant="body2" className={classes.detailPanel__infoTitle}>
                Dimensions
              </Typography>
            </Box>

            <Box marginTop={2}>
              <Typography variant="body2" className={classes.detailPanel__infoContent}>
                25x25
              </Typography>
              <Typography variant="body2" className={classes.detailPanel__infoTitle}>
                Size
              </Typography>
            </Box>

            <Box marginTop={3}>
              <Typography variant="h6" className={classes.detailPanel__title}>
                Settings
              </Typography>
              <List className={classes.detailPanel__settings}>
                <ListItem>
                  <ListItemIcon>
                    <Visibility />
                  </ListItemIcon>
                  <ListItemText primary="Image Visibility"></ListItemText>
                  <ListItemSecondaryAction>
                    <Switch checked={true} />
                  </ListItemSecondaryAction>
                </ListItem>
              </List>
            </Box>
          </Grid>
        </Grid>
      )}

      {mode === EditorMode.EDIT && (
        // Edit Mode
        <Grid container className={classes.container}>
          <Grid item lg={9} className={classes.editorPanel}>
            {/* ToolBar */}

            <Box className={classes.toolbar}>
              <Box>
                <IconButton onClick={() => setMode(EditorMode.VIEW)}>
                  <ImageCancelIcon width="16" height="16" viewBox="0 0 16 16" />
                  <span style={{ marginLeft: '12px', fontSize: '14px', color: '#B6B7B7' }}>Cancel</span>
                </IconButton>
              </Box>
              <Box>
                <IconButton aria-label="upload picture">
                  <ResetIcon width="24" height="24" viewBox="0 0 24 24" style={{ color: '#fff' }} />
                </IconButton>

                <Button color="primary" variant="contained" style={{ marginLeft: 12 }}>
                  Done
                </Button>
              </Box>
            </Box>
            <Box style={{ maxHeight: 700 }}>
              <ReactPlayer
                ref={player}
                className="react-player"
                url={url}
                width="100%"
                height="100%"
                controls={false}
                playing={false}
                onReady={() => handleVideoReady()}
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
                  min={0}
                  step={1}
                  value={sliderValue}
                  max={videoLength}
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
};

export default VideoEditor;
