import {
  Box,
  Button,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  ListItemText,
  Theme,
  Typography,
  IconButton,
  Menu,
  MenuItem,
} from '@material-ui/core';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Guid } from 'guid-typescript';
import clsx from 'clsx';
import React, { useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import { AudioIcon, CircleIcon, DocumentIcon, MediaUploadIcon, PhotoIcon, VideoIcon } from '../../components/Icons';
import { useDispatch, useSelector } from 'react-redux';
import { AppState } from '../../app/appSlice';
import { RootState } from '../../app/rootReducer';
import { clearUploadItems, postUploadFile, removeUploadItem } from './uploadSlice';
import { FileUploadModel, FileUploadState, UploadStatus } from './uploadTypes';
import { MediaType } from '../../types/commonTypes';
import { bytesToSize } from '../../utils/numberUtil';
import { ImageCancelIcon } from '../../components/Icons';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import { MediaState } from './mediaTypes';
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
    imageListItem: {
      '& .MuiImageListItem-item': {
        borderRadius: 6,
        background: '#000',
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
    uploadContainer: {
      border: '1px solid #E1E1E1',
      borderRadius: '6px',
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
      background: '#ffffff',
    },
    uploadItem: {
      padding: '12px 8px 12px 16px',
      display: 'flex',
      boxShadow: 'inset 0px -1px 0px #E1E1E1',
      alignItems: 'center',
    },
    uploadItemAdv: {
      display: 'flex',
      flexDirection: 'row',
      width: '350px',
      alignItems: 'center',
      '& img': {
        marginRight: '12px',
      },
      '& h6': {
        fontWeight: 700,
        fontSize: 14,
      },
      '& p': {
        color: '#707372',
        fontSize: 12,
      },
    },
    uploadItemProgress: {
      flex: 1,
      display: 'flex',
      flexDirection: 'row',
    },
    uploadItemlinearProgress: {
      flex: 1,
      alignItems: 'center',
      display: 'flex',
    },
    uploadItemStatus: {
      width: '300px',
      display: 'flex',
      flexDirection: 'row',
      paddingLeft: 12,
      color: '#25282A',
      fontSize: 12,
    },
    uploadItemAction: {
      width: '40px',
      marginRight: '19px',
      display: 'flex',
      flexDirection: 'row',
    },
    linearProgress1: {
      width: '100%',
      backgroundColor: '#E1E1E1',
      '& .MuiLinearProgress-barColorPrimary': {
        backgroundColor: '#707372',
      },
    },
    linearProgress2: {
      width: '100%',
      backgroundColor: '#E1E1E1',
      '& .MuiLinearProgress-barColorPrimary': {
        backgroundColor: '#00C853',
      },
    },
    playerDialogPaper: {
      overflow: 'visible',
    },
    dialogPaper: {
      background: '#cfcfcf',
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
    dropzone: {
      width: '100%',
      height: 300,
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

const GetUploadItemThumbnail = (extension: string) => {
  if (extension === 'image/jpeg') {
    return '/jpg.png';
  } else if (extension === 'image/png') {
    return '/png.png';
  } else if (extension === 'video/mp4') {
    return '/mp4.png';
  } else if (extension === 'audio/mpeg') {
    return '/mp3.png';
  }
  return '';
};

export default function Uploader() {
  const classes = useStyles();
  //upload menu
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
  const uploadState: FileUploadState = useSelector((state: RootState) => state.upload);
  const handleRemoveUploadItem = (uploadId: FileUploadModel) => {
    dispatch(removeUploadItem(uploadId));
  };
  const handleClearList = () => {
    dispatch(clearUploadItems());
  };

  const [usageData, setUsageData] = React.useState<StorageUsage[]>(usageDataDefault);

  const media: MediaState = useSelector((state: RootState) => state.media);

  useEffect(() => {
    usageData.find((x) => x.title === 'Images')!.used = bytesToSize(_.sumBy(media.photos, (x) => x.size));
    usageData.find((x) => x.title === 'Video')!.used = bytesToSize(_.sumBy(media.videos, (x) => x.size));
    usageData.find((x) => x.title === 'Audio')!.used = bytesToSize(_.sumBy(media.audios, (x) => x.size));
    setUsageData(usageData);
  }, [media.photos.length, media.videos.length, media.audios.length]);

  return (
    <Box className={classes.container}>
      <Typography className={classes.header}>Media</Typography>
      <Grid container spacing={6}>
        <Grid item xs={12} lg={8}>
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
          <Box>
            <Box style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
              <Typography variant="h6" style={{ fontWeight: 700, fontSize: 34 }}>
                Uploads
              </Typography>
              <Box>
                <Button variant="outlined" style={{ marginRight: 16, borderRadius: 40 }} onClick={handleClearList}>
                  Clear list
                </Button>
              </Box>
            </Box>
            {uploadState.model.length > 0 && (
              <Box className={classes.uploadContainer}>
                {uploadState.model.map((file: FileUploadModel, index) => {
                  return (
                    <Box className={classes.uploadItem}>
                      <Box className={classes.uploadItemAdv}>
                        <Box>
                          <img src={GetUploadItemThumbnail(file.fileType)} alt="" width={25} height={24} />
                        </Box>
                        <Box>
                          <Typography variant="h6">{file.fileName}</Typography>
                          <Typography variant="body2" style={{ color: '#707372' }}>
                            {bytesToSize(file.fileSize)}
                          </Typography>
                        </Box>
                      </Box>
                      <Box className={classes.uploadItemProgress}>
                        <Box className={classes.uploadItemlinearProgress}>
                          {file.status !== UploadStatus.Completed && (
                            <LinearProgress
                              variant="determinate"
                              value={file.progress}
                              className={classes.linearProgress1}
                            />
                          )}
                          {file.status === UploadStatus.Completed && (
                            <LinearProgress
                              variant="determinate"
                              value={file.progress}
                              className={classes.linearProgress2}
                            />
                          )}
                        </Box>
                        <Box className={classes.uploadItemStatus}>
                          <Typography variant="body2" style={{ color: '#707372' }}>
                            {UploadStatus[file.status]}
                          </Typography>
                          &nbsp;&nbsp;
                          <Typography variant="body2" style={{ color: '#707372' }}>
                            {file.progress}%
                          </Typography>
                        </Box>
                      </Box>
                      <Box className={classes.uploadItemAction}>
                        <IconButton
                          disabled={file.status !== UploadStatus.Completed}
                          onClick={() => handleRemoveUploadItem(file)}
                        >
                          <ImageCancelIcon width="16" height="16" viewBox="0 0 16 16" />
                        </IconButton>
                        {/* <IconButton
                                            disabled={file.status !== UploadStatus.Completed}
                                            aria-label="more"
                                            aria-controls="long-menu"
                                            aria-haspopup="true"
                                            onClick={(event: React.MouseEvent<HTMLElement>) => handleMenuClick(file, event) }
                                        >
                                            <MoreVertIcon />
                                        </IconButton> */}
                      </Box>
                    </Box>
                  );
                })}
              </Box>
            )}
          </Box>
        </Grid>
        <Grid item xs={12} lg={4}>
          <Typography variant="h6">My Package</Typography>
          <Box>
            <Typography variant="h6">Progress</Typography>
            <Box className={classes.progressBar}>
              <Typography variant="subtitle2" style={{ fontWeight: 700, color: '#25282A' }}>
                {uploadState.model.filter((x) => x.status === UploadStatus.Completed).length}/{uploadState.model.length}{' '}
                files uploaded
              </Typography>
              <Typography variant="body2" style={{ color: '#707372' }}>
                {Math.floor(
                  uploadState.model.filter((x) => x.status === UploadStatus.Completed).length /
                    (uploadState.model.length || 1),
                ) * 100}
                %
              </Typography>
            </Box>
            <LinearProgress
              variant="determinate"
              value={
                Math.floor(
                  uploadState.model.filter((x) => x.status === UploadStatus.Completed).length /
                    uploadState.model.length,
                ) * 100
              }
              className={classes.linearProgress}
            />
          </Box>
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
