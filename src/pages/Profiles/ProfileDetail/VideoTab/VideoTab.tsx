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
import React, { useEffect, useMemo, useState } from 'react';

import ScrollContainer from 'react-indiana-drag-scroll';
import { useQueryClient } from 'react-query';
import { useHistory, useLocation, useParams } from 'react-router-dom';
import { EditorMode } from 'shared/enums/EditorMode';
import { IProfileMedia, IProfileMediaSetSelectPayload } from 'shared/interfaces/IProfile';
import { mediaService } from 'shared/services/mediaService';
import { profileService } from 'shared/services/profileService';
import HiddenVideo from './VideoItem/HiddenVideo';

import VideoItem from './VideoItem/VideoItem';
import VideoOverlay from './VideoItem/VideoOverlay';
import { useStyles } from './VideoTab.styles';

const { getMediaProfile, setSelectProfileMedia, unSelectProfileMedia, updateProfileMediaSort } = profileService();
const { getMediaList } = mediaService();
const VideoTab = () => {
  const classes = useStyles();
  const { profileId } = useParams() as { profileId: string };
  const history = useHistory();
  const location = useLocation();
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [items, setItems] = useState<IProfileMedia[]>([]);
  const [activeId, setActiveId] = useState<string | null>(null);

  const { data: mediaProfileData, isLoading: isMediaProfileLoading } = getMediaProfile(profileId, {
    file_type: 'video',
  });
  const { data: mediaData, isLoading: isMediaLoading } = getMediaList({ file_type: 'video' });
  const { mutate } = setSelectProfileMedia();
  const { mutate: unselectMutate } = unSelectProfileMedia();
  const { mutate: updateSortMutate, isLoading: isLoadingUpdateSort } = updateProfileMediaSort();
  const queryClient = useQueryClient();

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

  const handleSetSelectMedia = (payload: IProfileMediaSetSelectPayload) => {
    mutate(
      { profileId, payload: { ...payload, sort: mediaProfileData ? mediaProfileData.data.length : 0 } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['profile_media', profileId, { file_type: 'video' }]);
        },
      },
    );
  };

  const handleUnselectMedia = (profileMediaId: string) => {
    unselectMutate(
      { profileId, profileMediaId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['profile_media', profileId, { file_type: 'video' }]);
        },
      },
    );
  };

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
    setActiveId(event.active.id);
  };

  const onDragOver = (event: DragEndEvent) => {
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
  };
  const onDragEnd = () => {
    const updatedItems = items.map((item, i) => {
      return {
        id: item.id,
        sort: i,
      };
    });
    setTimeout(() => {
      updateSortMutate({ profileId, sort: updatedItems });
    }, 500);

    queryClient.setQueriesData(['profile_media', profileId, { file_type: 'video' }], { data: items });
    setActiveId(null);
  };

  const isLoading = useMemo(() => isMediaLoading || isMediaProfileLoading, [isMediaLoading, isMediaProfileLoading]);

  return (
    <Box className={classes.videoTab}>
      {!isLoading && (
        <>
          {/* Selected Videos */}
          <Box className={classes.selectedVideos}>
            <Box className={classes.titleContainer}>
              <Typography variant="h6">Selected Videos</Typography>
              <Typography variant="caption">{`(${items.length} of ${mediaData?.data.length} selected)`}</Typography>
            </Box>
            <Box className={classes.selectedVideos__videoList}>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDragEnd={onDragEnd}
              >
                <SortableContext items={items} strategy={rectSortingStrategy}>
                  <Grid container spacing={2}>
                    {items.map((item) => (
                      <Grid xs={12} lg={4} item key={item.id}>
                        <VideoItem
                          item={item}
                          handleEditVideo={() => handleEditVideo(EditorMode.VIEW)}
                          handleUnselectMedia={handleUnselectMedia}
                        />
                      </Grid>
                    ))}
                  </Grid>
                  <DragOverlay>
                    {activeId ? <VideoOverlay item={items.filter((item: any) => item.id === activeId)[0]} /> : null}
                  </DragOverlay>
                </SortableContext>
              </DndContext>
            </Box>
          </Box>

          {/* Other Videos */}
          <Box className={classes.otherImages}>
            <Box className={classes.titleContainer}>
              <Typography variant="h6">Other Videos</Typography>
              <Typography variant="caption">{`(${filteredMedia.length} of ${mediaData?.data.length} hidden)`}</Typography>
            </Box>
            <Box className={classes.selectedVideos__videoList}>
              <Grid container spacing={2}>
                {mediaData &&
                  filteredMedia.map((item, i) => (
                    <Grid xs={12} lg={3} item key={item.id}>
                      <HiddenVideo
                        item={item}
                        handleEditVideo={() => handleEditVideo(EditorMode.VIEW)}
                        handleSetSelect={handleSetSelectMedia}
                      />
                    </Grid>
                  ))}
              </Grid>
            </Box>
          </Box>
        </>
      )}

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
