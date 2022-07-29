import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import { getPluginList } from '@devouringscripture/remark-plugins';

export interface IMDViewer {
  content: string;
  shaded?: boolean;
}
export const MDViewer = ({ content, shaded = true }: IMDViewer) => {
  const classNames: string = shaded ? 'bg-secondary bg-opacity-10 border mx-1 my-2' : '';

  const pluginList = getPluginList();
  return <MDEditor.Markdown source={content} className={classNames} remarkPlugins={pluginList} />;
};
