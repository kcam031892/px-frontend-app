import { Col, Row, Space } from 'antd';
import React, { useState } from 'react';
import { Button, Input, Select } from 'shared/theme/elements';
import { ActionContainer, Card, GridActions, ItemsContainer, TableCardWrapper } from './TableCard.styles';
import {
  DragDropContext,
  Draggable,
  Droppable,
  DroppableProvided,
  DroppableStateSnapshot,
  DraggableProvided,
  DraggableStateSnapshot,
  DropResult,
  ResponderProvided,
} from 'react-beautiful-dnd';

import { SelectValue } from 'antd/lib/select';
import { COLUMN_SELECT_ITEMS, ROW_SELECT_ITEMS } from 'shared/constants/SELECT_ITEMS';

import { ISection } from 'shared/interfaces/ISection';

type Props = {
  columns?: number;
  rows?: number;
  isShownMenu?: boolean;
  index: number;
  handleIndexMenuShown: (index: number) => void;
  handleReorderTable: (sectionIndex: number, sourceIndex: number, destinationIndex: number) => void;
  handleColumnChange: (arrayIndex: number, num: number) => void;
  handleRowChange: (arrayIndex: number, num: number) => void;
  section: ISection;
};
const TableCard: React.FC<Props> = ({
  columns = 6,
  rows = 4,
  isShownMenu,
  index,
  handleIndexMenuShown,
  section,
  handleReorderTable,
  handleColumnChange,
  handleRowChange,
}) => {
  const [cardColumns, setCardColumns] = useState(section.values[0].length);
  const [cardRows, setCardRows] = useState(section.values.length);

  const handleRowSelectChange = (value: SelectValue) => {
    const numValue = Number(value);
    handleRowChange(index, numValue);
    setCardRows(numValue);
  };
  const handleColumnSelectChange = (value: SelectValue) => {
    // _handleColumnChange(index, Number(value));
    const numValue = Number(value);
    handleColumnChange(index, numValue);
    setCardColumns(numValue);
  };
  const handleDragEnd = (result: DropResult, provided: ResponderProvided) => {
    if (!result.destination) {
      return;
    }

    handleReorderTable(index, result.source.index, result.destination.index);

    // const items = reoder(cardRows, result.source.index, result.destination.index);
  };

  const toggleActionBar = (e: React.MouseEvent<HTMLDivElement>) => {
    handleIndexMenuShown(index);
    e.nativeEvent.stopImmediatePropagation();
  };
  return (
    <TableCardWrapper>
      <Card onClickCapture={toggleActionBar}>
        <Space className="card__space" direction="vertical" size="large">
          <Input placeholder="Sample" $fullWidth onClick={(e) => e.stopPropagation()} />
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable">
              {(provided: DroppableProvided) => (
                <div ref={provided.innerRef} {...provided.droppableProps}>
                  {provided.placeholder}
                  <ItemsContainer direction="vertical" size="middle">
                    {section.values && (
                      <>
                        <>
                          {Array.from({ length: section.values.length }).map((_, rowIndex) => (
                            <Draggable key={rowIndex.toString()} draggableId={rowIndex.toString()} index={rowIndex}>
                              {(providedDraggable: DraggableProvided) => (
                                <Row
                                  gutter={[16, 16]}
                                  justify="space-between"
                                  ref={providedDraggable.innerRef}
                                  {...providedDraggable.draggableProps}
                                  {...providedDraggable.dragHandleProps}
                                >
                                  <Col span={20}>
                                    <Row key={rowIndex} gutter={[16, 16]}>
                                      {Array.from({ length: cardColumns }).map((_, columnIndex) => (
                                        <Col key={columnIndex} span={Math.floor(24 / cardColumns)}>
                                          <Input
                                            placeholder="hello"
                                            $fullWidth
                                            onClick={(e) => e.stopPropagation()}
                                            value={section!.values![rowIndex][columnIndex]}
                                          />
                                        </Col>
                                      ))}
                                    </Row>
                                  </Col>
                                  <Col>
                                    <GridActions>
                                      <div {...providedDraggable.dragHandleProps} onClick={(e) => e.stopPropagation()}>
                                        <h1>Hello</h1>
                                      </div>

                                      <Button>D</Button>
                                      <Button>B</Button>
                                    </GridActions>
                                  </Col>
                                </Row>
                              )}
                            </Draggable>
                          ))}
                        </>
                      </>
                    )}
                  </ItemsContainer>
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </Space>
      </Card>
      <ActionContainer isShow={isShownMenu}>
        <Space>
          <Select
            items={ROW_SELECT_ITEMS}
            placeholder="Select Rows"
            className="action__select"
            value={cardRows.toString()}
            onChange={handleRowSelectChange}
          />
          <Select
            items={COLUMN_SELECT_ITEMS}
            onChange={handleColumnSelectChange}
            placeholder="Select Rows"
            className="action__select"
            value={cardColumns.toString()}
          />
        </Space>
      </ActionContainer>
    </TableCardWrapper>
  );
};

export default TableCard;
