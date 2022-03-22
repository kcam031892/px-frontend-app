import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  IconButton,
  Menu,
  MenuItem,
  Typography,
} from '@material-ui/core';
import { AddNewIcon } from 'components/Icons';
import AddNew from 'components/Icons/AddNew';
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
  selectResumeState,
  toggleShowYear,
} from 'shared/redux/slicers/resume.slicer';

const Resume = () => {
  const classes = useStyles();
  // const [sections, setSections] = useState<ISection[]>([]);
  const { sections, isSectionShowYear } = useSelector(selectResumeState);
  const dispatch = useDispatch();
  const [isSelected, setSelected] = useState<number>(-1);
  const [anchorEl, setAnchorEl] = React.useState<any>(null);
  console.log('sections', sections);

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

      <IconButton aria-controls="simple-menu" aria-haspopup="true" onClick={handleClick} className={classes.addIcon}>
        <AddIcon htmlColor="white" />
      </IconButton>

      <Menu id="simple-menu" anchorEl={anchorEl} keepMounted open={Boolean(anchorEl)} onClose={handleClose}>
        <MenuItem onClick={() => handleMenuClick(SectionType.TEXTAREA)}>Text Area</MenuItem>
        <MenuItem onClick={() => handleMenuClick(SectionType.TABLE)}>Table</MenuItem>
      </Menu>
    </Box>
  );
};

export default Resume;
