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
import React, { useState } from 'react';
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
} from '../../components/icon';
import { bytesToSize } from '../../utils/numberUtil';
import { DateTime } from 'luxon';
import { Visibility, VisibilityOff } from '@material-ui/icons';
import TagSelector from '../../components/TagSelector';
import { Cropper } from 'react-cropper';
import { Guid } from 'guid-typescript';
import CheckIcon from '@material-ui/icons/Check';
import ImageSlider from '../../components/ImageSlider';
import { useDispatch } from 'react-redux';
import { savePhotoImage, savePhotoInfo } from './mediaSlice';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    container: {
      overflow: 'hidden',
      justifyContent: 'center',
    },
    editorPanel: {
      background: '#25282A',
      width: 1136,
      padding: '24px 12px 34px 12px',
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

interface ImageEditorProps {
  mediaId: number;
  memberId: string;
  isPortrait: boolean;
  fileName: string;
  fileUrl: string;
  fileType: string;
  uploadedTime: string;
  width: number;
  height: number;
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

interface ImageEditorState {
  fileName: string;
  tags: string[];
  tagOptions: string[];
  visibility: boolean;
  mode: EditorMode;
  imageLoaded: boolean;
  isPortrait: boolean;
  fileUploadId: string;
  anchorEl: HTMLButtonElement | undefined;
  sliderValue: number;
}

const initialState: ImageEditorState = {
  fileName: '',
  tags: [],
  tagOptions: [],
  visibility: true,
  mode: EditorMode.View,
  imageLoaded: false,
  isPortrait: false,
  fileUploadId: Guid.create().toString(),
  anchorEl: undefined,
  sliderValue: 0,
};

export default function ImageEditor(props: ImageEditorProps) {
  const classes = useStyles();
  const uploadTime = DateTime.fromISO(props.uploadedTime);
  const [cropper, setCropper] = useState<any>();
  const [state, setState] = useState<ImageEditorState>({
    ...initialState,
    isPortrait: props.isPortrait,
    fileName: props.fileName,
    tags: props.tags,
    tagOptions: props.tagOptions,
    visibility: props.visibility,
  });

  const openRatio = Boolean(state.anchorEl);

  const handleChangeRatio = (event: React.MouseEvent<HTMLButtonElement>) => {
    setState({ ...state, anchorEl: event.currentTarget });
  };

  const handleClose = (isPortrait: boolean) => {
    const isLayoutChange = isPortrait !== state.isPortrait;
    setState({
      ...state,
      isPortrait: isPortrait,
      anchorEl: undefined,
      imageLoaded: isLayoutChange ? false : true,
      fileUploadId: isLayoutChange ? Guid.create.toString() : state.fileUploadId,
    });
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

  const handleCrop = () => {
    if (typeof cropper !== 'undefined') {
      const image = cropper.getCroppedCanvas().toDataURL();
      dispatch(savePhotoImage(props.memberId, props.mediaId, image));
      props.onClose();
    }
  };

  const handleSliderChange = (event: any, newValue: number | number[]) => {
    const valueNumber = newValue as number;
    setState({ ...state, sliderValue: valueNumber });
    cropper.zoomTo(valueNumber);
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

  const dispatch = useDispatch();
  const handleSaveChange = () => {
    dispatch(savePhotoInfo(props.memberId, props.mediaId, state.fileName, state.visibility, state.tags));
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
            <Box className={classes.imageContainer} style={{ backgroundImage: 'url(' + props.fileUrl + ')' }}></Box>
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
              {props.width} x {props.height}
            </Typography>
            <Typography variant="body2" className={classes.fileInfoTitle}>
              Dimensions
            </Typography>
            <Typography variant="body2" className={classes.fileInfoContent}>
              {bytesToSize(props.size)}
            </Typography>
            <Typography variant="body2" className={classes.fileInfoTitle}>
              Size
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
                <IconButton aria-label="upload picture" onClick={handleReset}>
                  <ResetIcon width="24" height="24" viewBox="0 0 24 24" style={{ color: '#fff' }} />
                </IconButton>
                <IconButton aria-label="change ratio" onClick={handleChangeRatio}>
                  <EditorRatioIcon width="32" height="32" viewBox="0 0 32 32" style={{ color: '#fff', fontSize: 32 }} />
                </IconButton>
                <IconButton aria-label="flip picture" onClick={handleFlip}>
                  <FlipIcon width="24" height="24" viewBox="0 0 24 24" style={{ color: '#fff' }} />
                </IconButton>
                <IconButton aria-label="rotate left picture" onClick={handleRotateLeft}>
                  <RotateLeftIcon width="24" height="24" viewBox="0 0 24 24" style={{ color: '#fff' }} />
                </IconButton>
                <IconButton aria-label="rotate right picture" onClick={handleRotateRight}>
                  <RotateRightIcon width="24" height="24" viewBox="0 0 24 24" style={{ color: '#fff' }} />
                </IconButton>
                <Button color="primary" variant="contained" style={{ marginLeft: 12 }} onClick={handleCrop}>
                  Done
                </Button>
                <Menu
                  id="fade-menu"
                  anchorEl={state.anchorEl}
                  keepMounted
                  open={openRatio}
                  onClose={() => handleClose(state.isPortrait)}
                  TransitionComponent={Fade}
                  className={classes.orientation}
                >
                  <MenuItem onClick={() => handleClose(true)}>
                    <ListItemText primary="Portrait" />
                    <ListItemSecondaryAction>
                      {state.isPortrait && <CheckIcon style={{ color: '#2962FF' }} />}
                    </ListItemSecondaryAction>
                  </MenuItem>
                  <MenuItem onClick={() => handleClose(false)}>
                    <ListItemText primary="Landspace" />
                    <ListItemSecondaryAction>
                      {!state.isPortrait && <CheckIcon style={{ color: '#2962FF' }} />}
                    </ListItemSecondaryAction>
                  </MenuItem>
                </Menu>
              </Box>
            </Box>
            <Box style={{ maxHeight: 620 }}>
              <Cropper
                key={state.fileUploadId}
                style={{ height: '100%', width: '100%' }}
                zoomTo={0}
                preview=".img-preview"
                src={props.fileUrl}
                minCropBoxHeight={state.isPortrait ? 600 : 450}
                initialAspectRatio={state.isPortrait ? 0.75 : 1.3}
                aspectRatio={state.isPortrait ? 0.75 : 1.3}
                viewMode={1}
                guides={false}
                modal={true}
                autoCrop={true}
                responsive={true}
                background={false}
                wheelZoomRatio={0.1}
                cropBoxResizable={true}
                ready={() => setState({ ...state, imageLoaded: true })}
                checkCrossOrigin={true}
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
                <ImageSlider
                  key={'slider_' + state.fileUploadId}
                  min={0.2}
                  step={0.0001}
                  value={state.sliderValue}
                  max={5}
                  onChange={handleSliderChange}
                />
              </Box>
            </Box>
            <Box
              className={clsx(classes.loadingPanel, {
                [classes.hidden]: state.imageLoaded,
              })}
            >
              <CircularProgress disableShrink />
              <Typography variant="h6" style={{ color: '#fff', marginTop: 16 }}>
                Preparing Image.....
              </Typography>
            </Box>
          </Grid>
        </Grid>
      )}
    </>
  );
}
