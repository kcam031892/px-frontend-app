import React, { useState } from 'react';
import { ContentState, convertToRaw, EditorState } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import { createStyles, makeStyles, Theme } from '@material-ui/core';
import draftToHtml from 'draftjs-to-html';
import htmlToDraft from 'html-to-draftjs';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    warpper: {
      position: 'relative',
      fontSize: '16px',
      '&:focus-within': {
        padding: '0px 16px',
        border: 'solid 1px #2962FF',
        borderRadius: 6,
      },
    },
    toolBar: {
      position: 'absolute',
      right: '5px',
      top: '-50px',
      zIndex: 2,
      background: '#FFFFFF',
      boxShadow:
        '0px 8px 8px rgba(55, 71, 79, 0.04), 0px 8px 16px rgba(55, 71, 79, 0.08), 0px 10px 48px rgba(55, 71, 79, 0.08)',
      borderRadius: '8px',
    },
  }),
);

interface MyEditorProps {
  onChange?: (text: string) => void;
  content: string | undefined;
  minHeight?: number | undefined;
}

function MyEditor(props: MyEditorProps) {
  const classes = useStyles();
  const [toolBarHidde, setToolBarHidden] = useState(true);

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

  const [editorState, setEditorState] = React.useState(() => {
    return convertContent(props.content || '');
  });

  const handleEditStateChange = (changed: EditorState) => {
    setEditorState(changed);
    const htmlContent = draftToHtml(convertToRaw(editorState.getCurrentContent()));
    if (props.onChange && htmlContent !== props.content) {
      props.onChange(htmlContent);
    }
  };

  return (
    <Editor
      toolbarHidden={toolBarHidde}
      wrapperClassName={classes.warpper}
      editorClassName="editor-class"
      toolbarClassName={classes.toolBar}
      placeholder="Enter text here ..."
      editorState={editorState}
      onFocus={() => setToolBarHidden(false)}
      onBlur={() => setToolBarHidden(true)}
      onEditorStateChange={handleEditStateChange}
      wrapperStyle={{
        minHeight: props.minHeight || 20,
      }}
      toolbar={{
        options: ['inline'],
        inline: {
          options: ['bold', 'italic', 'underline'],
        },
      }}
    />
  );
}

export default MyEditor;
