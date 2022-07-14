import React from 'react';
import MDEditor from '@uiw/react-md-editor';
import { useUserSettings } from '../../../hooks/UserSettings';
import { ErrorLoadingDataMessage, LoadingMessage } from '../loading';
import { getPluginList } from '../MarkdownBox';

interface IMarkdownPreview {
  content: string;
  shaded?: boolean;
}
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
