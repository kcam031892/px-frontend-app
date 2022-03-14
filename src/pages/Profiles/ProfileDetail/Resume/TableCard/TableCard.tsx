import { Box, Grid, IconButton } from '@material-ui/core';
import { DeleteIcon, MoveIcon, ResumeMediaIcon } from 'components/Icons';
import React, { useState } from 'react';
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  Droppable,
  DroppableProvided,
  DropResult,
} from 'react-beautiful-dnd';
import { ISection } from 'shared/interfaces/IProfile';
import { Input } from 'themes/elements';
import { useStyles } from './TableCard.styles';

type Props = {
  handleReorderTable: (sectionIndex: number, sourceIndex: number, destinationIndex: number) => void;
  handleColumnChange: (arrayIndex: number, num: number) => void;
  handleRowChange: (arrayIndex: number, num: number) => void;
  section: ISection;
  index: number;
  cardRows: number;
  cardColumns: number;
};
const TableCard: React.FC<Props> = ({ handleReorderTable, section, index, cardRows, cardColumns }) => {
  const classes = useStyles();

  // const handleDragEnd = (result: DropResult) => {
  //   if (!result.destination) {
  //     return;
  // };
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) {
      return;
    }

    handleReorderTable(index, result.source.index, result.destination.index);
  };

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable">
          {(provided: DroppableProvided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {provided.placeholder}
              {Array.from({ length: cardRows }).map((_, rowIndex) => (
                <Draggable key={rowIndex.toString()} draggableId={rowIndex.toString()} index={rowIndex}>
                  {(providedDraggable: DraggableProvided) => (
                    <Grid
                      container
                      spacing={3}
                      ref={providedDraggable.innerRef}
                      {...providedDraggable.draggableProps}
                      {...providedDraggable.dragHandleProps}
                    >
                      {Array.from({ length: cardColumns }).map((column, columnIndex) => (
                        <Grid item xs key={columnIndex}>
                          <Input
                            fullWidth
                            margin={'normal'}
                            inputProps={{ tabIndex: columnIndex }}
                            InputProps={{ disableUnderline: true }}
                            InputLabelProps={{ shrink: true }}
                            value={section!.values![rowIndex][columnIndex]}
                          />
                        </Grid>
                      ))}

                      <Grid className={classes.actionContainer}>
                        <IconButton disabled={true}>
                          <ResumeMediaIcon viewBox="0 0 16 16" style={{ width: 16, height: 16, marginTop: '7px' }} />
                        </IconButton>
                        <div {...providedDraggable.dragHandleProps}>
                          <IconButton>
                            <MoveIcon viewBox="0 0 16 16" style={{ width: 16, height: 16 }} />
                          </IconButton>
                        </div>

                        <IconButton>
                          <DeleteIcon viewBox="0 0 16 16" style={{ width: 16, height: 16 }} />
                        </IconButton>
                      </Grid>
                    </Grid>
                  )}
                </Draggable>
              ))}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default TableCard;
