import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import { useUserSettings } from '../../../hooks/UserSettings';
import { ErrorLoadingDataMessage, LoadingMessage } from '../loading';
import { getPluginList } from './md-commands';

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
  const [userData, userResponseError, userLoading] = useUserSettings();

  if (userLoading) {
    return <LoadingMessage />;
  }
  if (userResponseError) {
    return <ErrorLoadingDataMessage theError={userResponseError} />;
  }

  const classNames: string = shaded ? 'bg-light border mx-1 my-2' : ';';

  const pluginList = getPluginList(userData!.settings.write.autoSmallCaps, userData!.settings.write.autoADBC);
  return <MDEditor.Markdown source={content} className={classNames} remarkPlugins={pluginList} />;
};
