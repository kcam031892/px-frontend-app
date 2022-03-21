import { Box, Card, CardContent, IconButton, InputBase, MenuItem, Select, Tooltip } from '@material-ui/core';
import React, { useState } from 'react';
import clsx from 'clsx';
import { useStyles } from './ResumeSection.styles';

import { Range } from 'utils/array';
import { IKeyValue } from 'shared/interfaces/utils/IKeyValue';
import { DeleteIcon, DownIcon, UpIcon } from 'components/Icons';
import TableCard from '../TableCard/TableCard';
import SummaryCard from '../SummaryCard/SummaryCard';
import { ISection } from 'shared/interfaces/IProfile';
import { SectionType } from 'shared/enums/SectionType';
import ProjectTypes from 'data/ProjectType.json';
import { useDispatch, useSelector } from 'react-redux';
import {
  changeSectionTitle,
  removeSection,
  reorderSection,
  selectResumeState,
} from 'shared/redux/slicers/resume.slicer';

const rows: IKeyValue[] = Range(2, 10).map((value) => {
  return {
    key: value.toString(),
    value,
  };
});

type Props = {
  isSelected?: boolean;
  setSelected: (index: number) => void;
  index: number;
  section: ISection;

  handleReorderTable: (sectionIndex: number, sourceIndex: number, destinationIndex: number) => void;
  handleColumnChange: (arrayIndex: number, num: number) => void;
  handleRowChange: (arrayIndex: number, num: number) => void;
};
const ResumeSection: React.FC<Props> = ({
  isSelected,
  setSelected,
  index,
  section,
  handleReorderTable,
  handleRowChange,
  handleColumnChange,
}) => {
  const classes = useStyles();
  const [cardColumns, setCardColumns] = useState(section.values[0].length);
  const [cardRows, setCardRows] = useState(section.values.length);
  const dispatch = useDispatch();
  const { sections } = useSelector(selectResumeState);

  const handleSelectColumnChange = (value: number) => {
    handleColumnChange(index, value);
    setCardColumns(value);
  };

  const handleSelectRowChange = () => {
    console.log('handleRowChange');

    handleRowChange(index, 1);
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
    <Card variant="outlined" className={classes.card} onClick={() => setSelected(index)}>
      <CardContent>
        {section.section_type === SectionType.TABLE ? (
          <Select
            fullWidth
            onClick={(e) => e.stopPropagation()}
            disableUnderline
            value={section.title}
            onChange={handleSectionChange}
          >
            {ProjectTypes.map((projectType) => (
              <MenuItem key={projectType.key} value={projectType.key}>
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
              handleColumnChange={handleColumnChange}
              handleRowChange={handleSelectRowChange}
              index={index}
              cardColumns={cardColumns}
              cardRows={cardRows}
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
