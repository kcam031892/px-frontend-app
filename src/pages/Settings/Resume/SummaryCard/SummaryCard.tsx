import { RichEditor } from 'components';
import React from 'react';

const SummaryCard = () => {
  return <RichEditor content="Hello" onChange={(value) => console.log(value)} />;
};

export default SummaryCard;
