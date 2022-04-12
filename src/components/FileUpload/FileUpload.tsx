import { Box, Button, Typography } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

import { useStyles } from './FileUpload.styles';

type Props = {
  showDefaultText?: boolean;
  onFileSelected: (name: string, type: string, image: string, file?: File) => void;
  variant?: 'primaryImage' | 'uploader';
  handleSelectFromMedia?: () => void;
};
const FileUpload: React.FC<Props> = ({
  showDefaultText,
  onFileSelected,
  variant = 'primaryImage',
  handleSelectFromMedia,
}) => {
  const classes = useStyles();
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          onFileSelected(file.name, file.type, reader.result as string, file);
        };
        reader.readAsDataURL(file);
      });
    },
    [onFileSelected],
  );

  const _handleSelectFromMedia = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    if (handleSelectFromMedia) {
      handleSelectFromMedia();
    }
  };

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <Box className={classes.container}>
      <input {...getInputProps()} id="contained-button-file" accept="image/png, image/jpeg, image/jpg, .webp, .heif" />
      <Box {...getRootProps()}>
        <img src="/download.png" alt="File" />
      </Box>

      {showDefaultText && (
        <Typography variant="h6" gutterBottom>
          You Don’t Have a Primary Image
        </Typography>
      )}
      {variant === 'primaryImage' && (
        <>
          <Typography variant="body2" gutterBottom>
            Drop your .png .jpg or .jpeg.
          </Typography>
          <Typography variant="body2" gutterBottom style={{ marginTop: '20px', textAlign: 'center', color: '#2962FF' }}>
            <b>IMPORTANT: </b>
            <br />
            Image should be 1500 pixels in height and 150 DPI or larger
          </Typography>
          <Box style={{ marginTop: '24px' }}>
            <Button variant="outlined" style={{ marginRight: '24px', textTransform: 'none' }} {...getRootProps()}>
              Browse On Device
            </Button>
            <Button variant="outlined" style={{ textTransform: 'none' }} onClick={_handleSelectFromMedia}>
              Select from Media
            </Button>
          </Box>
        </>
      )}
      {variant === 'uploader' && (
        <Box className={classes.uploaderContainer}>
          <Typography variant="h6">Please upload media here</Typography>
          <Typography variant="body1" style={{ fontSize: 16, color: '#25282A', textAlign: 'center' }}>
            Drag &amp; Drop your images, videos, audio and document files anywhere on this page to begin!
          </Typography>
          <Typography variant="body1" style={{ fontSize: 12, color: '#707372', marginTop: 26 }}>
            Please ensure your media is high quality (images at least 1500 px in height, videos at 720p or higher)
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default FileUpload;
