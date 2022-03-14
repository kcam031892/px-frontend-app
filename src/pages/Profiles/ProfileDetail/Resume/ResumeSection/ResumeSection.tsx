import { Box, Card, CardContent, IconButton, InputBase, MenuItem, Select } from '@material-ui/core';
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

  const handleSelectColumnChange = (value: number) => {
    handleColumnChange(index, value);
    setCardColumns(value);
  };

  const handleSelectRowChange = (value: number) => {
    handleRowChange(index, value);
    setCardRows(value);
  };

  return (
    <Card variant="outlined" className={classes.card} onClick={() => setSelected(index)}>
      <CardContent>
        <InputBase fullWidth placeholder="Enter title here ..." />
        <Box>
          {section.section_type === SectionType.TABLE ? (
            <TableCard
              section={section}
              handleReorderTable={handleReorderTable}
              handleColumnChange={handleColumnChange}
              handleRowChange={handleRowChange}
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
          {section.section_type === SectionType.TABLE && (
            <Box className={classes.actionContainer__item}>
              <Select
                id="demo-simple-select"
                disableUnderline
                classes={{ root: classes.select }}
                value={cardRows}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => handleSelectRowChange(e.target.value as number)}
              >
                {Range(2, 10).map((number) => {
                  return <MenuItem value={number}>{number} Rows</MenuItem>;
                })}
              </Select>
              <Select
                id="demo-simple-select"
                disableUnderline
                classes={{ root: classes.select }}
                value={cardColumns}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => handleSelectColumnChange(e.target.value as number)}
              >
                {Range(2, 6).map((number) => {
                  return <MenuItem value={number}>{number} Columns</MenuItem>;
                })}
              </Select>
            </Box>
          )}

          <Box className={classes.actionContainer__item}>
            <IconButton disabled={true}>
              <DownIcon viewBox="0 0 16 16" style={{ width: 16, height: 16 }}></DownIcon>
            </IconButton>
            <IconButton>
              <UpIcon viewBox="0 0 16 16" style={{ width: 16, height: 16 }}></UpIcon>
            </IconButton>
            <IconButton disabled={true}>
              <DeleteIcon viewBox="0 0 16 16" style={{ width: 16, height: 16 }}></DeleteIcon>
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ResumeSection;
