import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Tab,
  Typography,
} from '@material-ui/core';

import React, { useEffect, useState } from 'react';

import { useStyles } from './Resume.styles';
import ResumeSection from './ResumeSection/ResumeSection';
import AddIcon from '@material-ui/icons/Add';
import { SectionType } from 'shared/enums/SectionType';

import { useDispatch, useSelector } from 'react-redux';
import {
  addNewRow,
  createNewSection,
  reorderRow,
  reorderSection,
  resetSection,
  selectResumeState,
  setSection,
  toggleShowYear,
} from 'shared/redux/slicers/resume.slicer';
import MediaGallery from './MediaGallery';
import { Backdrop, Tabs, useAlert } from 'themes/elements';
import { useTabStyle } from 'components/style';
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  Droppable,
  DroppableProvided,
  DropResult,
} from 'react-beautiful-dnd';
import clsx from 'clsx';
import { talentService } from 'shared/services/talentService';
import { useQueryClient } from 'react-query';
import { isEqual } from 'lodash';

const galleryTabs = [
  {
    name: 'Images',
    value: 'images',
  },
  {
    name: 'Videos',
    value: 'videos',
  },
  {
    name: 'Audios',
    value: 'audios',
  },
];
const { getResume, updateTalent } = talentService();
const Resume = () => {
  const classes = useStyles();
  const tabStyle = useTabStyle();
  const { data, isLoading, isError } = getResume();
  const { mutate, isLoading: isUpdateLoading } = updateTalent();
  const queryClient = useQueryClient();
  const { isOpen: isAlertOpen, alertRef, AlertOpen } = useAlert({ autoHideDuration: 2000, horizontal: 'center' });
  // const [sections, setSections] = useState<ISection[]>([]);
  const { sections, isSectionShowYear, oldSections } = useSelector(selectResumeState);
  const dispatch = useDispatch();
  const [isSelected, setSelected] = useState<number>(-1);
  const [anchorEl, setAnchorEl] = React.useState<any>(null);
  const [galleryDialogOpen, setGalleryDialogOpen] = useState<boolean>(false);
  const [selectedGalleryTab, setSelectedGalleryTab] = useState<string>('images');
  const [isDragging, setIsDragging] = useState<boolean>(false);
  console.log('sections', sections);

  useEffect(() => {
    if (!isError && data) {
      const sections = data.data.attributes.resume;
      if (sections && sections.length > 0) {
        dispatch(setSection({ sections }));
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isError, data]);

  const handleSave = () => {
    mutate(
      { resume: sections },
      {
        onSuccess: () => {
          queryClient.invalidateQueries('talents/resume');
          AlertOpen('success', 'Resume has been successfully updated.');
        },
      },
    );
  };

  const handleReset = () => {
    dispatch(resetSection());
  };

  const handleOpenGalleryDialog = () => {
    setGalleryDialogOpen(true);
  };

  const handleCloseGalleryDialog = () => {
    setGalleryDialogOpen(false);
  };

  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: string) => {
    setSelectedGalleryTab(newValue);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (type: SectionType) => {
    dispatch(createNewSection({ type }));
    handleClose();
  };

  const isSectionSelected = (index: number): boolean => {
    return isSelected === index;
  };
  const handleSetSelected = (index: number) => {
    if (isSelected !== index) {
      setSelected(index);
    } else {
      setSelected(-1);
    }
  };

  const handleReorderTable = (sectionIndex: number, sourceIndex: number, destinationIndex: number) => {
    dispatch(reorderRow({ sectionIndex, sourceIndex, destinationIndex }));
  };

  const handleColumnChange = (arrayIndex: number, num: number) => {
    // const section = sections.filter((_, index) => index === arrayIndex)[0];
    // if (section.values) {
    //   const arrayText = section.values;
    //   if (arrayText[0].length === num) return;
    //   const updatedArrayText = arrayText.map((arrText) => {
    //     if (arrText.length > num) {
    //       return arrText.slice(0, -(arrText.length - num));
    //     }
    //     return [...arrText, ...createEmptyColumnArray()];
    //   });
    //   const updatedSection: ISection = { ...section, values: updatedArrayText };
    //   const updatedSections = sections.map((section, index) => {
    //     return index === arrayIndex ? updatedSection : section;
    //   });
    //   setSections(updatedSections);
    // }
  };

  const handleRowChange = (arrayIndex: number, num: number) => {
    dispatch(addNewRow({ index: arrayIndex }));
    // const section = sections.filter((_, index) => index === arrayIndex)[0];
    // if (section.values) {
    //   let arrayText = section.values;
    //   // if (arrayText.length === num) return;
    //   // if (arrayText.length > num) {
    //   //   arrayText = arrayText.slice(0, -(arrayText.length - num));
    //   // } else {
    //   // }
    //   const emptyTextArray = createEmptyTableArray();
    //   arrayText = [...emptyTextArray, ...arrayText];
    //   const updatedSection: ISection = { ...section, values: arrayText };
    //   const updatedSections = sections.map((section, index) => {
    //     return index === arrayIndex ? updatedSection : section;
    //   });
    //   setSections(updatedSections);
    // }
  };

  const handleShowYear = () => {
    dispatch(toggleShowYear());
  };

  const handleDragEnd = (result: DropResult) => {
    setIsDragging(false);
    if (!result.destination) {
      return;
    }
    dispatch(reorderSection({ sourceIndex: result.source.index, destinationIndex: result.destination.index }));
  };

  const handleDragStart = () => setIsDragging(true);

  return (
    <Box className={classes.container}>
      {isAlertOpen && alertRef}
      {!isLoading && (
        <>
          {sections.length > 0 && (
            <>
              <Box className={classes.showYearContainer}>
                <Checkbox
                  name="checkedA"
                  checked={isSectionShowYear}
                  edge="end"
                  color="primary"
                  onChange={() => handleShowYear()}
                />
                <Typography variant="h6" style={{ fontSize: 16 }}>
                  Show Year
                </Typography>
              </Box>
              <Box mt={2}>
                <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
                  <Droppable droppableId="droppable">
                    {(provided: DroppableProvided) => (
                      <Grid container spacing={2} ref={provided.innerRef} {...provided.droppableProps}>
                        {sections.map((section, index) => (
                          <Draggable
                            key={index.toString()}
                            draggableId={index.toString()}
                            index={index}
                            disableInteractiveElementBlocking={true}
                          >
                            {(providedDraggable: DraggableProvided) => (
                              <Grid
                                xs={12}
                                lg={12}
                                item
                                key={index}
                                {...providedDraggable.draggableProps}
                                {...providedDraggable.dragHandleProps}
                                ref={providedDraggable.innerRef}
                              >
                                <ResumeSection
                                  section={section}
                                  index={index}
                                  setSelected={handleSetSelected}
                                  isSelected={isSectionSelected(index)}
                                  handleReorderTable={handleReorderTable}
                                  handleRowChange={handleRowChange}
                                  handleColumnChange={handleColumnChange}
                                  handleOpenGalleryDialog={handleOpenGalleryDialog}
                                  providedDraggable={providedDraggable}
                                />
                              </Grid>
                            )}
                          </Draggable>
                        ))}
                      </Grid>
                    )}
                  </Droppable>
                </DragDropContext>
              </Box>

              <Box className={clsx(classes.actionContainer, { [classes.isDragging]: isDragging })}>
                <Typography variant="body2">
                  Note: No external URL’s are permitted in the Biography and will be auto removed when saved.
                </Typography>
                <Box>
                  <Button
                    variant="outlined"
                    disableElevation
                    style={{
                      marginRight: '16px',
                      textTransform: 'none',
                    }}
                    disabled={isEqual(sections, oldSections)}
                    onClick={() => handleReset()}
                  >
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    disableElevation
                    color="primary"
                    onClick={() => handleSave()}
                    disabled={isUpdateLoading || isEqual(sections, oldSections)}
                    style={{
                      textTransform: 'none',
                    }}
                  >
                    Save
                  </Button>
                </Box>
              </Box>
            </>
          )}

          <IconButton
            aria-controls="simple-menu"
            aria-haspopup="true"
            onClick={handleClick}
            className={clsx(classes.addIcon, { [classes.isDragging]: isDragging })}
          >
            <AddIcon htmlColor="white" />
          </IconButton>

          <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
            <MenuItem onClick={() => handleMenuClick(SectionType.TEXTAREA)}>Text Area</MenuItem>
            <MenuItem onClick={() => handleMenuClick(SectionType.TABLE)}>Table</MenuItem>
          </Menu>

          <Dialog
            open={galleryDialogOpen}
            onClose={handleCloseGalleryDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            fullWidth
            maxWidth="lg"
            className={classes.dialog}
          >
            <DialogTitle>Media Gallery</DialogTitle>
            <DialogContent>
              <Tabs value={selectedGalleryTab} onChange={handleTabChange}>
                {galleryTabs.map((galleryTab, index) => (
                  <Tab key={index} label={galleryTab.name} value={galleryTab.value} classes={tabStyle} />
                ))}
              </Tabs>
              <Box mt={4}>
                <Grid container spacing={2}>
                  <Grid item lg={3}>
                    <MediaGallery />
                  </Grid>
                  <Grid item lg={3}>
                    <MediaGallery isSelected />
                  </Grid>
                  <Grid item lg={3}>
                    <MediaGallery />
                  </Grid>
                  <Grid item lg={3}>
                    <MediaGallery />
                  </Grid>
                  <Grid item lg={3}>
                    <MediaGallery />
                  </Grid>
                </Grid>
              </Box>
            </DialogContent>
            <DialogActions>
              <Button variant="outlined" disableElevation onClick={handleCloseGalleryDialog}>
                Cancel
              </Button>
              <Button variant="contained" color="primary" disableElevation>
                Save Selected Media
              </Button>
            </DialogActions>
          </Dialog>
        </>
      )}
      <Backdrop isLoading={isLoading || isUpdateLoading} />
    </Box>
  );
};

export default Resume;
