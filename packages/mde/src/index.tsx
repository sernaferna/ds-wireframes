import { MarkdownBox } from './components/MarkdownBox';
import { MDPreview } from './components/MDPreview';

export { outputFromMD } from './helpers/markdown';

/**
 * This is the Markdown Editor component
 */
const InternalMarkdownBox = Object.assign(MarkdownBox, {
  /**
   * This is the Markdown Preview Component, which can be used on its own
   */
  Preview: MDPreview,
});

export { InternalMarkdownBox as MarkdownBox };
