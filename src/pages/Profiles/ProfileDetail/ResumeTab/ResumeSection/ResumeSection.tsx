import { Box, Card, CardContent, IconButton, InputBase, Tooltip } from '@material-ui/core';
import clsx from 'clsx';
import { DeleteIcon, DownIcon, UpIcon } from 'components/Icons';
import React from 'react';
import { Button } from 'themes/elements';

import TableCard from '../TableCard/TableCard';
import { useStyles } from './ResumeSection.styles';
type Props = {
  isSelected: { module: 'selected' | 'hidden' | undefined; index: number };
  setSelected: (module: 'selected' | 'hidden', index: number) => void;
  module: 'selected' | 'hidden';
  index: number;
};
const ResumeSection: React.FC<Props> = ({ isSelected, setSelected, module, index }) => {
  const classes = useStyles();
  const getIsSelected = isSelected.index === index && isSelected.module === module;
  return (
    <Card variant="outlined" className={classes.card} onClick={() => setSelected(module, index)}>
      <CardContent>
        {/* Content */}
        {module === 'selected' ? <TableCard /> : <InputBase fullWidth placeholder="Sample Category" disabled />}
        {/* Action */}
        <Box
          className={clsx(classes.actionContainer, {
            [classes.actionContainer__selected]: getIsSelected,
          })}
        >
          <Box className={classes.actionContainer__item}>
            {module === 'selected' ? <Button>Hide Resume</Button> : <Button>Select Resume</Button>}

            <Button>Edit Resume</Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ResumeSection;
