import { Grid } from '@material-ui/core';

import React from 'react';
import { DropResult } from 'react-beautiful-dnd';
import { ISection } from 'shared/interfaces/ITalent';
import { Input } from 'themes/elements';

type Props = {
  section: ISection;
};
const TableCard: React.FC<Props> = ({ section }) => {
  const handleDragEnd = (result: DropResult) => {};
  return (
    <>
      {Array.from({ length: section.values.length }).map((_, rowIndex) => (
        <Grid container spacing={2} key={rowIndex}>
          <Grid item xs>
            <Input
              fullWidth
              disabled
              margin={'normal'}
              inputProps={{ tabIndex: rowIndex }}
              InputProps={{ disableUnderline: true }}
              InputLabelProps={{ shrink: true }}
              value={section.values[rowIndex].fields[0]}
              placeholder="Title"
            />
          </Grid>
          <Grid item xs>
            <Input
              fullWidth
              disabled
              margin={'normal'}
              inputProps={{ tabIndex: rowIndex }}
              InputProps={{ disableUnderline: true }}
              InputLabelProps={{ shrink: true }}
              value={section.values[rowIndex].fields[1]}
              placeholder="Director"
            />
          </Grid>
          <Grid item xs>
            <Input
              fullWidth
              disabled
              margin={'normal'}
              inputProps={{ tabIndex: rowIndex }}
              InputProps={{ disableUnderline: true }}
              InputLabelProps={{ shrink: true }}
              value={section.values[rowIndex].fields[2]}
              placeholder="Role"
            />
          </Grid>
          <Grid item xs>
            <Input
              fullWidth
              disabled
              margin={'normal'}
              inputProps={{ tabIndex: rowIndex }}
              InputProps={{ disableUnderline: true }}
              InputLabelProps={{ shrink: true }}
              value={section.values[rowIndex].fields[3]}
              placeholder="Year"
            />
          </Grid>
          <Grid item xs>
            <Input
              fullWidth
              disabled
              margin={'normal'}
              inputProps={{ tabIndex: rowIndex }}
              InputProps={{ disableUnderline: true }}
              InputLabelProps={{ shrink: true }}
              value={section.values[rowIndex].fields[4]}
            />
          </Grid>
          <Grid item xs>
            <Input
              fullWidth
              disabled
              margin={'normal'}
              inputProps={{ tabIndex: rowIndex }}
              InputProps={{ disableUnderline: true }}
              InputLabelProps={{ shrink: true }}
              value={section.values[rowIndex].fields[5]}
            />
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export default TableCard;
