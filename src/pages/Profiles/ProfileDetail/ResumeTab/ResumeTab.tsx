import { Box, Grid, Typography } from '@material-ui/core';
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

import ImageItem from '../ImageTab/ImageItem/ImageItem';
import ResumeSection from './ResumeSection/ResumeSection';
import { useStyles } from './ResumeTab.styles';

const ResumeTab = () => {
  const classes = useStyles();
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const handleDragEnd = (result: DropResult) => {
    setIsDragging(false);
  };
  const handleDragStart = () => setIsDragging(true);
  const [isSectionSelected, setIsSectionSelected] = useState<{
    module: 'selected' | 'hidden' | undefined;
    index: number;
  }>({
    module: undefined,
    index: -1,
  });

  const handleSetSelected = (module: 'selected' | 'hidden', index: number) => {
    if (isSectionSelected.module !== module && isSectionSelected.index !== index) {
      setIsSectionSelected({ module, index });
    } else {
      setIsSectionSelected({ module: undefined, index: -1 });
    }
  };

  return (
    <Box className={classes.resumeTab}>
      {/* Selected Resume Section */}
      <Box className={classes.selectedResume}>
        <Box className={classes.titleContainer}>
          <Typography variant="h6">Selected Resume</Typography>
          <Typography variant="caption">(2 of 16 hidden)</Typography>
        </Box>
        {/* Selected Section List */}
        <Box className={classes.selectedResume__sectionList} style={{ paddingBottom: isDragging ? '12rem' : '0' }}>
          <DragDropContext onDragEnd={handleDragEnd} onDragStart={() => handleDragStart()}>
            <Droppable droppableId="droppable">
              {(provided: DroppableProvided) => (
                <Grid
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className={classes.selectedResume__dragContainer}
                  container
                  spacing={2}
                >
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Draggable key={i.toString()} draggableId={i.toString()} index={i}>
                      {(providedDraggable: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                        <Grid
                          item
                          xs={12}
                          {...providedDraggable.draggableProps}
                          {...providedDraggable.dragHandleProps}
                          ref={providedDraggable.innerRef}
                        >
                          <ResumeSection
                            isSelected={isSectionSelected}
                            index={i}
                            setSelected={handleSetSelected}
                            module="selected"
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

      {/* Other Section List */}
      <Box className={classes.otherResume}>
        <Box className={classes.titleContainer}>
          <Typography variant="h6">Other Resume</Typography>
          <Typography variant="caption">(2 of 16 hidden)</Typography>
        </Box>
        <Box className={classes.otherResume__sectionList}>
          <Grid container spacing={2}>
            {Array.from({ length: 4 }).map((_, i) => (
              <Grid item xs={12}>
                <ResumeSection
                  isSelected={isSectionSelected}
                  index={i}
                  module="hidden"
                  setSelected={handleSetSelected}
                />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default ResumeTab;
