import React, { useState } from 'react';
import { MarkdownBox } from '../common/MarkdownBox';

/**
 * Displays the markdown editor for the **Write** section of the app
 */
export const WriteEditor = () => {
  const [content, setContent] = useState('');

  return (
    <MarkdownBox
      content={content}
      changeCallback={(value) => setContent(value)}
      showToolbar={true}
      showSidePreview={true}
    />
  );
};
