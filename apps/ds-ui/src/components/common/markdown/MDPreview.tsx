import React, { useMemo } from 'react';
import { renderedOutputFromMarkdown } from '../../../helpers/markdown/markdown-utils';

interface IMDPreview {
  content: string;
  defaultVersion?: string;
  passageContext?: string;
  shaded?: boolean;
}

/**
 * Renders a read-only, formatted view of markdown on the screen. Not
 * typically used on its own; the preferred usage would be to use it via
 * `<MarkdownBox.Preview>` for simplicity.
 *
 * @param content Markdown to be rendered
 * @param defaultVersion Default version of the Bible to use for rendering
 * @param passageContext Context for passage to be rendered
 * @shaded Whether the output should be given a background colour and border to set it apart
 */
export const MDPreview = ({ content, defaultVersion, passageContext, shaded = true }: IMDPreview) => {
  const classNames: string = useMemo(() => {
    return 'ds-md-viewer overflow-auto flex-grow-1 ' + (shaded ? 'bg-secondary bg-opacity-10 border mx-1 my-2' : '');
  }, [shaded]);

  const renderedOutput = useMemo(() => {
    return renderedOutputFromMarkdown(content, defaultVersion, passageContext);
  }, [content, defaultVersion, passageContext]);

  return <div className={classNames} dangerouslySetInnerHTML={{ __html: renderedOutput }} />;
};
