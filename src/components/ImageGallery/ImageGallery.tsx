import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useState } from 'react';
import IMedia from 'shared/interfaces/IMedia';
import { mediaService } from 'shared/services/mediaService';
import { profileService } from 'shared/services/profileService';
import { useStyles } from './ImageGallery.styles';
import ImageGalleryItem from './ImageGalleryItem';

type Props = {
  open: boolean;
  handleClose: () => void;
  handleSave: (mediaId?: string, media?: IMedia) => void;
};
const { getMediaList } = mediaService();

const ImageGallery: React.FC<Props> = ({ open, handleClose, handleSave }) => {
  const [selectedMediaImage, setSelectedMediaImage] = useState<IMedia | null>(null);

  const { data, refetch, isLoading } = getMediaList(
    { file_type: 'image' },
    {
      staleTime: 1000 * 60 * 5,
      refetchOnMount: 'always',
      enabled: open,
    },
  );
  const classes = useStyles();

  // useEffect(() => {
  //   if (open) {
  //     refetch();
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [open]);

  const handleSelectedMedia = (media: IMedia) => {
    if (media !== selectedMediaImage) {
      setSelectedMediaImage(media);
    } else {
      setSelectedMediaImage(null);
    }
  };

  const onSave = () => {
    if (selectedMediaImage) {
      handleSave(selectedMediaImage?.id, selectedMediaImage);
      setSelectedMediaImage(null);
    }
  };

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
      <DialogContent style={{ minHeight: 300 }}>
        <Box>
          {!isLoading ? (
            <Grid container spacing={2}>
              {data &&
                data.data.map((media) => (
                  <Grid item lg={3} key={media.id}>
                    <ImageGalleryItem
                      item={media}
                      isSelected={selectedMediaImage?.id === media.id}
                      handleSelectedMedia={handleSelectedMedia}
                    />
                  </Grid>
                ))}
            </Grid>
          ) : (
            <Typography>Loading</Typography>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" disableElevation onClick={handleClose}>
          Cancel
        </Button>
        <Button
          variant="contained"
          color="primary"
          onClick={() => onSave()}
          disableElevation
          disabled={!selectedMediaImage}
        >
          Save Selected Image
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ImageGallery;
