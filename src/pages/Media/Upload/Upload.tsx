import { Box, Button, Grid, Typography } from '@material-ui/core';
import { FileUpload, UsageData } from 'components';
import React, { useState } from 'react';
import { ENDPOINTS } from 'shared/constants/ENDPOINTS';
import { authToken } from 'shared/utils/authToken';
import { useAxios } from 'shared/hooks/useAxios';
import IMedia from 'shared/interfaces/utils/IMedia';
import { PhotoIcon, VideoIcon, AudioIcon } from 'components/Icons';

import { useStyles } from './Upload.styles';

const Upload = () => {
  const classes = useStyles();
  const { getAuthToken } = authToken();
  const { POST } = useAxios();
  const [files, setFiles] = useState<IMedia[]>([]);
  const [progress, setProgress] = useState(0);

  function dataURLtoFile(dataurl: string, filename: string) {
    const arr = dataurl.split(','),
      mime = arr[0].match(/:(.*?);/)![1],
      bstr = atob(arr[1]);
    let n: number = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    return new File([u8arr], filename, { type: mime });
  }

  const handleUpload = (name: string, type: string, file: string) => {
    const [file_type, extension] = type.split('/') as [file_type: 'audio' | 'video' | 'image', extension: string];
    const data = new FormData();

    data.append('attachment', dataURLtoFile(file, `${name}.${extension}`));
    data.append('file_type', file_type);
    data.append('tag_list', '');

    // add to upload list
    setFiles((prevFiles) => [
      ...prevFiles,
      {
        id: `${prevFiles.length + 1}`,
        type: '',
        attributes: {
          id: '',
          file_type,
          attachment_url: '',
          tag_list: [],
        },
      },
    ]);

    POST<{ data: IMedia }>({
      url: `${ENDPOINTS.MEDIA}`,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        'Content-Type': 'multipart/form-data',
      },
      data,
      onUploadProgress: (progressEvent) => {
        setProgress((progressEvent.loaded / progressEvent.total) * 100);
      },
    }).then(() => {
      // TODO:
      // update the file from the "files" state with the response
      // setFiles(<new-file>);
    });
  };

  const displayIcon = (type: string) => {
    switch (type) {
      case 'audio':
        return <AudioIcon />;
      case 'video':
        return <VideoIcon />;
      case 'image':
        return <PhotoIcon />;
      default:
        throw new Error('invalid type');
    }
  };

  const removeFile = (idx: number) => {
    setFiles((prevFiles) => prevFiles.filter((_, fileIndex) => fileIndex !== idx));
  };

  return (
    <Box>
      <Typography className={classes.header}>Media</Typography>
      <Grid container spacing={6}>
        <Grid item xs={12} lg={8}>
          {/* DropZone / Upload */}
          <Box className={classes.dropzone}>
            <FileUpload onFileSelected={handleUpload} variant="uploader" />
          </Box>

          {/* Upload List  */}
          <Box className={classes.uploadList}>
            <Box className={classes.uploadList__action}>
              <Typography variant="h6" className={classes.uploadList__header}>
                Uploads
              </Typography>
              <Box>
                <Button variant="outlined" style={{ marginRight: 16, borderRadius: 40 }}>
                  Clear list
                </Button>
              </Box>
            </Box>
            <Grid>
              {files.map((file: IMedia, index) => (
                <div className={classes.uploadCard} key={file.id}>
                  <div className={classes.uploadCard__icon}>{displayIcon(file.attributes.file_type)}</div>
                  <div className={classes.uploadCard__info}>
                    <p className={classes.uploadCard__fileName}>Amazing.png</p>
                    <p className={classes.uploadCard__fileSize}>4.6kb</p>
                  </div>
                  <div className={classes.uploadCard__progress}>
                    {progress === 100 ? (
                      <p className={classes.uploadCard__progressCompleted}>Completed 100%</p>
                    ) : (
                      <div style={{ width: `${progress}%` }} className={classes.uploadCard__progressBar}></div>
                    )}
                  </div>
                  <Button variant="outlined" onClick={() => removeFile(index)}>
                    Remove
                  </Button>
                </div>
              ))}
            </Grid>
          </Box>
        </Grid>
        {/* Usage Data */}
        <Grid item xs={12} lg={4}>
          <UsageData />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Upload;
