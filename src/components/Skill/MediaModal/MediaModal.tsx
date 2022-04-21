import React, { useState, useEffect } from 'react';
import cn from 'classnames';
import {
  Grid,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
  ImageList,
  ImageListItem,
  IconButton,
} from '@material-ui/core';
import CheckIcon from '@material-ui/icons/Check';
import { useStyles } from './MediaModal.styles';
import { Props, TSelectedIds } from '.';

const MediaModal: React.FC<Props> = ({ isOpen, media, onConfirm, onCancel, initialSelectedIds }) => {
  const [selectedIds, setSelectedIds] = useState<TSelectedIds>(initialSelectedIds);
  const styles = useStyles();

  const getByFileType = (type: string) => media.filter((file) => file.attributes.file_type === type);

  const images = getByFileType('image');
  const videos = getByFileType('video');
  const audio = getByFileType('audio');

  const onSelect = (id: string) => setSelectedIds((prevSelectedIds) => [...prevSelectedIds, id]);

  const onRemoveSelected = (id: string) =>
    setSelectedIds((prevSelectedIds) => prevSelectedIds.filter((selectedId) => selectedId !== id));

  const onToggleSelect = (id: string) => {
    if (selectedIds.includes(id)) {
      onRemoveSelected(id);
    } else {
      onSelect(id);
    }
  };

  useEffect(() => {
    setSelectedIds(initialSelectedIds);
  }, [initialSelectedIds]);

  return (
    <Dialog
      open={isOpen}
      onClose={() => {}}
      aria-labelledby="Media modal"
      aria-describedby="Media modal selection gallery"
      fullWidth
      maxWidth="md"
      className={styles.container}
    >
      <DialogTitle>Select Media</DialogTitle>
      <DialogContent>
        <Box>
          <Typography className={styles.heading}>Images</Typography>
          <ImageList>
            {images.map((image, i) => (
              <ImageListItem key={i}>
                <div className={styles.item}>
                  <img src={image.attributes.attachment_url} />
                  <IconButton
                    onClick={() => onToggleSelect(image.id)}
                    className={cn(styles.selectBtn, {
                      [styles.selectBtnActive]: selectedIds.includes(image.id),
                    })}
                    title="Select"
                    disableRipple
                  >
                    <CheckIcon style={{ fontSize: 20 }} />
                  </IconButton>
                </div>
              </ImageListItem>
            ))}
          </ImageList>
          {!images.length && (
            <div style={{ marginTop: '5px' }}>
              <span>
                <em>No images found.</em>
              </span>
            </div>
          )}
        </Box>
        <Box style={{ marginTop: 20, marginBottom: 20 }}>
          <Typography className={styles.heading}>Videos</Typography>
          <div className={styles.videoContainer}>
            {videos.map((video, i) => (
              <div className={styles.item}>
                <video key={i} className={styles.video} src={video.attributes.attachment_url} controls />
                <IconButton
                  onClick={() => onToggleSelect(video.id)}
                  className={cn(styles.selectBtn, {
                    [styles.selectBtnActive]: selectedIds.includes(video.id),
                  })}
                  title="Select"
                  disableRipple
                >
                  <CheckIcon style={{ fontSize: 20 }} />
                </IconButton>
              </div>
            ))}
          </div>
          {!videos.length && (
            <div style={{ marginTop: '5px' }}>
              <span>
                <em>No videos found.</em>
              </span>
            </div>
          )}
        </Box>
        <Box>
          <Typography className={styles.heading}>Audio</Typography>
          <Grid item xs={12} lg={8}>
            <div>
              {audio.map((audioItem, i) => (
                <div key={i} className={styles.audioItem}>
                  <audio src={audioItem.attributes.attachment_url} controls />
                  <IconButton
                    onClick={() => onToggleSelect(audioItem.id)}
                    className={cn(styles.audioSelectBtn, styles.selectBtn, {
                      [styles.selectBtnActive]: selectedIds.includes(audioItem.id),
                    })}
                    title="Select"
                    disableRipple
                  >
                    <CheckIcon style={{ fontSize: 20 }} />
                  </IconButton>
                </div>
              ))}
            </div>
          </Grid>
          {!audio.length && (
            <div style={{ marginTop: '5px' }}>
              <span>
                <em>No audios found.</em>
              </span>
            </div>
          )}
        </Box>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" disableElevation onClick={onCancel}>
          Cancel
        </Button>
        <Button variant="contained" color="primary" onClick={() => onConfirm(selectedIds)} disableElevation>
          Confirm Selected
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MediaModal;
