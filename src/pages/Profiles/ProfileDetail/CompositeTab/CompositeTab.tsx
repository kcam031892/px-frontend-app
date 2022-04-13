import { Box, Dialog, DialogActions, DialogContent, Grid, IconButton, Typography } from '@material-ui/core';
import { CloseOutlined } from '@material-ui/icons';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { ImageGallery } from 'components/ImageGallery';
import React, { RefObject, useEffect, useMemo, useRef, useState } from 'react';
import ScrollContainer from 'react-indiana-drag-scroll';
import { useQueryClient } from 'react-query';
import { useHistory, useParams } from 'react-router';
import { IComposite, INITIAL_COMPOSITE_STATES } from 'shared/constants/INITIAL_COMPOSITE_STATES';
import { ROUTES } from 'shared/constants/ROUTES';
import IMedia from 'shared/interfaces/IMedia';
import { IProfileTabDetailReponsePayload } from 'shared/interfaces/IProfile';
import { profileService } from 'shared/services/profileService';
import { isShowCompositeCard } from 'shared/utils/isShowCompositeCard';
import { Button } from 'themes/elements';

import { useStyles } from './CompositeTab.styles';
import Content from './Content/Content';
import ImageItem from './ImageItem/ImageItem';
import Templates from './Templates/Templates';

const { getSingleProfile, updateProfile, getProfileTabDetail } = profileService();
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
  const [compositeData, setCompositeData] = useState<IComposite[]>(INITIAL_COMPOSITE_STATES);
  const scrollRef = useRef<any>(null);

  useEffect(() => {
    if (data) {
      if (!isShowCompositeCard(data.data.attributes.profile_type)) {
        history.push(ROUTES.TALENT.PROFILE);
      }
    }
  }, [data, history]);

  useEffect(() => {
    if (compositeCardData) {
      if (compositeCardData.data.attributes.composite_card) {
        setCompositeData(compositeCardData.data.attributes.composite_card);
      }
    }
  }, [compositeCardData]);

  const handleSelectTemplate = (newTemplateId: number) => {
    setTemplateId(newTemplateId);
  };

  const handleEditorClose = () => {
    setSelectedImageIndex(-1);
    setIsEditorOpen(false);
  };

  const handleEditorOpen = (index: number) => {
    setSelectedImageIndex(index);
    setIsEditorOpen(true);
  };

  const handleSave = (mediaId?: string, media?: IMedia) => {
    if (media) {
      const getCompositeData = compositeData.filter((data) => data.template_id === templateId)[0];
      const mappedImages = getCompositeData.images.map((data, index) => {
        if (index === selectedImageIndex) {
          return media.attributes.attachment_url;
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
      mutate(
        {
          profileId,
          payload: {
            composite_card: mappedCompositeData,
          },
        },
        {
          onSettled: () => {
            if (compositeCardData) {
              queryClient.setQueriesData<IProfileTabDetailReponsePayload>(
                ['profile_tab', profileId, 'composite_card'],
                {
                  data: {
                    ...compositeCardData.data,
                    attributes: {
                      ...compositeCardData.data.attributes,
                      composite_card: mappedCompositeData,
                    },
                  },
                },
              );
            }
          },
        },
      );
    }
    setIsEditorOpen(false);
  };

  const getSelectedComposite = useMemo(() => {
    return compositeData.filter((data) => data.template_id === templateId)[0] || [];
  }, [compositeData, templateId]);

  const handleMoveRight = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: 100, behavior: 'smooth' });
    }
  };

  const handleMoveLeft = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({ left: -100, behavior: 'smooth' });
    }
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
              <Typography variant="h6">Templates</Typography>
              <Typography variant="caption">(2 of 16 hidden)</Typography>
            </Box>
            <Box className={classes.templateContainer}>
              <Templates templateId={templateId} setTemplateId={handleSelectTemplate} />
            </Box>
          </Box>
        </Grid>

        {/* Content */}
        {!isLoading && (
          <Grid item xs={12} lg={8} style={{ marginTop: 40 }}>
            <Box className={classes.actionContainer}>
              <Button
                color={isEditing ? 'primary' : 'default'}
                variant={isEditing ? 'contained' : 'outlined'}
                onClick={() => setIsEditing((isEditing) => !isEditing)}
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </Button>
              <Button color="default" variant="outlined">
                Download
              </Button>
              <Button color="default" variant="outlined">
                Reset
              </Button>
            </Box>
            <Box className={classes.contentContainer}>
              <Content
                images={getSelectedComposite.images}
                templateId={templateId}
                isEditing={isEditing}
                handleEditorOpen={handleEditorOpen}
              />
            </Box>
          </Grid>
        )}
      </Grid>

      {/* DIalog */}
      <ImageGallery handleSave={handleSave} open={isEditorOpen} handleClose={handleEditorClose} />
    </Box>
  );
};

export default CompositeTab;
