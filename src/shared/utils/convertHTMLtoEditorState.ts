import { ContentState, EditorState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';

export const convertHTMLToEditorState = (html: string): EditorState => {
  const { contentBlocks, entityMap } = htmlToDraft(html);
  const contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);

  return EditorState.createWithContent(contentState);
};
