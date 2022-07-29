import { MarkdownEditor } from './editor/MarkdownEditor';
import { MDViewer } from './viewer/MDViewer';

const EditorInternal = Object.assign(MarkdownEditor, {
  Viewer: MDViewer,
});

export { EditorInternal as MDEditor };
