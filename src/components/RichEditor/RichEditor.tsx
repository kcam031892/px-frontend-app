import { ContentState, EditorState, convertToRaw } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import React, { useEffect, useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';

import { useStyles } from './RichEditor.styles';
type Props = {
  onChange: (text: string) => void;

  minHeight?: number;
  setEditorState: React.Dispatch<React.SetStateAction<EditorState>>;
  editorState: EditorState;
};
const RichEditor: React.FC<Props> = ({ onChange, minHeight, editorState, setEditorState }) => {
  const classes = useStyles();
  const [isToolbarHidden, setIsToolbarHidden] = useState<boolean>(true);

  const replacetags = (string: string) => {
    return string.replaceAll('\n', '');
  };
  const handleEditStateChange = (changed: EditorState) => {
    setEditorState(changed);
    const htmlContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));

    onChange(htmlContent);
  };

  return (
    <Editor
      toolbarHidden={isToolbarHidden}
      wrapperClassName={classes.wrapper}
      toolbarClassName={classes.toolbar}
      editorClassName="editor-class"
      placeholder="Enter Text Here..."
      editorState={editorState}
      onFocus={() => setIsToolbarHidden(false)}
      onBlur={() => setIsToolbarHidden(true)}
      onEditorStateChange={handleEditStateChange}
      wrapperStyle={{ minHeight: minHeight || 20 }}
      toolbar={{
        options: ['inline'],
        inline: {
          options: ['bold', 'italic', 'underline'],
        },
      }}
    />
  );
};

export default RichEditor;
