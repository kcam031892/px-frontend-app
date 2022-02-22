import { RichEditor } from 'components';
import React from 'react';
import { BiographyWrapper, CardEditor } from './Biography.styled';

const Biography = () => {
  return (
    <BiographyWrapper>
      <CardEditor>
        <RichEditor minHeight={550} />
      </CardEditor>
    </BiographyWrapper>
  );
};

export default Biography;
