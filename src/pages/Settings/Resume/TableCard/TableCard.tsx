import { Box, Grid, IconButton } from '@material-ui/core';
import { DeleteIcon, MoveIcon, ResumeMediaIcon } from 'components/Icons';
import React from 'react';
import {
  DragDropContext,
  Draggable,
  DraggableProvided,
  DropResult,
  Droppable,
  DroppableProvided,
} from 'react-beautiful-dnd';
import { useDispatch, useSelector } from 'react-redux';
import { GENERATE_DATES } from 'shared/constants/GENERATE_DATES';
import { ISection } from 'shared/interfaces/ITalent';
import { IKeyValue } from 'shared/interfaces/utils/IKeyValue';

import { changeTextValues, removeRow, selectResumeState } from 'shared/redux/slicers/resume.slicer';
import { Input, Select } from 'themes/elements';

import { useStyles } from './TableCard.styles';

type Props = {
  handleReorderTable: (sectionIndex: number, sourceIndex: number, destinationIndex: number) => void;
  handleRowChange: () => void;
  section: ISection;
  index: number;
  handleOpenGalleryDialog: () => void;
  setIsTableDragging: React.Dispatch<React.SetStateAction<boolean>>;
};
const TableCard: React.FC<Props> = ({
  handleReorderTable,
  section,
  index,
  handleRowChange,
  handleOpenGalleryDialog,
  setIsTableDragging,
}) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { isSectionShowYear } = useSelector(selectResumeState);

  // const handleDragEnd = (result: DropResult) => {
  //   if (!result.destination) {
  //     return;
  // };
  const handleDragStart = () => {
    setIsTableDragging(true);
  };
  const handleDragEnd = (result: DropResult) => {
    setIsTableDragging(false);
    if (!result.destination) {
      return;
    }
    handleReorderTable(index, result.source.index, result.destination.index);
  };

  const handleLastInputElement = (rowIndex: number) => (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (rowIndex === 0) {
      if (event.key === 'Enter') {
        handleRowChange();
      }
    }
  };

  const handleInputChange = (rowIndex: number, columnIndex: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeTextValues({ sectionIndex: index, rowIndex, columnIndex, value: event.target.value }));
  };

  const handleDateChange = (rowIndex: number, columnIndex: number, value: string) => {
    dispatch(changeTextValues({ sectionIndex: index, rowIndex, columnIndex, value }));
  };

  const handleRemoveRow = (rowIndex: number) => {
    dispatch(removeRow({ sectionIndex: index, rowIndex }));
  };

  return (
    <Box mt={1}>
      <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
        <Droppable droppableId="droppable">
          {(provided: DroppableProvided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              {Array.from({ length: section.values.length }).map((_, rowIndex) => (
                <Draggable key={rowIndex.toString()} draggableId={rowIndex.toString()} index={rowIndex}>
                  {(providedDraggable: DraggableProvided) => (
                    <Grid
                      container
                      spacing={3}
                      ref={providedDraggable.innerRef}
                      {...providedDraggable.draggableProps}
                      {...providedDraggable.dragHandleProps}
                    >
                      <Grid item xs>
                        <Input
                          fullWidth
                          margin={'normal'}
                          inputProps={{ tabIndex: rowIndex }}
                          InputProps={{ disableUnderline: true }}
                          InputLabelProps={{ shrink: true }}
                          value={section.values[rowIndex].fields[0]}
                          onChange={handleInputChange(rowIndex, 0)}
                          placeholder="Title"
                        />
                      </Grid>
                      <Grid item xs>
                        <Input
                          fullWidth
                          margin={'normal'}
                          inputProps={{ tabIndex: rowIndex }}
                          InputProps={{ disableUnderline: true }}
                          InputLabelProps={{ shrink: true }}
                          onChange={handleInputChange(rowIndex, 1)}
                          value={section.values[rowIndex].fields[1]}
                          placeholder="Director"
                        />
                      </Grid>
                      <Grid item xs>
                        <Input
                          fullWidth
                          margin={'normal'}
                          inputProps={{ tabIndex: rowIndex }}
                          InputProps={{ disableUnderline: true }}
                          InputLabelProps={{ shrink: true }}
                          onChange={handleInputChange(rowIndex, 2)}
                          value={section.values[rowIndex].fields[2]}
                          placeholder="Role"
                        />
                      </Grid>
                      <Grid item xs>
                        {isSectionShowYear ? (
                          <Select
                            data={GENERATE_DATES}
                            fullWidth
                            placeholder="Year"
                            MenuProps={{
                              anchorOrigin: {
                                vertical: 'bottom',
                                horizontal: 'left',
                              },
                              getContentAnchorEl: null,
                            }}
                            value={section.values[rowIndex].fields[3]}
                            onChange={(e) => handleDateChange(rowIndex, 3, e.target.value as string)}
                          />
                        ) : (
                          <Input
                            type={isSectionShowYear ? 'number' : 'hidden'}
                            fullWidth
                            margin={'normal'}
                            inputProps={{ tabIndex: rowIndex }}
                            InputProps={{
                              disableUnderline: true,
                            }}
                            InputLabelProps={{ shrink: true }}
                            value={section.values[rowIndex].fields[3]}
                            placeholder="Year"
                          />
                        )}
                      </Grid>
                      <Grid item xs>
                        <Input
                          fullWidth
                          margin={'normal'}
                          inputProps={{ tabIndex: rowIndex }}
                          InputProps={{ disableUnderline: true }}
                          InputLabelProps={{ shrink: true }}
                          onChange={handleInputChange(rowIndex, 4)}
                          value={section.values[rowIndex].fields[4]}
                        />
                      </Grid>
                      <Grid item xs>
                        <Input
                          fullWidth
                          margin={'normal'}
                          inputProps={{ tabIndex: rowIndex }}
                          InputProps={{ disableUnderline: true }}
                          InputLabelProps={{ shrink: true }}
                          onKeyPress={handleLastInputElement(rowIndex)}
                          onChange={handleInputChange(rowIndex, 5)}
                          value={section.values[rowIndex].fields[5]}
                        />
                      </Grid>

                      <Grid className={classes.actionContainer}>
                        <IconButton onClick={handleOpenGalleryDialog}>
                          <ResumeMediaIcon viewBox="0 0 16 16" style={{ width: 16, height: 16, marginTop: '7px' }} />
                        </IconButton>
                        <div {...providedDraggable.dragHandleProps} onClick={(e) => e.stopPropagation()}>
                          <IconButton onClick={(e) => e.stopPropagation()}>
                            <MoveIcon viewBox="0 0 16 16" style={{ width: 16, height: 16 }} />
                          </IconButton>
                        </div>

                        <IconButton
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveRow(rowIndex);
                          }}
                        >
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
    </Box>
  );
};

export default TableCard;
