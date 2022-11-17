import React, { useMemo } from 'react';
import { outputFromMD } from '../helpers/markdown';

export interface IMDPreview {
  content: string;
  defaultVersion?: string;
  passageContext?: string;
  shaded?: boolean;
}

export const MDPreview = ({ content, defaultVersion, passageContext, shaded }: IMDPreview) => {
  const classNames: string = useMemo(() => {
    return `ds-md-viewer overflow-auto flex-grow-1 ` + shaded ? 'bg-secondary bg-opacity-10 border mx-1 my-2' : '';
  }, [shaded]);

  const renderedOutput = useMemo(() => {
    return outputFromMD(content, defaultVersion, passageContext);
  }, [content, defaultVersion, passageContext]);

  return <div className={classNames} dangerouslySetInnerHTML={{ __html: renderedOutput }} />;
};
