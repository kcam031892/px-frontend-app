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
import React, { useEffect, useMemo, useState } from 'react';
import { useQueryClient } from 'react-query';

import { useHistory, useLocation, useParams } from 'react-router-dom';
import { EditorMode } from 'shared/enums/EditorMode';
import { IProfileMedia, IProfileMediaSetSelectPayload } from 'shared/interfaces/IProfile';
import { mediaService } from 'shared/services/mediaService';
import { profileService } from 'shared/services/profileService';

import AudioItem from './AudioItem/AudioItem';
import AudioOverlay from './AudioItem/AudioOverlay';
import HiddenAudio from './AudioItem/HiddenAudio';
import { useStyles } from './AudioTab.styles';

const { getMediaProfile, setSelectProfileMedia, unSelectProfileMedia } = profileService();
const { getMediaList } = mediaService();
const AudioTab = () => {
  const classes = useStyles();
  const { profileId } = useParams() as { profileId: string };
  const history = useHistory();
  const location = useLocation();
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [items, setItems] = useState<IProfileMedia[]>([]);
  const { data: mediaProfileData, isLoading: isMediaProfileLoading } = getMediaProfile(profileId, {
    file_type: 'audio',
  });
  const { data: mediaData, isLoading: isMediaLoading } = getMediaList({ file_type: 'audio' });
  const { mutate } = setSelectProfileMedia();
  const { mutate: unselectMutate } = unSelectProfileMedia();
  const queryClient = useQueryClient();

  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    if (mediaProfileData) {
      setItems(mediaProfileData.data);
    }
  }, [mediaProfileData]);

  const filteredMedia = useMemo(() => {
    const items = mediaData && mediaProfileData ? mediaData.data : [];
    return items.filter(
      (item) => !mediaProfileData?.data.some((profileItem) => profileItem.attributes.medium_id === item.id),
    );
  }, [mediaData, mediaProfileData]);

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

  const handleSetSelectMedia = (payload: IProfileMediaSetSelectPayload) => {
    mutate(
      { profileId, payload },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['profile_media', profileId, { file_type: 'audio' }]);
        },
      },
    );
  };

  const handleUnselectMedia = (profileMediaId: string) => {
    unselectMutate(
      { profileId, profileMediaId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['profile_media', profileId, { file_type: 'audio' }]);
        },
      },
    );
  };

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

  const onDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

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

  const isLoading = useMemo(() => isMediaLoading || isMediaProfileLoading, [isMediaLoading, isMediaProfileLoading]);
  return (
    <Box className={classes.audioTab}>
      {!isLoading && (
        <>
          {/* Selected Videos */}
          <Box className={classes.selectedAudios}>
            <Box className={classes.titleContainer}>
              <Typography variant="h6">Selected Audios</Typography>
              <Typography variant="caption">{`(${items.length} of ${mediaData?.data.length} selected)`}</Typography>
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
                    {mediaProfileData &&
                      items.map((item, i) => (
                        <Grid xs={12} lg={4} item key={item.id}>
                          <AudioItem
                            item={item}
                            handleEditAudio={() => handleEditAudio(EditorMode.VIEW)}
                            handleUnselectMedia={handleUnselectMedia}
                          />
                        </Grid>
                      ))}
                  </Grid>
                  <DragOverlay>
                    {activeId ? <AudioOverlay item={items.filter((item: any) => item.id === activeId)[0]} /> : null}
                  </DragOverlay>
                </SortableContext>
              </DndContext>
            </Box>
          </Box>

          {/* Other Videos */}
          <Box className={classes.otherImages}>
            <Box className={classes.titleContainer}>
              <Typography variant="h6">Other Audios</Typography>
              <Typography variant="caption">{`(${filteredMedia.length} of ${mediaData?.data.length} hidden)`}</Typography>
            </Box>
            <Box className={classes.selectedAudios__audioList}>
              <Grid container spacing={2}>
                {mediaData &&
                  filteredMedia.map((item, i) => (
                    <Grid xs={12} lg={3} item key={item.id}>
                      <HiddenAudio
                        item={item}
                        handleEditAudio={() => handleEditAudio(EditorMode.VIEW)}
                        handleSetSelect={handleSetSelectMedia}
                      />
                    </Grid>
                  ))}
              </Grid>
            </Box>
          </Box>
        </>
      )}

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
