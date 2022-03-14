import { Box, Button, Grid, IconButton, Menu, MenuItem, Typography } from '@material-ui/core';
import { AddNewIcon } from 'components/Icons';
import AddNew from 'components/Icons/AddNew';
import React, { useState } from 'react';
import { ISection } from 'shared/interfaces/IProfile';
import { useStyles } from './Resume.styles';
import ResumeSection from './ResumeSection/ResumeSection';
import AddIcon from '@material-ui/icons/Add';
import { SectionType } from 'shared/enums/SectionType';
import { createEmptyColumnArray, createEmptyTableArray } from 'shared/utils/createEmptyTableArray';
import { generateSectionId } from 'shared/utils/generateSectionId';
import { swapArrayElement } from 'shared/utils/swapArrayElement';
const Resume = () => {
  const classes = useStyles();
  const [sections, setSections] = useState<ISection[]>([]);
  const [isSelected, setSelected] = useState<number>(-1);
  const [anchorEl, setAnchorEl] = React.useState<any>(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClick = (type: SectionType) => {
    if (type === SectionType.TABLE) {
      const emptyTextArray = createEmptyTableArray();
      setSections([
        ...sections,
        {
          section_type: SectionType.TABLE,
          sequence: sections.length + 1,
          values: emptyTextArray,
          title: '',
          section_id: generateSectionId(),
        },
      ]);
    } else {
      setSections([
        ...sections,
        {
          section_type: SectionType.TEXTAREA,
          sequence: sections.length + 1,
          title: '',
          section_id: generateSectionId(),
          values: [['']],
        },
      ]);
    }
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
    const getSection = sections.filter((section, index) => index === sectionIndex)[0];

    if (getSection.values) {
      const arrayText = getSection.values;
      const swappedArray = swapArrayElement(arrayText, sourceIndex, destinationIndex);

      const updatedSection: ISection = { ...getSection, values: swappedArray };

      const updatedSections = sections.map((section, index) => {
        return index === sectionIndex ? updatedSection : section;
      });
      console.log(updatedSections);

      setSections(updatedSections);
    }
  };

  const handleColumnChange = (arrayIndex: number, num: number) => {
    const section = sections.filter((_, index) => index === arrayIndex)[0];
    if (section.values) {
      const arrayText = section.values;
      if (arrayText[0].length === num) return;

      const updatedArrayText = arrayText.map((arrText) => {
        if (arrText.length > num) {
          return arrText.slice(0, -(arrText.length - num));
        }
        return [...arrText, ...createEmptyColumnArray()];
      });
      const updatedSection: ISection = { ...section, values: updatedArrayText };
      const updatedSections = sections.map((section, index) => {
        return index === arrayIndex ? updatedSection : section;
      });

      setSections(updatedSections);
    }
  };

  const handleRowChange = (arrayIndex: number, num: number) => {
    const section = sections.filter((_, index) => index === arrayIndex)[0];

    if (section.values) {
      let arrayText = section.values;
      if (arrayText.length === num) return;
      if (arrayText.length > num) {
        arrayText = arrayText.slice(0, -(arrayText.length - num));
      } else {
        const emptyTextArray = createEmptyTableArray();
        arrayText = [...arrayText, ...emptyTextArray];
      }

      const updatedSection: ISection = { ...section, values: arrayText };
      const updatedSections = sections.map((section, index) => {
        return index === arrayIndex ? updatedSection : section;
      });

      setSections(updatedSections);
    }
  };

  return (
    <Box className={classes.container}>
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
      {sections.length > 0 && (
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
