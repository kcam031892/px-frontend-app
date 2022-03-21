import { Grid, IconButton } from '@material-ui/core';
import { ResumeMediaIcon, MoveIcon, DeleteIcon } from 'components/Icons';
import React from 'react';
import {
  DragDropContext,
  Droppable,
  DroppableProvided,
  Draggable,
  DraggableProvided,
  DropResult,
} from 'react-beautiful-dnd';
import { Input } from 'themes/elements';

const TableCard = () => {
  const handleDragEnd = (result: DropResult) => {};
  return (
    <>
      {Array.from({ length: 2 }).map((_, rowIndex) => (
        <Grid container spacing={2}>
          <Grid item xs>
            <Input
              fullWidth
              disabled
              margin={'normal'}
              inputProps={{ tabIndex: rowIndex }}
              InputProps={{ disableUnderline: true }}
              InputLabelProps={{ shrink: true }}
              value={'Sample'}
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
              value={'Sample 2'}
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
              value={'Sample 3'}
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
              value={'Sample 4'}
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
              value={'Sample 5'}
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
              value={'Sample 6'}
            />
          </Grid>
        </Grid>
      ))}
    </>
  );
};

export default TableCard;
