import React from 'react';
import { MyEditor } from '../../../components/textField';

type ResumeParagraphProps = {
  sectionId: number;
  content: string;
  onCellChange: (value: string) => void;
};
const ResumeParagraph = (props: ResumeParagraphProps) => {
  const handleContentChange = (content: string) => {
    if (props.onCellChange !== null) {
      props.onCellChange(content);
    }
  };

  return <MyEditor content={props.content} key={props.sectionId} onChange={handleContentChange} />;
};

export default ResumeParagraph;
