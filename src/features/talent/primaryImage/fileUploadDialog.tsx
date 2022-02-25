import React from 'react';
import { Box, Dialog, DialogContent, IconButton, makeStyles } from '@material-ui/core';
import { RemoveIcon } from '../../../components/icon';
import NoPrimaryImage from './noPrimaryImage';

export interface FileUploadDialogProps {
  open: boolean;
  onClose: () => void;
  onFileSelected: (name: string, type: string, image: string) => void;
}

const useStyles = makeStyles({
  dialogContainer: {
    '& .MuiPaper-rounded': {
      borderRadius: '24px !important',
    },
  },
  endContent: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  mainDropContainer: {
    width: '606px',
    height: '306px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    border: '1px solid #D9D9D9',
  },
  buttonSelectFile: {
    backgroundColor: '#2962FF',
    color: '#fff',
  },
});

function FileUploadDialog(props: FileUploadDialogProps) {
  const classes = useStyles();
  const { onClose, open, onFileSelected } = props;
  const handleClose = () => {
    onClose();
  };

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      className={classes.dialogContainer}
      fullWidth={false}
      maxWidth={false}
      aria-labelledby="form-dialog-title"
    >
      <DialogContent>
        <Box className={classes.endContent}>
          <IconButton onClick={handleClose}>
            <RemoveIcon width="19" height="18" viewBox="0 0 19 18" />
          </IconButton>
        </Box>
        <NoPrimaryImage onFileSelected={onFileSelected}></NoPrimaryImage>
      </DialogContent>
    </Dialog>
  );
}

export default FileUploadDialog;
