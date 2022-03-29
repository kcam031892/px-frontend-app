import { Box, Dialog, DialogContent, Grid, Typography } from '@material-ui/core';
import { ImageEditor } from 'components';
import React, { useState } from 'react';
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  DropResult,
  Droppable,
  DroppableProvided,
} from 'react-beautiful-dnd';
import ScrollContainer from 'react-indiana-drag-scroll';

import { DndContext, closestCenter, MouseSensor, TouchSensor, DragOverlay, useSensor, useSensors } from '@dnd-kit/core';

import ImageItem from './ImageItem/ImageItem';
import { useStyles } from './ImageTab.styles';

const ImageTab = () => {
  const classes = useStyles();
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const handleDragEnd = (result: DropResult) => {};
  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    padding: 8 * 2,
    paddingLeft: 0,
    margin: `0 8px 0 0`,

    // styles we need to apply on draggables
    ...draggableStyle,
  });
  return (
    <Box className={classes.imageTab}>
      {/* Selected Images */}
      <Box className={classes.selectedImages}>
        <Box className={classes.titleContainer}>
          <Typography variant="h6">Selected Images</Typography>
          <Typography variant="caption">(2 of 16 hidden)</Typography>
        </Box>
        <Box className={classes.selectedImages__imageList}>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable">
              {(provded: DroppableProvided) => (
                <Grid ref={provded.innerRef} {...provded.droppableProps} container spacing={2}>
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Draggable key={i.toString()} draggableId={i.toString()} index={i}>
                      {(providedDraggable: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                        <Grid
                          xs={12}
                          lg={4}
                          item
                          key={i}
                          {...providedDraggable.draggableProps}
                          {...providedDraggable.dragHandleProps}
                          ref={providedDraggable.innerRef}
                        >
                          <ImageItem
                            providedDraggable={providedDraggable}
                            snapshot={snapshot}
                            handleEditImage={() => setIsEditorOpen(true)}
                          />
                        </Grid>
                      )}
                    </Draggable>
                  ))}
                </Grid>
              )}
            </Droppable>
          </DragDropContext>
        </Box>
      </Box>

      {/* Other Images */}
      <Box className={classes.otherImages}>
        <Box className={classes.titleContainer}>
          <Typography variant="h6">Other Image Images</Typography>
          <Typography variant="caption">(2 of 16 hidden)</Typography>
        </Box>
        <Box className={classes.selectedImages__imageList}>
          <ScrollContainer vertical={false} hideScrollbars={false} className={classes.selectedImage__scroll}>
            {Array.from({ length: 32 }).map((_, i) => (
              <ImageItem isHideImage handleEditImage={() => setIsEditorOpen(true)} />
            ))}
          </ScrollContainer>
        </Box>
      </Box>

      {/* Dialog / Edit Image */}
      <Dialog
        open={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        aria-labelledby="form-dialog-title"
        fullScreen
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogContent className={classes.dialogContent}>
          <ImageEditor onCloseEditor={() => setIsEditorOpen(false)} />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ImageTab;
