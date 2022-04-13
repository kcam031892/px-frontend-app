import { ContentState, EditorState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';

export const convertContent = (content: string) => {
  if (content) {
    const contentBlock = htmlToDraft(content);
    if (contentBlock) {
      const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
      return EditorState.createWithContent(contentState);
    }
  }
  return EditorState.createEmpty();
};
