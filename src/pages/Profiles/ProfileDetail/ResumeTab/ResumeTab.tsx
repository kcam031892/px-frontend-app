import { Box, Grid, Typography } from '@material-ui/core';
import React, { useEffect, useMemo, useState } from 'react';
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DraggableStateSnapshot,
  DropResult,
  Droppable,
  DroppableProvided,
} from 'react-beautiful-dnd';
import { profileService } from 'shared/services/profileService';
import { talentService } from 'shared/services/talentService';

import ImageItem from '../ImageTab/ImageItem/ImageItem';
import ResumeSection from './ResumeSection/ResumeSection';
import { useStyles } from './ResumeTab.styles';
import { useParams } from 'react-router-dom';
import { ISection } from 'shared/interfaces/ITalent';
import { arrayMove } from '@dnd-kit/sortable';
import { useQueryClient } from 'react-query';
import { IProfileTabDetailReponsePayload } from 'shared/interfaces/IProfile';

const { getResume } = talentService();
const { getProfileTabDetail, updateProfile } = profileService();
const ResumeTab = () => {
  const { profileId } = useParams() as { profileId: string };
  const classes = useStyles();
  const queryClient = useQueryClient();
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const { data: talentResumeData, isLoading: isLoadingTalentResumeData } = getResume();
  const { data: profileResumeData, isLoading: isLoadingProfileResumeData } = getProfileTabDetail(profileId, 'resume');
  const [sections, setSections] = useState<ISection[]>([]);
  const [isSectionSelected, setIsSectionSelected] = useState<{
    module: 'selected' | 'hidden' | undefined;
    index: number;
  }>({
    module: undefined,
    index: -1,
  });
  const { mutate: updateProfileMutate } = updateProfile();

  useEffect(() => {
    if (profileResumeData) {
      if (profileResumeData.data.attributes.resume) {
        setSections(profileResumeData.data.attributes.resume);
      }
    }
  }, [profileResumeData]);

  const profileUpdater = (sections: ISection[]) => {
    updateProfileMutate(
      {
        profileId,
        payload: {
          resume: sections.map((section) => section.section_id),
        },
      },
      {
        onSuccess: () => {
          if (profileResumeData) {
            queryClient.setQueriesData<IProfileTabDetailReponsePayload>(['profile_tab', profileId, 'resume'], {
              data: {
                ...profileResumeData.data,
                attributes: {
                  ...profileResumeData.data.attributes,
                  resume: sections,
                },
              },
            });
          }
        },
      },
    );
  };

  const handleDragEnd = (result: DropResult) => {
    setIsDragging(false);
    if (!result.destination) {
      return;
    }
    const swappedArray = arrayMove(sections, result.source.index, result.destination.index);
    setSections(swappedArray);
    profileUpdater(swappedArray);
  };

  const handleDragStart = () => {
    setIsDragging(true);
    setIsSectionSelected({ module: undefined, index: -1 });
  };

  const handleSetSelected = (module: 'selected' | 'hidden', index: number) => {
    if (isSectionSelected.module !== module && isSectionSelected.index !== index) {
      setIsSectionSelected({ module, index });
    } else {
      setIsSectionSelected({ module: undefined, index: -1 });
    }
  };

  const handleSelectResume = (section: ISection) => {
    const newSections = [...sections, section];
    setSections(newSections);
    profileUpdater(newSections);
  };

  const handleHideResume = (section: ISection) => {
    const filteredSections = sections.filter((_section) => _section.title !== section.title);
    setSections(filteredSections);
    profileUpdater(filteredSections);
  };

  const filteredTalentResumeData = useMemo(() => {
    const items = talentResumeData && sections ? talentResumeData.data.attributes.resume : [];
    return items.filter((item) => !sections.some((section) => section.title === item.title));
  }, [talentResumeData, sections]);

  const isLoading = useMemo(
    () => isLoadingProfileResumeData || isLoadingTalentResumeData,
    [isLoadingProfileResumeData, isLoadingTalentResumeData],
  );

  return (
    <Box className={classes.resumeTab}>
      {!isLoading && (
        <>
          {/* Selected Resume Section */}
          <Box className={classes.selectedResume}>
            <Box className={classes.titleContainer}>
              <Typography variant="h6">Selected Resume</Typography>
              <Typography variant="caption">
                ({profileResumeData?.data.attributes.resume?.length} of{' '}
                {talentResumeData?.data.attributes.resume.length} {` `}
                Selected)
              </Typography>
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
                      {!isLoadingProfileResumeData && (
                        <>
                          {profileResumeData &&
                            sections.map((section, i) => (
                              <Draggable
                                key={i.toString()}
                                draggableId={i.toString()}
                                index={i}
                                disableInteractiveElementBlocking={true}
                              >
                                {(providedDraggable: DraggableProvided) => (
                                  <Grid
                                    item
                                    xs={12}
                                    key={i}
                                    {...providedDraggable.draggableProps}
                                    {...providedDraggable.dragHandleProps}
                                    ref={providedDraggable.innerRef}
                                  >
                                    <ResumeSection
                                      isSelected={isSectionSelected}
                                      index={i}
                                      setSelected={handleSetSelected}
                                      module="selected"
                                      section={section}
                                      handleHideResume={handleHideResume}
                                    />
                                  </Grid>
                                )}
                              </Draggable>
                            ))}
                        </>
                      )}
                      {provided.placeholder}
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
              <Typography variant="caption">
                ({filteredTalentResumeData.length} of {talentResumeData?.data.attributes.resume.length} hidden)
              </Typography>
            </Box>
            <Box className={classes.otherResume__sectionList}>
              {!isLoadingTalentResumeData && (
                <Grid container spacing={2}>
                  {talentResumeData &&
                    filteredTalentResumeData.map((resume, index) => (
                      <Grid item xs={12}>
                        <ResumeSection
                          isSelected={isSectionSelected}
                          index={index}
                          module="hidden"
                          setSelected={handleSetSelected}
                          section={resume}
                          handleSelectResume={handleSelectResume}
                        />
                      </Grid>
                    ))}
                </Grid>
              )}
            </Box>
          </Box>
        </>
      )}
    </Box>
  );
};

export default ResumeTab;
