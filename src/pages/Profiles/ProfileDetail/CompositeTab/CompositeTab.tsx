import { Box, Grid, Typography } from '@material-ui/core';
import { ImageGallery } from 'components/ImageGallery';
import React, { useEffect, useMemo, useState } from 'react';

import { useQueryClient } from 'react-query';
import { useHistory, useParams } from 'react-router';
import { IComposite, INITIAL_COMPOSITE_STATES } from 'shared/constants/INITIAL_COMPOSITE_STATES';
import { ROUTES } from 'shared/constants/ROUTES';
import IMedia from 'shared/interfaces/IMedia';
import { IProfileTabDetailReponsePayload } from 'shared/interfaces/IProfile';
import { mediaService } from 'shared/services/mediaService';
import { profileService } from 'shared/services/profileService';
import { isShowCompositeCard } from 'shared/utils/isShowCompositeCard';
import { Button } from 'themes/elements';

import { useStyles } from './CompositeTab.styles';
import Content from './Content/Content';

import Templates from './Templates/Templates';

const { getSingleProfile, updateProfile, getProfileTabDetail } = profileService();
const { retrieveMultipleMediaUrl } = mediaService();
const CompositeTab = () => {
  const classes = useStyles();
  const { profileId } = useParams() as { profileId: string };
  const history = useHistory();
  const { data, isError, isLoading: isProfileLoading } = getSingleProfile(profileId);
  const { data: compositeCardData, isLoading: isProfileTabDetailLoading } = getProfileTabDetail(
    profileId,
    'composite_card',
  );
  const { mutate } = updateProfile();
  const queryClient = useQueryClient();
  const [templateId, setTemplateId] = useState<number>(1);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isEditorOpen, setIsEditorOpen] = useState<boolean>(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(1);
  const [currentCompositeData, setCurrentCompositeData] = useState<IComposite[]>(INITIAL_COMPOSITE_STATES);
  const [compositeData, setCompositeData] = useState<IComposite[]>(INITIAL_COMPOSITE_STATES);

  // Get Current Composite Card Data By Template Id
  const getSelectedCurrentComposite = useMemo(() => {
    return currentCompositeData.filter((data) => data.template_id === templateId)[0] || [];
  }, [currentCompositeData, templateId]);

  // Get New Composite Card Data by Template Id
  const getSelectedComposite = useMemo(() => {
    return compositeData.filter((data) => data.template_id === templateId)[0] || [];
  }, [compositeData, templateId]);

  const getImages = useMemo(() => {
    return getSelectedComposite.images.map((img) => img.url);
  }, [getSelectedComposite.images]);

  const { data: mediaUrlData, isLoading: isMediaUrlLoading } = retrieveMultipleMediaUrl(
    getSelectedCurrentComposite?.images?.map((i) => i.id).filter((s) => s !== ''),
  );

  // Redirect to profile list when composite card is not available
  useEffect(() => {
    if (data) {
      if (!isShowCompositeCard(data.data.attributes.profile_type)) {
        history.push(ROUTES.TALENT.PROFILE);
      }
    }
  }, [data, history]);

  // Set Composite Data States

  useEffect(() => {
    if (compositeCardData) {
      if (compositeCardData.data.attributes.composite_card) {
        setCurrentCompositeData(compositeCardData.data.attributes.composite_card);
        setCompositeData(compositeCardData.data.attributes.composite_card);
      }
    }
  }, [compositeCardData]);

  const handleSave = (newCompositeData: IComposite[]) => {
    mutate(
      {
        profileId,
        payload: {
          composite_card: newCompositeData,
        },
      },
      {
        onSettled: () => {
          if (compositeCardData) {
            queryClient.setQueriesData<IProfileTabDetailReponsePayload>(['profile_tab', profileId, 'composite_card'], {
              data: {
                ...compositeCardData.data,
                attributes: {
                  ...compositeCardData.data.attributes,
                  composite_card: newCompositeData,
                },
              },
            });
            setCurrentCompositeData(newCompositeData);
          }
          setIsEditing(false);
        },
      },
    );
  };

  // Refetch Media URLs
  useEffect(() => {
    if (mediaUrlData) {
      if (mediaUrlData.data.length > 0) {
        const mediaUrlDataImages = mediaUrlData.data;
        const newData = getSelectedCurrentComposite.images.map((img) => {
          if (mediaUrlDataImages.some((mdi) => mdi.id === img.id)) {
            return {
              ...img,
              url: mediaUrlDataImages.filter((mdi) => mdi.id === img.id)[0].url,
            };
          }
          return img;
        });
        const mappedCompositeData = compositeData.map((cd) => {
          if (cd.template_id === templateId) {
            return {
              ...cd,
              images: newData,
            };
          }
          return cd;
        });
        setCompositeData(mappedCompositeData);
        setCurrentCompositeData(mappedCompositeData);
        handleSave(mappedCompositeData);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [mediaUrlData]);

  // Handle Change of Template
  const handleSelectTemplate = (newTemplateId: number) => {
    setTemplateId(newTemplateId);
  };

  // Handle Close Gallery Image
  const handleEditorClose = () => {
    setSelectedImageIndex(-1);
    setIsEditorOpen(false);
  };

  // Handle Open Gallery Image

  const handleEditorOpen = (index: number) => {
    setSelectedImageIndex(index);
    setIsEditorOpen(true);
  };

  // Handle Save Gallery Image

  const handleGallerySave = (mediaId?: string, media?: IMedia) => {
    if (media) {
      // Get composite data by template id
      const getCompositeData = compositeData.filter((data) => data.template_id === templateId)[0];
      const mappedImages = getCompositeData.images.map((data, index) => {
        if (index === selectedImageIndex) {
          return {
            id: mediaId,
            url: media.attributes.attachment_url,
          };
        }
        return data;
      });
      const mappedCompositeData = compositeData.map((data) => {
        if (data.template_id === getCompositeData.template_id) {
          return {
            ...data,
            images: mappedImages,
          };
        }
        return data;
      }) as IComposite[];

      setCompositeData(mappedCompositeData);
    }
    setIsEditorOpen(false);
  };

  // Handle Cancel Button
  const handleCancel = () => {
    setCompositeData(currentCompositeData);
    setIsEditing(false);
  };

  // Handle Reset Button
  const handleReset = () => {
    setCompositeData(INITIAL_COMPOSITE_STATES);
    handleSave(INITIAL_COMPOSITE_STATES);
  };

  const isLoading = useMemo(
    () => isProfileLoading || isProfileTabDetailLoading,
    [isProfileLoading, isProfileTabDetailLoading],
  );

  return (
    <Box>
      <Grid container spacing={6}>
        {/* Templates */}
        <Grid item xs={12} lg={4}>
          <Box>
            <Box className={classes.titleContainer}>
              {/* <Typography variant="h6">Templates</Typography>
              <Typography variant="caption">(2 of 16 hidden)</Typography> */}
            </Box>
            <Box className={classes.templateContainer}>
              <Templates templateId={templateId} setTemplateId={handleSelectTemplate} />
            </Box>
          </Box>
        </Grid>

        {/* Content */}
        {!isLoading && (
          <Grid item xs={12} lg={8}>
            <Box className={classes.actionContainer}>
              <Button
                color={isEditing ? 'primary' : 'default'}
                variant={isEditing ? 'contained' : 'outlined'}
                onClick={() => {
                  return isEditing ? handleCancel() : setIsEditing(true);
                }}
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
              {isEditing ? (
                <Button color="default" variant="outlined" onClick={() => handleSave(compositeData)}>
                  Save
                </Button>
              ) : (
                <>
                  <Button color="default" variant="outlined" onClick={() => handleReset()}>
                    Reset
                  </Button>
                </>
              )}
            </Box>
            <Box className={classes.contentContainer}>
              <Content
                images={getImages}
                templateId={templateId}
                isEditing={isEditing}
                handleEditorOpen={handleEditorOpen}
              />
            </Box>
          </Grid>
        )}
      </Grid>

      {/* DIalog */}
      <ImageGallery handleSave={handleGallerySave} open={isEditorOpen} handleClose={handleEditorClose} />
    </Box>
  );
};

export default CompositeTab;
