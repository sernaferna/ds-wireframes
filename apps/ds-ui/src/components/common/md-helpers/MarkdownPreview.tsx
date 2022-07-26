import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import { getPluginList } from '@devouringscripture/remark-plugins';

interface IMarkdownPreview {
  content: string;
  shaded?: boolean;
}

/**
 * Displays markdown content, in its formatted version.
 *
 * @param content The text (markdown format) to be displayed
 * @param shaded Indicates whether the output should have a shaded background and border (defaults to true)
 */
export const MarkdownPreview = ({ content, shaded = true }: IMarkdownPreview) => {
  const classNames: string = shaded ? 'bg-secondary bg-opacity-10 border mx-1 my-2' : '';

  const pluginList = getPluginList();
  return <MDEditor.Markdown source={content} className={classNames} remarkPlugins={pluginList} />;
};
