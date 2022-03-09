import { convertToRaw, EditorState, ContentState } from 'draft-js';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';
import React, { useState } from 'react';
import { Editor } from 'react-draft-wysiwyg';
import { useStyles } from './RichEditor.styles';
type Props = {
  onChange: (text: string) => void;
  content?: string;
  minHeight?: number;
};
const RichEditor: React.FC<Props> = ({ onChange, content, minHeight }) => {
  const classes = useStyles();
  const [isToolbarHidden, setIsToolbarHidden] = useState<boolean>(true);
  const convertContent = (content: string) => {
    if (content) {
      const contentBlock = htmlToDraft(content);
      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
        return EditorState.createWithContent(contentState);
      }
    }
    return EditorState.createEmpty();
  };

  const [editorState, setEditorState] = useState(() => {
    return convertContent(content || '');
  });

  const handleEditStateChange = (changed: EditorState) => {
    setEditorState(changed);
    const htmlContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    if (onChange && htmlContent !== content) {
      onChange(htmlContent);
    }
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
