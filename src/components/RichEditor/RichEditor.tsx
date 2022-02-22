import React, { useState } from 'react';
import { RichEditorWrapper, Editor } from './RichEditor.styled';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import { EditorState } from 'draft-js';

type Props = {
  minHeight?: number;
  stopBubbling?: boolean;
};
const RichEditor: React.FC<Props> = ({ minHeight, stopBubbling }) => {
  const [isToolbarHidden, setToolbarHidden] = useState<boolean>(true);
  const [editorState, setEditorState] = useState<EditorState>(EditorState.createEmpty());

  const handleEditorStateChange = (editorState: EditorState) => {
    setEditorState(editorState);
  };
  return (
    <RichEditorWrapper onClick={(e) => (stopBubbling ? e.stopPropagation() : null)}>
      <Editor
        toolbarHidden={isToolbarHidden}
        placeholder="Enter text here ..."
        wrapperClassName="editor__wrapper"
        toolbarClassName="editor__toolbar"
        editorClassName="editor-class"
        onFocus={() => setToolbarHidden(false)}
        onBlur={() => setToolbarHidden(true)}
        wrapperStyle={{ minHeight: minHeight || 20 }}
        toolbar={{
          options: ['inline'],
          inline: {
            options: ['bold', 'italic', 'underline'],
          },
        }}
      />
    </RichEditorWrapper>
  );
};

export default RichEditor;
