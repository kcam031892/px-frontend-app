import {
  closestCenter,
  DragEndEvent,
  DragStartEvent,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DndContext,
  DragOverlay,
} from '@dnd-kit/core';
import { arrayMove, rectSortingStrategy, SortableContext } from '@dnd-kit/sortable';
import { Box, Dialog, DialogContent, Grid, Typography } from '@material-ui/core';
import { VideoEditor } from 'components';
import React, { useEffect, useState } from 'react';

import ScrollContainer from 'react-indiana-drag-scroll';
import { useHistory, useLocation } from 'react-router-dom';
import { EditorMode } from 'shared/enums/EditorMode';

import VideoItem from './VideoItem/VideoItem';
import { useStyles } from './VideoTab.styles';

const VideoTab = () => {
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
  const getItemStyle = (isDragging: boolean, draggableStyle: any) => ({
    padding: 8 * 2,
    paddingLeft: 0,
    margin: `0 8px 0 0`,

    // styles we need to apply on draggables
    ...draggableStyle,
  });

  useEffect(() => {
    if (location.search) {
      if (location.search === '?edit' || location.search === '?view') {
        setIsEditorOpen(true);
      }
    }
  }, [location.search]);

  const handleEditVideo = (mode: EditorMode) => {
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
    <Box className={classes.videoTab}>
      {/* Selected Videos */}
      <Box className={classes.selectedVideos}>
        <Box className={classes.titleContainer}>
          <Typography variant="h6">Selected Videos</Typography>
          <Typography variant="caption">(2 of 16 hidden)</Typography>
        </Box>
        <Box className={classes.selectedVideos__videoList}>
          <DndContext
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
          >
            <SortableContext items={items} strategy={rectSortingStrategy}>
              <Grid container spacing={2}>
                {items.map((item) => (
                  <Grid xs={12} lg={3} item key={item.id}>
                    <VideoItem item={item} handleEditVideo={() => handleEditVideo(EditorMode.VIEW)} />
                  </Grid>
                ))}
              </Grid>
              <DragOverlay>
                {activeId ? (
                  <VideoItem
                    item={items.filter((item: any) => item.id === activeId)[0]}
                    handleEditVideo={() => handleEditVideo(EditorMode.VIEW)}
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
          <Typography variant="h6">Other Videos</Typography>
          <Typography variant="caption">(2 of 16 hidden)</Typography>
        </Box>
        <Box className={classes.selectedVideos__videoList}>
          <Grid container spacing={2}>
            {items.map((item, i) => (
              <Grid xs={12} lg={3} item key={item.id}>
                <VideoItem item={item} isHideVideo handleEditVideo={() => handleEditVideo(EditorMode.VIEW)} />
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
          {/* <ImageEditor onCloseEditor={() => setIsEditorOpen(false)} /> */}
          <VideoEditor
            onCloseEditor={() => handleOnCloseEditor()}
            url="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default VideoTab;
