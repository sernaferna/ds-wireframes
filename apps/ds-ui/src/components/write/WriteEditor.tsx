import React, { useState } from 'react';
import { MarkdownBox } from '../common/MarkdownBox';

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
