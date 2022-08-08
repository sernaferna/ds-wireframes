import React from 'react';
import { Chapter } from '@devouringscripture/common';
import { RenderedChapter } from './RenderedChapter';

interface ITutorial {
  chapters: Chapter[];
}

/**
 * Renders a tutorial, including its section titles, sub-parts (in an Accordion),
 * and text/example parts.
 *
 * @param chapters The list of Chapter objects to be rendered
 */
export const Tutorial = ({ chapters }: ITutorial) => {
  return (
    <>
      {chapters.map((chapter, index) => (
        <RenderedChapter chapter={chapter} key={`rendered-chapter-${index}`} />
      ))}
    </>
  );
};
