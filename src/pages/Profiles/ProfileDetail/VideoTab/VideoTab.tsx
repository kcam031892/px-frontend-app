import { Box, Dialog, DialogContent, Typography } from '@material-ui/core';
import { VideoEditor } from 'components';
import React, { useEffect, useState } from 'react';
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  DropResult,
} from 'react-beautiful-dnd';
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

  const handleDragEnd = (result: DropResult) => {};
  return (
    <Box className={classes.videoTab}>
      {/* Selected Videos */}
      <Box className={classes.selectedVideos}>
        <Box className={classes.titleContainer}>
          <Typography variant="h6">Selected Videos</Typography>
          <Typography variant="caption">(2 of 16 hidden)</Typography>
        </Box>
        <Box className={classes.selectedVideos__videoList}>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable" direction="horizontal">
              {(provded: DroppableProvided) => (
                <div
                  ref={provded.innerRef}
                  {...provded.droppableProps}
                  className={classes.selectedVideos__dragContainer}
                >
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Draggable key={i.toString()} draggableId={i.toString()} index={i}>
                      {(providedDraggable: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                        <div
                          ref={providedDraggable.innerRef}
                          style={getItemStyle(snapshot.isDragging, providedDraggable.draggableProps.style)}
                        >
                          <VideoItem
                            providedDraggable={providedDraggable}
                            snapshot={snapshot}
                            handleEditVideo={() => handleEditVideo(EditorMode.VIEW)}
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

      {/* Other Videos */}
      <Box className={classes.otherImages}>
        <Box className={classes.titleContainer}>
          <Typography variant="h6">Other Videos</Typography>
          <Typography variant="caption">(2 of 16 hidden)</Typography>
        </Box>
        <Box className={classes.selectedVideos__videoList}>
          <ScrollContainer hideScrollbars={false} vertical={false} className={classes.selectedVideos__scroll}>
            {Array.from({ length: 32 }).map((_, i) => (
              <VideoItem isHideVideo handleEditVideo={() => handleEditVideo(EditorMode.VIEW)} />
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
