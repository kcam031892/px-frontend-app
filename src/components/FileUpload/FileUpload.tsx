import { Box, Button, Typography } from '@material-ui/core';
import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { useStyles } from './FileUpload.styles';

type Props = {
  showDefaultText?: boolean;
  onFileSelected: (name: string, type: string, image: string) => void;
};
const FileUpload: React.FC<Props> = ({ showDefaultText, onFileSelected }) => {
  const classes = useStyles();
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onload = () => {
          onFileSelected(file.name, file.type, reader.result as string);
        };
        reader.readAsDataURL(file);
      });
    },
    [onFileSelected],
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  return (
    <Box {...getRootProps()} className={classes.container}>
      <input {...getInputProps()} id="contained-button-file" />
      <Box>
        <img src="/download.png" alt="File" />
      </Box>
      {showDefaultText && (
        <Typography variant="h6" gutterBottom>
          You Don’t Have a Primary Image
        </Typography>
      )}
      <Typography variant="body2" gutterBottom>
        Drop your .png .jpg or other image file here to begin.
      </Typography>
      <Typography variant="body2" gutterBottom style={{ marginTop: '20px', textAlign: 'center', color: '#2962FF' }}>
        <b>IMPORTANT: </b>
        <br />
        Image should be 1500 pixels in height and 150 DPI or larger
      </Typography>
      <Box style={{ marginTop: '24px' }}>
        <Button variant="outlined" style={{ marginRight: '24px', textTransform: 'none' }}>
          Browse On Device
        </Button>
        <Button variant="outlined" style={{ textTransform: 'none' }}>
          Select from media
        </Button>
      </Box>
    </Box>
  );
};

export default FileUpload;
