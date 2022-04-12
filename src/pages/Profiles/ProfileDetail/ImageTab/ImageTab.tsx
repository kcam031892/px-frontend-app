import { Box, Dialog, DialogContent, Grid, Typography } from '@material-ui/core';
import { ImageEditor } from 'components';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import { profileService } from 'shared/services/profileService';
import { useParams } from 'react-router-dom';
import { mediaService } from 'shared/services/mediaService';
import HiddenImage from './ImageItem/HiddenImage';
import { IProfileMedia, IProfileMediaSetSelectPayload } from 'shared/interfaces/IProfile';
import { useQueryClient } from 'react-query';
import { errorResponseToArray } from 'shared/utils/errorResponseToArray';
import { useAlert } from 'themes/elements';
import ImageOverlay from './ImageItem/ImageOverlay';
import { debounce } from 'lodash';

const { getMediaProfile, setSelectProfileMedia, unSelectProfileMedia, updateProfileMediaSort, setProfilePrimaryImage } =
  profileService();
const { getMediaList } = mediaService();

const ImageTab = () => {
  const { profileId } = useParams() as { profileId: string };
  const classes = useStyles();
  const [items, setItems] = useState<IProfileMedia[]>([]);
  const { data: mediaProfileData, isLoading: isMediaProfileLoading } = getMediaProfile(profileId, {
    file_type: 'image',
  });
  const { data: mediaData, isLoading: isMediaLoading } = getMediaList({ file_type: 'image' });
  const { isOpen: isAlertOpen, alertRef, AlertOpen } = useAlert({ autoHideDuration: 2000, horizontal: 'right' });
  const { mutate } = setSelectProfileMedia();
  const { mutate: unselectMutate } = unSelectProfileMedia();
  const { mutate: updateSortMutate, isLoading: isLoadingUpdateSort } = updateProfileMediaSort();
  const { mutate: primaryImageMutate, isLoading: isSaving } = setProfilePrimaryImage();
  const queryClient = useQueryClient();

  const [activeId, setActiveId] = useState<string | null>(null);

  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);

  const sensors = useSensors(useSensor(MouseSensor), useSensor(TouchSensor));

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

  const onDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id);
  };

  const onDragOver = (event: DragEndEvent) => {
    const { active, over } = event;
    if (active && over) {
      if (active.id !== over.id) {
        setItems((items: IProfileMedia[]) => {
          const oldIndex = items.findIndex((x: IProfileMedia) => x.id === active.id);
          const newIndex = items.findIndex((x: IProfileMedia) => x.id === over.id);

          const movedItems = arrayMove(items, oldIndex, newIndex);
          return movedItems;
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

    queryClient.setQueriesData(['profile_media', profileId, { file_type: 'image' }], { data: items });
    setActiveId(null);
  };

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedDragOver = useCallback(
    debounce(onDragOver, 40, {
      trailing: false,
      leading: true,
    }),
    [],
  );

  const handleSetSelectMedia = (payload: IProfileMediaSetSelectPayload) => {
    mutate(
      { profileId, payload: { ...payload, sort: mediaProfileData ? mediaProfileData.data.length : 0 } },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['profile_media', profileId, { file_type: 'image' }]);
        },
        onError: (errors) => {
          if (errors?.response?.data?.errors) {
            const errorResponseArray = errorResponseToArray(errors.response.data.errors);
            AlertOpen('error', errorResponseArray.join(','));
          } else {
            AlertOpen('error', 'Something went wrong');
          }
        },
      },
    );
  };

  const handleUnselectMedia = (profileMediaId: string) => {
    unselectMutate(
      { profileId, profileMediaId },
      {
        onSuccess: () => {
          queryClient.invalidateQueries(['profile_media', profileId, { file_type: 'image' }]);
        },
        onError: (errors) => {
          if (errors?.response?.data?.errors) {
            const errorResponseArray = errorResponseToArray(errors.response.data.errors);
            AlertOpen('error', errorResponseArray.join(','));
          } else {
            AlertOpen('error', 'Something went wrong');
          }
        },
      },
    );
  };

  const handleMakePrimary = (mediaId: string) => {
    const formData = new FormData();
    formData.set('medium_id', mediaId);

    primaryImageMutate(
      { profileId, formData },
      {
        onSuccess: () => {
          queryClient.removeQueries('profiles');
          queryClient.invalidateQueries(['profile_primary_image', profileId]);
        },
      },
    );
  };

  const isLoading = useMemo(() => isMediaLoading || isMediaProfileLoading, [isMediaLoading, isMediaProfileLoading]);

  return (
    <Box className={classes.imageTab}>
      {!isLoading && (
        <>
          {/* Selected Images */}
          <Box className={classes.selectedImages}>
            <Box className={classes.titleContainer}>
              <Typography variant="h6">Selected Images</Typography>
              <Typography variant="caption">{`(${items.length} of ${mediaData?.data.length} selected)`}</Typography>
            </Box>
            <Box className={classes.selectedImages__imageList}>
              <DndContext
                sensors={sensors}
                collisionDetection={closestCenter}
                onDragStart={onDragStart}
                onDragOver={onDragOver}
                onDragEnd={onDragEnd}
                onDragCancel={onDragEnd}
              >
                <SortableContext items={items} strategy={rectSortingStrategy}>
                  <Grid container spacing={2}>
                    <Box className={classes.profileContainer}>
                      {mediaProfileData &&
                        items.map((item, i) => (
                          <Box
                            style={{
                              minWidth: (item.attributes.medium_width * 150) / item.attributes.medium_height - 150,
                              maxWidth: (item.attributes.medium_width * 150) / item.attributes.medium_height,
                              height: 150,
                            }}
                            key={item.id}
                          >
                            <ImageItem
                              item={item}
                              handleEditImage={() => setIsEditorOpen(true)}
                              handleUnselectMedia={handleUnselectMedia}
                              handleMakePrimary={handleMakePrimary}
                            />
                          </Box>
                        ))}
                    </Box>
                  </Grid>
                  <DragOverlay>
                    {activeId ? (
                      <Box
                        style={{
                          maxWidth:
                            (items.filter((item: any) => item.id === activeId)[0].attributes.medium_width * 150) /
                            items.filter((item: any) => item.id === activeId)[0].attributes.medium_height,
                          height: 150,
                        }}
                      >
                        <ImageOverlay item={items.filter((item: any) => item.id === activeId)[0]} />
                      </Box>
                    ) : null}
                  </DragOverlay>
                </SortableContext>
              </DndContext>
            </Box>
          </Box>

          {/* Other Images */}
          <Box className={classes.otherImages}>
            <Box className={classes.titleContainer}>
              <Typography variant="h6">Other Images</Typography>
              <Typography variant="caption">{`(${filteredMedia.length} of ${mediaData?.data.length} hidden)`}</Typography>
            </Box>
            <Box className={classes.selectedImages__imageList}>
              <Box className={classes.profileContainer}>
                {mediaData &&
                  filteredMedia.map((item, i) => (
                    <Box
                      style={{
                        minWidth: (item.attributes.file_width * 150) / item.attributes.file_height - 150,
                        maxWidth: (item.attributes.file_width * 150) / item.attributes.file_height,
                        height: 150,
                      }}
                      key={item.id}
                    >
                      <HiddenImage
                        item={item}
                        handleEditImage={() => setIsEditorOpen(true)}
                        handleSetSelect={handleSetSelectMedia}
                      />
                    </Box>
                  ))}
              </Box>
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
          <ImageEditor onCloseEditor={() => setIsEditorOpen(false)} />
        </DialogContent>
      </Dialog>
      {isAlertOpen && alertRef}
    </Box>
  );
};

export default ImageTab;
