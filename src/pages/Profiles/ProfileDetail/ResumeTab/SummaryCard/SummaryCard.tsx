import { RichEditor } from 'components';
import React, { useState } from 'react';
import { ISection } from 'shared/interfaces/ITalent';
import { convertContent } from 'shared/utils/convertContent';

type Props = {
  section: ISection;
};
const SummaryCard: React.FC<Props> = ({ section }) => {
  const [editorState, setEditorState] = useState(() => {
    return convertContent(section.values[0].fields[0] || '');
  });
  return <RichEditor editorState={editorState} setEditorState={setEditorState} isReadOnly onChange={() => null} />;
};

export default SummaryCard;
