import {
  Box,
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Tab,
  Typography,
} from '@material-ui/core';

import React, { useState } from 'react';

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
  selectResumeState,
  toggleShowYear,
} from 'shared/redux/slicers/resume.slicer';
import MediaGallery from './MediaGallery';
import { Tabs } from 'themes/elements';
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

const Resume = () => {
  const classes = useStyles();
  const tabStyle = useTabStyle();
  // const [sections, setSections] = useState<ISection[]>([]);
  const { sections, isSectionShowYear } = useSelector(selectResumeState);
  const dispatch = useDispatch();
  const [isSelected, setSelected] = useState<number>(-1);
  const [anchorEl, setAnchorEl] = React.useState<any>(null);
  const [galleryDialogOpen, setGalleryDialogOpen] = useState<boolean>(false);
  const [selectedGalleryTab, setSelectedGalleryTab] = useState<string>('images');
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
              {isSectionShowYear ? 'Hide Year' : 'Show Year'}
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
          <Grid container spacing={2}>
            {sections.map((section, index) => (
              <Grid xs={12} item key={index}>
                <ResumeSection
                  section={section}
                  index={index}
                  setSelected={handleSetSelected}
                  isSelected={isSectionSelected(index)}
                  handleReorderTable={handleReorderTable}
                  handleRowChange={handleRowChange}
                  handleColumnChange={handleColumnChange}
                  handleOpenGalleryDialog={handleOpenGalleryDialog}
                />
              </Grid>
            ))}
          </Grid>

          <Box className={classes.actionContainer}>
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
              >
                Cancel
              </Button>
              <Button
                variant="contained"
                disableElevation
                color="primary"
                style={{
                  backgroundColor: '#2962FF',
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
    </Box>
  );
};

export default Resume;
