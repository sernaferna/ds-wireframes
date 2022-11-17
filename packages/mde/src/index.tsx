import { MarkdownBox } from './components/MarkdownBox';
import { MDPreview } from './components/MDPreview';

export { outputFromMD } from './helpers/markdown';

const InternalMarkdownBox = Object.assign(MarkdownBox, {
  Preview: MDPreview,
});

export { InternalMarkdownBox as MarkdownBox };
