import {
  useSensors,
  useSensor,
  MouseSensor,
  TouchSensor,
  DragStartEvent,
  DragEndEvent,
  DndContext,
  closestCenter,
  DragOverlay,
} from '@dnd-kit/core';
import { arrayMove, rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { Box, Dialog, DialogContent, Grid, Typography } from '@material-ui/core';
import { AudioEditor } from 'components';
import React, { useEffect, useState } from 'react';
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
import { useHistory, useLocation } from 'react-router-dom';
import { EditorMode } from 'shared/enums/EditorMode';

import AudioItem from './AudioItem/AudioItem';
import { useStyles } from './AudioTab.styles';

const AudioTab = () => {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [items, setItems] = useState<any[]>(
    Array.from({ length: 10 }).map((_, i) => {
      return {
        id: i.toString(),
      };
    }),
  );

  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (location.search) {
      if (location.search === '?edit' || location.search === '?view') {
        setIsEditorOpen(true);
      }
    }
  }, [location.search]);

  const handleEditAudio = (mode: EditorMode) => {
    if (mode === EditorMode.VIEW) {
      history.push({
        search: '?view',
      });
    } else {
      history.push({
        search: '?edit',
      });
    }
  };

  const handleOnCloseEditor = () => {
    history.push({
      search: '',
    });
  };

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const onDragStart = (event: DragStartEvent) => {
    console.log('drag start');

    setActiveId(event.active.id);
  };
  console.log(items);

  const onDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active && over) {
      console.log(active.id, over.id);

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
    <Box className={classes.audioTab}>
      {/* Selected Videos */}
      <Box className={classes.selectedAudios}>
        <Box className={classes.titleContainer}>
          <Typography variant="h6">Selected Audios</Typography>
          <Typography variant="caption">(2 of 16 hidden)</Typography>
        </Box>
        <Box className={classes.selectedAudios__audioList}>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          >
            <SortableContext items={items} strategy={rectSortingStrategy}>
              <Grid container spacing={2}>
                {items.map((item, i) => (
                  <Grid xs={12} lg={3} item key={item.id}>
                    <AudioItem item={item} handleEditAudio={() => handleEditAudio(EditorMode.VIEW)} />
                  </Grid>
                ))}
              </Grid>
              <DragOverlay>
                {activeId ? (
                  <AudioItem
                    item={items.filter((item: any) => item.id === activeId)[0]}
                    handleEditAudio={() => handleEditAudio(EditorMode.VIEW)}
                  />
                ) : null}
              </DragOverlay>
            </SortableContext>
          </DndContext>
        </Box>
      </Box>

      {/* Other Videos */}
      <Box className={classes.otherImages}>
        <Box className={classes.titleContainer}>
          <Typography variant="h6">Other Audios</Typography>
          <Typography variant="caption">(2 of 16 hidden)</Typography>
        </Box>
        <Box className={classes.selectedAudios__audioList}>
          {items.map((item, i) => (
            <AudioItem item={item} isHideAudio handleEditAudio={() => handleEditAudio(EditorMode.VIEW)} />
          ))}
        </Box>
      </Box>

      {/* Dialog / Edit Audio */}
      <Dialog
        open={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        aria-labelledby="form-dialog-title"
        fullScreen
        classes={{ paper: classes.dialogPaper }}
      >
        <DialogContent className={classes.dialogContent}>
          <AudioEditor
            onCloseEditor={handleOnCloseEditor}
            url="https://s3-ap-southeast-2.amazonaws.com/files.au.at2casting.com/uploads/audio/69/e7/ec/5c/69e7ec5c-9250-407b-8bdd-79784f405477.mp3?AWSAccessKeyId=AKIAJMR5PKKNFE5OPUSA&Expires=1650114331&Signature=yOPFa5s2OMSpzFl%2BNG0DkiI3GbY%3D&t=202203172305316768"
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default AudioTab;
