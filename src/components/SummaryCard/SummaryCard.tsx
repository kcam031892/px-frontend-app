import { Space } from 'antd';
import { RichEditor } from 'components';

import React, { useState } from 'react';

import { Input } from 'shared/theme/elements';
import { ActionContainer, Card, SummaryCardWrapper } from './SummaryCard.styled';

type Props = {
  isShownMenu?: boolean;
  index: number;
  handleIndexMenuShown: (index: number) => void;
};
const SummaryCard: React.FC<Props> = ({ isShownMenu, handleIndexMenuShown, index }) => {
  const toggleActionBar = (e: React.MouseEvent<HTMLDivElement>) => {
    e.stopPropagation();
    handleIndexMenuShown(index);
  };

  return (
    <SummaryCardWrapper>
      <Card onClick={toggleActionBar}>
        <Space direction="vertical" className="card__space" size="large">
          <Input placeholder="Sample" $fullWidth onClick={(e) => e.stopPropagation()} />
          <RichEditor stopBubbling />
        </Space>
      </Card>
      <ActionContainer isShow={isShownMenu}></ActionContainer>
    </SummaryCardWrapper>
  );
};

export default SummaryCard;
