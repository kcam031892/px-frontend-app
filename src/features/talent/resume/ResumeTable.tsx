import React from 'react';
import { ResumeRow } from './ResumeRow';
import { ResumeTextItem } from './ResumeTypes';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
  DraggableProvided,
  DraggableStateSnapshot,
} from 'react-beautiful-dnd';

type ResumeTableProps = {
  columns: number;
  rows: number;
  textItems: ResumeTextItem[];
  onCellChange: (value: string, row: number, column: number) => void;
  onDeleteRow: (rowIndex: number) => void;
  onReOrderRow: (sourceIndex: number, destIndex: number) => void;
};

const ResumeTable = (props: ResumeTableProps) => {
  const onDragEnd = (result: any) => {
    if (!result.destination) {
      return;
    }
    props.onReOrderRow(result.source.index, result.destination.index);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="droppable">
        {(provided: DroppableProvided, snapshot: DroppableStateSnapshot) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {[...Array(props.rows)].map((e, i) => {
              return (
                <Draggable key={i.toString()} draggableId={i.toString()} index={i}>
                  {(providedDraggable: DraggableProvided, snapshotDraggable: DraggableStateSnapshot) => (
                    <div>
                      <div ref={providedDraggable.innerRef} {...providedDraggable.draggableProps}>
                        <ResumeRow
                          columns={props.columns || 4}
                          onCellChange={(value: string, column: number) => props.onCellChange(value, i, column)}
                          onDeleteRow={() => props.onDeleteRow(i)}
                          index={i}
                          id={i}
                          key={i}
                          values={props.textItems.filter((x) => x.rowIndex === i)}
                          dragableHandler={providedDraggable.dragHandleProps}
                        />
                      </div>
                    </div>
                  )}
                </Draggable>
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default ResumeTable;
