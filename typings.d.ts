declare module 'slate-react-presentation' {
    import React from 'react';
    import { EditableProps } from 'slate-react/dist/components/editable';
    import { Node } from 'slate';
  
    export interface SlateReactPresentationProps {
      value?: Node[];
      renderElement?: EditableProps['renderElement'];
      renderLeaf?: EditableProps['renderLeaf'];
    }
    export const SlateReactPresentation: React.FC<SlateReactPresentationProps>;
  }
  