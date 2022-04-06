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

import {
  DndContext,
  closestCenter,
  MouseSensor,
  TouchSensor,
  DragOverlay,
  useSensor,
  useSensors,
  DragStartEvent,
  DragEndEvent,
} from '@dnd-kit/core';
import { arrayMove, SortableContext, rectSortingStrategy } from '@dnd-kit/sortable';

import ImageItem from './ImageItem/ImageItem';
import { useStyles } from './ImageTab.styles';

const ImageTab = () => {
  const classes = useStyles();
  const [items, setItems] = useState<any[]>(
    Array.from({ length: 10 }).map((_, i) => {
      return {
        id: i.toString(),
      };
    }),
  );

  const [activeId, setActiveId] = useState<string | null>(null);

  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const handleDragEnd = (result: DropResult) => {};
  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    padding: 8 * 2,
    paddingLeft: 0,
    margin: `0 8px 0 0`,

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const onDragStart = (event: DragStartEvent) => {
    console.log('drag start');

    setActiveId(event.active.id);
  };
  console.log(items);

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active && over) {
      if (active.id !== over.id) {
        setItems((items: any) => {
          const oldIndex = items.findIndex((x: any) => x.id === active.id);
          const newIndex = items.findIndex((x: any) => x.id === over.id);

          return arrayMove(items, oldIndex, newIndex);
        });
      }
    }
    setActiveId(null);
  };

  return (
    <Box className={classes.imageTab}>
      {/* Selected Images */}
      <Box className={classes.selectedImages}>
        <Box className={classes.titleContainer}>
          <Typography variant="h6">Selected Images</Typography>
          <Typography variant="caption">(2 of 16 hidden)</Typography>
        </Box>
        <Box className={classes.selectedImages__imageList}>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          >
            <SortableContext items={items} strategy={rectSortingStrategy}>
              <Grid container spacing={2}>
                {items.map((item, i) => (
                  <Grid xs={12} lg={4} item key={item.id}>
                    <ImageItem item={item} handleEditImage={() => setIsEditorOpen(true)} />
                  </Grid>
                ))}
              </Grid>
              <DragOverlay>
                {activeId ? (
                  <ImageItem
                    item={items.filter((item: any) => item.id === activeId)[0]}
                    handleEditImage={() => setIsEditorOpen(true)}
                  />
                ) : null}
              </DragOverlay>
            </SortableContext>
          </DndContext>
        </Box>
      </Box>

      {/* Other Images */}
      <Box className={classes.otherImages}>
        <Box className={classes.titleContainer}>
          <Typography variant="h6">Other Image Images</Typography>
          <Typography variant="caption">(2 of 16 hidden)</Typography>
        </Box>
        <Box className={classes.selectedImages__imageList}>
          <Grid container spacing={2}>
            {items.map((item, i) => (
              <Grid xs={12} lg={3} item key={item.id}>
                <ImageItem item={item} handleEditImage={() => setIsEditorOpen(true)} />
              </Grid>
            ))}
          </Grid>
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
