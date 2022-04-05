import { Box, Dialog, DialogContent, IconButton } from '@material-ui/core';
import { FileUpload } from 'components/FileUpload';
import { RemoveIcon } from 'components/Icons';
import React from 'react';

import { useStyles } from './FileUploadDialog.styles';

type Props = {
  open: boolean;
  onClose: () => void;
  onFileSelected: (name: string, type: string, image: string) => void;
};
const FileUploadDialog: React.FC<Props> = ({ open, onClose, onFileSelected }) => {
  const classes = useStyles();
  const handleClose = () => onClose();
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      fullWidth={false}
      maxWidth={false}
      aria-labelledby="form-dialog-title"
      className={classes.dialog}
    >
      <DialogContent>
        <Box className={classes.dialog__endContent}>
          <IconButton onClick={handleClose}>
            <RemoveIcon width={19} height={18} viewBox="0 0 19 18" />
          </IconButton>
        </Box>
        <FileUpload onFileSelected={onFileSelected} />
      </DialogContent>
    </Dialog>
  );
};

export default FileUploadDialog;
