import {
  Box,
  Button,
  createStyles,
  Divider,
  Grid,
  IconButton,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  makeStyles,
  Theme,
  Typography,
} from '@material-ui/core';
import React, { useEffect, useCallback } from 'react';
import { AudioIcon, CircleIcon, DocumentIcon, MediaUploadIcon, PhotoIcon, VideoIcon } from '../../components/Icons';
import ImageList from '@material-ui/core/ImageList';
import ImageListItem from '@material-ui/core/ImageListItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { useDispatch, useSelector } from 'react-redux';
import { MediaState } from './mediaTypes';
import { RootState } from '../../app/rootReducer';
import { AppState } from '../../app/appSlice';
import { queryPhotos } from './mediaSlice';
import { useHistory } from 'react-router-dom';
import { useDropzone } from 'react-dropzone';
import { FileUploadModel, UploadStatus } from './uploadTypes';
import { postUploadFile } from './uploadSlice';
import { Guid } from 'guid-typescript';
import { useWindowSize } from '@react-hook/window-size';
import { bytesToSize } from '../../utils/numberUtil';
import _ from 'lodash';

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
    audioSecondaryAction: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      '& .MuiSvgIcon-root': {
        fontSize: 18,
      },
    },
    listContainer: {
      border: '1px solid #cfcfcf',
      borderRadius: '6px',
      '& .MuiListItemText-primary': {
        fontWeight: 700,
        fontSize: 14,
        color: '#25282A',
      },
      '& .MuiListItemText-secondary': {
        fontWeight: 900,
        fontSize: 10,
        color: '#707372',
      },
    },
    audioDuration: {
      fontWeight: 400,
      fontSize: 12,
      color: '#707372',
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
    allowanceList: {
      '& .MuiListItemIcon-root': {
        minWidth: 36,
      },
      '& .MuiListItemText-primary': {
        fontSize: 12,
        color: '#25282A',
      },
      '& .MuiTypography-body1': {
        fontSize: 12,
        color: '#707372',
      },
      '& .MuiSvgIcon-root': {
        fontSize: 18,
      },
    },
    noItemContainer: {
      border: '1px solid #cfcfcf',
      borderRadius: '6px',
      textAlign: 'center',
      padding: 24,
    },
    dropzone: {
      width: '100%',
      height: 500,
      border: 'solid 1px #cfcfcf',
      background: '#F3F3F3',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
);

interface StorageUsage {
  color: string;
  title: string;
  used: string;
}

const usageDataDefault: StorageUsage[] = [
  {
    title: 'Images',
    used: '',
    color: '#2196F3',
  },
  {
    title: 'Video',
    used: '',
    color: '#9C27B0',
  },
  {
    title: 'Audio',
    used: '',
    color: '#E91E63',
  },
];

const options = ['None', 'Remove', 'Edit'];

export default function Dashboard() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const media: MediaState = useSelector((state: RootState) => state.media);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const dispatch = useDispatch();
  const appState: AppState = useSelector((state: RootState) => state.app);

  const onDrop = useCallback((acceptedFiles) => {
    const fileModels: FileUploadModel[] = [];
    for (var i = 0; i < acceptedFiles.length; i++) {
      let formData = new FormData();
      let file = acceptedFiles[i];
      formData.append('articleFiles[]', file);
      dispatch(
        postUploadFile(appState.memberId, formData, {
          id: Guid.create().toString(),
          fileName: file.name,
          progress: 0,
          status: UploadStatus.Uploading,
          fileType: file.type,
          fileSize: file.size,
        }),
      );
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const history = useHistory();
  const [width, height] = useWindowSize();
  const imageColl = Math.floor(((width - 240) * 8) / 12 / 180);
  const imageHeight = Math.floor(180 * 1.25);
  const [usageData, setUsageData] = React.useState<StorageUsage[]>(usageDataDefault);

  useEffect(() => {
    if (usageData) {
      usageData.find((x) => x.title === 'Images')!.used = bytesToSize(_.sumBy(media.photos, (x) => x.size));
      usageData.find((x) => x?.title === 'Video')!.used = bytesToSize(_.sumBy(media.videos, (x) => x.size));
      usageData.find((x) => x?.title === 'Audio')!.used = bytesToSize(_.sumBy(media.audios, (x) => x.size));
      setUsageData(usageData);
    }
  }, [media.photos.length, media.videos.length, media.audios.length]);

  return (
    <Box className={classes.container}>
      <Box className={classes.pageHeader}>
        <Typography className={classes.header}>Media</Typography>
        <Button
          variant="contained"
          startIcon={<MediaUploadIcon />}
          className={classes.newButton}
          onClick={() => history.replace('upload')}
        >
          Upload Media
        </Button>
      </Box>
      <Grid container spacing={10}>
        <Grid item xs={12} lg={8}>
          {(media.photos.length > 0 || media.videos.length > 0 || media.audios.length > 0) && (
            <Box>
              <Box className={classes.section}>
                <Typography className={classes.sectionTitle}>Images</Typography>
                {
                  <ImageList rowHeight={imageHeight} cols={imageColl} gap={8} className={classes.imageList}>
                    {media.photos.map((item) => (
                      <ImageListItem
                        key={item.fileUrl}
                        cols={item.croppedDimensionWidth >= item.croppedDimensionHeight ? 2 : 1}
                      >
                        <img src={item.fileUrl} alt={item.name} />
                      </ImageListItem>
                    ))}
                  </ImageList>
                }
                {media.photos.length === 0 && <Box className={classes.noItemContainer}>No Images Yet</Box>}
              </Box>
              <Box className={classes.section}>
                <Typography className={classes.sectionTitle}>Video</Typography>
                {media.videos.length > 0 && (
                  <ImageList rowHeight={160} cols={8} gap={8} className={classes.imageList}>
                    {/* {media.videos.map((item) => (
                                <ImageListItem key={item.img} cols={item.cols}>
                                    <img src={item.img} alt={item.title} />
                                </ImageListItem>
                            ))} */}
                  </ImageList>
                )}
                {media.videos.length === 0 && <Box className={classes.noItemContainer}>No Videos Yet</Box>}
              </Box>
            </Box>
          )}
          {media.photos.length === 0 && media.audios.length === 0 && media.videos.length === 0 && (
            <Box>
              <Box className={classes.dropzone} {...getRootProps()}>
                <input {...getInputProps()} id="contained-button-file" />
                <img src="/download.png" alt="" width="96" />
                <Typography variant="h6">Please upload media here</Typography>
                <Typography variant="body1" style={{ fontSize: 16, color: '#25282A' }}>
                  Drag &amp; Drop your images, videos, audio and document files anywhere on this page to begin!
                </Typography>
                <Typography variant="body1" style={{ fontSize: 12, color: '#707372', marginTop: 26 }}>
                  Please ensure your media is high quality (images at least 1500 px in height, videos at 720p or higher)
                </Typography>
              </Box>
            </Box>
          )}
        </Grid>
        <Grid item xs={12} lg={4}>
          <Box style={{ marginTop: 32 }}>
            <Typography variant="h6">Allowance</Typography>
            <List className={classes.allowanceList}>
              <ListItem disableGutters>
                <ListItemIcon>
                  <PhotoIcon />
                </ListItemIcon>
                <ListItemText primary="Images" />
                <ListItemSecondaryAction>
                  <Typography>{media.photos.length} / 15</Typography>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem disableGutters>
                <ListItemIcon>
                  <VideoIcon />
                </ListItemIcon>
                <ListItemText primary="Video" />
                <ListItemSecondaryAction>
                  <Typography>{Math.floor(_.sumBy(media.videos, (v) => v.duration || 0) / 60)} / 5 min</Typography>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem disableGutters>
                <ListItemIcon>
                  <AudioIcon />
                </ListItemIcon>
                <ListItemText primary="Audio" />
                <ListItemSecondaryAction>
                  <Typography>Unlimited</Typography>
                </ListItemSecondaryAction>
              </ListItem>
              <ListItem disableGutters>
                <ListItemIcon>
                  <DocumentIcon />
                </ListItemIcon>
                <ListItemText primary="Documents" />
                <ListItemSecondaryAction>
                  <Typography>Unlimited</Typography>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Box>
          <Box style={{ marginTop: 32 }}>
            <Typography variant="h6">Storage</Typography>
            <Box className={classes.progressBar}>
              <Typography variant="subtitle2" style={{ fontWeight: 700, color: '#25282A' }}>
                1.93 GB of 3 GB used
              </Typography>
              <Typography variant="body2" style={{ color: '#707372' }}>
                64%
              </Typography>
            </Box>
            <LinearProgress variant="determinate" value={40} className={classes.linearProgress} />
            <List className={classes.allowanceList}>
              {usageData.map((x) => {
                return (
                  <ListItem disableGutters>
                    <ListItemIcon>
                      <CircleIcon fillColor={x.color} />
                    </ListItemIcon>
                    <ListItemText primary={x.title} />
                    <ListItemSecondaryAction>
                      <Typography>{x.used}</Typography>
                    </ListItemSecondaryAction>
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
