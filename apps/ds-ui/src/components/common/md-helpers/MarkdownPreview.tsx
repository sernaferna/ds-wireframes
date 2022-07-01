import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import supersub from 'remark-supersub';
import {
  tac,
  lowerCaps,
  smallCaps,
  highlight,
  bibleLinks,
  smartquotes,
  poetryBlocks,
} from '@devouringscripture/remark-plugins';

interface IMarkdownPreview {
  content: string;
  shaded?: boolean;
}
export const MarkdownPreview = ({ content, shaded = true }: IMarkdownPreview) => {
  const classNames: string = shaded ? 'bg-light border mx-1 my-2' : ';';
  return (
    <MDEditor.Markdown
      source={content}
      className={classNames}
      remarkPlugins={[tac, lowerCaps, smallCaps, highlight, supersub, bibleLinks, smartquotes, poetryBlocks]}
    />
  );
};
