import { Box, Card, CardContent, IconButton, InputBase, MenuItem, Select, Tooltip } from '@material-ui/core';
import clsx from 'clsx';
import { DeleteIcon, DownIcon, UpIcon } from 'components/Icons';
import ProjectTypes from 'data/ProjectType.json';
import React, { useState } from 'react';
import { DraggableProvided } from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { SectionType } from 'shared/enums/SectionType';
import { ISection } from 'shared/interfaces/ITalent';

import {
  addNewRow,
  changeSectionTitle,
  removeSection,
  reorderSection,
  selectResumeState,
} from 'shared/redux/slicers/resume.slicer';

import SummaryCard from '../SummaryCard/SummaryCard';
import TableCard from '../TableCard/TableCard';
import { useStyles } from './ResumeSection.styles';

type Props = {
  isSelected?: boolean;
  setSelected: (index: number) => void;
  index: number;
  section: ISection;
  handleReorderTable: (sectionIndex: number, sourceIndex: number, destinationIndex: number) => void;
  handleOpenGalleryDialog: () => void;
  providedDraggable: DraggableProvided;
};
const ResumeSection: React.FC<Props> = ({
  isSelected,
  setSelected,
  index,
  section,
  handleReorderTable,

  handleOpenGalleryDialog,
  providedDraggable,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { sections } = useSelector(selectResumeState);
  const [isTableDragging, setIsTableDragging] = useState<boolean>(false);

  const handleRowChange = (index: number) => {
    dispatch(addNewRow({ index }));
  };

  const handleSelectRowChange = () => {
    handleRowChange(index);
  };

  const handleSectionChange = (e: React.ChangeEvent<{ value: any }>) => {
    const { value } = e.target;
    dispatch(changeSectionTitle({ sectionIndex: index, value }));
  };

  const handleRemoveSection = () => {
    dispatch(removeSection({ sectionIndex: index }));
  };

  const handleReoderUpSection = () => {
    if (index !== 0) {
      const sourceIndex = index;
      const destinationIndex = index - 1;
      dispatch(reorderSection({ sourceIndex, destinationIndex }));
    }
  };

  const handleReorderDownSection = () => {
    if (index !== sections.length - 1) {
      const sourceIndex = index;
      const destinationIndex = index + 1;
      dispatch(reorderSection({ sourceIndex, destinationIndex }));
    }
  };

  return (
    <Card
      variant="outlined"
      className={clsx(classes.card, isTableDragging ? 'card__drag' : '')}
      onClick={() => setSelected(index)}
    >
      <CardContent
        data-rbd-drag-handle-context-id={providedDraggable.dragHandleProps?.['data-rbd-drag-handle-context-id']}
        data-rbd-drag-handle-draggable-id="gibberish"
        style={{
          cursor: 'auto',
        }}
      >
        {section.section_type === SectionType.TABLE ? (
          <Select
            fullWidth
            onClick={(e) => e.stopPropagation()}
            disableUnderline
            value={section.title}
            onChange={handleSectionChange}
          >
            {ProjectTypes.map((projectType) => (
              <MenuItem
                key={projectType.key}
                value={projectType.key}
                disabled={sections.some((section) => section.title === projectType.key)}
              >
                {projectType.value}
              </MenuItem>
            ))}
          </Select>
        ) : (
          <InputBase fullWidth placeholder="Enter title here ..." />
        )}

        <Box>
          {section.section_type === SectionType.TABLE ? (
            <TableCard
              section={section}
              handleReorderTable={handleReorderTable}
              handleRowChange={handleSelectRowChange}
              handleOpenGalleryDialog={handleOpenGalleryDialog}
              index={index}
              setIsTableDragging={setIsTableDragging}
            />
          ) : (
            <SummaryCard />
          )}
        </Box>
        <Box
          className={clsx(classes.actionContainer, {
            [classes.actionContainer__selected]: isSelected,
            [classes.actionContainer__table]: true,
          })}
        >
          <Box className={classes.actionContainer__item}>
            <Tooltip title="Move to bottom" placement="top-start">
              <IconButton onClick={handleReorderDownSection}>
                <DownIcon viewBox="0 0 16 16" style={{ width: 16, height: 16 }}></DownIcon>
              </IconButton>
            </Tooltip>

            <Tooltip title="Move to up" placement="top-start">
              <IconButton onClick={handleReoderUpSection}>
                <UpIcon viewBox="0 0 16 16" style={{ width: 16, height: 16 }}></UpIcon>
              </IconButton>
            </Tooltip>

            <Tooltip title="Remove Section" placement="top-start">
              <IconButton onClick={handleRemoveSection}>
                <DeleteIcon viewBox="0 0 16 16" style={{ width: 16, height: 16 }}></DeleteIcon>
              </IconButton>
            </Tooltip>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ResumeSection;
