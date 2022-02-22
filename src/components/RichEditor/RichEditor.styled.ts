import styled from 'styled-components';
import { Editor as WSYSIWYGEditor } from 'react-draft-wysiwyg';

export const RichEditorWrapper = styled.div`
  .editor__wrapper {
    position: relative;
    font-size: 16px;
    border: 1px solid lightgrey;
    padding: 0 1rem;
    border-radius: 6px;
    &:focus-within {
      padding: 0 1rem;
      border: 1px solid #2962ff;
    }
  }
  .editor__toolbar {
    position: absolute;
    right: 5px;
    top: -50px;
    z-index: 2;

    background-color: #fff;
    box-shadow: 0px 8px 8px rgba(55, 71, 79, 0.04), 0px 8px 16px rgba(55, 71, 79, 0.08),
      0px 10px 48px rgba(55, 71, 79, 0.08);
  }
`;
export const Editor = styled(WSYSIWYGEditor)``;
