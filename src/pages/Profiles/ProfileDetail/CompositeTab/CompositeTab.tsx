import { Box, Dialog, DialogActions, DialogContent, Grid, IconButton, Typography } from '@material-ui/core';
import { CloseOutlined } from '@material-ui/icons';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import React, { RefObject, useRef, useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import { Button } from 'themes/elements';

import { useStyles } from './CompositeTab.styles';
import Content from './Content/Content';
import ImageItem from './ImageItem/ImageItem';
import Templates from './Templates/Templates';

const CompositeTab = () => {
  const classes = useStyles();
  const [templateId, setTemplateId] = useState<number>(1);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<number>(-1);
  const scrollRef = useRef<any>(null);

  const handleSelectTemplate = (newTemplateId: number) => {
    setTemplateId(newTemplateId);
  };

  const handleEditorClose = () => {
    setSelectedImage(-1);
    setIsEditorOpen(false);
  };

  const handleEditorOpen = () => {
    setIsEditorOpen(true);
  };

  const handleSelectedImage = (index: number) => {
    setSelectedImage(index);
  };

  const handleMoveRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 100, behavior: 'smooth' });
    }
  };

  const handleMoveLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -100, behavior: 'smooth' });
    }
  };

  return (
    <Box>
      <Grid container spacing={6}>
        {/* Templates */}
        <Grid item xs={12} lg={4}>
          <Box>
            <Box className={classes.titleContainer}>
              <Typography variant="h6">Templates</Typography>
              <Typography variant="caption">(2 of 16 hidden)</Typography>
            </Box>
            <Box className={classes.templateContainer}>
              <Templates templateId={templateId} setTemplateId={handleSelectTemplate} />
            </Box>
          </Box>
        </Grid>

        {/* Content */}
        <Grid item xs={12} lg={8} style={{ marginTop: 40 }}>
          <Box className={classes.actionContainer}>
            <Button
              color={isEditing ? 'primary' : 'default'}
              variant={isEditing ? 'contained' : 'outlined'}
              onClick={() => setIsEditing((isEditing) => !isEditing)}
            >
              {isEditing ? 'Cancel' : 'Edit'}
            </Button>
            <Button color="default" variant="outlined">
              Download
            </Button>
            <Button color="default" variant="outlined">
              Reset
            </Button>
          </Box>
          <Box className={classes.contentContainer}>
            <Content templateId={templateId} isEditing={isEditing} handleEditorOpen={handleEditorOpen} />
          </Box>
        </Grid>
      </Grid>

      {/* DIalog */}
      <Dialog
        open={isEditorOpen}
        onClose={handleEditorClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        fullWidth
        className={classes.dialog}
        maxWidth="lg"
      >
        <DialogContent>
          <Box className={classes.dialog__headerContainer}>
            <Box className={classes.dialog__titleContainer}>
              <Typography variant="h6">Select an Image</Typography>
              <Typography variant="caption">(2 of 16 hidden)</Typography>
            </Box>
            <IconButton onClick={handleEditorClose}>
              <CloseOutlined />
            </IconButton>
          </Box>
          <Box className={classes.dialog__imageList}>
            <IconButton onClick={handleMoveLeft}>
              <ChevronLeftIcon />
            </IconButton>
            <ScrollContainer
              vertical={false}
              className={classes.dialog__scroll}
              innerRef={scrollRef}
              hideScrollbars={false}
            >
              {Array.from({ length: 32 }).map((_, i) => (
                <ImageItem
                  selectedImage={selectedImage}
                  handleSelectedImage={handleSelectedImage}
                  index={i}
                  key={i}
                  src="https://images.pexels.com/photos/11053665/pexels-photo-11053665.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                />
              ))}
            </ScrollContainer>
            <IconButton onClick={handleMoveRight}>
              <ChevronRightIcon />
            </IconButton>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default CompositeTab;
