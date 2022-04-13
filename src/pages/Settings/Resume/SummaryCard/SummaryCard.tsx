import { RichEditor } from 'components';
import React, { useState } from 'react';
import { convertContent } from 'shared/utils/convertContent';

const SummaryCard = () => {
  const [editorState, setEditorState] = useState(() => {
    return convertContent('');
  });
  return (
    <RichEditor editorState={editorState} setEditorState={setEditorState} onChange={(value) => console.log(value)} />
  );
};

export default SummaryCard;
