import { Box, Dialog, DialogContent, Grid, Typography } from '@material-ui/core';

import React, { useState } from 'react';
import ImageItem from './ImageItem/ImageItem';
import { useStyles } from './ImageTab.styles';
import ScrollContainer from 'react-indiana-drag-scroll';
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  Droppable,
  DroppableProvided,
  DropResult,
} from 'react-beautiful-dnd';
import { ImageEditor } from 'components';

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
            <Droppable droppableId="droppable" direction="horizontal">
              {(provded: DroppableProvided) => (
                <div
                  ref={provded.innerRef}
                  {...provded.droppableProps}
                  className={classes.selectedImage__dragContainer}
                >
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Draggable key={i.toString()} draggableId={i.toString()} index={i}>
                      {(providedDraggable: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                        <div
                          ref={providedDraggable.innerRef}
                          style={getItemStyle(snapshot.isDragging, providedDraggable.draggableProps.style)}
                        >
                          <ImageItem
                            providedDraggable={providedDraggable}
                            snapshot={snapshot}
                            handleEditImage={() => setIsEditorOpen(true)}
                          />
                        </div>
                      )}
                    </Draggable>
                  ))}
                </div>
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
          <ScrollContainer vertical={false} className={classes.selectedImage__scroll}>
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
