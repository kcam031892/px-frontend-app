import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from '@material-ui/core';
import React from 'react';
import { useStyles } from './ImageGallery.styles';
import ImageGalleryItem from './ImageGalleryItem';

type Props = {
  open: boolean;
  handleClose: () => void;
};
const ImageGallery: React.FC<Props> = ({ open, handleClose }) => {
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      fullWidth
      maxWidth="lg"
      className={classes.dialog}
    >
      <DialogTitle>Image Gallery</DialogTitle>
      <DialogContent>
        <Box>
          <Grid container spacing={2}>
            <Grid item lg={3}>
              <ImageGalleryItem />
            </Grid>
            <Grid item lg={3}>
              <ImageGalleryItem />
            </Grid>
            <Grid item lg={3}>
              <ImageGalleryItem />
            </Grid>
            <Grid item lg={3}>
              <ImageGalleryItem />
            </Grid>
            <Grid item lg={3}>
              <ImageGalleryItem />
            </Grid>
          </Grid>
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" disableElevation onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" disableElevation>
          Save Selected Image
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageGallery;
