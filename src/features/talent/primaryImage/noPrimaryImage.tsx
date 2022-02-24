import React, { useCallback } from 'react';
import { Button, makeStyles, Typography } from '@material-ui/core';
import { useDropzone } from 'react-dropzone';

export interface NoImageProps {
  showDefaultText?: boolean;
  onFileSelected: (name: string, type: string, image: string) => void;
}

const useStyles = makeStyles({
  noImageContainer: {
    width: '512px',
    height: '328px',
    borderRadius: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
  },
});

function NoPrimaryImage(props: NoImageProps) {
  const classes = useStyles();
  const { onFileSelected } = props;
  const onDrop = useCallback(
    (acceptedFiles) => {
      acceptedFiles.forEach((file: any) => {
        const reader = new FileReader();
        reader.onabort = () => console.log('file reading was aborted');
        reader.onerror = () => console.log('file reading has failed');
        reader.onload = () => {
          onFileSelected(file.name, file.type, reader.result as any);
        };

        reader.readAsDataURL(file);
      });
    },
    [onFileSelected],
  );

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div {...getRootProps()} className={classes.noImageContainer}>
      <input {...getInputProps()} id="contained-button-file" />
      <div>
        <img src="/download.png" alt="" />
      </div>
      <br />
      {props.showDefaultText && (
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
      <div style={{ marginTop: '24px' }}>
        <Button variant="outlined" style={{ marginRight: '24px', textTransform: 'none' }}>
          Browse On Device
        </Button>
        <Button variant="outlined" style={{ textTransform: 'none' }}>
          Select from media
        </Button>
      </div>
    </div>
  );
}

export default NoPrimaryImage;
