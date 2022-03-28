import { Box, Dialog, DialogContent, Typography } from '@material-ui/core';
import { AudioEditor } from 'components';
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

import AudioItem from './AudioItem/AudioItem';
import { useStyles } from './AudioTab.styles';

const AudioTab = () => {
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

  const handleDragEnd = (result: DropResult) => {};

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

  return (
    <Box className={classes.audioTab}>
      {/* Selected Videos */}
      <Box className={classes.selectedAudios}>
        <Box className={classes.titleContainer}>
          <Typography variant="h6">Selected Audios</Typography>
          <Typography variant="caption">(2 of 16 hidden)</Typography>
        </Box>
        <Box className={classes.selectedAudios__audioList}>
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable" direction="horizontal">
              {(provded: DroppableProvided) => (
                <div
                  ref={provded.innerRef}
                  {...provded.droppableProps}
                  className={classes.selectedAudios__dragContainer}
                >
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Draggable key={i.toString()} draggableId={i.toString()} index={i}>
                      {(providedDraggable: DraggableProvided, snapshot: DraggableStateSnapshot) => (
                        <div
                          ref={providedDraggable.innerRef}
                          style={getItemStyle(snapshot.isDragging, providedDraggable.draggableProps.style)}
                        >
                          <AudioItem
                            providedDraggable={providedDraggable}
                            snapshot={snapshot}
                            handleEditAudio={() => handleEditAudio(EditorMode.VIEW)}
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
          <Typography variant="h6">Other Audios</Typography>
          <Typography variant="caption">(2 of 16 hidden)</Typography>
        </Box>
        <Box className={classes.selectedAudios__audioList}>
          <ScrollContainer hideScrollbars={false} vertical={false} className={classes.selectedAudios__scroll}>
            {Array.from({ length: 32 }).map((_, i) => (
              <AudioItem isHideAudio handleEditAudio={() => handleEditAudio(EditorMode.VIEW)} />
            ))}
          </ScrollContainer>
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
