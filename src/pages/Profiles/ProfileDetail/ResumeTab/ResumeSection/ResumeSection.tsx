import { Box, Card, CardContent, IconButton, InputBase, Tooltip } from '@material-ui/core';
import clsx from 'clsx';
import { DeleteIcon, DownIcon, UpIcon } from 'components/Icons';
import React from 'react';
import { useHistory } from 'react-router';
import { ROUTES } from 'shared/constants/ROUTES';
import { ISection } from 'shared/interfaces/ITalent';
import { Button } from 'themes/elements';

import TableCard from '../TableCard/TableCard';
import { useStyles } from './ResumeSection.styles';
type Props = {
  isSelected: { module: 'selected' | 'hidden' | undefined; index: number };
  setSelected: (module: 'selected' | 'hidden', index: number) => void;
  module: 'selected' | 'hidden';
  index: number;
  section: ISection;
  handleSelectResume?: (section: ISection) => void;
  handleHideResume?: (section: ISection) => void;
};
const ResumeSection: React.FC<Props> = ({
  isSelected,
  setSelected,
  module,
  index,
  section,
  handleSelectResume,
  handleHideResume,
}) => {
  const { push } = useHistory();
  const classes = useStyles();
  const getIsSelected = isSelected.index === index && isSelected.module === module;
  return (
    <Card variant="outlined" className={classes.card} onClick={() => setSelected(module, index)}>
      <CardContent>
        {/* Content */}
        <InputBase fullWidth value={section.title} readOnly />
        {module === 'selected' && <TableCard section={section} />}
        {/* Action */}
        <Box
          className={clsx(classes.actionContainer, {
            [classes.actionContainer__selected]: getIsSelected,
          })}
        >
          <Box className={classes.actionContainer__item}>
            {module === 'selected' ? (
              <Button onClick={() => handleHideResume && handleHideResume(section)}>Hide Resume</Button>
            ) : (
              <Button onClick={() => handleSelectResume && handleSelectResume(section)}>Select Resume</Button>
            )}

            <Button onClick={() => push(`${ROUTES.TALENT.SETTINGS}/resume`)}>Edit Resume</Button>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
};

export default ResumeSection;
