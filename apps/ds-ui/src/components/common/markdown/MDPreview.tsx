import React from 'react';
import { renderedOutputFromMarkdown } from '../../../helpers/markdown/markdown-utils';

interface IMDPreview {
  content: string;
  shaded?: boolean;
}

/**
 * Renders a read-only, formatted view of markdown on the screen. Not
 * typically used on its own; the preferred usage would be to use it via
 * `<MarkdownBox.Preview>` for simplicity.
 *
 * @param content Markdown to be rendered
 * @shaded Whether the output should be given a background colour and border to set it apart
 */
export const MDPreview = ({ content, shaded = true }: IMDPreview) => {
  const classNames: string =
    'ds-md-viewer overflow-auto flex-grow-1 ' + (shaded ? 'bg-secondary bg-opacity-10 border mx-1 my-2' : '');

  return <div className={classNames} dangerouslySetInnerHTML={{ __html: renderedOutputFromMarkdown(content) }} />;
};
