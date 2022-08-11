import React from 'react';
import { renderedOutputFromMarkdown } from '../../../helpers/markdown/markdown-utils';

interface IMarkedMDPreview {
  content: string;
  shaded?: boolean;
}
export const MarkedMDPreview = ({ content, shaded = true }: IMarkedMDPreview) => {
  const classNames: string = 'ds-md-viewer ' + shaded ? 'bg-secondary bg-opacity-10 border mx-1 my-2' : '';

  return <div className={classNames} dangerouslySetInnerHTML={{ __html: renderedOutputFromMarkdown(content) }} />;
};
