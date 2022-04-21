import 'cropperjs/dist/cropper.css';

import {
  Box,
  CircularProgress,
  Fade,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Menu,
  MenuItem,
  Switch,
  Typography,
} from '@material-ui/core';
import { Visibility } from '@material-ui/icons';
import CheckIcon from '@material-ui/icons/Check';
import clsx from 'clsx';
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
} from 'components/Icons';
import { Guid } from 'guid-typescript';
import React, { useEffect, useState } from 'react';
import { Cropper } from 'react-cropper';
import { EditorMode } from 'shared/enums/EditorMode';
import { Button, ImageSlider, Input } from 'themes/elements';
import { v4 as uuidv4 } from 'uuid';

import { useStyles } from './ImageEditor.styles';
import IMedia from 'shared/interfaces/IMedia';
import { formatBytes } from 'shared/utils/formatBytes';
import { mediaService } from 'shared/services/mediaService';

type Props = {
  onCloseEditor: () => void;
  media: IMedia;
};
const { retrieveSingleMediaUrl, retrieveMultipleMediaUrl } = mediaService();
const ImageEditor: React.FC<Props> = ({ onCloseEditor, media }) => {
  const [src, setSrc] = useState<string>(media.attributes.attachment_url);
  const { data } = retrieveMultipleMediaUrl([media.attributes.id]);
  console.log('data', data);

  // useEffect(() => {
  //   if (data) {
  //     const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
  //     console.log('blog', blob);

  //     setSrc(data.data[0].url);
  //   }
  // }, [data]);

  const [mode, setMode] = useState<EditorMode>(EditorMode.VIEW);
  const [anchorEl, setAnchorEl] = useState<any>(null);
  const [isPortrait, setIsPortrait] = useState<boolean>(false);
  const [cropper, setCropper] = useState<any>();
  const [sliderValue, setSliderValue] = useState(0.2);
  const [isLoaded, setIsLoaded] = useState(false);
  const [fileUploadId, setFileUploadId] = useState<string>('fileId');
  const [isImageLoaded, setIsImageLoaded] = useState<boolean>(false);
  const classes = useStyles();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleFlip = () => {
    const cropperData = cropper.getData();
    cropper.scaleX(-cropperData.scaleX);
  };

  const handleRotateRight = () => {
    cropper.rotate(45);
  };

  const handleRotateLeft = () => {
    cropper.rotate(-45);
  };

  const handleReset = () => {
    cropper.reset();
  };

  const handleChangeOrientation = (bool: boolean) => {
    if (isPortrait !== bool) {
      setIsPortrait(bool);
      handleClose();

      setIsImageLoaded(false);
      setFileUploadId(uuidv4());
    }
  };

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    const valueNumber = newValue as number;
    setSliderValue(valueNumber);
    cropper.zoomTo(valueNumber);
  };

  const handleCrop = () => {
    if (typeof cropper !== 'undefined') {
      console.log(cropper.getCroppedCanvas().toDataURL());

      // setSrc(.toDataURL('image/jpeg', 0.9));
    }
    setMode(EditorMode.VIEW);
  };

  return (
    <Box>
      {mode === EditorMode.VIEW ? (
        // View Mode
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
              <img src={src} className={classes.editorPanel__image} />
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
              value={media.attributes.file_name}
            />
            <Box marginTop={2}>
              <Typography variant="body2" className={classes.detailPanel__infoContent}>
                {media.attributes.file_type}
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
                {media.attributes.file_width}x{media.attributes.file_size}
              </Typography>
              <Typography variant="body2" className={classes.detailPanel__infoTitle}>
                Dimensions
              </Typography>
            </Box>

            <Box marginTop={2}>
              <Typography variant="body2" className={classes.detailPanel__infoContent}>
                {formatBytes(media.attributes.file_size)}
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
      ) : (
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
                <IconButton aria-label="upload picture" onClick={() => handleReset()}>
                  <ResetIcon width="24" height="24" viewBox="0 0 24 24" style={{ color: '#fff' }} />
                </IconButton>
                <IconButton aria-label="change ratio" onClick={handleClick}>
                  <EditorRatioIcon width="32" height="32" viewBox="0 0 32 32" style={{ color: '#fff', fontSize: 32 }} />
                </IconButton>
                <IconButton aria-label="flip picture" onClick={() => handleFlip()}>
                  <FlipIcon width="24" height="24" viewBox="0 0 24 24" style={{ color: '#fff' }} />
                </IconButton>
                <IconButton aria-label="rotate left picture" onClick={() => handleRotateLeft()}>
                  <RotateLeftIcon width="24" height="24" viewBox="0 0 24 24" style={{ color: '#fff' }} />
                </IconButton>
                <IconButton aria-label="rotate right picture" onClick={() => handleRotateRight()}>
                  <RotateRightIcon width="24" height="24" viewBox="0 0 24 24" style={{ color: '#fff' }} />
                </IconButton>
                <Button color="primary" variant="contained" style={{ marginLeft: 12 }} onClick={handleCrop}>
                  Done
                </Button>
                <Menu
                  id="fade-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  TransitionComponent={Fade}
                  className={classes.orientationMenu}
                  onClose={handleClose}
                >
                  <MenuItem onClick={() => handleChangeOrientation(true)}>
                    <ListItemText primary="Portrait" />
                    <ListItemSecondaryAction>
                      {isPortrait && <CheckIcon style={{ color: '#2962FF' }} />}
                    </ListItemSecondaryAction>
                  </MenuItem>
                  <MenuItem onClick={() => handleChangeOrientation(false)}>
                    <ListItemText primary="Landspace" />
                    <ListItemSecondaryAction>
                      {!isPortrait && <CheckIcon style={{ color: '#2962FF' }} />}
                    </ListItemSecondaryAction>
                  </MenuItem>
                </Menu>
              </Box>
            </Box>

            {/* ImageCropper */}

            <Box style={{ maxHeight: 620 }}>
              <Cropper
                key={fileUploadId}
                style={{ height: '100%', width: '100%' }}
                zoomTo={0}
                preview=".img-preview"
                src={src}
                minCropBoxHeight={isPortrait ? 600 : 450}
                initialAspectRatio={isPortrait ? 0.75 : 1.3}
                aspectRatio={isPortrait ? 0.75 : 1.3}
                viewMode={1}
                guides={true}
                modal={true}
                autoCrop={true}
                responsive={true}
                background={false}
                wheelZoomRatio={0.1}
                cropBoxResizable={true}
                checkCrossOrigin={false}
                checkOrientation={false}
                crossOrigin="anonymous"
                ready={() => setIsImageLoaded(true)}
                zoomOnWheel={true}
                onInitialized={(instance) => {
                  setCropper(instance);
                }}
              />
              <Box
                style={{
                  flex: 1,
                  display: 'flex',
                  justifyContent: 'center',
                  position: 'absolute',
                  bottom: 5,
                  width: '100%',
                  zIndex: 2,
                }}
              >
                <ImageSlider min={0.2} step={0.0001} value={sliderValue} max={5} onChange={handleSliderChange} />
              </Box>
            </Box>
            {/* Loading */}
            {!isImageLoaded && (
              <Box className={classes.loadingPanel}>
                <CircularProgress disableShrink />
                <Typography variant="h6" style={{ color: '#fff', marginTop: 16 }}>
                  Preparing Image.....
                </Typography>
              </Box>
            )}
          </Grid>
        </Grid>
      )}
    </Box>
  );
};

export default ImageEditor;
