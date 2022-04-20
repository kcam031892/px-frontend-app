import { RichEditor } from 'components';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { ISection } from 'shared/interfaces/ITalent';
import { changeTextValues } from 'shared/redux/slicers/resume.slicer';
import { convertContent } from 'shared/utils/convertContent';

type Props = {
  index: number;
  section: ISection;
};
const SummaryCard: React.FC<Props> = ({ index, section }) => {
  const dispatch = useDispatch();
  const [editorState, setEditorState] = useState(() => {
    return convertContent(section.values[0].fields[0] || '');
  });
  const handleEditorChange = (content: string) => {
    dispatch(changeTextValues({ sectionIndex: index, rowIndex: 0, columnIndex: 0, value: content }));
  };
  return <RichEditor editorState={editorState} setEditorState={setEditorState} onChange={handleEditorChange} />;
};

export default SummaryCard;
