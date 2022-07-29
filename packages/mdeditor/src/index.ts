import { MDEditor } from './editor/MDEditor';
import { MDViewer } from './viewer/MDViewer';

const EditorInternal = Object.assign(MDEditor, {
  Viewer: MDViewer,
});

export { EditorInternal as MDEditor };
