import { Box, Button, Grid, Typography } from '@material-ui/core';
import { FileUpload, UsageData } from 'components';
import React, { useState } from 'react';
import { ENDPOINTS } from 'shared/constants/ENDPOINTS';
import { authToken } from 'shared/utils/authToken';
import { useAxios } from 'shared/hooks/useAxios';
import IMedia from 'shared/interfaces/utils/IMedia';
import { PhotoIcon, VideoIcon, AudioIcon } from 'components/Icons';
import { useStyles } from './Upload.styles';

interface UploadedFile extends IMedia {
  isCompleted?: boolean;
}

const Upload = () => {
  const classes = useStyles();
  const { getAuthToken } = authToken();
  const { POST } = useAxios();
  const [uploadedFiles, setUploadedFiles] = useState<UploadedFile[]>([]);
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

  const extractImageData = (url: string, callback: Function) => {
    const image = new Image();
    image.src = url;

    image.addEventListener('load', () => callback(image));
  };

  const sendFile = async (data: FormData) => {
    return POST<{ data: IMedia }>({
      url: `${ENDPOINTS.MEDIA}`,
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        'Content-Type': 'multipart/form-data',
      },
      data,
      onUploadProgress: (progressEvent) => {
        setProgress((progressEvent.loaded / progressEvent.total) * 100);
      },
    }).then((response) => {
      const { data: file } = response.data;

      setUploadedFiles((prevUploadedFiles) =>
        prevUploadedFiles.map((uploadedFile) => {
          if (uploadedFile.attributes.file_name === file.attributes.file_name) {
            return {
              ...uploadedFile,
              isCompleted: true,
            };
          }

          return uploadedFile;
        }),
      );
    });
  };

  const handleUpload = async (name: string, type: string, url: string) => {
    const [file_type, extension] = type.split('/') as [file_type: 'audio' | 'video' | 'image', extension: string];
    const data = new FormData();
    const file = dataURLtoFile(url, name);
    let width, height;

    // add to upload list
    setUploadedFiles((prevFiles) => [
      ...prevFiles,
      {
        id: `${prevFiles.length + 1}`,
        type: '',
        attributes: {
          id: '',
          file_type,
          attachment_url: '',
          tag_list: [],
          file_name: name,
          file_size: file.size,
        },
      },
    ]);

    // Payload
    data.append('attachment', dataURLtoFile(url, `${name}.${extension}`));
    data.append('file_type', file_type);
    data.append('file_name', name);
    data.append('file_size', file.size.toString());
    data.append('tag_list', '');

    // For images, store the width and height
    if (file_type === 'image') {
      return extractImageData(url, (image: HTMLImageElement) => {
        width = image.width;
        height = image.height;

        data.append('file_width', width.toString());
        data.append('file_height', height.toString());

        sendFile(data);
      });
    }

    sendFile(data);
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
    setUploadedFiles((prevFiles) => prevFiles.filter((_, fileIndex) => fileIndex !== idx));
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
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
                <Button
                  variant="outlined"
                  style={{ marginRight: 16, borderRadius: 40 }}
                  onClick={() => setUploadedFiles([])}
                >
                  Clear list
                </Button>
              </Box>
            </Box>
            <Grid>
              {uploadedFiles.map((file: UploadedFile, index) => (
                <div className={classes.uploadCard} key={file.id}>
                  <div className={classes.uploadCard__icon}>{displayIcon(file.attributes.file_type)}</div>
                  <div className={classes.uploadCard__info}>
                    <p className={classes.uploadCard__fileName}>{file.attributes.file_name}</p>
                    <p className={classes.uploadCard__fileSize}>{formatBytes(file.attributes.file_size)}</p>
                  </div>
                  <div className={classes.uploadCard__progress}>
                    {progress === 100 || file.isCompleted ? (
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
              {uploadedFiles.length === 0 && (
                <div style={{ marginTop: '15px' }}>
                  <span>
                    <em>No files uploaded found.</em>
                  </span>
                </div>
              )}
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
